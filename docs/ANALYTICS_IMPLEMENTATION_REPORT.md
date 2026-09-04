# Raport wdrożenia analityki - WHM Przeprowadzki

Data: 2026-09-04 (ostatni szlif: 2026-09-04)

## 1. Model zgód

- Consent Mode v2 Basic - domyślnie `denied` dla `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`.
- `security_storage: granted` od początku.
- Trzy kategorie w banerze: Niezbędne (zawsze aktywne, zablokowane), Analityczne (domyślnie odznaczone), Marketingowe (domyślnie odznaczone).
- Klucz przechowywania: `whm_consent_v3` w `localStorage` z fallback do pamięci (in-memory).
- Wersjonowanie: wersja 3 - starsze klucze (v2 i starsze) ignorowane, baner pojawia się ponownie.

## 2. Ładowanie GTM

- GTM ładowany **wyłącznie** po udzieleniu przynajmniej jednej zgody opcjonalnej.
- `gtm.start` pushowany do `dataLayer` **PRZED** `appendChild` skryptu.
- Loader idempotentny - atrybut `data-whm-gtm` zapobiega duplikowaniu skryptu.
- Noscript iframe GTM **usunięty** - omijał model zgód.
- Na stagingu lub bez `PUBLIC_GTM_ID`: zerowy output.

## 3. Reload przy zmianie kategorii

- **Każda** zmiana kategorii po załadowaniu GTM (`document.querySelector('script[data-whm-gtm]')`) powoduje `window.location.reload()`.
- Pierwsza decyzja (brak GTM w DOM) **nigdy** nie przeładowuje.
- Gwarantuje usunięcie tagów Meta Pixel / GA4 / Ads po odwołaniu ich kategorii.

## 4. Baner zgód

- Dostępność: `role="dialog"`, `aria-label`, `aria-expanded`, `aria-controls`, focus management, Escape zamyka panel.
- Równorzędne przyciski: „Akceptuję wszystkie" i „Odrzucam wszystkie".
- Panel szczegółowy z checkboxami analitycznymi i marketingowymi.
- Przy ponownym otwarciu panel odtwarza zapisany stan.
- Focus management:
  - Otwarcie panelu → focus na checkbox `#consent-analytics` (nie na div).
  - Zapamiętanie elementu otwierającego (opener) → focus powraca po zamknięciu.
  - Po zapisie → focus na `#main-content` lub `body`.

## 5. Zdarzenia

Wszystkie zdarzenia emitowane przez `pushEvent()` - zwraca `boolean` (`true` jeśli wyemitowane, `false` jeśli zablokowane brakiem zgody).

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
| `scroll_depth` | Wdrożone (25/50/75%) - próg dodawany do `scrollFired` wyłącznie gdy `pushEvent` zwraca `true` |
| `engaged_time` | Wdrożone (15/30/60s) - timer startuje dopiero po udzieleniu zgody; czas przed zgodą nie jest liczony |

Stare nazwy (`lead_form_start`, `lead_form_validation_error`, `lead_form_submit_error`) i mechanizm (`whm:analytics` custom event + gtag) **usunięte**.

## 6. Atrybucja kampanii

- Klucz: `whm_campaign_v3` w `sessionStorage`.
- Parametry przechowywane w pamięci; zapis do storage dopiero po zgodzie.
- Formularz zawiera ukryte pola `ft_*` i `lt_*` dla 16 parametrów (utm_source/medium/campaign/term/content, gclid, gbraid, wbraid, fbclid, campaignid, adgroupid, creative, device, network, matchtype, keyword).
- Walidacja: max 200 znaków, dozwolone `\w.~%+-`.
- Odrzucenie zgód: dane kampanii usunięte z `sessionStorage`.

## 7. Stopka - link do ustawień

- Inline `onclick` **usunięty** - zastąpiony `<button>` z event listenerem.
- Na stagingu: przycisk **całkowicie niewidoczny** (nie renderowany).
- Komunikacja przez `CustomEvent('whm:open-cookie-settings')`.

## 8. Polityka prywatności

