import type { Locale } from "./config";

export type Dictionary = typeof az;

const az = {
  nav: {
    home: "Ana səhifə",
    services: "Xidmətlər",
    about: "Haqqımızda",
    contact: "Əlaqə",
    order: "Sifariş ver",
  },
  footer: {
    tagline:
      "Bakı Mühəndislik Universiteti nəzdində fəaliyyət göstərən aqrokimyəvi analiz laboratoriyası.",
    nav: "Naviqasiya",
    contact: "Əlaqə",
    rights: "Bakı Mühəndislik Universiteti -- Torpaq, Su və Bitki Analizləri Laboratoriyası",
  },
  home: {
    eyebrow: "Bakı Mühəndislik Universiteti",
    titleA: "Torpağın dilini",
    titleHighlight: "rəqəmlərlə",
    titleB: "oxuyuruq",
    lead: "Əkin sahəsində, suvarma suyunda və bitkidə aqrokimyəvi analizlər apararaq fermerlərə dəqiq nəticə və izahlı protokol təqdim edirik -- torpaqdan səmərəli istifadə və bol məhsul üçün.",
    ctaOrder: "Analiz sifariş et",
    ctaServices: "Xidmətlərə bax",
    directionsTitle: "Analiz istiqamətlərimiz",
    more: "Ətraflı bax",
    ctaBoxTitle: "Nümunənizi bizə göndərin, nəticəni izahlı protokolla alın",
    ctaBoxBody:
      "Fərdi fermerlər və biznes müştəriləri üçün. Zəhmət olmasa əlaqə formasını doldurun, komandamız qısa zamanda sizinlə əlaqə saxlayacaq.",
    ctaBoxButton: "Əlaqə formasına keç",
  },
  mission: {
    missionTitle: "Missiyamız",
    missionBody:
      "Əkin sahəsində və digər kənd təsərrüfatına yararlı torpaqda, suvarma suyunda və bitkidə aqrokimyəvi analizlər aparmaqla, fermerlərə nəticələrə dair protokolların verilməsi.",
    visionTitle: "Vizyonumuz",
    visionBody:
      "Fermerlərin torpaqdan düzgün və səmərəli istifadə etməsinə, bol məhsul əldə etməsinə kömək etmək.",
    goalTitle: "Hədəfimiz",
    goalBody:
      "Yarana bilən problemləri qısa zamanda müəyyən edib, aradan qaldırılması üçün operativ və düzgün həll yolları təqdim etmək.",
  },
  services: {
    eyebrow: "Xidmətlərimiz",
    title: "Aqrokimyəvi analiz istiqamətləri",
    lead: "Aşağıdakı bütün analizlər üzrə qiymət təklifi üçün bizimlə əlaqə saxlayın -- fərdi nümunə sayına və paketə görə qiymət təyin olunur.",
    orderSection: "Bu bölmə üzrə sifariş ver",
    packageLabel: "Paket",
  },
  about: {
    eyebrow: "Haqqımızda",
    title:
      "Bakı Mühəndislik Universitetinin Torpaq, Su və Bitki Analizləri Laboratoriyası",
    missionTitle: "Missiya",
    missionBody:
      "Əkin sahəsində və digər kənd təsərrüfatına yararlı torpaqda, suvarma suyunda və bitkidə aqrokimyəvi analizlər aparmaqla, fermerlərə analiz nəticələrinə dair protokolların verilməsi.",
    visionTitle: "Vizyon",
    visionBody:
      "Əkinə yararlı torpaqlarda, bitkilərdə və suvarma suyunda aqrokimyəvi analizlər aparmaqla fermerlərin torpaqdan düzgün və səmərəli istifadə etməsinə və bol məhsul əldə etməsinə kömək etməkdir.",
    goalTitle: "Hədəf",
    goalBody:
      "Aparılmış analiz nəticələrinin düzgün emalı və yüksək keyfiyyətli təhlili -- əkinçilik və ya bitkiçilik fəaliyyəti ilə məşğul olan fermerlərə torpaq tərkibində, suvarma sularında və becərilən bitkilərdə analizlər aparmaqla, yarana bilən problemləri qısa zamanda müəyyən edib, aradan qaldırılması üçün operativ və düzgün həll yolları haqqında məlumat əldə etməyə kömək etməkdir.",
  },
  contact: {
    eyebrow: "Əlaqə",
    title: "Analiz sifarişi və sorğular",
    addressTitle: "Ünvan",
    address: "AZ 0101, Xırdalan ş., Həsən Əliyev küç., 120",
    phoneTitle: "Telefon",
    phone: "070 850 15 84",
    b2bNote:
      "B2B müştərilər: şirkət adını və maraqlandığınız paketi qeyd edin -- həcmə uyğun təklif hazırlayaq.",
    form: {
      fullName: "Ad, soyad *",
      phone: "Telefon *",
      email: "E-poçt",
      company: "Şirkət (B2B üçün)",
      serviceInterest: "Maraqlandığınız xidmət",
      serviceInterestPlaceholder: "Məsələn: Torpaq analizi -- Paket 2",
      message: "Mesajınız",
      messagePlaceholder:
        "Nümunə haqqında məlumat, sahənin yeri, sifariş edilən analiz sayı və s.",
      file: "Fayl əlavə edin (sahənin şəkli, sənəd -- opsional)",
      submit: "Sorğunu göndər",
      submitting: "Göndərilir...",
      successTitle: "Təşəkkür edirik!",
      successBody:
        "Sorğunuz qəbul edildi. Komandamız qısa zamanda sizinlə əlaqə saxlayacaq.",
      error:
        "Sorğu göndərilmədi. Zəhmət olmasa bir az sonra yenidən cəhd edin və ya telefonla əlaqə saxlayın.",
    },
  },
};

