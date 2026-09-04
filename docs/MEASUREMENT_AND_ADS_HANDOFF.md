# Pomiar i konfiguracja reklam — dokument przekazania

## Zmienne środowiskowe

| Zmienna | Opis | Przykład |
|---|---|---|
| `PUBLIC_SITE_ENV` | `production` lub `staging` | `staging` |
| `PUBLIC_GTM_ID` | Identyfikator Google Tag Manager | `GTM-XXXXXXX` |
| `PUBLIC_EMAILJS_SERVICE_ID` | Klucz usługi EmailJS | `service_xxx` |
| `PUBLIC_EMAILJS_TEMPLATE_ID` | ID szablonu EmailJS | `template_xxx` |
| `PUBLIC_EMAILJS_PUBLIC_KEY` | Klucz publiczny EmailJS | `xxx` |

Pomiar (GTM, baner zgód, zdarzenia) aktywny wyłącznie gdy jednocześnie `PUBLIC_SITE_ENV=production` i `PUBLIC_GTM_ID` pasuje do wzorca `GTM-[A-Z0-9]+`.

## Model zgód (Consent Mode v2 — Basic)

### Trzy kategorie

| Kategoria | Domyślnie | Sygnały Consent Mode |
|---|---|---|
| Niezbędne | aktywne, zablokowane | `security_storage: granted` |
| Analityczne | wyłączone | `analytics_storage` |
| Marketingowe | wyłączone | `ad_storage`, `ad_user_data`, `ad_personalization` |

### Przepływ

1. Przed jakimkolwiek skryptem GTM: `dataLayer.push` z `consent default` — wszystkie sygnały `denied` poza `security_storage: granted`.
2. Baner wyświetla się dopiero na produkcji z ustawionym GTM ID.
3. Użytkownik klika: „Akceptuję wszystkie", „Odrzucam wszystkie" lub konfiguruje w panelu szczegółowym.
4. Po decyzji: `consent update` z nowymi stanami → jeśli przynajmniej jedna kategoria opcjonalna `granted`, GTM ładowany (idempotentnie, raz).
5. Decyzja zapisana w `localStorage` pod kluczem `whm_consent_v3` (wersja 3).
6. **Każda** zmiana kategorii po załadowaniu GTM: aktualizacja consent + `window.location.reload()`. Pierwsza decyzja (brak GTM w DOM) nigdy nie przeładowuje.
7. Zmiana zgód z poziomu stopki: przycisk „Ustawienia cookies" → event `whm:open-cookie-settings`.
8. Na stagingu: brak banera, brak GTM, brak zdarzeń, brak linku w stopce.

## Kontrakt zdarzeń

Wszystkie zdarzenia emitowane przez `pushEvent()` (wrapper na `dataLayer.push`) — zwraca `boolean` (`true` = wyemitowano, `false` = zablokowano brakiem zgody). Emitowane wyłącznie gdy przynajmniej jedna kategoria opcjonalna zaakceptowana.

### Zdarzenia formularza

| Zdarzenie | Kiedy | Parametry |
|---|---|---|
| `form_start` | Pierwsze interakcje z formularzem | `form_id`, `service_type`, `form_location`, `form_context`, `page_path` |
| `form_validation_error` | Nieprawidłowe dane | j.w. + `error_type` |
| `form_submit_error` | Błąd wysyłki EmailJS | j.w. + `error_type` |
| `generate_lead` | Potwierdzony sukces EmailJS | j.w. + `lead_id` |

### Zdarzenia kliknięć (delegowane)

| Zdarzenie | Wyzwalacz | Parametry |
|---|---|---|
| `phone_click` | Kliknięcie `tel:` | `link_location`, `page_path` |
| `sms_click` | Kliknięcie `sms:` | `link_location`, `page_path` |
| `email_click` | Kliknięcie `mailto:` | `link_location`, `page_path` |
| `whm_shop_click` | Kliknięcie linku do whmshop.pl | `link_location`, `page_path` |
| `cta_click` | Kliknięcie elementu z `data-cta-click` | `cta_location`, `cta_target`, `page_path` |

### Zdarzenia zaangażowania

| Zdarzenie | Wyzwalacz | Parametry |
|---|---|---|
| `scroll_depth` | Progi: 25%, 50%, 75% (raz na załadowanie); próg dodany do `fired` wyłącznie gdy `pushEvent` zwraca `true` | `percent`, `page_path` |
| `engaged_time` | Progi: 15s, 30s, 60s aktywnego czasu (okno widoczne + fokus); timer startuje dopiero po zgodzie | `seconds`, `page_path` |

### Zasady

- Żadne PII (imię, telefon, email) nie trafia do dataLayer.
- `cta_target` to ścieżka URL (pathname) bez query string.
- `form_location` to pathname strony.
- `link_location` pochodzi z `data-cta-location`, kontekstowego `data-location`, lub domyślnie z pozycji w DOM (header/hero/footer/form/service_body).

## Atrybucja kampanii

| Klucz | Magazyn | Wygasa |
|---|---|---|
| `whm_campaign_v3` | `sessionStorage` | Koniec sesji |

Parametry z URL (utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, gbraid, wbraid, fbclid, campaignid, adgroupid, creative, device, network, matchtype, keyword) przechowywane w pamięci bieżącej; zapis do `sessionStorage` dopiero po udzieleniu zgody analitycznej lub marketingowej.

Wartości walidowane: max 200 znaków, dozwolone `\w.~%+-`.

Formularz wyceny zawiera ukryte pola `ft_*` (first touch) i `lt_*` (last touch) dla każdego parametru.

## Konfiguracja GTM/GA4/Ads/Meta — odpowiedzialność właściciela

Kod strony **nie** ładuje bezpośrednio GA4, Google Ads ani Meta Pixel. Wszystko odbywa się przez tagi GTM. Właściciel musi skonfigurować:

### GA4

1. Utworzyć property GA4.
2. W GTM dodać tag GA4 Configuration z triggerem „Consent Initialization - Analytics Consent Granted" (warunek: `analytics_storage = granted`).
3. Dodać tagi GA4 Event dla zdarzeń: `generate_lead`, `form_start`, `phone_click`, `cta_click`, `scroll_depth`, `engaged_time`.

### Google Ads

1. W GTM dodać tag Google Ads Conversion z triggerem na `generate_lead` (warunek: `ad_storage = granted`).
2. Dodać tag Google Ads Remarketing z triggerem na All Pages (warunek: `ad_storage = granted`).

### Meta Pixel

1. W GTM dodać tag Meta Pixel Base Code z triggerem na All Pages (warunek: `ad_storage = granted`).
2. Dodać tag Meta Pixel Lead Event z triggerem na `generate_lead`.

### Testowanie

1. Użyj GTM Preview Mode.
2. Sprawdź, że tagi uruchamiają się wyłącznie po udzieleniu odpowiedniej zgody.
3. Zweryfikuj, że po „Odrzucam wszystkie" żadne tagi nie są aktywne.
4. Sprawdź GA4 DebugView, Google Ads Tag Assistant, Meta Pixel Helper.

## Zakazy

- Żadne PII w zdarzeniach dataLayer.
- Żadne `gtag('config', ...)` bezpośrednio w kodzie — wszystko przez GTM.
- Żaden skrypt pomiarowy poza GTM loader nie jest dodawany ręcznie.
- Żadne zdarzenie emitowane bez zgody.
