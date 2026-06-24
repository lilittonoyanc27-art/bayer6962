export interface VerbConjugation {
  verb: string;
  meaning: string;
  tú: string;
  usted: string;
  vosotros: string;
  ustedes: string;
  mnemonic: string;
  explanation: string;
  example: string;
  translation: string;
}

export const IRREGULAR_VERBS: VerbConjugation[] = [
  {
    verb: "decir",
    meaning: "ասել, խոսել",
    tú: "di",
    usted: "diga",
    vosotros: "decid",
    ustedes: "digan",
    mnemonic: "di",
    explanation: "«Tú» ձևը կրճատված է «di»-ի։ Հարգալից «usted» և «ustedes» ձևերը կառուցվում են սահմանական եղանակի ներկա ժամանակի (Presente) առաջին դեմքի հիմքից (digo -> dig- -> diga/digan)։ «Vosotros» ձևը կանոնավոր է՝ անորոշ դերբայից (decir) դեն ենք նետում «-r»-ը և ավելացնում «-d» -> decid։",
    example: "¡Di la verdad!",
    translation: "Ասա՛ ճշմարտությունը"
  },
  {
    verb: "hacer",
    meaning: "անել",
    tú: "haz",
    usted: "haga",
    vosotros: "haced",
    ustedes: "hagan",
    mnemonic: "haz",
    explanation: "«Tú» ձևը կրճատված է «haz»-ի։ Հարգալից «usted/ustedes» ձևերը վերցվում են Presente-ի առաջին դեմքի հիմքից (hago -> hag- -> haga/hagan)։ «Vosotros» ձևը կանոնավոր է՝ hacer -> haced։",
    example: "¡Haz los deberes!",
    translation: "Արա՛ տնային աշխատանքը"
  },
  {
    verb: "ir",
    meaning: "գնալ",
    tú: "ve",
    usted: "vaya",
    vosotros: "id",
    ustedes: "vayan",
    mnemonic: "ve",
    explanation: "Քամելեոն բայ։ «Tú» ձևը «ve» է (համընկնում է ver բայի «նա տեսնում է» ձևի հետ, բայց այստեղ նշանակում է «գնա՛»)։ «Usted/ustedes» ձևերը «vaya/vayan» են (ըղձական եղանակից)։ «Vosotros» ձևը «id» է (ընդամենը երկու տառ)։",
    example: "¡Ve al grano!",
    translation: "Անցի՛ր գործին"
  },
  {
    verb: "poner",
    meaning: "դնել, տեղադրել, հագնել",
    tú: "pon",
    usted: "ponga",
    vosotros: "poned",
    ustedes: "pongan",
    mnemonic: "pon",
    explanation: "«Tú» ձևը կրճատվում է «pon»-ի։ «Usted/ustedes» ձևերը կառուցվում են Presente-ի եզակի թվի 1-ին դեմքի հիմքի վրա (pongo -> pong- -> ponga/pongan)։ «Vosotros» ձևը՝ poner -> poned։",
    example: "¡Pon la mesa!",
    translation: "Սեղա՛նը գցիր"
  },
  {
    verb: "salir",
    meaning: "դուրս գալ",
    tú: "sal",
    usted: "salga",
    vosotros: "salid",
    ustedes: "salgan",
    mnemonic: "sal",
    explanation: "«Tú» ձևը համընկնում է «աղ» բառի հետ՝ «sal»։ «Usted/ustedes» ձևերը կառուցվում են «salgo» հիմքից (subjuntivo՝ salga/salgan)։ «Vosotros» ձևը՝ salir -> salid։",
    example: "¡Sal de aquí!",
    translation: "Դո՛ւրս արի այստեղից"
  },
  {
    verb: "ser",
    meaning: "լինել",
    tú: "sé",
    usted: "sea",
    vosotros: "sed",
    ustedes: "sean",
    mnemonic: "sé",
    explanation: "«Tú» ձևում գրվում է գրաֆիկական շեշտ «sé»՝ անդրադարձ դերանուն «se»-ի հետ չշփոթելու համար։ «Usted/ustedes» ձևերը «sea/sean» են, իսկ «vosotros» ձևը՝ «sed»։",
    example: "¡Sé tú mismo!",
    translation: "Եղի՛ր ինքդ քեզ պես"
  },
  {
    verb: "tener",
    meaning: "ունենալ",
    tú: "ten",
    usted: "tenga",
    vosotros: "tened",
    ustedes: "tengan",
    mnemonic: "ten",
    explanation: "«Tú» ձևը կրճատված «ten»-ն է («պահի՛ր» կամ «ունեցի՛ր»)։ «Usted/ustedes» ձևերը կառուցվում են «tengo» հիմքից (subjuntivo՝ tenga/tengan)։ «Vosotros» ձևը՝ tener -> tened։",
    example: "¡Ten cuidado!",
    translation: "Զգո՛ւյշ եղիր (Բառացի՝ ունեցիր զգուշություն)"
  },
  {
    verb: "venir",
    meaning: "գալ, ժամանել",
    tú: "ven",
    usted: "venga",
    vosotros: "venid",
    ustedes: "vengan",
    mnemonic: "ven",
    explanation: "«Tú» ձևն է «ven» («արի՛ այստեղ»)։ Հաճախ շփոթում են իսպաներեն «ver»-ի հետ, բայց սա հենց «գալն» է։ «Usted/ustedes» ձևերն են՝ «venga/vengan»։ «Vosotros» ձևը՝ venir -> venid։",
    example: "¡Ven aquí!",
    translation: "Արի՛ այստեղ"
  }
];

