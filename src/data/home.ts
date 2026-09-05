export const hero = {
  eyebrow: 'WHM Przeprowadzki · Kielce i województwo świętokrzyskie',
  heading: 'Ty planujesz nowe miejsce. My zajmiemy się przeprowadzką.',
  lead: 'Spakowanie mieszkania, przeniesienie mebli, transport i wniesienie - możesz powierzyć nam tyle, ile potrzebujesz. Zadbamy o Twoje rzeczy i organizację pracy, a przez przygotowania przeprowadzimy Cię krok po kroku.',
  contactNote: 'Nie musisz znać wszystkich szczegółów. Zacznij od krótkiej rozmowy.',
  image: '/images/hero/hero-1.webp',
  imageAlt: 'Samochód WHM Przeprowadzki przy realizacji zlecenia w Kielcach',
};

export const trustFacts = [
  {
    title: 'Działamy od 2019 roku',
    desc: 'Doświadczenie z mieszkań, firm i instytucji.',
  },
  {
    title: 'Zabezpieczenia w standardzie',
    desc: 'Koce, pokrowce i stabilizacja mienia w samochodzie.',
  },
  {
    title: 'Bezpłatne oględziny większych zleceń',
    desc: 'Poznajemy miejsce i pomagamy zaplanować prace.',
  },
  {
    title: 'Ochrona do 1 mln zł',
    desc: 'Zastosowanie i warunki potwierdzamy dla konkretnego zlecenia.',
  },
];

export const servicesSection = {
  eyebrow: 'Usługi WHM',
  heading: 'W czym możemy Ci pomóc?',
  intro: 'Przeprowadzka całego domu, transport zakupionej kanapy czy zmiana siedziby firmy? Wybierz swoją potrzebę. Jeśli łączy się ich kilka, omówimy je podczas jednej rozmowy.',
  items: [
    {
      title: 'Przeprowadzki mieszkań i domów',
      desc: 'Zabezpieczymy, przewieziemy i wniesiemy Twoje rzeczy. Możemy też zająć się pakowaniem i montażem mebli.',
      href: '/przeprowadzki/',
      image: '/images/home-moving/przeprowadzki-domow-kielce-3.webp',
    },
    {
      title: 'Transport mebli',
      desc: 'Odbierzemy mebel ze sklepu, mieszkania lub magazynu i ustawimy go pod wskazanym adresem.',
      href: '/transport-mebli-kielce/',
      image: '/images/office-moving/przeprowadzki-biura-1.webp',
    },
    {
      title: 'Przeprowadzki firm i instytucji',
      desc: 'Zaplanujemy etapy, przygotujemy wyposażenie i przeniesiemy je z myślą o dalszej pracy organizacji.',
      href: '/przeprowadzki-firm-i-instytucji/',
      image: '/images/institution-moving/przeprowadzki-instytucji-4.webp',
    },
    {
      title: 'Pianina i transport specjalistyczny',
      desc: 'Dobierzemy zespół i sprzęt do instrumentu, ciężkiego urządzenia lub nietypowego wyposażenia.',
      href: '/transport-specjalistyczny/',
      image: '/images/transport-gabarytow/transport-gabarytow-kielce-7.webp',
    },
  ],
  cta: { label: 'Zobacz wszystkie usługi WHM', href: '/uslugi/' },
};

export interface Testimonial {
  author: string;
  text: string;
  source?: string;
}

export const testimonials: Testimonial[] = [
  {
    author: 'Zbigniew Pakuła',
    text: 'Usługa transportowa wyposażenia mieszkania na bardzo wysokim profesjonalnym poziomie. Przewożone meble były solidnie zabezpieczone dedykowanymi specjalnymi kocami. Polecam korzystanie z usług WHM.',
    source: 'Google',
  },
  {
    author: 'Marzena',
    text: 'Przeprowadzka z Ostrowca do Kielc bardzo sprawnie. Panowie bardzo profesjonalni, spokojni i mili. Zajęli się pakowaniem, demontażem mebli, przewiezieniem i ponownym montażem. Rzeczy przewiezione bezpiecznie. Jak najbardziej polecam!',
    source: 'Google',
  },
  {
    author: 'Wiola',
    text: 'Panowie super, bardzo cierpliwi, spokojni, wszystko zorganizowane na czas. Pełen profesjonalizm i zrozumienie. Wszystko zabezpieczone - od mebli, przez szkło, a na kwiatach kończąc. Polecam z całego serca.',
    source: 'Google',
  },
  {
    author: 'Robert Chyla',
    text: 'Podarowaliśmy pianino do Klubu Seniora. Bardzo sprawnie, szybko i punktualnie. Na pewno będę osobiście korzystał z usług WHM w jakichkolwiek potrzebach przeprowadzkowych.',
    source: 'Google',
  },
];

