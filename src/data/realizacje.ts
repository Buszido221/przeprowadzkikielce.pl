export interface CaseStudySection {
  heading: string;
  paragraphs: string[];
}


export interface CaseStudyRelatedLink {
  label: string;
  href: string;
  text: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  lead: string;
  heroImage: string;
  heroAlt: string;
  category: string;
  facts: string[];
  sections: CaseStudySection[];
  conclusionHeading: string;
  conclusionText: string;
  relatedServices: CaseStudyRelatedLink[];
  relatedRealizacje: { label: string; href: string }[];
  salesHeading: string;
  salesText: string;
  datePublished?: string;
  dateModified?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: '/realizacje/relokacja-prokuratur-kielce/',
    title: 'Relokacja prokuratur w Kielcach | Realizacja WHM',
    description: 'Pięć kondygnacji i piwnica z archiwami, ponad stu pracowników i około dwa miesiące prac. Zobacz relokację kieleckich prokuratur przeprowadzoną przez WHM.',
    eyebrow: 'Relokacja instytucji publicznej',
    heading: 'Dwie prokuratury, pięć kondygnacji i piwnica z archiwami',
    lead: 'Przeprowadzka Prokuratur Rejonowych Kielce-Wschód i Kielce-Zachód obejmowała wyposażenie ponad stu pracowników. Przez około dwa miesiące WHM przenosiło mienie do lokalizacji tymczasowej na czas remontu, a instytucje kontynuowały pracę.',
    heroImage: '/images/realizacje/prokuratury-kielce/przeprowadzka-prokuratury-1.webp',
    heroAlt: 'Relokacja wyposażenia Prokuratury realizowana przez zespół WHM',
    category: 'Firmy i instytucje',
    facts: [
      'Dwie prokuratury w Kielcach.',
      'Pięć kondygnacji oraz piwnica z archiwami.',
      'Wyposażenie ponad stu pracowników.',
      'Archiwum liczone w kilometrach bieżących akt.',
      'Dziesiątki szaf i komputerów.',
      'Około dwóch miesięcy pracy etapowej.',
    ],
    sections: [
      {
        heading: 'Budynek miał zostać opróżniony, a praca instytucji trwała dalej',
        paragraphs: [
          'Do przewiezienia było wyposażenie stanowisk, meble i dokumentacja. Każdy element miał swoje miejsce w organizacji: należał do określonej osoby, pomieszczenia lub części archiwum. Po przeniesieniu musiał trafić tam, gdzie będzie ponownie potrzebny.',
          'Dlatego przygotowanie obejmowało kolejność prac i poprawne rozdysponowanie mienia w lokalizacji tymczasowej. Sam transport stanowił część większego zadania - udostępnienia wyposażenia w sposób pozwalający kontynuować obowiązki instytucji.',
        ],
      },
      {
        heading: 'Relokacja rozłożona na kolejne etapy',
        paragraphs: [
          'Zespół pracował regularnie przez około dwa miesiące. Przenoszenie kolejnych części wyposażenia podporządkowano działaniu prokuratur. Kontrolowano pochodzenie rzeczy, miejsce docelowe oraz kolejność ich wynoszenia i dostarczania.',
          'Taki sposób organizacji wymagał konsekwencji każdego dnia. Mienie z kolejnego etapu musiało trafić do odpowiedniej przestrzeni, a jego transport nie powinien utrudniać pracy przy pozostałej części budynku.',
        ],
      },
      {
        heading: 'Archiwum wymagało zachowania układu',
        paragraphs: [
          'Dokumentacja w piwnicy stanowiła osobną część projektu. Liczyła się kompletność, kolejność i możliwość odnalezienia akt po przeprowadzce. Równolegle zespół przenosił szafy, komputery i wyposażenie z pięciu kondygnacji.',
          'Organizacja wynoszenia wpływała na kolejność załadunku, a ta na rozładunek i rozmieszczenie. Przy takiej skali dobrze przygotowany plan oszczędzał dodatkowego przestawiania i szukania rzeczy po transporcie.',
        ],
      },
      {
        heading: 'Rezultat',
        paragraphs: [
          'Wyposażenie objęte zleceniem zostało wyniesione, przewiezione i rozdysponowane w lokalizacji tymczasowej. Instytucje zachowały ciągłość działania podczas relokacji.',
          'Ta realizacja pokazuje doświadczenie WHM w długotrwałej, etapowej pracy z dużą ilością dokumentacji i wyposażenia. Dla klienta oznacza to partnera, który potrafi połączyć transport z potrzebami działającej organizacji.',
        ],
      },
    ],
    conclusionHeading: 'Rezultat',
    conclusionText: 'Wyposażenie objęte zleceniem zostało wyniesione, przewiezione i rozdysponowane w lokalizacji tymczasowej. Instytucje zachowały ciągłość działania podczas relokacji.',
    relatedServices: [
      { label: 'Przeprowadzki firm i instytucji', href: '/przeprowadzki-firm-i-instytucji/', text: 'Pełny proces relokacji biur, urzędów i instytucji.' },
      { label: 'Oferta dla firm', href: '/dla-firm/', text: 'Planowanie i realizacja relokacji dla firm i instytucji.' },
      { label: 'Pakowanie i zabezpieczanie', href: '/pakowanie-i-zabezpieczanie/', text: 'Materiały, oznaczanie i przygotowanie mienia do transportu.' },
    ],
    relatedRealizacje: [
      { label: 'Relokacja TVP3 Kielce', href: '/realizacje/relokacja-tvp3-kielce/' },
      { label: 'Biblioteka w Busku-Zdroju', href: '/realizacje/relokacja-biblioteki-busko-zdroj/' },
      { label: 'Relokacja teatru', href: '/realizacje/relokacja-teatru-zeromskiego-kielce/' },
    ],
    salesHeading: 'Twoja instytucja potrzebuje przeprowadzki etapowej?',
    salesText: 'Omówimy zakres, terminy i sposób przygotowania dokumentów oraz wyposażenia. Przy większym projekcie zaczniemy od bezpłatnych oględzin.',
  },
  {
    slug: '/realizacje/relokacja-teatru-zeromskiego-kielce/',
    title: 'Relokacja Teatru Żeromskiego w Kielcach | WHM',
    description: 'Niemal 50 pełnych transportów i kilka lokalizacji. Zobacz, jak WHM przeniosło zasoby Teatru im. Stefana Żeromskiego do odnowionej siedziby.',
    eyebrow: 'Relokacja instytucji kultury',
    heading: 'Powrót Teatru im. Stefana Żeromskiego do historycznej siedziby',
    lead: 'Po wieloletnim remoncie wyposażenie teatru trzeba było zebrać z kilku miejsc w Kielcach. WHM odpowiadało za przewiezienie scenografii, kostiumów, techniki, biblioteki, dwóch fortepianów i pozostałego mienia do odnowionego budynku.',
    heroImage: '/images/realizacje/teatr-zeromskiego/relokacja-teatru-1.webp',
    heroAlt: 'Relokacja wyposażenia Teatru im. Żeromskiego przez WHM',
    category: 'Kultura i dzieła sztuki',
    facts: [
      'Kilka lokalizacji początkowych w Kielcach.',
      'Niemal 50 przejazdów pełnych samochodów w głównych etapach i kursach pomiędzy nimi.',
      'Dwa fortepiany.',
      'Około 4–5 transportów samych kostiumów.',
      'Trzy samochody wykorzystywane podczas tej realizacji.',
      'Współpraca z osobami koordynującymi relokację po stronie teatru.',
    ],
    sections: [
      {
        heading: 'Kilka miejsc odbioru i jeden wspólny harmonogram',
        paragraphs: [
          'Na czas remontu różne części teatru korzystały z odrębnych przestrzeni. Zasoby znajdowały się między innymi w Wojewódzkim Domu Kultury oraz innych lokalizacjach bibliotecznych i magazynowych. Scenografia również była rozproszona.',
          'Przeprowadzka wymagała więc uzgodnienia odbiorów wielu rodzajów mienia i dostarczenia ich do właściwych części nowej siedziby. Krótkie odległości w mieście nie zmniejszały liczby załadunków, rozładunków i decyzji organizacyjnych.',
        ],
      },
      {
        heading: 'Różnorodne wyposażenie wymagało różnego przygotowania',
        paragraphs: [
          'Scenografia, kostiumy, gabloty i instrumenty nie mogły być traktowane jednakowo. Część przedmiotów zajmowała dużo miejsca ze względu na kształt, inne wymagały szczególnej ochrony powierzchni lub konstrukcji.',
          'Zakres obejmował również wyposażenie akustyczne i oświetleniowe, pralnię, historyczne elementy wyposażenia i zasoby poszczególnych działów. Same kostiumy zajęły około czterech lub pięciu pełnych transportów.',
        ],
      },
      {
        heading: 'Flota i zespół w ciągłej pracy',
        paragraphs: [
          'Podczas projektu korzystano z trzech dużych samochodów o łącznej kubaturze szacowanej na około 60–65 m³. W największych etapach oraz kursach między nimi wykonano niemal 50 przejazdów pełnych pojazdów.',
          'Intensywne dni pracy trwały około 9–10 godzin. Kolejność dostaw uzgadniano z przedstawicielami teatru, uwzględniając dostęp do pomieszczeń i potrzeby poszczególnych działów.',
        ],
      },
      {
        heading: 'Wprowadzenie mienia do odnowionego obiektu',
        paragraphs: [
          'Nowa infrastruktura teatru, w tym windy i zaplecze sceniczne, wpływała na sposób transportu wewnątrz budynku. Praca wymagała kontroli tras oraz dbałości o świeżo wykończone przestrzenie.',
          'Zadaniem zespołu było doprowadzenie wyposażenia do właściwego miejsca. Dobrze zaplanowane odbiory i dostawy pomagały utrzymać porządek przy dużej liczbie równoległych prac.',
        ],
      },
    ],
    conclusionHeading: 'Rezultat',
    conclusionText: 'Rozproszone zasoby trafiły do odnowionej historycznej siedziby teatru. WHM połączyło dziesiątki transportów i wiele kategorii wyposażenia w skoordynowaną relokację wspierającą powrót instytucji do budynku.',
    relatedServices: [
      { label: 'Przeprowadzki firm i instytucji', href: '/przeprowadzki-firm-i-instytucji/', text: 'Pełny proces relokacji biur, urzędów i instytucji.' },
      { label: 'Dla firm', href: '/dla-firm/', text: 'Planowanie i realizacja relokacji.' },
      { label: 'Pianina i fortepiany', href: '/transport-pianin-i-fortepianow-kielce/', text: 'Transport instrumentów.' },
    ],
    relatedRealizacje: [
      { label: 'Relokacja prokuratur', href: '/realizacje/relokacja-prokuratur-kielce/' },
      { label: 'Fortepiany w Zamku Szydłowieckich', href: '/realizacje/transport-fortepianow-zamek-szydlowieckich/' },
      { label: 'Transport Fazioli', href: '/realizacje/transport-fortepianu-fazioli/' },
    ],
    salesHeading: 'Kilka lokalizacji i wiele rodzajów wyposażenia? Przygotujmy wspólny plan.',
    salesText: 'Omówimy organizację odbioru, transportu i dostarczenia mienia do nowej siedziby.',
  },
  {
    slug: '/realizacje/relokacja-tvp3-kielce/',
    title: 'Relokacja TVP3 Kielce i archiwum | WHM',
    description: 'Niemal 8000 pozycji archiwum i prace przy zapleczu studia. Poznaj relokację TVP3 Kielce z oznaczeniami i odtworzeniem układu materiałów przez WHM.',
    eyebrow: 'Archiwum i wyposażenie techniczne',
    heading: 'TVP3 Kielce: archiwum przeniesione z zachowaniem jego układu',
    lead: 'Relokacja obejmowała niemal 8 tysięcy pozycji archiwum, wyposażenie studia i demontaż realizatorni. WHM przygotowało system pozwalający odtworzyć uporządkowane materiały w nowej siedzibie, a równolegle zajęło się uzgodnionymi pracami w starej przestrzeni.',
    heroImage: '/images/realizacje/tvp3-kielce/relokacja-tvp-kielce.webp',
    heroAlt: 'Relokacja wyposażenia i archiwum TVP3 Kielce przez WHM',
    category: 'Archiwa i księgozbiory',
    facts: [
      'Niemal 8000 pozycji archiwum.',
      'Ponad 20 lat materiałów informacyjnych.',
      'Układ chronologiczny oraz alfabetyczny.',
      'Odtworzenie rozmieszczenia z dokładnością do półki.',
      'Przygotowanie zachowanego wyposażenia studia.',
      'Demontaż realizatorni i podłogi technicznej w sąsiedztwie czynnych instalacji.',
    ],
    sections: [
      {
        heading: 'Materiały miały pozostać łatwe do odnalezienia',
        paragraphs: [
          'Archiwum tworzyły między innymi codzienne wydania wiadomości ułożone chronologicznie oraz programy oddziału uporządkowane alfabetycznie. Przeniesienie zbioru musiało zachować oba systemy.',
          'WHM powiązało oznaczenia opakowań z kolejnością transportu i rozładunku. Pojemniki z materiałami chronologicznymi opisywano datami, a pozostałe odpowiednimi oznaczeniami literowymi.',
        ],
      },
      {
        heading: 'Planowanie układu w nowej siedzibie',
        paragraphs: [
          'W miejscu docelowym oba zbiory miały znaleźć się w jednej przestrzeni. Trzeba było wcześniej ustalić, gdzie kończy się pierwsza część archiwum, a zaczyna kolejna.',
          'Przygotowane obliczenia i system oznaczeń pozwoliły odtworzyć układ z dokładnością do półki. Po przewiezieniu materiałów zachowano porządek potrzebny do ich dalszego użytkowania.',
        ],
      },
      {
        heading: 'Wyposażenie studia: zachować, przygotować lub usunąć',
        paragraphs: [
          'Stare studio obejmowało elementy o różnym przeznaczeniu. Część kierowano do kontenerów wielkogabarytowych zamówionych przez klienta. Duże szklane stoły miały zostać zachowane i trafić do Olsztyna.',
          'WHM zniosło i zabezpieczyło stoły oraz przygotowało je do odbioru. Dalszy przewóz do Olsztyna wykonał zewnętrzny przewoźnik klienta.',
        ],
      },
      {
        heading: 'Prace przy realizatorni',
        paragraphs: [
          'Podłoga techniczna była podniesiona o około 30–40 cm. Pod nią znajdowało się około 12 km przewodów różnego rodzaju. Część instalacji oznaczono jako czynną i należało ją pozostawić nienaruszoną.',
          'Demontaż prowadzono z uwzględnieniem oznaczeń oraz podziału elementów przeznaczonych do usunięcia i zachowania. Wymagało to rozróżnienia czynności na każdym etapie, mimo że prace odbywały się w jednym pomieszczeniu.',
        ],
      },
    ],
    conclusionHeading: 'Rezultat',
    conclusionText: 'Archiwum zostało przeniesione z zachowaniem układu. Wyposażenie studia przygotowano zgodnie z jego dalszym przeznaczeniem, a realizatornię zdemontowano bez naruszenia czynnych wiązek.',
    relatedServices: [
      { label: 'Przeprowadzki firm i instytucji', href: '/przeprowadzki-firm-i-instytucji/', text: 'Pełny proces relokacji.' },
      { label: 'Pakowanie i zabezpieczanie', href: '/pakowanie-i-zabezpieczanie/', text: 'Materiały i przygotowanie.' },
      { label: 'Transport specjalistyczny', href: '/transport-specjalistyczny/', text: 'Transport wyposażenia technicznego.' },
    ],
    relatedRealizacje: [
      { label: 'Biblioteka w Busku-Zdroju', href: '/realizacje/relokacja-biblioteki-busko-zdroj/' },
      { label: 'Relokacja prokuratur', href: '/realizacje/relokacja-prokuratur-kielce/' },
      { label: 'Relokacje techniczne', href: '/realizacje/relokacje-techniczne-i-ciezkie-ladunki/' },
    ],
    salesHeading: 'Dokumenty i materiały mają zachować porządek po przeprowadzce. Zaplanujmy to wcześniej.',
    salesText: 'Omówimy relokację archiwum lub dokumentacji z uwzględnieniem potrzeb Twojej organizacji.',
  },
  {
    slug: '/realizacje/relokacja-biblioteki-busko-zdroj/',
    title: 'Relokacja biblioteki w Busku-Zdroju | WHM',
    description: 'Około 40 000 pozycji, prawie 300 pojemników i niespełna pięć dni na prace. Zobacz relokację biblioteki w Busku-Zdroju wykonaną przez WHM.',
    eyebrow: 'Relokacja księgozbioru',
    heading: 'Około 40 tysięcy pozycji i porządek zachowany po przeprowadzce',
    lead: 'Relokacja filii Pedagogicznej Biblioteki Wojewódzkiej odbywała się między dwiema lokalizacjami w Busku-Zdroju. WHM przeniosło księgozbiór i wyposażenie placówki, wykorzystując rotacyjny obieg pojemników oraz transport zsynchronizowany z pakowaniem i rozkładaniem materiałów.',
    heroImage: '/images/realizacje/biblioteka-busko/biblioteka-busko-2.webp',
    heroAlt: 'Relokacja księgozbioru biblioteki w Busku-Zdroju',
    category: 'Archiwa i księgozbiory',
    facts: [
      'Około 40 000 pozycji spisowych.',
      'Książki, czasopisma i wyposażenie placówki.',
      'Metalowe regały o wysokości ponad 3 m.',
      'Prawie 300 pojemników w obiegu.',
      'Dwa samochody kursujące pomiędzy lokalizacjami.',
      'Niespełna pięć dni przewidzianych na realizację.',
      'Zakończenie przed zakładanym terminem.',
    ],
    sections: [
      {
        heading: 'Krótka trasa, duża odpowiedzialność za układ zbioru',
        paragraphs: [
          'Obie lokalizacje znajdowały się w tym samym mieście. Najważniejszą częścią zadania było zachowanie kolejności książek i przygotowanie ich do odtworzenia w nowej przestrzeni.',
          'Do przewiezienia były również czasopisma, regały, szafy, komputery i biurka. Po przeprowadzce zaplanowano skontrum, czyli sprawdzenie zgodności stanu zbiorów z dokumentacją. Porządek miał więc bezpośrednie znaczenie dla dalszej pracy biblioteki.',
        ],
      },
      {
        heading: 'Skrócony harmonogram wymagał sprawnego obiegu',
        paragraphs: [
          'Przygotowania rozpoczęły się wcześniej, ale ostateczny czas na wykonanie relokacji skrócił się do niespełna pięciu dni. Trzeba było połączyć pakowanie, kursy samochodów, rozładunek i powrót pustych pojemników.',
          'WHM dostarczyło prawie 300 plastikowych pojemników. Po opróżnieniu w nowej lokalizacji wracały do miejsca odbioru i były ponownie wykorzystywane. Dwa samochody kursowały zgodnie z postępem prac po obu stronach.',
        ],
      },
      {
        heading: 'Regały dopasowane do nowej przestrzeni',
        paragraphs: [
          'Ponad trzymetrowe metalowe regały wymagały dostosowania do wymiarów pomieszczeń. Część należało przyciąć i przygotować do nowego układu.',
          'W miejscu docelowym trwały końcowe prace przygotowawcze. Kolejność dostarczania wyposażenia i książek dopasowywano do dostępnych przestrzeni. Ustawienie regałów musiało wspierać dalsze rozmieszczanie księgozbioru.',
        ],
      },
      {
        heading: 'Rezultat',
        paragraphs: [
          'Pomimo krótkiego czasu, adaptacji regałów i dużej liczby pozycji zlecenie zakończono przed terminem zakładanym przez klienta. Zachowano porządek potrzebny do dalszego użytkowania i kontroli zbiorów.',
          'Realizacja pokazuje, jak system oznaczeń i rotacja opakowań pozwalają prowadzić dużą lokalną relokację bez konieczności jednoczesnego spakowania całej zawartości budynku.',
        ],
      },
    ],
    conclusionHeading: 'Rezultat',
    conclusionText: 'Zlecenie zakończono przed terminem zakładanym przez klienta. Zachowano porządek potrzebny do dalszego użytkowania i kontroli zbiorów.',
    relatedServices: [
      { label: 'Przeprowadzki firm i instytucji', href: '/przeprowadzki-firm-i-instytucji/', text: 'Pełny proces relokacji.' },
      { label: 'Pakowanie i zabezpieczanie', href: '/pakowanie-i-zabezpieczanie/', text: 'Materiały i przygotowanie.' },
      { label: 'Dla firm', href: '/dla-firm/', text: 'Planowanie relokacji.' },
    ],
    relatedRealizacje: [
      { label: 'Relokacja TVP3 Kielce', href: '/realizacje/relokacja-tvp3-kielce/' },
      { label: 'Relokacja prokuratur', href: '/realizacje/relokacja-prokuratur-kielce/' },
      { label: 'Relokacja teatru', href: '/realizacje/relokacja-teatru-zeromskiego-kielce/' },
    ],
    salesHeading: 'Duży księgozbiór potrzebuje dobrego systemu pracy. Przygotujmy go razem.',
    salesText: 'Omówimy relokację biblioteki lub archiwum z uwzględnieniem porządku i terminów.',
  },
  {
    slug: '/realizacje/transport-zabytkowego-obrazu-zamek-szydlowieckich/',
    title: 'Transport obrazu z Zamku Szydłowieckich | WHM',
    description: 'Obraz długości około 4,3 m, podnośnik i wejście przez okno muzeum. Zobacz transport WHM z zachowaniem poziomej pozycji dzieła na całej drodze.',
    eyebrow: 'Transport dzieła sztuki',
    heading: 'Zabytkowy obraz, który przez całą drogę musiał pozostać poziomo',
    lead: 'Kilkusetletnie dzieło znajdowało się na drugim piętrze Zamku Szydłowieckich. Konstrukcja długości około 4,3 m nie mogła być ustawiona pionowo. WHM przygotowało operację od opuszczenia z zamku po wprowadzenie do piwnicy Muzeum Instrumentów Ludowych.',
    heroImage: '/images/realizacje/zamek-szydlowieckich/zamek-szydlowieckich-1.webp',
    heroAlt: 'Transport zabytkowego obrazu z Zamku Szydłowieckich',
    category: 'Kultura i dzieła sztuki',
    facts: [
      'Konstrukcja o długości około 4,3 m.',
      'Obraz nawinięty na tubę o średnicy około 60 cm.',
      'Kręgi zabezpieczające o średnicy około 80 cm.',
      'Odbiór z drugiego piętra zamku.',
      'Utrzymanie pozycji poziomej podczas całej operacji.',
      'Około 400 m przejazdu do miejsca docelowego.',
      'Wprowadzenie dzieła przez okno piwnicy muzeum.',
    ],
    sections: [
      {
        heading: 'Pozycja dzieła określiła sposób pracy',
        paragraphs: [
          'Obraz był nawinięty na tekturową tubę i wyposażony w zabezpieczenia ze sklejki. Zmiana na pozycję pionową mogła spowodować zsunięcie i uszkodzenie dzieła. Ten warunek wykluczał standardowe zniesienie po schodach.',
          'Plan przygotowano z uwzględnieniem długości konstrukcji, miejsc podparcia i sposobu utrzymania jej poziomo. Każdy kolejny etap musiał respektować tę samą zasadę.',
        ],
      },
      {
        heading: 'Opuszczenie z drugiego piętra',
        paragraphs: [
          'W operacji wykorzystano podnośnik koszowy i pasy transportowe. Zespół prowadził oba końce ładunku i kontrolował jego położenie podczas przemieszczania na zewnątrz budynku oraz opuszczania na poziom gruntu.',
          'Sprzęt umożliwił pokonanie wysokości, a praca zespołu zapewniała kontrolę długiej konstrukcji i komunikację podczas kolejnych ruchów.',
        ],
      },
      {
        heading: 'Przygotowanie drogi do muzeum',
        paragraphs: [
          'Po załadunku wykonano krótki przejazd do Muzeum Instrumentów Ludowych. W miejscu docelowym wyzwaniem były wymiary przejścia i dodatkowe kręgi zabezpieczające.',
          'Zdemontowano część zabezpieczeń, okno prowadzące do piwnicy oraz przęsło ogrodzenia znajdujące się na trasie. Po przygotowaniu przejścia zespół wprowadził dzieło do wnętrza, nadal utrzymując wymaganą pozycję.',
        ],
      },
    ],
    conclusionHeading: 'Rezultat',
    conclusionText: 'Obraz został opuszczony z zamku, przewieziony i umieszczony w muzeum bez naruszenia wymogu poziomego ułożenia. Plan obejmował wszystkie etapy, również te po krótkim przejeździe samochodem.',
    relatedServices: [
      { label: 'Transport specjalistyczny', href: '/transport-specjalistyczny/', text: 'Transport ciężkich i nietypowych przedmiotów.' },
      { label: 'Dla firm i instytucji', href: '/dla-firm/', text: 'Planowanie relokacji.' },
    ],
    relatedRealizacje: [
      { label: 'Fortepiany w Zamku Szydłowieckich', href: '/realizacje/transport-fortepianow-zamek-szydlowieckich/' },
      { label: 'Relokacja teatru', href: '/realizacje/relokacja-teatru-zeromskiego-kielce/' },
      { label: 'Ciężkie ładunki', href: '/realizacje/relokacje-techniczne-i-ciezkie-ladunki/' },
    ],
    salesHeading: 'Przedmiot wymaga szczególnego traktowania? Zacznijmy od jego wymagań.',
    salesText: 'Opisz mienie i miejsce. Ustalimy potrzebne informacje i sposób przygotowania transportu.',
  },
  {
    slug: '/realizacje/transport-fortepianow-zamek-szydlowieckich/',
    title: 'Transport fortepianów - Zamek Szydłowieckich | WHM',
    description: 'Dwa fortepiany, historyczny obiekt i ciasna winda. Zobacz, jak WHM przygotowało relokację instrumentów z uwzględnieniem stanu eksponatu i dostępu.',
    eyebrow: 'Instrumenty w historycznym obiekcie',
    heading: 'Dwa fortepiany i transport dopasowany do warunków zamku',
    lead: 'W Zamku Szydłowieckich WHM przenosiło dwa fortepiany. Jeden miał znaleźć się w sąsiednim pomieszczeniu, a drugi trafić do pobliskiego Muzeum Instrumentów Ludowych. O sposobie pracy zdecydowały dostępna przestrzeń i stan konkretnego eksponatu.',
    heroImage: '/images/realizacje/zamek-szydlowieckich/zamek-szydlowieckich-2.webp',
    heroAlt: 'Transport fortepianów w Zamku Szydłowieckich przez WHM',
    category: 'Pianina i fortepiany',
    facts: [
      'Dwa fortepiany.',
      'Przeniesienie jednego instrumentu w obrębie zamku.',
      'Przewóz drugiego do Muzeum Instrumentów Ludowych.',
      'Ograniczona przestrzeń w windzie.',
      'Jeden eksponat o masie około 250 kg lub większej, oczekujący na renowację.',
    ],
    sections: [
      {
        heading: 'Krótki odcinek może decydować o całej operacji',
        paragraphs: [
          'Nawet przy pobliskim miejscu docelowym transport instrumentu wymaga oceny przejść. W tym przypadku ciasna winda ograniczała pozycję, w której można było przemieścić jeden z fortepianów.',
          'Zespół musiał uwzględnić konstrukcję i masę instrumentu oraz przestrzeń dostępną do manewrowania. Warunki historycznego budynku stanowiły stały element zadania.',
        ],
      },
      {
        heading: 'Rozwiązanie dotyczyło konkretnego eksponatu',
        paragraphs: [
          'W tej historycznej realizacji zastosowano nietypowe ułożenie jednego fortepianu na stronie klawiatury. Dotyczyło to eksponatu oczekującego na renowację, a nie instrumentu używanego do gry. Pozycja wymagała szczególnej kontroli stabilności podczas przenoszenia.',
          'Nie jest to standardowa metoda transportu sprawnego fortepianu. Stan instrumentu i jego przeznaczenie miały znaczenie dla wyboru rozwiązania w tym konkretnym zadaniu.',
        ],
      },
    ],
    conclusionHeading: 'Rezultat',
    conclusionText: 'Jeden fortepian został przeniesiony do sąsiedniego pomieszczenia, a drugi do Muzeum Instrumentów Ludowych, zgodnie z zakresem realizacji.',
    relatedServices: [
      { label: 'Transport pianin i fortepianów', href: '/transport-pianin-i-fortepianow-kielce/', text: 'Transport instrumentów.' },
      { label: 'Transport specjalistyczny', href: '/transport-specjalistyczny/', text: 'Transport ciężkich przedmiotów.' },
    ],
    relatedRealizacje: [
      { label: 'Transport Fazioli', href: '/realizacje/transport-fortepianu-fazioli/' },
      { label: 'Zabytkowy obraz z zamku', href: '/realizacje/transport-zabytkowego-obrazu-zamek-szydlowieckich/' },
      { label: 'Relokacja teatru', href: '/realizacje/relokacja-teatru-zeromskiego-kielce/' },
    ],
    salesHeading: 'Pokaż instrument i miejsce. Dobierzemy przygotowanie do Twojego zlecenia.',
    salesText: 'Opisz instrument i warunki dostępu w obu lokalizacjach.',
  },
  {
    slug: '/realizacje/transport-fortepianu-fazioli/',
    title: 'Transport fortepianu Fazioli: Busko–Kielce | WHM',
    description: 'Odbiór fortepianu Fazioli po koncercie w Busku-Zdroju i nocny transport do Kielc. Poznaj przygotowanie, zabezpieczenia i pracę zespołu WHM.',
    eyebrow: 'Transport instrumentu koncertowego',
    heading: 'Fortepian Fazioli po koncercie. Transport zakończony około drugiej w nocy.',
    lead: 'Gdy pierwotnie wybrany przewoźnik nie mógł zrealizować odbioru, transport przejęło WHM. Trzyosobowy zespół odebrał fortepian po koncercie w tężni solankowej w Busku-Zdroju i przewiózł go do szkoły muzycznej w Kielcach.',
    heroImage: '/images/realizacje/fortepian-fazioli/fortepian-fazioli.webp',
    heroAlt: 'Fortepian koncertowy Fazioli po transporcie nocnym',
    category: 'Pianina i fortepiany',
    facts: [
      'Fortepian koncertowy Fazioli.',
      'Wydarzenie w tężni solankowej w Busku-Zdroju, nagrywane dla telewizji.',
      'Trzyosobowy zespół WHM i samochód z windą załadunkową.',
      'Rozpoczęcie prac około 23:40–24:00.',
      'Instrument na podeście o wysokości około 40 cm.',
      'Przyjazd do szkoły muzycznej w Kielcach około 2:00.',
      'Dodatkowe stopnie na drodze do sceny.',
    ],
    sections: [
      {
        heading: 'Odbiór dopasowany do przebiegu koncertu',
        paragraphs: [
          'Ekipa była przygotowana do rozpoczęcia pracy około godziny 23:00. Wydarzenie przedłużyło się o bisy, więc trzeba było poczekać na zakończenie koncertu i opuszczenie przestrzeni przez publiczność.',
          'Dopiero później samochód mógł wjechać do wnętrza tężni. Praca zespołu transportowego musiała uwzględniać organizację wydarzenia oraz działania ekip estradowych, oświetleniowych i nagraniowych.',
        ],
      },
      {
        heading: 'Pokrowiec, sanie i kontrolowane przeniesienie',
        paragraphs: [
          'Fortepian znajdował się na podświetlanym podeście o wysokości około 40 cm. Zespół założył dedykowany pokrowiec, przygotował instrument i przymocował sanie transportowe.',
          'Następnie fortepian zdjęto z podestu, ustawiono w pozycji transportowej i przewieziono na wózkach do samochodu. Winda pomogła w załadunku. Instrument ustabilizowano na czas nocnego przejazdu.',
        ],
      },
      {
        heading: 'Ostatni etap w szkole muzycznej',
        paragraphs: [
          'Ochrona szkoły w Kielcach była uprzedzona o późnym przyjeździe. Około drugiej w nocy instrument dotarł do miejsca docelowego, gdzie trzeba było jeszcze pokonać około sześciu stopni prowadzących do sceny.',
          'Zespół wniósł fortepian i ustawił go na scenie głównej auli. Pozostał zabezpieczony, ponieważ w kolejnych dniach miał go odebrać wcześniej planowany przewoźnik.',
        ],
      },
    ],
    conclusionHeading: 'Rezultat',
    conclusionText: 'WHM przejęło zmieniony plan odbioru i wykonało transport zgodnie z przebiegiem wydarzenia. Przygotowanie zespołu, zabezpieczenia i samochód z windą pozwoliły połączyć odbiór ze sceny, nocny przejazd i wniesienie w miejscu docelowym.',
    relatedServices: [
      { label: 'Transport pianin i fortepianów', href: '/transport-pianin-i-fortepianow-kielce/', text: 'Transport instrumentów.' },
      { label: 'Transport specjalistyczny', href: '/transport-specjalistyczny/', text: 'Transport ciężkich przedmiotów.' },
    ],
    relatedRealizacje: [
      { label: 'Fortepiany w Zamku Szydłowieckich', href: '/realizacje/transport-fortepianow-zamek-szydlowieckich/' },
      { label: 'Relokacja teatru', href: '/realizacje/relokacja-teatru-zeromskiego-kielce/' },
      { label: 'Wszystkie realizacje', href: '/realizacje/' },
    ],
    salesHeading: 'Zaplanuj odbiór instrumentu razem z harmonogramem wydarzenia.',
    salesText: 'Omówimy dostęp, godzinę pracy i miejsce docelowe.',
  },
  {
    slug: '/realizacje/relokacje-techniczne-i-ciezkie-ladunki/',
    title: 'Transport ciężkich urządzeń i serwerów | WHM Kielce',
    description: 'Szafy pancerne, piece, serwery i wyposażenie laboratoryjne. Poznaj przykłady transportów technicznych WHM oraz sposób przygotowania ciężkich ładunków.',
    eyebrow: 'Przekrój realizacji technicznych WHM',
    heading: 'Ciężkie ładunki wymagają przygotowania całej drogi',
    lead: 'Szafa pancerna, piec, urządzenie laboratoryjne i wysoka szafa serwerowa stawiają przed zespołem różne zadania. Poniżej pokazujemy przykłady odrębnych realizacji WHM, w których znaczenie miały sprzęt, dobór ludzi i kontrolowane ustawienie wyposażenia.',
    heroImage: '/images/transport-gabarytow/transport-gabarytow-kielce-7.webp',
    heroAlt: 'Transport ciężkiego i nietypowego ładunku przez zespół WHM',
    category: 'Ciężkie i nietypowe ładunki',
    facts: [
      'Szafy pancerne i aktowe, w tym egzemplarz o masie około 880 kg według danych producenta.',
      'Piece na pellet o masie około 350–450 kg.',
      'Ponad dwumetrowe szafy serwerowe wprowadzane przez okno.',
      'Prace związane ze zbiornikami azotu w Centrum Onkologii w Kielcach.',
      'Transport i ustawianie sprzętu laboratoryjnego.',
      'Szafy na broń oraz duże balie ogrodowe.',
    ],
    sections: [
      {
        heading: 'Szafy pancerne: masa i stabilność',
        paragraphs: [
          'WHM wielokrotnie przewoziło szafy o masie około 200 kg i 300–400 kg. Wśród realizacji znalazła się także szafa ważąca według producenta około 880 kg.',
          'Przy takich przedmiotach przygotowanie obejmuje środek ciężkości, możliwość podparcia i warunki manewrowania. Sprzęt wspiera pracę zespołu, który kontroluje przechyły i drogę. Masa historycznie przewiezionej szafy nie stanowi deklaracji możliwości użycia jednego urządzenia przy każdym zleceniu.',
        ],
      },
      {
        heading: 'Piece na pellet: schody i piwnice',
        paragraphs: [
          'Transporty obejmowały piece ważące około 350–450 kg, również na trasach prowadzących do piwnic i z piwnic. Ograniczona przestrzeń wymagała zaplanowania pozycji urządzenia i zmian kierunku jeszcze przed rozpoczęciem przenoszenia.',
          'Tam, gdzie warunki pozwalały, wykorzystywano schodołaz. Zespół odpowiadał za ustawienie, asekurację i kontrolę urządzenia podczas pokonywania stopni.',
        ],
      },
      {
        heading: 'Szafy serwerowe: alternatywna droga przez okno',
        paragraphs: [
          'W jednej z realizacji ponad dwumetrowych szaf nie można było wprowadzić przez drzwi budynku. Przygotowano drogę przez okno.',
          'Istotne były wymiary otworu, stabilne prowadzenie konstrukcji i przestrzeń po drugiej stronie. Plan musiał pozwolić nie tylko przeprowadzić szafę przez otwór, ale też zakończyć operację w pomieszczeniu.',
        ],
      },
      {
        heading: 'Wyposażenie placówki medycznej i laboratorium',
        paragraphs: [
          'Sprzęt WHM wykorzystywano przy pracach związanych ze zbiornikami azotu w Centrum Onkologii w Kielcach na Czarnowie. Doświadczenie obejmuje również transport ciężkich urządzeń laboratoryjnych.',
          'Przy ustawianiu części wyposażenia dodatkowe widły schodołazu pomagały podnieść urządzenie do miejsca na podwyższonym stojaku. Znaczenie miało końcowe położenie, a nie tylko wniesienie do pomieszczenia.',
        ],
      },
      {
        heading: 'Metoda zależy od konkretnego zadania',
        paragraphs: [
          'Przygotowując podobny transport, sprawdzamy wymiary, masę, punkty podparcia, schody, przejścia i miejsce docelowe. Dobieramy sprzęt oraz liczbę osób do warunków. W historycznych realizacjach schodołaz pracował z obciążeniami około 400 kg; nie oznacza to automatycznego potwierdzenia takiego transportu na każdych schodach.',
          'Przykłady te pochodzą z różnych zleceń. Łączy je sposób przygotowania: rozpoznanie przedmiotu, zaplanowanie drogi i kontrola aż do ustawienia w uzgodnionym miejscu.',
        ],
      },
    ],
    conclusionHeading: 'Rezultat',
    conclusionText: 'Każde z tych zleceń zakończono ustawieniem przedmiotu w uzgodnionym miejscu. Przygotowanie całej drogi jest wspólnym elementem wszystkich opisanych transportów.',
    relatedServices: [
      { label: 'Transport specjalistyczny', href: '/transport-specjalistyczny/', text: 'Transport ciężkich przedmiotów.' },
      { label: 'Przeprowadzki firm i instytucji', href: '/przeprowadzki-firm-i-instytucji/', text: 'Relokacje biur i instytucji.' },
      { label: 'Dla firm', href: '/dla-firm/', text: 'Planowanie relokacji.' },
    ],
    relatedRealizacje: [
      { label: 'Zabytkowy obraz z Zamku Szydłowieckich', href: '/realizacje/transport-zabytkowego-obrazu-zamek-szydlowieckich/' },
      { label: 'Relokacja TVP3 Kielce', href: '/realizacje/relokacja-tvp3-kielce/' },
      { label: 'Wszystkie realizacje', href: '/realizacje/' },
    ],
    salesHeading: 'Masz urządzenie, którego transport wymaga przygotowania?',
    salesText: 'Opisz przedmiot i miejsce. Ustalimy potrzebne informacje oraz możliwość oględzin.',
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export const caseStudyCategories = [
  'Firmy i instytucje',
  'Archiwa i księgozbiory',
  'Kultura i dzieła sztuki',
  'Pianina i fortepiany',
  'Ciężkie i nietypowe ładunki',
];