// Game 1: "Tú Master"
export interface Game1Question {
  id: number;
  verb: string;
  sentence: string;
  options: string[];
  correct: string;
  explanation: string;
}

export const GAME1_QUESTIONS: Game1Question[] = [
  {
    id: 1,
    verb: "hacer",
    sentence: "¡___ (hacer) el favor de callarte!",
    options: ["hace", "hagas", "haz", "haga"],
    correct: "haz",
    explanation: "«Tú» դերանվան համար hacer բայի հրամայական եղանակը կրճատվում է «haz»-ի։ «Hace»-ն սովորական ներկա ժամանակն է, իսկ «hagas»-ն օգտագործվում է միայն ժխտման դեպքում (No hagas)։"
  },
  {
    id: 2,
    verb: "decir",
    sentence: "¡___ (decir) lo que piensas de verdad!",
    options: ["deci", "dices", "diga", "di"],
    correct: "di",
    explanation: "Decir-ի կարճ և հնչեղ «tú» ձևը «di»-ն է։ Մի՛ շփոթեք նախդիրների հետ, իսպաներեն հրամայականում դա նշանակում է «ասա՛»։"
  },
  {
    id: 3,
    verb: "tener",
    sentence: "¡___ (tener) paciencia con los niños!",
    options: ["tene", "ten", "tenga", "tienes"],
    correct: "ten",
    explanation: "Tener-ի ճիշտ «tú» ձևն է «ten»։ «Tene» սխալը շատ տարածված է օտարերկրացիների մոտ, քանի որ նրանք փորձում են ձևը կանոնավոր կերպով կազմել։"
  },
  {
    id: 4,
    verb: "ir",
    sentence: "¡___ (ir) a ver qué pasa en la cocina!",
    options: ["va", "ve", "vaya", "ves"],
    correct: "ve",
    explanation: "Ir բայի «tú» ձևը «ve»-ն է։ Այն համընկնում է ver բայի «նա տեսնում է» ձևի հետ, բայց համատեքստում միշտ հասկանալի է, որ դա շարժման կոչ է («գնա՛»)։"
  },
  {
    id: 5,
    verb: "poner",
    sentence: "¡___ (poner) las llaves in la mesa, por favor!",
    options: ["pone", "ponga", "pongas", "pon"],
    correct: "pon",
    explanation: "Poner-ի համար կարճ «tú» ձևը «pon»-ն է։ «Pone» ձևը քերականորեն սխալ է հաստատական հրամայական «tú»-ի համար (դա սահմանական ներկա ժամանակն է)։"
  },
  {
    id: 6,
    verb: "salir",
    sentence: "¡___ (salir) de ahí, es muy peligroso!",
    options: ["sal", "sale", "salgas", "salga"],
    correct: "sal",
    explanation: "Salir-ի «tú» հրամայականը «sal»-ն է։ Հնչում է շատ համառոտ և թարգմանվում է «դո՛ւրս արի»։"
  },
  {
    id: 7,
    verb: "ser",
    sentence: "¡___ (ser) amable con tus nuevos compañeros!",
    options: ["se", "sea", "sé", "eres"],
    correct: "sé",
    explanation: "«Tú»-ի համար օգտագործվում է «sé»՝ գրաֆիկական շեշտով (tilde), որպեսզի գրավոր տարբերվի «se» դերանունից (օրինակ՝ se lava)։"
  },
  {
    id: 8,
    verb: "venir",
    sentence: "¡___ (venir) a mi casa esta noche!",
    options: ["ven", "viene", "venga", "vienes"],
    correct: "ven",
    explanation: "Venir-ի «tú» ձևը «ven»-ն է (արի՛ / եկո՛ւր)։ Պահե՛ք մտքում այս կրճատված ձևը։"
  }
];