const en: Dictionary = {
  nav: {
    home: "Home",
    services: "Services",
    about: "About",
    contact: "Contact",
    order: "Order now",
  },
  footer: {
    tagline:
      "An agrochemical analysis laboratory operating under Baku Engineering University.",
    nav: "Navigation",
    contact: "Contact",
    rights: "Baku Engineering University -- Soil, Water and Plant Analysis Laboratory",
  },
  home: {
    eyebrow: "Baku Engineering University",
    titleA: "We read the soil's",
    titleHighlight: "language",
    titleB: "in numbers",
    lead: "We run agrochemical analyses on farmland, irrigation water and plants, giving farmers precise results and a clearly explained report -- for efficient land use and a richer harvest.",
    ctaOrder: "Order an analysis",
    ctaServices: "View services",
    directionsTitle: "Our analysis areas",
    more: "Learn more",
    ctaBoxTitle: "Send us your sample, get your results with a clear report",
    ctaBoxBody:
      "For individual farmers and business clients alike. Please fill in the contact form and our team will reach out to you shortly.",
    ctaBoxButton: "Go to the contact form",
  },
  mission: {
    missionTitle: "Our mission",
    missionBody:
      "Running agrochemical analyses on farmland, other agricultural soil, irrigation water and plants, and providing farmers with protocols detailing the results.",
    visionTitle: "Our vision",
    visionBody:
      "Helping farmers make correct and efficient use of their soil and achieve an abundant harvest.",
    goalTitle: "Our goal",
    goalBody:
      "Providing prompt, correct solutions to help identify and resolve problems quickly.",
  },
  services: {
    eyebrow: "Our services",
    title: "Agrochemical analysis directions",
    lead: "Contact us for a price quote on any of the analyses below -- pricing depends on the number of samples and the package.",
    orderSection: "Order from this section",
    packageLabel: "Package",
  },
  about: {
    eyebrow: "About us",
    title:
      "The Soil, Water and Plant Analysis Laboratory of Baku Engineering University",
    missionTitle: "Mission",
    missionBody:
      "Running agrochemical analyses on farmland, other agricultural soil, irrigation water and plants, and providing farmers with protocols detailing the analysis results.",
    visionTitle: "Vision",
    visionBody:
      "Helping farmers make correct and efficient use of arable soil, plants and irrigation water through agrochemical analysis, so they can achieve an abundant harvest.",
    goalTitle: "Goal",
    goalBody:
      "Ensuring correct processing and high-quality analysis of results so that farmers engaged in crop or plant cultivation can quickly identify problems in their soil composition, irrigation water and cultivated plants, and receive timely, correct guidance on resolving them.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Analysis requests and inquiries",
    addressTitle: "Address",
    address: "AZ 0101, Khirdalan, Hasan Aliyev St. 120",
    phoneTitle: "Phone",
    phone: "070 850 15 84",
    b2bNote:
      "B2B clients: please mention your company name and the package you're interested in -- we'll prepare an offer suited to your volume.",
    form: {
      fullName: "Full name *",
      phone: "Phone *",
      email: "Email",
      company: "Company (for B2B)",
      serviceInterest: "Service you're interested in",
      serviceInterestPlaceholder: "E.g. Soil analysis -- Package 2",
      message: "Your message",
      messagePlaceholder:
        "Details about the sample, field location, number of analyses requested, etc.",
      file: "Attach a file (photo of the field, document -- optional)",
      submit: "Send request",
      submitting: "Sending...",
      successTitle: "Thank you!",
      successBody: "Your request has been received. Our team will contact you shortly.",
      error:
        "The request could not be sent. Please try again shortly, or contact us by phone.",
    },
  },
};

