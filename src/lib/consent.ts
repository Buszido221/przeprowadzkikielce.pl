const STORAGE_KEY = 'whm_consent_v3';
const CURRENT_VERSION = 3;
const GTM_SCRIPT_ATTR = 'data-whm-gtm';

export type ConsentState = {
  version: 3;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

let memoryState: ConsentState | null = null;

function validate(parsed: unknown): ConsentState | null {
  if (
    parsed &&
    typeof parsed === 'object' &&
    (parsed as any).version === CURRENT_VERSION &&
    (parsed as any).necessary === true &&
    typeof (parsed as any).analytics === 'boolean' &&
    typeof (parsed as any).marketing === 'boolean' &&
    typeof (parsed as any).updatedAt === 'string'
  ) {
    return parsed as ConsentState;
  }
  return null;
}

function readStorage(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return validate(JSON.parse(raw));
  } catch {
    return null;
  }
}

function writeStorage(state: ConsentState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full or blocked - memoryState is the fallback
  }
}

function makeState(analytics: boolean, marketing: boolean): ConsentState {
  return {
    version: CURRENT_VERSION,
    necessary: true,
    analytics,
    marketing,
    updatedAt: new Date().toISOString(),
  };
}

export function getSavedConsent(): ConsentState | null {
  return readStorage() ?? memoryState;
}

export function hasDecision(state: ConsentState | null): boolean {
  return state !== null;
}

function consentUpdate(analytics: boolean, marketing: boolean): void {
  const dl = ((window as any).dataLayer = (window as any).dataLayer || []);
  function gtag(..._args: any[]) { dl.push(arguments); }
  gtag('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
  });
}

function isGtmInDom(): boolean {
  return document.querySelector(`script[${GTM_SCRIPT_ATTR}]`) !== null;
}

function loadGtm(gtmId: string): void {
  if (!gtmId || isGtmInDom()) return;
  const dl = ((window as any).dataLayer = (window as any).dataLayer || []);
  dl.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
  s.setAttribute(GTM_SCRIPT_ATTR, '');
  document.head.appendChild(s);
}

export function applyConsent(
  analytics: boolean,
  marketing: boolean,
  gtmId: string,
): ConsentState {
  const prev = getSavedConsent();
  const state = makeState(analytics, marketing);
  memoryState = state;
  writeStorage(state);
  consentUpdate(analytics, marketing);

  if (!analytics && !marketing) {
    try { sessionStorage.removeItem('whm_campaign_v3'); } catch { /* */ }
  }

  const gtmAlreadyLoaded = isGtmInDom();

  if (!gtmAlreadyLoaded && (analytics || marketing) && gtmId) {
    loadGtm(gtmId);
  }

  window.dispatchEvent(new CustomEvent('whm:consent-changed', { detail: state }));

  const changed = prev !== null && (
    prev.analytics !== analytics || prev.marketing !== marketing
  );
  if (changed && gtmAlreadyLoaded) {
    window.location.reload();
  }

  return state;
}

export function restoreConsent(gtmId: string): void {
  const saved = getSavedConsent();
  if (!saved) return;
  memoryState = saved;
  consentUpdate(saved.analytics, saved.marketing);
  if (saved.analytics || saved.marketing) {
    if (gtmId) loadGtm(gtmId);
  }
}

export function isGtmLoaded(): boolean {
  return isGtmInDom();
}

export function pushEvent(
  eventName: string,
  params: Record<string, string | number | boolean>,
): boolean {
  const state = getSavedConsent();
  if (!state || (!state.analytics && !state.marketing)) return false;
  const dl = ((window as any).dataLayer = (window as any).dataLayer || []);
  dl.push({ event: eventName, ...params });
  return true;
}

export function getPagePath(): string {
  return window.location.pathname;
}