// Game 2: Conjugation Puzzle
export interface PuzzleItem {
  id: string;
  verb: string;
  pronoun: "tú" | "usted" | "vosotros" | "ustedes";
  correctForm: string;
}

export const PUZZLE_ITEMS: PuzzleItem[] = [
  { id: "p1", verb: "ser", pronoun: "usted", correctForm: "sea" },
  { id: "p2", verb: "hacer", pronoun: "vosotros", correctForm: "haced" },
  { id: "p3", verb: "ir", pronoun: "ustedes", correctForm: "vayan" },
  { id: "p4", verb: "decir", pronoun: "usted", correctForm: "diga" },
  { id: "p5", verb: "poner", pronoun: "vosotros", correctForm: "poned" },
  { id: "p6", verb: "venir", pronoun: "tú", correctForm: "ven" },
  { id: "p7", verb: "tener", pronoun: "ustedes", correctForm: "tengan" },
  { id: "p8", verb: "salir", pronoun: "tú", correctForm: "sal" }
];

// Game 3: Word Search (Sopa de Letras)
export const WORD_SEARCH_GRID = [
  ["H", "A", "Z", "X", "V", "E", "C", "D"],
  ["E", "P", "O", "N", "F", "G", "H", "I"],
  ["D", "I", "J", "K", "L", "M", "N", "O"],
  ["T", "E", "N", "P", "Q", "R", "S", "T"],
  ["S", "A", "L", "U", "V", "W", "X", "Y"],
  ["S", "E", "Z", "A", "B", "C", "D", "E"],
  ["V", "E", "N", "F", "G", "H", "I", "J"],
  ["K", "L", "M", "N", "O", "P", "Q", "R"]
];

export interface SearchWord {
  word: string;
  verb: string;
  meaning: string;
  pronoun: string;
  coords: { r: number; c: number }[];
}

export const SEARCH_WORDS: SearchWord[] = [
  {
    word: "HAZ",
    verb: "hacer",
    meaning: "արա՛",
    pronoun: "tú",
    coords: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 2 }]
  },
  {
    word: "VE",
    verb: "ir",
    meaning: "գնա՛",
    pronoun: "tú",
    coords: [{ r: 0, c: 4 }, { r: 0, c: 5 }]
  },
  {
    word: "PON",
    verb: "poner",
    meaning: "դի՛ր",
    pronoun: "tú",
    coords: [{ r: 1, c: 1 }, { r: 1, c: 2 }, { r: 1, c: 3 }]
  },
  {
    word: "DI",
    verb: "decir",
    meaning: "ասա՛",
    pronoun: "tú",
    coords: [{ r: 2, c: 0 }, { r: 2, c: 1 }]
  },
  {
    word: "TEN",
    verb: "tener",
    meaning: "ունեցի՛ր / պահի՛ր",
    pronoun: "tú",
    coords: [{ r: 3, c: 0 }, { r: 3, c: 1 }, { r: 3, c: 2 }]
  },
  {
    word: "SAL",
    verb: "salir",
    meaning: "դո՛ւրս արի",
    pronoun: "tú",
    coords: [{ r: 4, c: 0 }, { r: 4, c: 1 }, { r: 4, c: 2 }]
  },
  {
    word: "SE",
    verb: "ser",
    meaning: "եղի՛ր",
    pronoun: "tú",
    coords: [{ r: 5, c: 0 }, { r: 5, c: 1 }]
  },
  {
    word: "VEN",
    verb: "venir",
    meaning: "արի՛",
    pronoun: "tú",
    coords: [{ r: 6, c: 0 }, { r: 6, c: 1 }, { r: 6, c: 2 }]
  }
];

