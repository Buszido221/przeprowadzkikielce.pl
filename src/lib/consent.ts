const STORAGE_KEY = 'whm_consent_v3';
const CURRENT_VERSION = 3;

export type ConsentState = {
  version: 3;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

let gtmLoaded = false;

function read(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === 'object' &&
      parsed.version === CURRENT_VERSION &&
      parsed.necessary === true &&
      typeof parsed.analytics === 'boolean' &&
      typeof parsed.marketing === 'boolean' &&
      typeof parsed.updatedAt === 'string'
    ) {
      return parsed as ConsentState;
    }
    return null;
  } catch {
    return null;
  }
}

function write(analytics: boolean, marketing: boolean): ConsentState {
  const state: ConsentState = {
    version: CURRENT_VERSION,
    necessary: true,
    analytics,
    marketing,
    updatedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full or blocked — state lives only in memory this session
  }
  return state;
}

function clear(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function getSavedConsent(): ConsentState | null {
  return read();
}

export function hasAnyOptionalConsent(state: ConsentState | null): boolean {
  return state !== null && (state.analytics || state.marketing);
}

export function hasAnalyticsConsent(state: ConsentState | null): boolean {
  return state !== null && state.analytics;
}

export function hasMarketingConsent(state: ConsentState | null): boolean {
  return state !== null && state.marketing;
}

export function hasDecision(state: ConsentState | null): boolean {
  return state !== null;
}

function consentUpdate(analytics: boolean, marketing: boolean): void {
  const dl = ((window as any).dataLayer = (window as any).dataLayer || []);
  function gtag(..._args: any[]) {
    dl.push(arguments);
  }
  gtag('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
  });
}

function loadGtm(gtmId: string): void {
  if (gtmLoaded) return;
  gtmLoaded = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
  document.head.appendChild(s);
  const dl = ((window as any).dataLayer = (window as any).dataLayer || []);
  dl.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
}

export function initConsentDefaults(): void {
  const dl = ((window as any).dataLayer = (window as any).dataLayer || []);
  function gtag(..._args: any[]) {
    dl.push(arguments);
  }
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    security_storage: 'granted',
  });
}

export function applyConsent(
  analytics: boolean,
  marketing: boolean,
  gtmId: string,
): ConsentState {
  const state = write(analytics, marketing);
  consentUpdate(analytics, marketing);
  if (analytics || marketing) {
    loadGtm(gtmId);
  }
  window.dispatchEvent(new CustomEvent('whm:consent-changed', { detail: state }));
  return state;
}

export function revokeAllConsent(): void {
  consentUpdate(false, false);
  write(false, false);
  try {
    sessionStorage.removeItem('whm_campaign_v3');
  } catch {
    // ignore
  }
  window.dispatchEvent(
    new CustomEvent('whm:consent-changed', {
      detail: { version: CURRENT_VERSION, necessary: true, analytics: false, marketing: false, updatedAt: new Date().toISOString() },
    }),
  );
  if (gtmLoaded) {
    window.location.reload();
  }
}

export function restoreConsent(gtmId: string): void {
  const saved = read();
  if (saved && (saved.analytics || saved.marketing)) {
    consentUpdate(saved.analytics, saved.marketing);
    loadGtm(gtmId);
  }
}

export function isGtmLoaded(): boolean {
  return gtmLoaded;
}

export function pushEvent(
  eventName: string,
  params: Record<string, string | number | boolean>,
): void {
  const state = read();
  if (!state || (!state.analytics && !state.marketing)) return;
  const dl = ((window as any).dataLayer = (window as any).dataLayer || []);
  dl.push({ event: eventName, ...params });
}

export function getPagePath(): string {
  return window.location.pathname;
}
