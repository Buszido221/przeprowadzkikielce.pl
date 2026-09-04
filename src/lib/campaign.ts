import { getSavedConsent } from './consent';

const STORAGE_KEY = 'whm_campaign_v3';
const MAX_VALUE_LENGTH = 200;
const SAFE_CHARS = /^[\w.~%+-]*$/;

const ALLOWED_PARAMS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'gclid', 'gbraid', 'wbraid', 'fbclid',
  'campaignid', 'adgroupid', 'creative', 'device', 'network', 'matchtype', 'keyword',
] as const;

export type CampaignParams = Partial<Record<(typeof ALLOWED_PARAMS)[number], string>>;

type CampaignStore = {
  firstTouch: CampaignParams;
  lastTouch: CampaignParams;
};

let inMemoryParams: CampaignParams | null = null;

function sanitize(value: string): string {
  const trimmed = value.trim().slice(0, MAX_VALUE_LENGTH);
  return SAFE_CHARS.test(trimmed) ? trimmed : encodeURIComponent(trimmed).slice(0, MAX_VALUE_LENGTH);
}

export function captureFromUrl(): CampaignParams {
  const params = new URLSearchParams(window.location.search);
  const captured: CampaignParams = {};
  let found = false;
  for (const key of ALLOWED_PARAMS) {
    const val = params.get(key);
    if (val) {
      captured[key] = sanitize(val);
      found = true;
    }
  }
  if (found) {
    inMemoryParams = captured;
    persistIfConsented(captured);
  }
  return captured;
}

function persistIfConsented(params: CampaignParams): void {
  const consent = getSavedConsent();
  if (!consent || (!consent.analytics && !consent.marketing)) return;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    let store: CampaignStore;
    if (raw) {
      const parsed = JSON.parse(raw);
      store = { firstTouch: parsed.firstTouch || {}, lastTouch: params };
    } else {
      store = { firstTouch: params, lastTouch: params };
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // storage blocked
  }
}

export function flushToStorage(): void {
  if (!inMemoryParams) return;
  persistIfConsented(inMemoryParams);
}

export function getCampaignStore(): CampaignStore {
  const consent = getSavedConsent();
  if (!consent || (!consent.analytics && !consent.marketing)) {
    return { firstTouch: {}, lastTouch: {} };
  }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { firstTouch: parsed.firstTouch || {}, lastTouch: parsed.lastTouch || {} };
    }
  } catch {
    // ignore
  }
  return { firstTouch: {}, lastTouch: {} };
}

export function clearCampaignData(): void {
  inMemoryParams = null;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function populateFormFields(form: HTMLFormElement): void {
  const store = getCampaignStore();
  for (const key of ALLOWED_PARAMS) {
    const ftField = form.querySelector<HTMLInputElement>(`input[name="ft_${key}"]`);
    const ltField = form.querySelector<HTMLInputElement>(`input[name="lt_${key}"]`);
    if (ftField) ftField.value = store.firstTouch[key] || '';
    if (ltField) ltField.value = store.lastTouch[key] || '';
  }
}