// Game 4: "El Mensajero del Rey"
export interface QuestStage {
  id: number;
  character: string;
  avatar: string;
  pronoun: "tú" | "usted" | "vosotros" | "ustedes";
  verb: string;
  context: string;
  dialogue: string;
  options: { text: string; correct: boolean }[];
  explanation: string;
}

export const QUEST_STAGES: QuestStage[] = [
  {
    id: 1,
    character: "Ծառա Պեդրո",
    avatar: "🧑‍🍳",
    pronoun: "tú",
    verb: "venir",
    context: "Թագավորը սոված է և հրամայում է երիտասարդ ծառա Պեդրոյին բերել տոնական կերակուրը։ Ինչպե՞ս կփոխանցեք թագավորի հրամանը։",
    dialogue: "«Հե՛յ, Պեդրո՛։ Թագավորը հրամայում է քեզ. ... այստեղ տապակած վարազի մսով։»",
    options: [
      { text: "¡Viene!", correct: false },
      { text: "¡Venga!", correct: false },
      { text: "¡Ven!", correct: true },
      { text: "¡Vienes!", correct: false }
    ],
    explanation: "«Tú» դերանունը պահանջում է venir բայի կրճատված «ven» ձևը։ «Venga»-ն կհամապատասխաներ հարգալից «usted» դիմելաձևին, իսկ «viene»-ն սահմանական եղանակն է։"
  },
  {
    id: 2,
    character: "Արքեպիսկոպոս Սանտյագո",
    avatar: "🧙‍♂️",
    pronoun: "usted",
    verb: "ser",
    context: "Պալատ է ժամանել հարգարժան արքեպիսկոպոսը։ Թագավորը ցանկանում է քաղաքավարի ողջունել նրան։ Դուք փոխանցում եք հարգելի հյուրին.",
    dialogue: "«Ձերդ Սրբազնություն, թագավորը խնդրում է ձեզ. ... օրհնյալ մեր պատերի ներսում։»",
    options: [
      { text: "¡Sé!", correct: false },
      { text: "¡Sea!", correct: true },
      { text: "¡Sed!", correct: false },
      { text: "¡Sean!", correct: false }
    ],
    explanation: "Հարգալից «usted» դիմելաձևի համար (մեկ անձին «Դուք»-ով դիմելիս) ser բայը ստանում է «sea» ձևը, որը վերցված է Presente de Subjuntivo-ից։"
  },
  {
    id: 3,
    character: "Կլոր սեղանի ասպետները",
    avatar: "⚔️",
    pronoun: "vosotros",
    verb: "salir",
    context: "Ամրոցի վրա ավազակներ են հարձակվում։ Թագավորը գոռում է իր ասպետներին («vosotros» դիմելաձև՝ «դուք, ընկերներ»)",
    dialogue: "«Իմ հավատարի՛մ մարտիկներ։ ... անմիջապես բակ և պաշտպանեք դարպասները։»",
    options: [
      { text: "¡Salid!", correct: true },
      { text: "¡Salgan!", correct: false },
      { text: "¡Sal!", correct: false },
      { text: "¡Salis!", correct: false }
    ],
    explanation: "«Vosotros» ձևի համար հաստատական հրամայականը կազմվում է լիովին կանոնավոր՝ անորոշ դերբայից (salir) դեն է նետվում «-r» տառը և ավելանում է «-d» -> «salid»։"
  },
  {
    id: 4,
    character: "Օտարերկրյա դեսպաններ",
    avatar: "🤵🤵",
    pronoun: "ustedes",
    verb: "tener",
    context: "Օտարերկրյա դեսպանները կանգնած են գահի առաջ։ Թագավորը ցանկանում է քաղաքավարի խնդրել նրանց համբերատար լինել.",
    dialogue: "«Հարգարժան պարոնայք դեսպաններ, խնդրում ենք... համբերություն, բանակցությունները շուտով կսկսվեն։»",
    options: [
      { text: "¡Ten!", correct: false },
      { text: "¡Tened!", correct: false },
      { text: "¡Tengan!", correct: true },
      { text: "¡Tenga!", correct: false }
    ],
    explanation: "Մի խումբ մարդկանց հարգալից դիմելիս (ustedes) tener բայը ստանում է «tengan» ձևը (սահմանական ներկայի առաջին դեմքից՝ tengo -> tengan)։"
  },
  {
    id: 5,
    character: "Ծաղրածու Չիկո",
    avatar: "🃏",
    pronoun: "tú",
    verb: "decir",
    context: "Թագավորը ձանձրացել է և ցանկանում է, որ ծաղրածու Չիկոն իր համար անեկդոտ պատմի։ Դուք ծաղրածուին եք փոխանցում թագավորի հրամանը.",
    dialogue: "«Չիկո՛, ծիծաղեցրո՛ւ արքային։ ... մեզ ամենազվարճալի կատակը։»",
    options: [
      { text: "¡Diga!", correct: false },
      { text: "¡Decid!", correct: false },
      { text: "¡Dices!", correct: false },
      { text: "¡Di!", correct: true }
    ],
    explanation: "Decir բայի հրամայական «tú» ձևը կրճատվում է լակոնիկ «di»-ի։ Հիանալի կարճ ձև թագավորական արագ հրամանի համար։"
  },
  {
    id: 6,
    character: "Թագուհի Իզաբելլա",
    avatar: "👑",
    pronoun: "usted",
    verb: "ir",
    context: "Թագուհին մեկնում է պարտեզ զբոսնելու։ Հոգատար թագավորը հրաժեշտին քաղաքավարի ասում է նրան.",
    dialogue: "«Իմ սիրելի՛ կին, ... Դուք խաղաղությամբ, և թող թիկնազորն ուղեկցի Ձեզ։»",
    options: [
      { text: "¡Vete!", correct: false },
      { text: "¡Vaya!", correct: true },
      { text: "¡Id!", correct: false },
      { text: "¡Ve!", correct: false }
    ],
    explanation: "Թագուհուն ուղղված հարգալից «usted» դիմելաձևի համար օգտագործվում է «vaya» ձևը (ir բայից՝ վերցված ըղձական եղանակից)։"
  }
];

