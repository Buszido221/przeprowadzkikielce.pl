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

const isProductionBuild = indexHtml.includes('id="cookie-consent"');
const hasGtmLoader = /googletagmanager\.com\/gtm\.js/i.test(allHtml);
const hasGtmIframe = /googletagmanager\.com\/ns\.html/i.test(allHtml);
const hasBanner = allHtml.includes('id="cookie-consent"');

if (!isProductionBuild) {
  // === STAGING CHECKS ===
  report(!hasGtmLoader, 'Staging: GTM loader script found in HTML.');
  report(!hasGtmIframe, 'Staging: GTM noscript iframe found in HTML.');
  report(!hasBanner, 'Staging: cookie consent banner found in HTML.');
  report(!allHtml.includes('cookie-settings-link'), 'Staging: cookie settings link found in HTML.');

  for (const path of htmlFiles) {
    const html = readFileSync(path, 'utf8');
    const route = routeForHtml(path);
    report(!html.includes('__WHM_GTM_ID'), `${route}: staging page contains GTM ID variable.`);
  }
} else {
  // === PRODUCTION CHECKS ===

  // Check consent defaults
  report(indexHtml.includes("analytics_storage"), 'Production: missing consent default analytics_storage.');
  report(indexHtml.includes("ad_storage"), 'Production: missing consent default ad_storage.');
  report(indexHtml.includes("'denied'") || indexHtml.includes('"denied"'), 'Production: consent defaults should start as denied.');

  // Banner structure
  report(indexHtml.includes('id="cookie-consent"'), 'Production: cookie consent banner not found.');
  report(indexHtml.includes('id="cookie-accept"'), 'Production: accept button not found.');
  report(indexHtml.includes('id="cookie-reject"'), 'Production: reject button not found.');
  report(indexHtml.includes('id="cookie-settings-open"'), 'Production: settings button not found.');
  report(indexHtml.includes('id="consent-analytics"'), 'Production: analytics checkbox not found.');
  report(indexHtml.includes('id="consent-marketing"'), 'Production: marketing checkbox not found.');

  // No inline event handlers
  for (const path of htmlFiles) {
    const html = readFileSync(path, 'utf8');
    const route = routeForHtml(path);
    const inlineHandlers = html.match(/\s(onclick|onsubmit|onchange|onfocus|onblur)\s*=/gi);
    report(!inlineHandlers, `${route}: found inline event handler(s): ${inlineHandlers?.join(', ')}`);
  }

  // No GTM noscript iframe
  report(!hasGtmIframe, 'Production: GTM noscript iframe found (should be removed).');

  // No direct GA4/Meta pixel
  report(!allHtml.includes('www.google-analytics.com/analytics.js'), 'Production: direct GA analytics.js found.');
  report(!allHtml.includes('connect.facebook.net/en_US/fbevents.js'), 'Production: direct Meta Pixel script found.');
  report(!allHtml.includes("gtag('config'"), 'Production: direct gtag config found (should use GTM).');
  report(!allHtml.includes('fbq('), 'Production: direct fbq() call found (should use GTM).');

  // dataLayer events use correct names
  const eventNames = ['form_start', 'form_validation_error', 'form_submit_error', 'generate_lead',
    'phone_click', 'sms_click', 'email_click', 'cta_click', 'whm_shop_click', 'scroll_depth', 'engaged_time'];
  const srcFiles = filesIn(resolve('src'), '.ts').concat(filesIn(resolve('src'), '.astro'));
  const srcContent = srcFiles.map((path) => readFileSync(path, 'utf8')).join('\n');

  for (const name of eventNames) {
    report(srcContent.includes(`'${name}'`), `Event "${name}" not found in source code.`);
  }

  // No old event names
  report(!srcContent.includes("'lead_form_start'"), 'Old event name "lead_form_start" still in source.');
  report(!srcContent.includes("'lead_form_validation_error'"), 'Old event name "lead_form_validation_error" still in source.');
  report(!srcContent.includes("'lead_form_submit_error'"), 'Old event name "lead_form_submit_error" still in source.');
  report(!srcContent.includes("whm:analytics"), 'Old custom event "whm:analytics" still in source.');

  // Cookie settings link is a button, not an anchor
  report(indexHtml.includes('<button type="button" id="cookie-settings-link"'), 'Production: cookie settings should be a button element.');
  report(!indexHtml.includes('onclick='), 'Production: inline onclick found.');

  // whm_consent_v3 (not v2)
  report(srcContent.includes('whm_consent_v3'), 'Consent key whm_consent_v3 not found in source.');
  report(!srcContent.includes("'whm_consent_v2'"), 'Old consent key whm_consent_v2 still referenced in source.');

  // whm_campaign_v3 (not v2)
  report(srcContent.includes('whm_campaign_v3'), 'Campaign key whm_campaign_v3 not found in source.');
  report(!srcContent.includes("'whm_campaign_v2'"), 'Old campaign key whm_campaign_v2 still referenced in source.');

  // CTA tracking coverage
  const ctaClickCount = (allHtml.match(/data-cta-click/g) || []).length;
  warn(ctaClickCount >= 20, `Only ${ctaClickCount} data-cta-click attributes found (expected 20+).`);

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
}

// Output
if (warnings.length) {
  console.log(`Warnings:\n- ${warnings.join('\n- ')}`);
}
if (failures.length) {
  console.error(`Analytics validation failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
const mode = isProductionBuild ? 'production' : 'staging';
console.log(`Analytics validation passed (${mode} build): consent model, events, attribution OK.`);