export const introSection = {
  eyebrow: 'Jak pomagamy',
  heading: 'Nie musisz organizować wszystkiego samodzielnie',
  text: 'Zmiana mieszkania to wiele spraw naraz. Dlatego na początku pytamy, co chcesz przewieźć, gdzie mają trafić rzeczy i w czym najbardziej potrzebujesz pomocy. Podpowiemy, jak się przygotować, a ustalony zakres prac przejmie nasz zespół.',
  points: [
    'Dopasujemy pomoc do Twojej sytuacji.',
    'Ustalimy, co pakujesz samodzielnie, a czym zajmuje się WHM.',
    'Przygotujemy zabezpieczenia i sprzęt potrzebny na miejscu.',
    'Wniesiemy rzeczy do wskazanych pomieszczeń.',
  ],
  cta: { label: 'Zobacz, jak wygląda współpraca', href: '/jak-to-dziala/' },
  image: '/images/kielce-moving/przeprowadzki-kielce-1.webp',
};

export const standardSection = {
  eyebrow: 'Standard WHM',
  heading: 'Twoje rzeczy zasługują na dobrą ochronę',
  text: 'Zabezpieczanie mebli jest częścią naszej pracy. Pokrowce, koce i pasy pomagają chronić powierzchnie podczas przenoszenia i utrzymać ładunek na miejscu podczas jazdy.',
  equipmentModules: [
    {
      name: 'Dedykowane pokrowce',
      benefit: 'Dopasowana ochrona mebli i tapicerki.',
      image: '/images/standard-whm/dedykowane-pokrowce-1.webp',
    },
    {
      name: 'Koce ochronne',
      benefit: 'Osłona powierzchni i delikatnych elementów.',
      image: '/images/standard-whm/koce-przeprowadzkowe-1.webp',
    },
    {
      name: 'Pasy transportowe',
      benefit: 'Stabilizacja mienia w samochodzie.',
      image: '/images/standard-whm/zabezpieczenia-1.webp',
    },
    {
      name: 'Wózki',
      benefit: 'Kontrolowane przemieszczanie wyposażenia.',
      image: '/images/standard-whm/zabezpieczenia-2.webp',
    },
    {
      name: 'Uprzęże',
      benefit: 'Wsparcie zespołu przy przenoszeniu ciężkich przedmiotów.',
      image: '/images/transport-gabarytow/transport-gabarytow-kielce-1.webp',
    },
    {
      name: 'Schodołazy',
      benefit: 'Pomoc przy transporcie po schodach, dobrana do warunków.',
      image: '/images/transport-gabarytow/transport-gabarytow-kielce-5.webp',
    },
    {
      name: 'Zamykane pojemniki',
      benefit: 'Porządek przy pakowaniu wyposażenia i dokumentów.',
      image: '/images/moving-boxes/pojemniki-przeprowadzkowe-1.webp',
    },
    {
      name: 'Zabudowane samochody',
      benefit: 'Sucha przestrzeń ładunkowa przygotowana do przewozu mienia.',
      image: '/images/standard-whm/sztywna-zabudowa-1.webp',
    },
  ],
  cta: { label: 'Poznaj Standard WHM', href: '/standard-whm/' },
};

export const b2bSection = {
  eyebrow: 'Dla firm i instytucji',
  heading: 'Przenosisz firmę? Potrzebujesz partnera, który widzi cały projekt.',
  text: 'Pracownicy muszą wiedzieć, kiedy spakować stanowiska. Dokumenty muszą trafić na właściwe półki. Sprzęt powinien znaleźć się tam, gdzie będzie potrzebny. Łączymy te zadania w plan przeprowadzki dopasowany do działania organizacji.',
  points: [
    'Bezpłatne oględziny i ustalenie zakresu.',
    'Harmonogram i podział na etapy.',
    'Oznaczenia wyposażenia oraz zamykane pojemniki.',
    'Transport specjalistyczny i możliwość czasowego przechowania mienia.',
  ],
  cta: { label: 'Poznaj ofertę dla firm i instytucji', href: '/dla-firm/' },
  image: '/images/institution-moving/przeprowadzki-instytucji-4.webp',
};