const nl: Dictionary = {
  nav: {
    home: "Home",
    services: "Diensten",
    about: "Over ons",
    contact: "Contact",
    order: "Bestel nu",
  },
  footer: {
    tagline:
      "Een agrochemisch analyselaboratorium onder de Technische Universiteit van Bakoe.",
    nav: "Navigatie",
    contact: "Contact",
    rights: "Technische Universiteit van Bakoe -- Laboratorium voor Bodem-, Water- en Plantanalyse",
  },
  home: {
    eyebrow: "Technische Universiteit van Bakoe",
    titleA: "Wij lezen de taal van de bodem",
    titleHighlight: "in cijfers",
    titleB: "",
    lead: "Wij voeren agrochemische analyses uit op landbouwgrond, irrigatiewater en planten, en bieden boeren nauwkeurige resultaten met een duidelijk toegelicht protocol -- voor efficiënt bodemgebruik en een rijke oogst.",
    ctaOrder: "Analyse bestellen",
    ctaServices: "Bekijk diensten",
    directionsTitle: "Onze analyserichtingen",
    more: "Meer informatie",
    ctaBoxTitle: "Stuur ons uw monster, ontvang uw resultaat met een duidelijk protocol",
    ctaBoxBody:
      "Voor zowel individuele boeren als zakelijke klanten. Vul het contactformulier in en ons team neemt spoedig contact met u op.",
    ctaBoxButton: "Naar het contactformulier",
  },
  mission: {
    missionTitle: "Onze missie",
    missionBody:
      "Het uitvoeren van agrochemische analyses op landbouwgrond, andere landbouwgronden, irrigatiewater en planten, en boeren voorzien van protocollen met de resultaten.",
    visionTitle: "Onze visie",
    visionBody:
      "Boeren helpen hun bodem correct en efficiënt te gebruiken en een rijke oogst te behalen.",
    goalTitle: "Ons doel",
    goalBody:
      "Snelle, juiste oplossingen bieden om problemen snel te identificeren en op te lossen.",
  },
  services: {
    eyebrow: "Onze diensten",
    title: "Agrochemische analyserichtingen",
    lead: "Neem contact met ons op voor een prijsopgave voor onderstaande analyses -- de prijs hangt af van het aantal monsters en het gekozen pakket.",
    orderSection: "Bestel via deze sectie",
    packageLabel: "Pakket",
  },
  about: {
    eyebrow: "Over ons",
    title:
      "Het Laboratorium voor Bodem-, Water- en Plantanalyse van de Technische Universiteit van Bakoe",
    missionTitle: "Missie",
    missionBody:
      "Het uitvoeren van agrochemische analyses op landbouwgrond, andere landbouwgronden, irrigatiewater en planten, en boeren voorzien van protocollen met de analyseresultaten.",
    visionTitle: "Visie",
    visionBody:
      "Boeren helpen hun akkerland, planten en irrigatiewater correct en efficiënt te gebruiken door middel van agrochemische analyse, zodat zij een rijke oogst kunnen behalen.",
    goalTitle: "Doel",
    goalBody:
      "Zorgen voor correcte verwerking en hoogwaardige analyse van resultaten, zodat boeren die aan akkerbouw of plantenteelt doen snel problemen in hun bodemsamenstelling, irrigatiewater en gewassen kunnen vaststellen en tijdig de juiste oplossingen krijgen aangereikt.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Analyseaanvragen en vragen",
    addressTitle: "Adres",
    address: "AZ 0101, Khirdalan, Hasan Aliyevstraat 120",
    phoneTitle: "Telefoon",
    phone: "070 850 15 84",
    b2bNote:
      "Zakelijke klanten: vermeld uw bedrijfsnaam en het pakket waarin u geïnteresseerd bent -- wij stellen een passend aanbod op basis van uw volume samen.",
    form: {
      fullName: "Volledige naam *",
      phone: "Telefoon *",
      email: "E-mail",
      company: "Bedrijf (voor B2B)",
      serviceInterest: "Dienst waarin u geïnteresseerd bent",
      serviceInterestPlaceholder: "Bijv. Bodemanalyse -- Pakket 2",
      message: "Uw bericht",
      messagePlaceholder:
        "Details over het monster, locatie van het perceel, aantal gewenste analyses, enz.",
      file: "Bestand toevoegen (foto van het veld, document -- optioneel)",
      submit: "Aanvraag versturen",
      submitting: "Versturen...",
      successTitle: "Hartelijk dank!",
      successBody: "Uw aanvraag is ontvangen. Ons team neemt spoedig contact met u op.",
      error:
        "De aanvraag kon niet worden verzonden. Probeer het straks opnieuw of neem telefonisch contact op.",
    },
  },
};

