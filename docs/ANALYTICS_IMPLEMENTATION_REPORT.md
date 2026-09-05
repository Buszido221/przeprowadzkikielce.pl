# Raport wdrożenia analityki - WHM Przeprowadzki

Data: 2026-09-05 (ostatni szlif: 2026-09-05)

## 1. Model zgód

- Consent Mode v2 Basic - domyślnie `denied` dla `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`.
- `security_storage: granted` od początku.
- Trzy kategorie w banerze: Niezbędne (zawsze aktywne, zablokowane), Analityczne (domyślnie odznaczone), Marketingowe (domyślnie odznaczone).
- Klucz przechowywania: `whm_consent_v3` w `localStorage` z fallback do pamięci (in-memory).
- Wersjonowanie: wersja 3 - starsze klucze (v2 i starsze) ignorowane, baner pojawia się ponownie.

## 2. Architektura analityki

- Strona instaluje **wyłącznie** Google Tag Manager. Produkcyjny kontener to `GTM-5BR37FWX`.
- GA4 (`G-X0K3ND72TV`), Google Ads, Conversion Linker, Meta Pixel oraz zdarzenia niestandardowe są konfigurowane **wewnątrz GTM**, nie w kodzie strony.
- Identyfikator GA4 **nie** jest przechowywany w zmiennych środowiskowych ani ładowany bezpośrednio przez kod strony.
- Kod strony nie ładuje `gtag.js` ani nie wywołuje `gtag('config', ...)`. Zapobiega to podwójnemu rejestrowaniu odsłon i zdarzeń.
- Usunięto komponent `GoogleTag.astro` oraz wszystkie odwołania do `PUBLIC_GA_MEASUREMENT_ID` i `__WHM_GA_ID`.

## 3. Ładowanie GTM

- GTM ładowany **wyłącznie** po udzieleniu przynajmniej jednej zgody opcjonalnej.
- `gtm.start` pushowany do `dataLayer` **PRZED** `appendChild` skryptu.
- Loader idempotentny - atrybut `data-whm-gtm` zapobiega duplikowaniu skryptu.
- Noscript iframe GTM **usunięty** - omijał model zgód.
- Na stagingu lub bez `PUBLIC_GTM_ID`: zerowy output.

## 4. Reload przy zmianie kategorii

- **Każda** zmiana kategorii po załadowaniu GTM (`document.querySelector('script[data-whm-gtm]')`) powoduje `window.location.reload()`.
- Pierwsza decyzja (brak GTM w DOM) **nigdy** nie przeładowuje.
- Gwarantuje usunięcie tagów Meta Pixel / GA4 / Ads po odwołaniu ich kategorii.

## 5. Baner zgód

- Dostępność: `role="dialog"`, `aria-label`, `aria-expanded`, `aria-controls`, focus management, Escape zamyka panel.
- Równorzędne przyciski: "Akceptuję wszystkie" i "Odrzucam wszystkie".
- Panel szczegółowy z checkboxami analitycznymi i marketingowymi.
- Przy ponownym otwarciu panel odtwarza zapisany stan.
- Focus management:
  - Otwarcie panelu -> focus na checkbox `#consent-analytics` (nie na div).
  - Zapamiętanie elementu otwierającego (opener) -> focus powraca po zamknięciu.
  - Po zapisie -> focus na `#main-content` lub `body`.
- Baner widoczny wyłącznie gdy `PUBLIC_SITE_ENV=production` i `PUBLIC_GTM_ID` jest prawidłowym identyfikatorem GTM.

## 6. Zdarzenia

Wszystkie zdarzenia emitowane przez `pushEvent()` - zwraca `boolean` (`true` jeśli wyemitowane, `false` jeśli zablokowane brakiem zgody). Zdarzenia trafiają wyłącznie do `dataLayer`. Kod strony nie wysyła ich bezpośrednio do GA4, Google Ads ani Meta Pixel.

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

Brak PII w `dataLayer`: imię, nazwisko, telefon, email, wiadomość klienta ani treść formularza nie są przesyłane.

## 7. Atrybucja kampanii

- Klucz: `whm_campaign_v3` w `sessionStorage`.
- Parametry przechowywane w pamięci; zapis do storage dopiero po zgodzie.
- Formularz zawiera ukryte pola `ft_*` i `lt_*` dla 16 parametrów (utm_source/medium/campaign/term/content, gclid, gbraid, wbraid, fbclid, campaignid, adgroupid, creative, device, network, matchtype, keyword).
- Walidacja: max 200 znaków, dozwolone `\w.~%+-`.
- Odrzucenie zgód: dane kampanii usunięte z `sessionStorage`.

## 8. Stopka - link do ustawień

- Inline `onclick` **usunięty** - zastąpiony `<button>` z event listenerem.
- Na stagingu: przycisk **całkowicie niewidoczny** (nie renderowany).
- Komunikacja przez `CustomEvent('whm:open-cookie-settings')`.