export const featuredRealizations = [
  {
    label: 'Relokacja instytucji publicznej',
    title: 'Relokacja kieleckich prokuratur',
    location: 'Kielce',
    params: ['5 kondygnacji + piwnica z archiwami', 'Ponad 100 pracowników', 'Około 2 miesięcy prac'],
    desc: 'Pięć kondygnacji oraz piwnica z archiwami. Przeprowadzka wyposażenia ponad stu pracowników prowadzona etapami przez około dwa miesiące z zachowaniem ciągłości działania instytucji.',
    href: '/realizacje/relokacja-prokuratur-kielce/',
    image: '/images/realizacje/prokuratury-kielce/przeprowadzka-prokuratury-1.webp',
  },
  {
    label: 'Relokacja instytucji kultury',
    title: 'Powrót Teatru im. Stefana Żeromskiego',
    location: 'Kielce',
    params: ['Niemal 50 pełnych transportów', 'Kilka lokalizacji', 'Dwa fortepiany'],
    desc: 'Scenografia, kostiumy, biblioteka, wyposażenie techniczne i dwa fortepiany z kilku lokalizacji. Niemal 50 pełnych transportów do odnowionej siedziby.',
    href: '/realizacje/relokacja-teatru-zeromskiego-kielce/',
    image: '/images/realizacje/teatr-zeromskiego/relokacja-teatru-2.webp',
  },
  {
    label: 'Transport dzieła sztuki',
    title: 'Zabytkowy obraz z Zamku Szydłowieckich',
    location: 'Szydłowiec',
    params: ['Ok. 4,3 m długości', 'Zakaz pionowania', 'Opuszczenie i wprowadzenie przez okno'],
    desc: 'Konstrukcja długości około 4,3 m, którą przez całą drogę trzeba było utrzymać poziomo. Transport zaplanowany od drugiego piętra zamku po wejście przez okno muzeum.',
    href: '/realizacje/transport-zabytkowego-obrazu-zamek-szydlowieckich/',
    image: '/images/realizacje/zamek-szydlowieckich/zamek-szydlowieckich-1.webp',
  },
];

export const specialTransportSection = {
  eyebrow: 'Transport specjalistyczny',
  heading: 'Pianino, sejf, ciężkie urządzenie? Porozmawiajmy.',
  text: 'Nie musisz samodzielnie dobierać sprzętu ani organizować osób do przenoszenia. Pokaż nam przedmiot i miejsce odbioru, a sprawdzimy, jak przygotować transport i bezpieczne ustawienie pod nowym adresem.',
  categories: [
    'pianina i fortepiany',
    'ciężkie meble',
    'duże AGD',
    'sejfy',
    'piece',
    'serwery',
    'wyposażenie techniczne i laboratoryjne',
  ],
  cta: { label: 'Transport specjalistyczny', href: '/transport-specjalistyczny/' },
  ctaSecondary: { label: 'Pianina i fortepiany', href: '/transport-pianin-i-fortepianow-kielce/' },
  images: [
    '/images/transport-gabarytow/transport-gabarytow-kielce-5.webp',
    '/images/transport-pianin-i-fortepianow/transport-pianin-i-fortepianow-kielce-3.webp',
    '/images/office-moving/przeprowadzki-biura-4.webp',
  ],
};

export const ecosystemSection = {
  eyebrow: 'Magazyny i materiały',
  heading: 'Gdy przeprowadzka potrzebuje czegoś więcej',
  storage: {
    title: 'Magazyny WHM',
    text: 'Nowe mieszkanie nie jest jeszcze gotowe? Potrzebujesz miejsca na wyposażenie firmy? W Masłowie koło Kielc oferujemy ogrzewane boksy od 2 do 9 m² oraz miejsca paletowe. Możemy połączyć przechowanie z transportem.',
    cta: { label: 'Zapytaj o magazyn', href: '/magazyny-kielce/' },
    image: '/images/magazyny-kielce/ogrzewany-magazyn-kielce.webp',
  },
  shop: {
    title: 'WHM Shop',
    text: 'Pakujesz się samodzielnie? W naszym sklepie znajdziesz kartony, koce, pokrowce i materiały zabezpieczające wybierane z perspektywy codziennej pracy przeprowadzkowej.',
    cta: { label: 'Poznaj WHM Shop', href: '/whm-shop/' },
    image: '/images/moving-boxes/kartony-do-przeprowadzki-3.webp',
  },
};