// Game 5: Mnemonic Match
export interface MnemonicCard {
  id: string;
  spanish: string;
  russian: string;
  verb: string;
  usageContext: string;
}

export const MNEMONIC_CARDS: MnemonicCard[] = [
  {
    id: "m1",
    spanish: "¡Sé tú mismo!",
    russian: "Եղի՛ր ինքդ քեզ պես",
    verb: "ser",
    usageContext: "SER բայը «tú» ձևում դառնում է «SÉ»՝ շեշտով։"
  },
  {
    id: "m2",
    spanish: "¡Haz lo que quieras!",
    russian: "Արա՛ ինչ ուզում ես",
    verb: "hacer",
    usageContext: "HACER բայը կրճատվում է «HAZ»-ի։ Արտահայտում է ընտրության լիակատար ազատություն։"
  },
  {
    id: "m3",
    spanish: "¡Dime la verdad!",
    russian: "Ասա՛ ինձ ճշմարտությունը",
    verb: "decir",
    usageContext: "DECIR բայը «tú» ձևում «DI» է։ «Me» դերանվան հետ գրվում է միասին։"
  },
  {
    id: "m4",
    spanish: "¡Ten cuidado!",
    russian: "Զգո՛ւյշ եղիր",
    verb: "tener",
    usageContext: "TENER բայը «tú» ձևում «TEN» է։ Բառացի՝ «ունեցիր զգուշություն»։"
  },
  {
    id: "m5",
    spanish: "¡Ponte las pilas!",
    russian: "Ակտիվացի՛ր (Մարտկոցներդ դիր)",
    verb: "poner",
    usageContext: "PONER բայը «tú» ձևում «PON» է։ Անդրադարձ ձևում՝ PON + TE։"
  },
  {
    id: "m6",
    spanish: "¡Sal de aquí!",
    russian: "Դո՛ւրս արի այստեղից",
    verb: "salir",
    usageContext: "SALIR բայը կրճատվում է «SAL»-ի։ Տեղանքը լքելու խիստ պահանջ։"
  },
  {
    id: "m7",
    spanish: "¡Vete ya!",
    russian: "Գնա՛ արդեն",
    verb: "ir",
    usageContext: "IR բայը «tú» ձևում «VE» է։ Անդրադարձ մասնիկով՝ VE + TE։"
  },
  {
    id: "m8",
    spanish: "¡Ven aquí!",
    russian: "Արի՛ այստեղ",
    verb: "venir",
    usageContext: "VENIR բայը «tú» ձևում «VEN» է։ Շատ հաճախ է օգտագործվում առօրյա խոսքում։"
  }
];

