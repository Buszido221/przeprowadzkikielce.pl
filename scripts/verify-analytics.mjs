import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';

const dist = resolve('dist');
const failures = [];
const warnings = [];
const report = (condition, message) => { if (!condition) failures.push(message); };
const warn = (condition, message) => { if (!condition) warnings.push(message); };

function filesIn(directory, extension) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesIn(path, extension) : extname(path) === extension ? [path] : [];
  });
}

function routeForHtml(path) {
  const local = relative(dist, path).replaceAll('\\', '/');
  if (local === 'index.html') return '/';
  if (local === '404.html') return '/404.html';
  return `/${dirname(local).replaceAll('\\', '/')}/`;
}

const htmlFiles = filesIn(dist, '.html');
const allHtml = htmlFiles.map((path) => readFileSync(path, 'utf8')).join('\n');
const indexHtml = readFileSync(join(dist, 'index.html'), 'utf8');

const hasBanner = indexHtml.includes('id="cookie-consent"');
const hasGtmId = indexHtml.includes('__WHM_GTM_ID');
const hasGtmLoader = /googletagmanager\.com\/gtm\.js/i.test(allHtml);
const hasGtmIframe = /googletagmanager\.com\/ns\.html/i.test(allHtml);

let variant;
if (!hasBanner && !hasGtmId) {
  variant = 'staging';
} else if (hasBanner && !hasGtmId) {
  variant = 'production-no-gtm';
} else if (hasBanner && hasGtmId) {
  variant = 'production-gtm';
} else {
  failures.push(`Cannot determine build variant: banner=${hasBanner}, gtmId=${hasGtmId}`);
  variant = 'unknown';
}

console.log(`Detected build variant: ${variant}`);

const srcFiles = filesIn(resolve('src'), '.ts').concat(filesIn(resolve('src'), '.astro'));
const srcContent = srcFiles.map((path) => readFileSync(path, 'utf8')).join('\n');

// === SHARED CHECKS (all variants) ===

// No GTM noscript iframe anywhere
report(!hasGtmIframe, 'GTM noscript iframe found (should not exist in any build).');

// No direct GA4 / Meta Pixel (legacy snippet patterns)
report(!allHtml.includes('www.google-analytics.com/analytics.js'), 'Direct GA analytics.js found.');
report(!allHtml.includes('connect.facebook.net/en_US/fbevents.js'), 'Direct Meta Pixel script found.');
report(!allHtml.includes('fbq('), 'Direct fbq() call found.');

// No inline event handlers
for (const path of htmlFiles) {
  const html = readFileSync(path, 'utf8');
  const route = routeForHtml(path);
  const inlineHandlers = html.match(/\s(onclick|onsubmit|onchange|onfocus|onblur)\s*=/gi);
  report(!inlineHandlers, `${route}: inline event handler(s): ${inlineHandlers?.join(', ')}`);
}

// No old event / key names in source
report(!srcContent.includes("'lead_form_start'"), 'Old event name "lead_form_start" still in source.');
report(!srcContent.includes("'lead_form_validation_error'"), 'Old event name "lead_form_validation_error" still in source.');
report(!srcContent.includes("'lead_form_submit_error'"), 'Old event name "lead_form_submit_error" still in source.');
report(!srcContent.includes("whm:analytics"), 'Old custom event "whm:analytics" still in source.');
report(!srcContent.includes("'whm_consent_v2'"), 'Old consent key whm_consent_v2 still in source.');
report(!srcContent.includes("'whm_campaign_v2'"), 'Old campaign key whm_campaign_v2 still in source.');
report(srcContent.includes('PUBLIC_GA_MEASUREMENT_ID'), 'PUBLIC_GA_MEASUREMENT_ID not found in source.');

// Consent + campaign keys present
report(srcContent.includes('whm_consent_v3'), 'Consent key whm_consent_v3 not found in source.');
report(srcContent.includes('whm_campaign_v3'), 'Campaign key whm_campaign_v3 not found in source.');

// pushEvent returns boolean
report(srcContent.includes('): boolean'), 'pushEvent should return boolean.');

// data-whm-gtm and data-whm-ga idempotency guards
report(srcContent.includes('data-whm-gtm'), 'GTM idempotency guard (data-whm-gtm) not found in source.');
report(srcContent.includes('data-whm-ga'), 'GA idempotency guard (data-whm-ga) not found in source.');

// gtm.start pushed BEFORE script append
const consentTs = existsSync(resolve('src/lib/consent.ts'))
  ? readFileSync(resolve('src/lib/consent.ts'), 'utf8')
  : '';