- Sekcja „Analityka, pomiar reklam i pliki cookies" zaktualizowana: GTM jako warstwa zarządzania, trzy kategorie, `whm_consent_v3`.
- Nowa sekcja „Atrybucja kampanii": `whm_campaign_v3`, warunki zapisu.
- Sekcja „Dostawcy usług" rozróżnia GTM/GA4/Ads/Meta Pixel/EmailJS.
- `privacyPolicyFinalized` ustawione na `false` - ostrzeżenie deweloperskie aktywne do ostatecznej weryfikacji prawnej.

## 9. Tagowanie CTA

- 40+ elementów z `data-cta-click` i `data-cta-location` na wszystkich stronach.
- Lokalizacje: `header`, `header-mobile`, `top-bar`, `hero`, `subpage-hero`, `service_body`, `form-section`, `final-cta`, `sticky-cta`, `case-study-sales`, `home-hero`, `home-b2b`, `home-special-transport`, `home-final`, `about-final`, `area-final`, `cases-final`, `cases-technical`, `how-it-works`, `packing-shop`, `packing-final`, `standard-whm-final`, `piano-final`, `specialist-final`, `services-b2b`, `shop-final`, `business-hub-form`, `storage-form`, `packing-form`, `piano-form`, `specialist-form`, `business-form`, `pricing`.

## 10. Walidacja automatyczna

### verify:analytics (statyczny)

- Wykrywa 3 warianty budowania: `staging`, `production-no-gtm`, `production-gtm`.
- Wspólne sprawdzenia: brak GTM iframe, brak bezpośredniego GA4/Meta, brak inline onclick, poprawne nazwy zdarzeń, consent v3, campaign v3, `pushEvent` zwraca boolean, `data-whm-gtm` idempotency guard, `gtm.start` przed `appendChild`.
- Staging: brak banera, brak GTM ID.
- Production: baner, domyślne denied, checkboxy, aria-expanded, ukryte pola formularza, 25+ CTA.
- **Wynik: PASS** (staging + production-gtm z GTM-TEST123).

### verify:seo (statyczny)

- 29 stron HTML, 28 kanonicznych URL-i, sitemap, JSON-LD.
- Staging: akceptuje globalny `noindex, nofollow, noarchive` dla wszystkich stron.
- **Wynik: PASS** (staging + production).

### verify:site (Playwright - pominięty środowiskowo)

- **Status: POMINIĘTY** - wymaga Chromium, który nie jest dostępny w bieżącym środowisku.

## 11. Trzy warianty budowania

| Wariant | `PUBLIC_SITE_ENV` | `PUBLIC_GTM_ID` | Baner | GTM | Zdarzenia | Robots |
|---|---|---|---|---|---|---|
| staging | `staging` | pusty/brak | nie | nie | nie | noindex |
| production-no-gtm | `production` | pusty/brak | nie | nie | nie | index |
| production-gtm | `production` | `GTM-XXXXXXX` | tak | tak (po zgodzie) | tak (po zgodzie) | index |

## 12. Poprawki z fazy „ostatni szlif"

- `applyConsent()` przeładowuje stronę przy **każdej** zmianie kategorii (nie tylko odwołaniu wszystkich).
- `gtm.start` pushowany **przed** `appendChild`.
- In-memory fallback (`memoryState`) gdy `localStorage` niedostępny.
- `pushEvent()` zwraca `boolean` - scroll/time tracking dodaje próg do `fired` wyłącznie po sukcesie.
- `engaged_time` nie liczy czasu sprzed udzielenia zgody.
- Focus management w banerze: focus na checkbox, zapamiętanie openera, powrót focusu.
- 15 brakujących `data-cta-click` dodanych na stronach.
- Literówka `registerredAddress` → `registeredAddress` w schema.ts.
- `PUBLIC_GA4_ID` usunięte z .env.

## 13. Ostrzeżenia

- `/polityka-prywatnosci/` - opis meta ma 80 znaków (zalecane 120-160). Istniejący problem z SEO, niezwiązany z tą zmianą.

## 14. Czynności pozostające do wykonania ręcznie

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