const ru: Dictionary = {
  nav: {
    home: "Главная",
    services: "Услуги",
    about: "О нас",
    contact: "Контакты",
    order: "Заказать",
  },
  footer: {
    tagline:
      "Агрохимическая аналитическая лаборатория при Бакинском инженерном университете.",
    nav: "Навигация",
    contact: "Контакты",
    rights: "Бакинский инженерный университет -- Лаборатория анализа почвы, воды и растений",
  },
  home: {
    eyebrow: "Бакинский инженерный университет",
    titleA: "Мы читаем язык почвы",
    titleHighlight: "в цифрах",
    titleB: "",
    lead: "Мы проводим агрохимический анализ почвы, поливной воды и растений, предоставляя фермерам точные результаты и подробно разъяснённый протокол -- для эффективного использования земли и богатого урожая.",
    ctaOrder: "Заказать анализ",
    ctaServices: "Смотреть услуги",
    directionsTitle: "Наши направления анализа",
    more: "Подробнее",
    ctaBoxTitle: "Отправьте нам свой образец, получите результат с подробным протоколом",
    ctaBoxBody:
      "Для частных фермеров и корпоративных клиентов. Пожалуйста, заполните форму обратной связи -- наша команда свяжется с вами в ближайшее время.",
    ctaBoxButton: "Перейти к форме связи",
  },
  mission: {
    missionTitle: "Наша миссия",
    missionBody:
      "Проведение агрохимического анализа почвы, пригодной для сельского хозяйства, поливной воды и растений с последующим предоставлением фермерам протоколов результатов.",
    visionTitle: "Наше видение",
    visionBody:
      "Помочь фермерам правильно и эффективно использовать почву и получать богатый урожай.",
    goalTitle: "Наша цель",
    goalBody:
      "Предоставление оперативных и правильных решений для быстрого выявления и устранения возникающих проблем.",
  },
  services: {
    eyebrow: "Наши услуги",
    title: "Направления агрохимического анализа",
    lead: "Свяжитесь с нами для получения ценового предложения по любому из указанных ниже анализов -- цена зависит от количества образцов и выбранного пакета.",
    orderSection: "Заказать по этому разделу",
    packageLabel: "Пакет",
  },
  about: {
    eyebrow: "О нас",
    title:
      "Лаборатория анализа почвы, воды и растений Бакинского инженерного университета",
    missionTitle: "Миссия",
    missionBody:
      "Проведение агрохимического анализа почвы, пригодной для сельского хозяйства, поливной воды и растений с предоставлением фермерам протоколов результатов анализа.",
    visionTitle: "Видение",
    visionBody:
      "Помочь фермерам правильно и эффективно использовать пахотные земли, растения и поливную воду посредством агрохимического анализа для получения богатого урожая.",
    goalTitle: "Цель",
    goalBody:
      "Обеспечение правильной обработки и высококачественного анализа результатов, чтобы фермеры, занимающиеся земледелием или растениеводством, могли быстро выявлять проблемы в составе почвы, поливной воде и выращиваемых растениях и получать оперативные и верные рекомендации по их устранению.",
  },
  contact: {
    eyebrow: "Контакты",
    title: "Заявки на анализ и вопросы",
    addressTitle: "Адрес",
    address: "AZ 0101, г. Хырдалан, ул. Гасана Алиева, 120",
    phoneTitle: "Телефон",
    phone: "070 850 15 84",
    b2bNote:
      "Корпоративным клиентам: укажите название компании и интересующий пакет -- мы подготовим предложение с учётом объёма.",
    form: {
      fullName: "Имя, фамилия *",
      phone: "Телефон *",
      email: "Эл. почта",
      company: "Компания (для B2B)",
      serviceInterest: "Интересующая услуга",
      serviceInterestPlaceholder: "Например: Анализ почвы -- Пакет 2",
      message: "Ваше сообщение",
      messagePlaceholder:
        "Информация об образце, местоположение участка, количество заказываемых анализов и т.д.",
      file: "Прикрепить файл (фото участка, документ -- необязательно)",
      submit: "Отправить заявку",
      submitting: "Отправка...",
      successTitle: "Спасибо!",
      successBody: "Ваша заявка принята. Наша команда свяжется с вами в ближайшее время.",
      error:
        "Не удалось отправить заявку. Попробуйте немного позже или свяжитесь с нами по телефону.",
    },
  },
};

const dictionaries: Record<Locale, Dictionary> = { az, en, nl, ru };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.az;
}