// Game 6: Grammar Defender
export interface DefenderSentence {
  id: number;
  text: string;
  isCorrect: boolean;
  explanation: string;
  correction?: string;
}

export const DEFENDER_SENTENCES: DefenderSentence[] = [
  {
    id: 1,
    text: "¡Haces tu tarea ahora mismo, Pedro!",
    isCorrect: false,
    correction: "¡Haz tu tarea ahora mismo, Pedro!",
    explanation: "Սխալ է։ «Haces»-ը սահմանական ներկա ժամանակի ձևն է (Presente de Indicativo)։ Հրամայական եղանակում (tú) hacer բայն ունի անկանոն կրճատված «haz» ձևը։"
  },
  {
    id: 2,
    text: "¡Diga la verdad en el juicio, Señor Gómez!",
    isCorrect: true,
    explanation: "Ճիշտ է։ Հարգալից «usted» ձևի համար decir բայը ստանում է «diga» ձևը, որը վերցվում է ըղձական եղանակից (digo -> diga)։"
  },
  {
    id: 3,
    text: "¡Venid a celebrar con nosotros, amigos!",
    isCorrect: true,
    explanation: "Ճիշտ է։ «Vosotros»-ի (դուք, ընկերներ) համար ձևը կազմվում է կանոնավոր՝ venir-ից հեռացնում ենք «-r»-ը և ավելացնում «-d» -> «venid»։"
  },
  {
    id: 4,
    text: "¡Tene cuidado al cruzar la calle, por favor!",
    isCorrect: false,
    correction: "¡Ten cuidado al cruzar la calle, por favor!",
    explanation: "Սխալ է։ «Tene»-ն հաճախակի հանդիպող սխալ է՝ ձևը կանոնավոր կազմելու փորձի պատճառով։ Tener-ի ճիշտ «tú» ձևը կրճատված «ten»-ն է։"
  },
  {
    id: 5,
    text: "¡Sále de mi habitación inmediatamente!",
    isCorrect: false,
    correction: "¡Sal de mi habitación inmediatamente!",
    explanation: "Սխալ է։ «Sále» գոյություն չունի։ Salir-ի ճիշտ «tú» հրամայականը «sal»-ն է։ Եթե օգտագործվում է անդրադարձ ձևը, գրվում է «salte»։"
  },
  {
    id: 6,
    text: "¡Vete al supermercado si necesitas algo!",
    isCorrect: true,
    explanation: "Ճիշտ է։ Սա անդրադարձ irse (հեռանալ) բայի հրամայականն է։ Ir բայի «tú» հրամայականն է «ve» + «te» մասնիկը -> «vete»։"
  },
  {
    id: 7,
    text: "¡Pone los libros encima del armario, Juan!",
    isCorrect: false,
    correction: "¡Pon los libros encima del armario, Juan!",
    explanation: "Սխալ է։ «Pone»-ն սահմանական եղանակի ձևն է (նա դնում է)։ Poner-ի ճիշտ «tú» հրամայականը «pon»-ն է։"
  },
  {
    id: 8,
    text: "¡Sean amables con los invitados, chicos!",
    isCorrect: true,
    explanation: "Ճիշտ է։ «Ustedes»-ի (Դուք, մարդկանց խումբ) համար ser բայը ստանում է «sean» ձևը (վերցված է Presente de Subjuntivo-ից)։"
  }
];