if (consentTs) {
  const gtmStartIdx = consentTs.indexOf("'gtm.start'");
  const appendIdx = consentTs.indexOf('appendChild');
  if (gtmStartIdx >= 0 && appendIdx >= 0) {
    report(gtmStartIdx < appendIdx, 'gtm.start must be pushed BEFORE script appendChild in consent.ts.');
  }
}

// Event names in source
const eventNames = ['form_start', 'form_validation_error', 'form_submit_error', 'generate_lead',
  'phone_click', 'sms_click', 'email_click', 'cta_click', 'whm_shop_click', 'scroll_depth', 'engaged_time'];
for (const name of eventNames) {
  report(srcContent.includes(`'${name}'`), `Event "${name}" not found in source code.`);
}

if (variant === 'staging') {
  // === STAGING ===
  report(!hasGtmLoader, 'Staging: GTM loader script found in HTML.');
  report(!hasBanner, 'Staging: cookie consent banner found in HTML.');
  report(!allHtml.includes('cookie-settings-link'), 'Staging: cookie settings link found in HTML.');

  for (const path of htmlFiles) {
    const html = readFileSync(path, 'utf8');
    const route = routeForHtml(path);
    report(!html.includes('__WHM_GTM_ID'), `${route}: staging page contains __WHM_GTM_ID.`);
    report(!html.includes('__WHM_GA_ID'), `${route}: staging page contains __WHM_GA_ID.`);
    report(!html.includes('consent_default'), `${route}: staging page contains consent defaults.`);
  }
} else {
  // === PRODUCTION (both with and without GTM) ===

  // Consent defaults set to denied
  report(indexHtml.includes('analytics_storage'), 'Missing consent default analytics_storage.');
  report(indexHtml.includes('ad_storage'), 'Missing consent default ad_storage.');
  report(indexHtml.includes("'denied'") || indexHtml.includes('"denied"'), 'Consent defaults should be denied.');

  // Banner structure
  report(indexHtml.includes('id="cookie-consent"'), 'Cookie consent banner not found.');
  report(indexHtml.includes('id="cookie-accept"'), 'Accept button not found.');
  report(indexHtml.includes('id="cookie-reject"'), 'Reject button not found.');
  report(indexHtml.includes('id="cookie-settings-open"'), 'Settings button not found.');
  report(indexHtml.includes('id="cookie-save"'), 'Save button not found.');
  report(indexHtml.includes('id="consent-analytics"'), 'Analytics checkbox not found.');
  report(indexHtml.includes('id="consent-marketing"'), 'Marketing checkbox not found.');

  // Settings button has aria-expanded + aria-controls
  report(indexHtml.includes('aria-expanded="false"'), 'Settings button missing aria-expanded.');
  report(indexHtml.includes('aria-controls="cookie-settings-panel"'), 'Settings button missing aria-controls.');

  // Cookie settings link is a button
  report(indexHtml.includes('<button type="button" id="cookie-settings-link"'), 'Cookie settings should be a <button>.');

  // CTA tracking coverage
  const ctaClickCount = (allHtml.match(/data-cta-click/g) || []).length;
  warn(ctaClickCount >= 25, `Only ${ctaClickCount} data-cta-click attributes found (expected 25+).`);

  // Hidden form fields include ft_ and lt_ campaign params
  const formHtml = htmlFiles
    .map((path) => readFileSync(path, 'utf8'))
    .filter((html) => html.includes('lead-form__form'))
    .join('\n');

  if (formHtml) {
    for (const param of ['utm_source', 'utm_medium', 'utm_campaign', 'gclid', 'fbclid', 'campaignid', 'keyword']) {
      report(formHtml.includes(`name="ft_${param}"`), `Form missing hidden field ft_${param}.`);
      report(formHtml.includes(`name="lt_${param}"`), `Form missing hidden field lt_${param}.`);
    }
  }

  if (variant === 'production-no-gtm') {
    report(!hasGtmLoader, 'production-no-gtm: GTM loader found (GTM_ID is empty, loader should not appear).');
    warn(hasBanner, 'production-no-gtm: banner present for consent UI (expected even without GTM).');
  }

  if (variant === 'production-gtm') {
    report(hasGtmId, 'production-gtm: __WHM_GTM_ID not found.');
  }
}

// Output
if (warnings.length) {
  console.log(`\nWarnings:\n- ${warnings.join('\n- ')}`);
}
if (failures.length) {
  console.error(`\nAnalytics validation FAILED (${variant}):\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log(`\nAnalytics validation PASSED (${variant}): consent model, events, attribution OK.`);
