# Raport wdrożenia analityki — WHM Przeprowadzki

Data: 2026-09-04

## 1. Model zgód

- Consent Mode v2 Basic — domyślnie `denied` dla `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`.
- `security_storage: granted` od początku.
- Trzy kategorie w banerze: Niezbędne (zawsze aktywne, zablokowane), Analityczne (domyślnie odznaczone), Marketingowe (domyślnie odznaczone).
- Klucz przechowywania: `whm_consent_v3` w `localStorage`.
- Wersjonowanie: wersja 3 — starsze klucze (v2 i starsze) ignorowane, baner pojawia się ponownie.

## 2. Ładowanie GTM

- GTM ładowany **wyłącznie** po udzieleniu przynajmniej jednej zgody opcjonalnej.
- Loader idempotentny — wielokrotne wywołanie nie duplikuje skryptu.
- Noscript iframe GTM **usunięty** — omijał model zgód.
- Na stagingu lub bez `PUBLIC_GTM_ID`: zerowy output.

## 3. Baner zgód

- Dostępność: `role="dialog"`, `aria-label`, `aria-expanded`, `aria-controls`, focus management, Escape zamyka panel.
- Równorzędne przyciski: „Akceptuję wszystkie" i „Odrzucam wszystkie".
- Panel szczegółowy z checkboxami analitycznymi i marketingowymi.
- Przy ponownym otwarciu panel odtwarza zapisany stan.

## 4. Zdarzenia

Wszystkie zdarzenia emitowane przez `dataLayer.push()` z kontrolowanymi parametrami bez PII.

| Zdarzenie | Status |
|---|---|
| `form_start` | Wdrożone |
| `form_validation_error` | Wdrożone |
| `form_submit_error` | Wdrożone |
| `generate_lead` | Wdrożone (po potwierdzeniu sukcesu EmailJS) |
| `phone_click` | Wdrożone |
| `sms_click` | Wdrożone |
| `email_click` | Wdrożone |
| `cta_click` | Wdrożone |
| `whm_shop_click` | Wdrożone |
| `scroll_depth` | Wdrożone (25/50/75/100%) |
| `engaged_time` | Wdrożone (15/30/60s) |

Stare nazwy (`lead_form_start`, `lead_form_validation_error`, `lead_form_submit_error`) i mechanizm (`whm:analytics` custom event + gtag) **usunięte**.

## 5. Atrybucja kampanii

- Klucz: `whm_campaign_v3` w `sessionStorage`.
- Parametry przechowywane w pamięci; zapis do storage dopiero po zgodzie.
- Formularz zawiera ukryte pola `ft_*` i `lt_*` dla 16 parametrów (utm_source/medium/campaign/term/content, gclid, gbraid, wbraid, fbclid, campaignid, adgroupid, creative, device, network, matchtype, keyword).
- Walidacja: max 200 znaków, dozwolone `\w.~%+-`.
- Odrzucenie zgód: dane kampanii usunięte z `sessionStorage`.

## 6. Stopka — link do ustawień

- Inline `onclick` **usunięty** — zastąpiony `<button>` z event listenerem.
- Na stagingu: przycisk **całkowicie niewidoczny** (nie renderowany).
- Komunikacja przez `CustomEvent('whm:open-cookie-settings')`.

## 7. Polityka prywatności

- Sekcja „Analityka, pomiar reklam i pliki cookies" zaktualizowana: GTM jako warstwa zarządzania, trzy kategorie, `whm_consent_v3`.
- Nowa sekcja „Atrybucja kampanii": `whm_campaign_v3`, warunki zapisu.
- Sekcja „Dostawcy usług" rozróżnia GTM/GA4/Ads/Meta Pixel/EmailJS.
- `privacyPolicyFinalized` ustawione na `false` — ostrzeżenie deweloperskie aktywne do ostatecznej weryfikacji prawnej.

## 8. Tagowanie CTA

- 36+ elementów z `data-cta-click` i `data-cta-location`.
- Lokalizacje: `header`, `header-mobile`, `top-bar`, `hero`, `subpage-hero`, `service_body`, `form-section`, `final-cta`, `sticky-cta`, `case-study-sales`, `home-hero`, `home-final`, `about-final`, `area-final`, `cases-final`, `how-it-works`, `packing-final`, `standard-whm-final`, `piano-final`, `specialist-final`, `business-hub-form`, `storage-form`, `packing-form`, `piano-form`, `specialist-form`, `business-form`, `pricing`.

## 9. Walidacja automatyczna

### verify:seo (statyczny)