export const processSteps = [
  {
    number: '01',
    title: 'Opowiedz, czego potrzebujesz',
    desc: 'Wystarczy krótki opis, miejsce i planowany termin.',
  },
  {
    number: '02',
    title: 'Ustalimy zakres i wycenę',
    desc: 'Zapytamy o szczegóły, które pomogą przygotować zespół.',
  },
  {
    number: '03',
    title: 'Zajmiemy się przeprowadzką',
    desc: 'Zabezpieczymy, przewieziemy i wniesiemy rzeczy zgodnie z ustaleniami.',
  },
  {
    number: '04',
    title: 'Ustawimy rzeczy w nowym miejscu',
    desc: 'Wykonamy uzgodniony montaż i rozmieszczenie wyposażenia.',
  },
];

export const processSection = {
  eyebrow: 'Jak wygląda współpraca',
  heading: 'Zacznij od telefonu. Resztę ustalimy razem.',
  steps: processSteps,
  cta: { label: 'Sprawdź cały proces', href: '/jak-to-dziala/' },
};

export const guideSection = {
  eyebrow: 'Poradnik WHM',
  heading: 'Przygotowania możesz rozłożyć na proste kroki',
  text: 'Co spakować najpierw? Jak opisać kartony? Co zostawić pod ręką na pierwszy wieczór? Zebraliśmy praktyczne wskazówki, które ułatwią Ci zmianę miejsca.',
  cta: { label: 'Przeczytaj poradnik przeprowadzki', href: '/poradniki/' },
  image: '/images/guides/poradnik-jak-przygotowac-sie-do-przeprowadzki.webp',
};

export const faqItems = [
  {
    question: 'Ile kosztuje przeprowadzka?',
    answer: 'Cena zależy od ilości rzeczy, trasy, pięter i zakresu pomocy. Zadzwoń lub opisz zlecenie. Zapytamy o potrzebne szczegóły i przygotujemy wycenę.',
  },
  {
    question: 'Czy muszę wszystko spakować samodzielnie?',
    answer: 'Nie. Możesz zlecić nam pełne pakowanie albo pomoc przy wybranych rzeczach. Zabezpieczenie przewożonych mebli jest częścią standardu WHM; pakowanie zawartości mieszkania ustalamy jako zakres dodatkowy.',
  },
  {
    question: 'Czy zajmujecie się demontażem i montażem mebli?',
    answer: 'Tak. Ustalamy wcześniej, które meble trzeba rozłożyć i ponownie zmontować w nowym miejscu.',
  },
  {
    question: 'Czy można zamówić transport jednego mebla?',
    answer: 'Tak. Przewozimy także pojedyncze kanapy, szafy, stoły i inne elementy wyposażenia.',
  },
  {
    question: 'Czy obsługujecie firmy i instytucje?',
    answer: 'Tak. Planujemy relokacje biur, instytucji, archiwów i wyposażenia specjalistycznego. Przy większych projektach zaczynamy od bezpłatnych oględzin.',
  },
  {
    question: 'Gdzie działa WHM?',
    answer: 'W Kielcach, całym województwie świętokrzyskim i na trasach krajowych. Powiedz nam, skąd i dokąd chcesz przewieźć rzeczy.',
  },
];

export const serviceLinks = [
  { label: 'Przeprowadzki mieszkań i domów', href: '/przeprowadzki/' },
  { label: 'Transport mebli', href: '/transport-mebli-kielce/' },
  { label: 'Pakowanie i zabezpieczanie', href: '/pakowanie-i-zabezpieczanie/' },
  { label: 'Transport pianin i fortepianów', href: '/transport-pianin-i-fortepianow-kielce/' },
  { label: 'Transport specjalistyczny', href: '/transport-specjalistyczny/' },
  { label: 'Opróżnianie mieszkań i wywóz mebli', href: '/oproznianie-mieszkan-i-wywoz-mebli/' },
  { label: 'Przeprowadzki firm i instytucji', href: '/przeprowadzki-firm-i-instytucji/' },
  { label: 'Magazyny WHM', href: '/magazyny-kielce/' },
];

export const finalCta = {
  heading: 'Powiedz, co trzeba przenieść. Pomożemy Ci to zorganizować.',
  text: 'Zadzwoń albo zostaw krótką wiadomość. Nie musisz mieć gotowej listy rzeczy ani wiedzieć, jaki samochód będzie potrzebny - od tego jesteśmy.',
};