## 9. Polityka prywatności

- Sekcja "Analityka, pomiar reklam i pliki cookies" zaktualizowana: GTM jako warstwa zarządzania, trzy kategorie, `whm_consent_v3`.
- Nowa sekcja "Atrybucja kampanii": `whm_campaign_v3`, warunki zapisu.
- Sekcja "Dostawcy usług" rozróżnia GTM/GA4/Ads/Meta Pixel/EmailJS.
- `privacyPolicyFinalized` ustawione na `false` - ostrzeżenie deweloperskie aktywne do ostatecznej weryfikacji prawnej.

## 10. Tagowanie CTA

- 40+ elementów z `data-cta-click` i `data-cta-location` na wszystkich stronach.
- Lokalizacje: `header`, `header-mobile`, `top-bar`, `hero`, `subpage-hero`, `service_body`, `form-section`, `final-cta`, `sticky-cta`, `case-study-sales`, `home-hero`, `home-b2b`, `home-special-transport`, `home-final`, `about-final`, `area-final`, `cases-final`, `cases-technical`, `how-it-works`, `packing-shop`, `packing-final`, `standard-whm-final`, `piano-final`, `specialist-final`, `services-b2b`, `shop-final`, `business-hub-form`, `storage-form`, `packing-form`, `piano-form`, `specialist-form`, `business-form`, `pricing`.

## 11. Walidacja automatyczna

### verify:analytics (statyczny)

- Wykrywa 3 warianty budowania: `staging`, `production-no-gtm`, `production-gtm`.
- Sprawdza: brak `PUBLIC_GA_MEASUREMENT_ID` w kodzie, brak `__WHM_GA_ID`, brak bezpośredniego `gtag/js`, brak `gtag('config', 'G-...')`, brak komponentu `GoogleTag.astro`, obecność `PUBLIC_GTM_ID`, obecność domyślnych stanów Consent Mode, obecność zabezpieczenia `data-whm-gtm`, brak `data-whm-ga`, brak GTM w staging, brak GTM w produkcji bez poprawnego ID, obecność poprawnego GTM w produkcji z poprawnym ID, brak błędnych identyfikatorów (`GTM-5BR37FW` bez `X`, `G-X0K3ND72TVX`).
- **Wynik: PASS** (production-gtm z `GTM-5BR37FWX`).

### verify:seo (statyczny)

- 29 stron HTML, 28 kanonicznych URL-i, sitemap, JSON-LD.
- Staging: akceptuje globalny `noindex, nofollow, noarchive` dla wszystkich stron.
- **Wynik: PASS** (staging + production).

### verify:site (Playwright - pominięty srodowiskowo)

- **Status: POMINIĘTY** - wymaga Chromium, ktory nie jest dostępny w bieżącym środowisku.

## 12. Trzy warianty budowania

| Wariant | `PUBLIC_SITE_ENV` | `PUBLIC_GTM_ID` | Baner | GTM | Zdarzenia | Robots |
|---|---|---|---|---|---|---|
| staging | `staging` | pusty/brak | nie | nie | nie | noindex |
| production-no-gtm | `production` | pusty/brak | nie | nie | nie | index |
| production-gtm | `production` | `GTM-5BR37FWX` | tak | tak (po zgodzie) | tak (po zgodzie) | index |

## 13. Basic Consent Mode a automatyczny tester Google

- Strona pozostaje na Basic Consent Mode: GTM jest ładowany dopiero po decyzji użytkownika.
- Automatyczny tester Google (np. Consent Mode Validator) może nie wykryć tagu GTM przed zaakceptowaniem cookies, ponieważ skrypt nie jest jeszcze pobrany.
- Nie próbujemy obchodzić tego przez ładowanie GTM przed zgodą.
- Test końcowy należy wykonać przez GTM Preview i GA4 DebugView po zaakceptowaniu analityki.

## 14. Ostrzeżenia

- `/polityka-prywatnosci/` - opis meta ma 80 znaków (zalecane 120-160). Istniejący problem z SEO, niezwiązany z tą zmianą.

## 15. Czynności pozostające do wykonania ręcznie

| # | Czynność | Odpowiedzialny |
|---|---|---|
| 1 | Otworzyć kontener `GTM-5BR37FWX` | Właściciel |
| 2 | Utworzyć w nim Google tag z identyfikatorem `G-X0K3ND72TV` | Właściciel |
| 3 | Skonfigurować tagi zdarzeń GA4 | Właściciel |
| 4 | Skonfigurować wymagane zgody dla tagów | Właściciel |
| 5 | Uruchomić GTM Preview | Właściciel |
| 6 | Zaakceptować analitykę na stronie testowej | Właściciel |
| 7 | Sprawdzić GA4 DebugView | Właściciel |
| 8 | Opublikować kontener GTM | Właściciel |
| 9 | Po konfiguracji wykonać produkcyjny deploy strony | Właściciel |