- 29 stron HTML, 28 kanonicznych URL-i, sitemap, JSON-LD.
- Staging: akceptuje globalny `noindex, nofollow, noarchive` dla wszystkich stron.
- **Wynik: PASS** (staging + production).

### verify:analytics (statyczny)

- Staging: brak GTM loadera, iframe, banera, cookie-settings-link.
- Production: obecność banera, domyślne `denied`, poprawne nazwy zdarzeń, brak starych nazw, consent v3, campaign v3, ukryte pola formularza, brak inline onclick.
- **Wynik: PASS** (staging + production z GTM-TEST123).

### verify:site (Playwright — pominięty środowiskowo)

- Testy przeglądarkowe aktualizowane do `whm_consent_v3` i `marketing` (zamiast `ads`).
- **Status: POMINIĘTY** — wymaga Chromium, który nie jest dostępny w bieżącym środowisku.

## 10. Środowisko stagingowe

- Brak GTM loadera i iframe.
- Brak banera zgód.
- Brak zdarzeń pomiarowych.
- Brak linku „Ustawienia cookies" w stopce.
- `noindex, nofollow, noarchive` na wszystkich stronach.

## 11. Środowisko produkcyjne bez GTM ID

- Brak GTM loadera i iframe.
- Brak banera zgód.
- Brak zdarzeń pomiarowych.
- Brak linku „Ustawienia cookies" w stopce.
- Robots z rejestru SEO (production defaults).

## 12. Ostrzeżenia

- `/polityka-prywatnosci/` — opis meta ma 80 znaków (zalecane 120-160). Istniejący problem z SEO, niezwiązany z tą zmianą.
- Literówka `site.registerredAddress` w `src/lib/schema.ts` — nie wpływa na analitykę, ale powinna być naprawiona osobno.

## 13. Czynności pozostające do wykonania ręcznie

| # | Czynność | Odpowiedzialny |
|---|---|---|
| 1 | Wpisać produkcyjny `PUBLIC_GTM_ID` w zmiennych środowiskowych | Właściciel |
| 2 | Skonfigurować GA4 property i tag w GTM | Właściciel |
| 3 | Skonfigurować Google Ads Conversion tag na `generate_lead` | Właściciel |
| 4 | Skonfigurować Meta Pixel Base + Lead Event w GTM | Właściciel |
| 5 | Przetestować GTM Preview Mode: tagi uruchamiają się po zgodzie, nie uruchamiają po odrzuceniu | Właściciel |
| 6 | Zweryfikować Google Tag Assistant, GA4 DebugView, Meta Pixel Helper | Właściciel |
| 7 | Uruchomić `npm run verify:site` na maszynie z Chromium | Dev |
| 8 | Weryfikacja prawna polityki prywatności i ustawienie `privacyPolicyFinalized = true` | Właściciel + prawnik |

## 14. Pliki zmienione

### Nowe pliki
- `src/lib/consent.ts` — centralny moduł zarządzania zgodami
- `scripts/verify-analytics.mjs` — statyczna walidacja analityki

### Przepisane pliki
- `src/components/GtmHead.astro` — Consent Mode defaults, warunkowy GTM
- `src/components/Analytics.astro` — nowy baner 3-kategoryjny
- `src/components/ClientEvents.astro` — delegowane kliknięcia + scroll_depth + engaged_time
- `src/components/CampaignAttribution.astro` — consent-gated capture
- `src/lib/campaign.ts` — consent-gated attribution v3
- `src/scripts/lead-form.ts` — renamed events, dataLayer.push

### Zaktualizowane pliki
- `src/components/Footer.astro` — button zamiast inline onclick, ukryty na staging
- `src/components/Header.astro` — data-cta-click na mobilnych CTA i top-bar
- `src/components/ServiceHero.astro` — data-cta-click na secondary CTA
- `src/components/forms/LeadForm.astro` — dodatkowe ukryte pola kampanii
- `src/layouts/Layout.astro` — Analytics renderowane bez warunku staging
- `src/data/services.ts` — zaktualizowana polityka prywatności
- `src/env.d.ts` — deklaracje GTM i EmailJS
- `scripts/verify-seo.mjs` — staging robots override
- `scripts/verify-site.mjs` — consent v3
- `package.json` — verify:analytics script
- `docs/MEASUREMENT_AND_ADS_HANDOFF.md` — przepisany pod nowy kontrakt

### Strony z dodanymi atrybutami CTA
- `src/pages/jak-to-dziala/index.astro`
- `src/pages/pakowanie-i-zabezpieczanie/index.astro`
- `src/pages/standard-whm/index.astro`
- `src/pages/transport-pianin-i-fortepianow-kielce/index.astro`
- `src/pages/transport-specjalistyczny/index.astro`
