import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Gamepad2,
  CheckCircle2,
  XCircle,
  Crown,
  ArrowRight,
  RefreshCw,
  HelpCircle,
  Info,
  Sparkles,
  Trophy,
  ChevronRight,
  Zap,
  Languages,
  Grid,
  Map,
  ShieldCheck,
  UserCheck,
  Smile,
  GraduationCap,
  ChevronLeft,
  Volume2
} from "lucide-react";
import {
  IRREGULAR_VERBS,
  GAME1_QUESTIONS,
  PUZZLE_ITEMS,
  WORD_SEARCH_GRID,
  SEARCH_WORDS,
  QUEST_STAGES,
  MNEMONIC_CARDS,
  DEFENDER_SENTENCES,
  VerbConjugation
} from "./data";

export default function App() {
  const [activeTab, setActiveTab] = useState<"theory" | "games">("theory");
  const [selectedVerb, setSelectedVerb] = useState<VerbConjugation | null>(IRREGULAR_VERBS[0]);
  const [activeGameId, setActiveGameId] = useState<number | null>(null);

  // States for Game 1: Tú Master
  const [g1Index, setG1Index] = useState(0);
  const [g1SelectedAnswer, setG1SelectedAnswer] = useState<string | null>(null);
  const [g1Score, setG1Score] = useState(0);
  const [g1Finished, setG1Finished] = useState(false);

  // States for Game 2: Conjugation Puzzle
  const [g2Placements, setG2Placements] = useState<{ [key: string]: string }>({}); // { puzzleItemId: placedForm }
  const [g2SelectedTile, setG2SelectedTile] = useState<string | null>(null); // form string
  const [g2Checked, setG2Checked] = useState(false);
  const [g2Score, setG2Score] = useState(0);
  const [g2Finished, setG2Finished] = useState(false);

  // States for Game 3: Word Search
  const [g3SelectedCoords, setG3SelectedCoords] = useState<{ r: number; c: number }[]>([]);
  const [g3FoundWords, setG3FoundWords] = useState<string[]>([]); // list of uppercase words found
  const [g3CurrentExpl, setG3CurrentExpl] = useState<{ word: string; verb: string; meaning: string; pronoun: string } | null>(null);
  const [g3Finished, setG3Finished] = useState(false);

  // States for Game 4: King's Messenger
  const [g4Stage, setG4Stage] = useState(0);
  const [g4Answered, setG4Answered] = useState(false);
  const [g4SelectedCorrect, setG4SelectedCorrect] = useState<boolean | null>(null);
  const [g4Score, setG4Score] = useState(0);
  const [g4Finished, setG4Finished] = useState(false);

  // States for Game 5: Mnemonic Match
  const [g5Cards, setG5Cards] = useState<{ id: string; text: string; type: "es" | "ru"; matchId: string }[]>([]);
  const [g5SelectedCardId, setG5SelectedCardId] = useState<string | null>(null);
  const [g5MatchedIds, setG5MatchedIds] = useState<string[]>([]); // list of card ids that are matched
  const [g5ActiveExplanation, setG5ActiveExplanation] = useState<string | null>(null);
  const [g5Finished, setG5Finished] = useState(false);

  // States for Game 6: Grammar Defender
  const [g6Index, setG6Index] = useState(0);
  const [g6Answered, setG6Answered] = useState(false);
  const [g6UserCorrect, setG6UserCorrect] = useState<boolean | null>(null);
  const [g6Score, setG6Score] = useState(0);
  const [g6Finished, setG6Finished] = useState(false);

  // Initialize Memory Cards for Game 5
  const initializeGame5 = () => {
    const cardsList: { id: string; text: string; type: "es" | "ru"; matchId: string }[] = [];
    MNEMONIC_CARDS.forEach((c) => {
      cardsList.push({ id: `${c.id}_es`, text: c.spanish, type: "es", matchId: c.id });
      cardsList.push({ id: `${c.id}_ru`, text: c.russian, type: "ru", matchId: c.id });
    });
    // Shuffle
    const shuffled = [...cardsList].sort(() => Math.random() - 0.5);
    setG5Cards(shuffled);
    setG5SelectedCardId(null);
    setG5MatchedIds([]);
    setG5ActiveExplanation(null);
    setG5Finished(false);
  };

  // Run initializations when active game changes
  useEffect(() => {
    if (activeGameId === 1) {
      setG1Index(0);
      setG1SelectedAnswer(null);
      setG1Score(0);
      setG1Finished(false);
    } else if (activeGameId === 2) {
      setG2Placements({});
      setG2SelectedTile(null);
      setG2Checked(false);
      setG2Score(0);
      setG2Finished(false);
    } else if (activeGameId === 3) {
      setG3SelectedCoords([]);
      setG3FoundWords([]);
      setG3CurrentExpl(null);
      setG3Finished(false);
    } else if (activeGameId === 4) {
      setG4Stage(0);
      setG4Answered(false);
      setG4SelectedCorrect(null);
      setG4Score(0);
      setG4Finished(false);
    } else if (activeGameId === 5) {
      initializeGame5();
    } else if (activeGameId === 6) {
      setG6Index(0);
      setG6Answered(false);
      setG6UserCorrect(null);
      setG6Score(0);
      setG6Finished(false);
    }
  }, [activeGameId]);

  // Handle Game 1 selection
  const handleG1Answer = (opt: string) => {
    if (g1SelectedAnswer !== null) return;
    setG1SelectedAnswer(opt);
    const correctAns = GAME1_QUESTIONS[g1Index].correct;
    if (opt === correctAns) {
      setG1Score((prev) => prev + 1);
    }
  };

  const handleG1Next = () => {
    setG1SelectedAnswer(null);
    if (g1Index + 1 < GAME1_QUESTIONS.length) {
      setG1Index((prev) => prev + 1);
    } else {
      g1FinishedCheck();
    }
  };

  const g1FinishedCheck = () => {
    setG1Finished(true);
  };

  // Handle Game 2 click-to-place
  const handleG2TileSelect = (tile: string) => {
    if (g2Checked) return;
    setG2SelectedTile(tile === g2SelectedTile ? null : tile);
  };

  const handleG2SlotClick = (puzzleItemId: string) => {
    if (g2Checked) return;
    if (!g2SelectedTile) {
      // If clicking already placed slot, remove it
      if (g2Placements[puzzleItemId]) {
        const updated = { ...g2Placements };
        delete updated[puzzleItemId];
        setG2Placements(updated);
      }
      return;
    }
    // Place tile
    setG2Placements({
      ...g2Placements,
      [puzzleItemId]: g2SelectedTile
    });
    setG2SelectedTile(null);
  };

  const checkG2Answers = () => {
    let score = 0;
    PUZZLE_ITEMS.forEach((item) => {
      if (g2Placements[item.id] === item.correctForm) {
        score++;
      }
    });
    setG2Score(score);
    setG2Checked(true);
  };

  // Handle Game 3 grid cell click
  const handleG3CellClick = (r: number, c: number) => {
    const isAlreadySelected = g3SelectedCoords.some((coord) => coord.r === r && coord.c === c);
    let newCoords = [...g3SelectedCoords];

    if (isAlreadySelected) {
      newCoords = newCoords.filter((coord) => !(coord.r === r && coord.c === c));
    } else {
      newCoords.push({ r, c });
    }
    setG3SelectedCoords(newCoords);

    // Build the string from coordinates to check if it's a word
    const letters = newCoords.map((coord) => WORD_SEARCH_GRID[coord.r][coord.c]);
    const spelling = letters.join("");
    const spellingReversed = [...letters].reverse().join("");

    // Check if these coordinates match exactly any of the hidden words
    // (Regardless of selection order, we can check if the set of coordinates matches a word's coordinates)
    const matchedWord = SEARCH_WORDS.find((sw) => {
      if (sw.word.length !== newCoords.length) return false;
      // All coords must be in the word
      const allCoordsMatch = sw.coords.every((sc) =>
        newCoords.some((nc) => nc.r === sc.r && nc.c === sc.c)
      );
      return allCoordsMatch;
    });

    if (matchedWord && !g3FoundWords.includes(matchedWord.word)) {
      const updatedFound = [...g3FoundWords, matchedWord.word];
      setG3FoundWords(updatedFound);
      setG3SelectedCoords([]); // Reset selection for next search
      setG3CurrentExpl({
        word: matchedWord.word,
        verb: matchedWord.verb,
        meaning: matchedWord.meaning,
        pronoun: matchedWord.pronoun
      });

      if (updatedFound.length === SEARCH_WORDS.length) {
        setG3Finished(true);
      }
    }
  };

  // Handle Game 4 King's Messenger Dialogue options
  const handleG4OptionClick = (correct: boolean) => {
    if (g4Answered) return;
    setG4Answered(true);
    setG4SelectedCorrect(correct);
    if (correct) {
      setG4Score((prev) => prev + 1);
    }
  };

  const handleG4Next = () => {
    setG4Answered(false);
    setG4SelectedCorrect(null);
    if (g4Stage + 1 < QUEST_STAGES.length) {
      setG4Stage((prev) => prev + 1);
    } else {
      setG4Finished(true);
    }
  };

  // Handle Game 5 Mnemonic Matching Card click
  const handleG5CardClick = (card: { id: string; text: string; type: "es" | "ru"; matchId: string }) => {
    if (g5MatchedIds.includes(card.id)) return;

    if (g5SelectedCardId === null) {
      setG5SelectedCardId(card.id);
      return;
    }

    if (g5SelectedCardId === card.id) {
      setG5SelectedCardId(null);
      return;
    }

    // Check match
    const previousCard = g5Cards.find((c) => c.id === g5SelectedCardId)!;
    if (previousCard.matchId === card.matchId && previousCard.type !== card.type) {
      // It's a match!
      const newMatched = [...g5MatchedIds, previousCard.id, card.id];
      setG5MatchedIds(newMatched);
      setG5SelectedCardId(null);

      // Show mnemonic info
      const mnemonicInfo = MNEMONIC_CARDS.find((m) => m.id === card.matchId);
      if (mnemonicInfo) {
        setG5ActiveExplanation(
          `¡${mnemonicInfo.spanish}! — ${mnemonicInfo.russian}\n\n💡 Использование глагола ${mnemonicInfo.verb.toUpperCase()}: ${mnemonicInfo.usageContext}`
        );
      }

      if (newMatched.length === g5Cards.length) {
        setG5Finished(true);
      }
    } else {
      // No match
      setG5SelectedCardId(card.id); // change selection to current card
    }
  };

  // Handle Game 6 Grammar Defender Shield click
  const handleG6DefenderClick = (userSelection: boolean) => {
    if (g6Answered) return;
    setG6Answered(true);
    const correctBool = DEFENDER_SENTENCES[g6Index].isCorrect;
    const isCorrectChoice = userSelection === correctBool;
    setG6UserCorrect(isCorrectChoice);
    if (isCorrectChoice) {
      setG6Score((prev) => prev + 1);
    }
  };

  const handleG6Next = () => {
    setG6Answered(false);
    setG6UserCorrect(null);
    if (g6Index + 1 < DEFENDER_SENTENCES.length) {
      setG6Index((prev) => prev + 1);
    } else {
      setG6Finished(true);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 font-sans text-slate-800 transition-colors duration-300">
      {/* Upper Navigation Panel */}
      <header className="sticky top-0 z-40 bg-orange-500 border-b-4 border-orange-700 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-yellow-400 border-2 border-slate-900 rounded-2xl text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <GraduationCap size={24} className="stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-2xl font-black font-display tracking-tight text-white uppercase drop-shadow-[1px_1px_0px_rgba(15,23,42,1)]">
                Imperativo Irregular
              </h1>
              <p className="text-xs text-orange-100 font-bold">
                ¡Domina las 8 excepciones con 6 juegos épicos!
              </p>
            </div>
          </div>

          <div className="flex gap-2 bg-orange-600/50 p-1.5 rounded-2xl border border-orange-400/40">
            <button
              id="theory-tab-btn"
              onClick={() => {
                setActiveTab("theory");
                setActiveGameId(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black transition-all duration-200 ${
                activeTab === "theory" && activeGameId === null
                  ? "bg-yellow-400 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                  : "text-white hover:text-yellow-100 hover:bg-orange-600"
              }`}
            >
              <BookOpen size={16} className="stroke-[2.5]" />
              <span>📚 Տեսություն</span>
            </button>
            <button
              id="games-tab-btn"
              onClick={() => {
                setActiveTab("games");
                if (activeGameId === null) setActiveGameId(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black transition-all duration-200 ${
                activeTab === "games" || activeGameId !== null
                  ? "bg-yellow-400 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                  : "text-white hover:text-yellow-100 hover:bg-orange-600"
              }`}
            >
              <Gamepad2 size={16} className="stroke-[2.5]" />
              <span>🎮 Խաղեր և վարժություններ</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "theory" && activeGameId === null ? (
            <motion.div
              key="theory-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Highlight Banner of 8 main irregulars in 'tú' form */}
              <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-20 transform translate-y-1/4 translate-x-1/8 pointer-events-none">
                  <Sparkles size={250} />
                </div>
                <div className="max-w-3xl space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900/80 border border-slate-700 rounded-full text-xs font-bold text-yellow-300 shadow-sm">
                    <Sparkles size={13} className="fill-yellow-300 stroke-yellow-300" />
                    <span>Հրամայական եղանակի ոսկե կանոնը</span>
                  </div>
                  <h2 className="text-2xl sm:text-3.5xl font-black font-display leading-tight tracking-tight uppercase drop-shadow-[1px_1px_0px_rgba(0,0,0,0.5)]">
                    Գլխավոր բացառությունները կենտրոնացված են <span className="underline decoration-wavy decoration-yellow-300 text-yellow-300">tú</span> ձևում!
                  </h2>
                  <p className="text-sm sm:text-base text-amber-50 font-bold leading-relaxed">
                    Մտապահեք բայի այս ութ կրճատված ձևերը ոչ պաշտոնական դիմելաձևի համար («դու»): Խոսակցական խոսքում իսպանացիները դրանք օգտագործում են ամեն վայրկյան!
                  </p>

                  {/* 8 quick cards */}
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 pt-3">
                    {IRREGULAR_VERBS.map((verb) => (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        key={verb.verb}
                        onClick={() => setSelectedVerb(verb)}
                        className={`cursor-pointer p-2.5 rounded-2xl text-center border-2 transition-all duration-200 select-none ${
                          selectedVerb?.verb === verb.verb
                            ? "bg-yellow-300 text-slate-900 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] font-black"
                            : "bg-white/95 text-slate-800 border-slate-900/60 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.15)] hover:border-slate-900 hover:bg-yellow-100 hover:text-slate-900"
                        }`}
                      >
                        <div className="text-[10px] font-mono opacity-80 uppercase tracking-wider font-extrabold">{verb.verb}</div>
                        <div className="text-lg sm:text-xl font-display font-black tracking-wide mt-0.5">
                          {verb.tú}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Conjugation Table */}
              <div className="bg-white rounded-3xl border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
                <div className="p-6 border-b-2 border-slate-200 bg-yellow-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 font-display uppercase tracking-tight">Imperativo Afirmativo-ի խոնարհման աղյուսակ</h3>
                    <p className="text-xs text-slate-500 font-bold">Կտտացրեք ստորև բերված ցանկացած բայի վրա՝ դրա քերականական առանձնահատկությունները և կենդանի օրինակները տեսնելու համար։</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 bg-amber-100 border-2 border-slate-900 px-3 py-1.5 rounded-xl w-fit">
                    <Info size={14} className="text-slate-900 stroke-[2.5]" />
                    <span>Ոսկե <strong>tú</strong> ձևը շրջանակված է</span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200/80 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                        <th className="py-4 px-6">Անորոշ դերբայ (Infinitivo)</th>
                        <th className="py-4 px-6">tú (դու)</th>
                        <th className="py-4 px-6">usted (Դուք, եզ․ թ․)</th>
                        <th className="py-4 px-6">vosotros (դուք, հոգն․ թ․)</th>
                        <th className="py-4 px-6">ustedes (Դուք, հոգն․ թ․)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-slate-100 text-sm">
                      {IRREGULAR_VERBS.map((v) => {
                        const isSelected = selectedVerb?.verb === v.verb;
                        return (
                          <tr
                            key={v.verb}
                            onClick={() => setSelectedVerb(v)}
                            className={`cursor-pointer transition-colors ${
                              isSelected ? "bg-amber-100/40" : "hover:bg-slate-50/80"
                            }`}
                          >
                            <td className="py-4.5 px-6 font-display font-bold text-slate-900">
                              <span className="text-slate-900 font-extrabold">{v.verb}</span>
                              <span className="block text-xs font-normal text-slate-500 mt-0.5">{v.meaning}</span>
                            </td>
                            <td className="py-4.5 px-6">
                              <span className="inline-flex items-center px-3 py-1.5 bg-yellow-400 text-slate-900 border-2 border-slate-900 rounded-xl font-extrabold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                {v.tú}
                              </span>
                            </td>
                            <td className="py-4.5 px-6 font-bold text-slate-700">{v.usted}</td>
                            <td className="py-4.5 px-6 font-bold text-slate-700">{v.vosotros}</td>
                            <td className="py-4.5 px-6 font-bold text-slate-700">{v.ustedes}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Dynamic Verb Details Panel */}
              {selectedVerb && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-3xl border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 relative overflow-hidden"
                >
                  <div className="absolute right-0 top-0 w-32 h-32 bg-yellow-100 rounded-full -mr-16 -mt-16 pointer-events-none border-2 border-slate-900/10" />
                  
                  <div className="md:col-span-4 space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-900 border-2 border-orange-300 rounded-full text-xs font-black">
                      <Languages size={12} className="stroke-[2.5]" />
                      <span>Քերականական վերլուծություն</span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-4xl font-black font-display text-slate-900 uppercase tracking-tight">
                        {selectedVerb.verb}
                      </h3>
                      <p className="text-slate-500 font-extrabold">{selectedVerb.meaning}</p>
                    </div>
                    
                    <div className="bg-amber-50 rounded-2xl p-4.5 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-black text-orange-600 uppercase tracking-wider">
                        <span>Կենդանի օրինակ</span>
                        <Volume2 size={14} className="text-orange-500 cursor-pointer hover:scale-110 transition stroke-[2.5]" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-2xl font-black font-display text-orange-600 tracking-wide">
                          {selectedVerb.example}
                        </div>
                        <div className="text-sm font-bold text-slate-700 italic">
                          {selectedVerb.translation}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-8 flex flex-col justify-between space-y-4">
                    <div className="space-y-4">
                      <h4 className="text-lg font-black text-slate-900 font-display flex items-center gap-2">
                        <span className="w-2.5 h-6 bg-orange-500 border-2 border-slate-900 rounded-full"></span>
                        Ինչո՞ւ են ձևերն այսպիսի տեսք ունենում
                      </h4>
                      <p className="text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-line font-bold bg-yellow-50/50 p-5 rounded-2xl border-2 border-slate-200">
                        {selectedVerb.explanation}
                      </p>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-3">
                      <div className="text-xs bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-xl font-bold">
                        <strong>Usted / Ustedes:</strong> կազմվում են ըղձական եղանակի (Presente de Subjuntivo) հիմքից։
                      </div>
                      <div className="text-xs bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-xl font-bold">
                        <strong>Vosotros:</strong> միշտ փոխարինում է <em>-r</em> վերջավորությունը <em>-d</em>-ով։
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Mnemonic Formula Section */}
              <div className="bg-slate-900 border-4 border-slate-950 text-white rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-[6px_6px_0px_0px_rgba(245,158,11,1)]">
                <div className="md:col-span-7 space-y-3">
                  <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight flex items-center gap-2 text-yellow-400 uppercase">
                    <Zap size={22} className="text-yellow-400 fill-yellow-400 stroke-[2.5]" />
                    Մնեմոնիկա. Ինչպե՞ս մտապահել բոլոր ձևերը 10 վայրկյանում
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed font-bold">
                    Կրկնեք այս արտահայտությունը որպես կախարդանք: Սրանք tú ձևի բացառությունների առաջին տառերն են, որոնք կազմում են զվարճալի ռիթմիկ նախադասություն.
                  </p>
                  <div className="bg-yellow-400 text-slate-950 border-2 border-slate-950 p-3 sm:p-4 rounded-2xl font-black text-center text-xl sm:text-2xl tracking-widest uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] my-3">
                    VEN DI SAL HAZ TEN VE PON SÉ
                  </div>
                  <p className="text-xs text-slate-400 font-medium italic">
                    (Հնչում է այսպես՝ «Վեն Դի Սալ, Հաս, Տեն, Վե Պոն, Սե»՝ ասես հին իսպանացի գեներալների անունների թվարկում լինի)
                  </p>
                </div>
                <div className="md:col-span-5 bg-slate-800/90 rounded-2xl p-5 border-2 border-slate-700 space-y-3.5 shadow-inner">
                  <div className="font-black text-sm text-yellow-400 uppercase tracking-wider font-display">Բանաձևի վերծանումը.</div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-mono font-bold">
                    <div><strong className="text-amber-400">Ven:</strong> Venir (արի)</div>
                    <div><strong className="text-amber-400">Di:</strong> Decir (ասա)</div>
                    <div><strong className="text-amber-400">Sal:</strong> Salir (դուրս արի)</div>
                    <div><strong className="text-amber-400">Haz:</strong> Hacer (արա)</div>
                    <div><strong className="text-amber-400">Ten:</strong> Tener (ունեցիր)</div>
                    <div><strong className="text-amber-400">Ve:</strong> Ir (գնա)</div>
                    <div><strong className="text-amber-400">Pon:</strong> Poner (դիր)</div>
                    <div><strong className="text-amber-400">Sé:</strong> Ser (եղիր)</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="games-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {activeGameId === null ? (
                // Game Grid Selector
                <div className="space-y-8">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-slate-900 uppercase">
                      Խաղային մարզումների համալիր
                    </h2>
                    <p className="text-sm text-slate-600 font-bold">
                      Ընտրեք 6 խաղերից մեկը հրամայական եղանակի ձևերի խորը յուրացման համար։ Յուրաքանչյուր խաղ սովորեցնում է բացառությունների տարբեր ասպեկտներ և տրամադրում է մանրամասն քերականական բացատրություններ։
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Game 1 */}
                    <motion.div
                      whileHover={{ y: -3 }}
                      className="bg-white border-4 border-slate-900 rounded-3xl p-6 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between hover:shadow-[7px_7px_0px_0px_rgba(15,23,42,1)] transition-all group"
                    >
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-amber-400 text-slate-900 border-2 border-slate-900 rounded-2xl flex items-center justify-center font-black text-2xl font-display group-hover:scale-110 transition duration-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          1
                        </div>
                        <div>
                          <h3 className="font-black text-xl font-display text-slate-900">Tú Master</h3>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed font-bold">
                            Արագության թեստ բացառությունների ամենադժվար մասի՝ <strong>tú</strong> անձնական ոչ պաշտոնական ձևի իմացության վերաբերյալ։
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveGameId(1)}
                        className="mt-6 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 border-2 border-slate-900 text-white rounded-2xl py-3 text-sm font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-150"
                      >
                        <span>Խաղալ</span>
                        <ArrowRight size={14} className="stroke-[2.5]" />
                      </button>
                    </motion.div>

                    {/* Game 2 */}
                    <motion.div
                      whileHover={{ y: -3 }}
                      className="bg-white border-4 border-slate-900 rounded-3xl p-6 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between hover:shadow-[7px_7px_0px_0px_rgba(15,23,42,1)] transition-all group"
                    >
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-blue-400 text-slate-900 border-2 border-slate-900 rounded-2xl flex items-center justify-center font-black text-2xl font-display group-hover:scale-110 transition duration-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          2
                        </div>
                        <div>
                          <h3 className="font-black text-xl font-display text-slate-900">Հավաքիր խոնարհումը</h3>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed font-bold">
                            Բաշխեք իսպաներեն հրամայական եղանակի ճիշտ ձևերը համապատասխան դերանունների միջև։
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveGameId(2)}
                        className="mt-6 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 border-2 border-slate-900 text-white rounded-2xl py-3 text-sm font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-150"
                      >
                        <span>Խաղալ</span>
                        <ArrowRight size={14} className="stroke-[2.5]" />
                      </button>
                    </motion.div>

                    {/* Game 3 */}
                    <motion.div
                      whileHover={{ y: -3 }}
                      className="bg-white border-4 border-slate-900 rounded-3xl p-6 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between hover:shadow-[7px_7px_0px_0px_rgba(15,23,42,1)] transition-all group"
                    >
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-emerald-400 text-slate-900 border-2 border-slate-900 rounded-2xl flex items-center justify-center font-black text-2xl font-display group-hover:scale-110 transition duration-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          3
                        </div>
                        <div>
                          <h3 className="font-black text-xl font-display text-slate-900">La Sopa de Letras</h3>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed font-bold">
                            Ինտերակտիվ բառախաղ։ Գտեք տառերի դաշտում թաքնված tú-ի բոլոր ութ խոնարհումները։
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveGameId(3)}
                        className="mt-6 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 border-2 border-slate-900 text-white rounded-2xl py-3 text-sm font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-150"
                      >
                        <span>Խաղալ</span>
                        <ArrowRight size={14} className="stroke-[2.5]" />
                      </button>
                    </motion.div>

                    {/* Game 4 */}
                    <motion.div
                      whileHover={{ y: -3 }}
                      className="bg-white border-4 border-slate-900 rounded-3xl p-6 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between hover:shadow-[7px_7px_0px_0px_rgba(15,23,42,1)] transition-all group"
                    >
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-purple-400 text-slate-900 border-2 border-slate-900 rounded-2xl flex items-center justify-center font-black text-2xl font-display group-hover:scale-110 transition duration-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          4
                        </div>
                        <div>
                          <h3 className="font-black text-xl font-display text-slate-900">Թագավորի սուրհանդակը</h3>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed font-bold">
                            Սյուժետային տեքստային խաղ։ Փոխանցեք թագավորի հանձնարարականները ծառաներին, ազնվականներին և ասպետներին՝ պահպանելով խոսքի էթիկան։
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveGameId(4)}
                        className="mt-6 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 border-2 border-slate-900 text-white rounded-2xl py-3 text-sm font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-150"
                      >
                        <span>Խաղալ</span>
                        <ArrowRight size={14} className="stroke-[2.5]" />
                      </button>
                    </motion.div>

                    {/* Game 5 */}
                    <motion.div
                      whileHover={{ y: -3 }}
                      className="bg-white border-4 border-slate-900 rounded-3xl p-6 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between hover:shadow-[7px_7px_0px_0px_rgba(15,23,42,1)] transition-all group"
                    >
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-pink-400 text-slate-900 border-2 border-slate-900 rounded-2xl flex items-center justify-center font-black text-2xl font-display group-hover:scale-110 transition duration-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          5
                        </div>
                        <div>
                          <h3 className="font-black text-xl font-display text-slate-900">Մնեմոնիկ զույգեր</h3>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed font-bold">
                            Համադրեք հանրահայտ կենդանի դարձվածքներն ու արտահայտությունները դրանց հայերեն նշանակության հետ՝ արագ մտապահելու համար։
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveGameId(5)}
                        className="mt-6 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 border-2 border-slate-900 text-white rounded-2xl py-3 text-sm font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-150"
                      >
                        <span>Խաղալ</span>
                        <ArrowRight size={14} className="stroke-[2.5]" />
                      </button>
                    </motion.div>

                    {/* Game 6 */}
                    <motion.div
                      whileHover={{ y: -3 }}
                      className="bg-white border-4 border-slate-900 rounded-3xl p-6 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between hover:shadow-[7px_7px_0px_0px_rgba(15,23,42,1)] transition-all group"
                    >
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-rose-400 text-slate-900 border-2 border-slate-900 rounded-2xl flex items-center justify-center font-black text-2xl font-display group-hover:scale-110 transition duration-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          6
                        </div>
                        <div>
                          <h3 className="font-black text-xl font-display text-slate-900">Քերականության պաշտպանը</h3>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed font-bold">
                            Պայքարեք սովորողների տիպիկ սխալների դեմ։ Վերլուծեք պնդումները և գտեք քերականական վնասատուներին։
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveGameId(6)}
                        className="mt-6 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 border-2 border-slate-900 text-white rounded-2xl py-3 text-sm font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-150"
                      >
                        <span>Խաղալ</span>
                        <ArrowRight size={14} className="stroke-[2.5]" />
                      </button>
                    </motion.div>
                  </div>
                </div>
              ) : (
                // Active Game Room
                <div className="space-y-6">
                  {/* Game Top Return Bar */}
                  <div className="flex flex-col sm:flex-row justify-between items-center bg-white border-4 border-slate-900 p-4 rounded-3xl shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] gap-4">
                    <button
                      onClick={() => setActiveGameId(null)}
                      className="flex items-center gap-2 text-slate-700 hover:text-slate-900 text-sm font-black hover:underline transition-all"
                    >
                      <ChevronLeft size={18} className="stroke-[3]" />
                      <span>Հետ դեպի խաղերի ցանկ</span>
                    </button>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-900 bg-yellow-400 border-2 border-slate-900 px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {activeGameId === 1 && "Խաղ 1: Tú Master"}
                      {activeGameId === 2 && "Խաղ 2: Խոնարհում-Փազլ"}
                      {activeGameId === 3 && "Խաղ 3: Sopa de Letras"}
                      {activeGameId === 4 && "Խաղ 4: Թագավորի սուրհանդակ"}
                      {activeGameId === 5 && "Խաղ 5: Մեմորի Զույգեր"}
                      {activeGameId === 6 && "Խաղ 6: Քերականության պաշտպան"}
                    </span>
                  </div>

                  {/* GAME 1: Tú Master */}
                  {activeGameId === 1 && (
                    <div className="bg-white border-4 border-slate-900 rounded-3xl shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] p-6 sm:p-8 max-w-2xl mx-auto">
                      {!g1Finished ? (
                        <div className="space-y-6">
                          <div className="flex justify-between items-center border-b-2 border-slate-200 pb-4">
                            <h4 className="text-xl font-black text-slate-900 font-display uppercase tracking-tight">tú-ի արագ ընտրության մարզիչ</h4>
                            <span className="text-xs font-black bg-yellow-300 border-2 border-slate-900 px-3 py-1 rounded-xl text-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                              Հարց {g1Index + 1} / {GAME1_QUESTIONS.length}-ից
                            </span>
                          </div>

                          <div className="bg-amber-50/50 p-6 rounded-2xl text-center border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] space-y-4">
                            <span className="text-xs uppercase font-mono font-black text-orange-600 bg-orange-100 border border-orange-300 px-3 py-1 rounded-full">
                              բայ՝ {GAME1_QUESTIONS[g1Index].verb.toUpperCase()}
                            </span>
                            <p className="text-xl sm:text-2xl font-black font-display text-slate-900 leading-relaxed tracking-wide">
                              {GAME1_QUESTIONS[g1Index].sentence}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-3.5">
                            {GAME1_QUESTIONS[g1Index].options.map((opt) => {
                              const isSelected = g1SelectedAnswer === opt;
                              const isCorrect = opt === GAME1_QUESTIONS[g1Index].correct;
                              let btnClass = "bg-white hover:bg-yellow-100 border-slate-900 text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]";

                              if (g1SelectedAnswer !== null) {
                                if (isCorrect) {
                                  btnClass = "bg-emerald-500 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-black";
                                } else if (isSelected) {
                                  btnClass = "bg-rose-500 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-black";
                                } else {
                                  btnClass = "bg-slate-50 opacity-40 border-slate-200 text-slate-400 shadow-none pointer-events-none";
                                }
                              }

                              return (
                                <motion.button
                                  whileTap={{ scale: 0.98 }}
                                  disabled={g1SelectedAnswer !== null}
                                  key={opt}
                                  onClick={() => handleG1Answer(opt)}
                                  className={`p-4 rounded-2xl border-2 text-center text-base font-black transition-all duration-150 ${btnClass}`}
                                >
                                  {opt}
                                </motion.button>
                              );
                            })}
                          </div>

                          {g1SelectedAnswer !== null && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-yellow-50 border-2 border-slate-900 rounded-2xl p-5 space-y-3 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
                            >
                              <div className="flex items-center gap-2">
                                {g1SelectedAnswer === GAME1_QUESTIONS[g1Index].correct ? (
                                  <div className="flex items-center gap-1.5 text-emerald-800 font-black text-sm bg-emerald-100 border-2 border-slate-900 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <CheckCircle2 size={15} className="stroke-[2.5]" />
                                    <span>Հրաշալի՜ է</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1.5 text-rose-800 font-black text-sm bg-rose-100 border-2 border-slate-900 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    <XCircle size={15} className="stroke-[2.5]" />
                                    <span>Այդքան էլ այդպես չէ...</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-slate-700 text-sm font-bold leading-relaxed pt-1">
                                {GAME1_QUESTIONS[g1Index].explanation}
                              </p>
                              <button
                                onClick={handleG1Next}
                                className="w-full flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 border-2 border-slate-900 text-white text-sm font-black py-3 rounded-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                              >
                                <span>Շարունակել</span>
                                <ArrowRight size={14} className="stroke-[2.5]" />
                              </button>
                            </motion.div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center space-y-6 py-6">
                          <div className="w-20 h-20 bg-yellow-400 text-slate-900 border-2 border-slate-900 rounded-full flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                            <Trophy size={40} className="stroke-[2.5]" />
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-2xl font-black font-display text-slate-900 uppercase tracking-tight">Թեստն ավարտված է</h4>
                            <p className="text-sm text-slate-600 font-bold">
                              Ձեր արդյունքը tú-ի կրճատ ձևերի գծով՝
                            </p>
                          </div>
                          <div className="text-5xl font-black font-display text-orange-600 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.15)]">
                            {g1Score} <span className="text-2xl text-slate-400 font-bold">/ {GAME1_QUESTIONS.length}</span>
                          </div>
                          <div className="max-w-md mx-auto p-4.5 bg-yellow-100/50 border-2 border-slate-900 rounded-2xl text-slate-800 text-xs font-bold leading-relaxed shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                            {g1Score === GAME1_QUESTIONS.length ? (
                              "👑 Ֆենոմենալ է: Դուք իսկական հրամայականի տիրակալ եք: Դուք անգիր գիտեք բոլոր 8 ձևերը:"
                            ) : g1Score >= 5 ? (
                              "✨ Լավ արդյունք է: Դուք հիանալի կերպով մտապահել եք ձևերի մեծ մասը: Նորից անցեք տեսությունը՝ կատարելության հասնելու համար:"
                            ) : (
                              "📚 tú ձևը նենգ է: Վերադարձեք տեսության աղյուսակին և մտապահեք մնեմոնիկ արտահայտությունը՝ Ven Di Sal Haz Ten Ve Pon Sé!"
                            )}
                          </div>
                          <button
                            onClick={() => {
                              setG1Index(0);
                              setG1SelectedAnswer(null);
                              setG1Score(0);
                              setG1Finished(false);
                            }}
                            className="flex items-center gap-2 mx-auto bg-orange-500 hover:bg-orange-600 border-2 border-slate-900 text-white px-6 py-3.5 rounded-2xl text-sm font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                          >
                            <RefreshCw size={14} className="stroke-[2.5]" />
                            <span>Անցնել նորից</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* GAME 2: Conjugation Puzzle */}
                  {activeGameId === 2 && (
                    <div className="bg-white border-4 border-slate-900 rounded-3xl shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] p-6 sm:p-8 max-w-4xl mx-auto space-y-8">
                      <div className="border-b-2 border-slate-200 pb-4 text-center sm:text-left">
                        <h4 className="text-xl font-black text-slate-900 font-display uppercase tracking-tight">Խոնարհումների խճանկարի հավաքում</h4>
                        <p className="text-xs text-slate-600 mt-1 font-bold">
                          Հրահանգ. ընտրեք բայի ձևով սալիկը ներքևից, այնուհետև կտտացրեք համապատասխան դերանվան կողքի դատարկ դաշտին՝ այն այնտեղ տեղադրելու համար։
                        </p>
                      </div>

                      {/* Upper targets slots */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {PUZZLE_ITEMS.map((item) => {
                          const placed = g2Placements[item.id];
                          const isCorrect = placed === item.correctForm;
                          let slotStyle = "border-dashed border-slate-300 hover:border-orange-400 bg-slate-50";

                          if (g2Checked) {
                            slotStyle = isCorrect
                              ? "bg-emerald-400 border-slate-900 text-slate-950 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                              : "bg-rose-400 border-slate-900 text-slate-950 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
                          } else if (placed) {
                            slotStyle = "bg-yellow-100 border-slate-900 text-slate-950 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
                          } else {
                            slotStyle = "border-2 border-dashed border-slate-400 bg-yellow-50/10 hover:bg-yellow-50/40 text-slate-500";
                          }

                          return (
                            <div
                              key={item.id}
                              onClick={() => handleG2SlotClick(item.id)}
                              className={`cursor-pointer border-2 rounded-2xl p-4 text-center transition-all duration-150 flex flex-col justify-between h-32 select-none ${slotStyle}`}
                            >
                              <div>
                                <span className="block text-[10px] uppercase font-mono font-black text-orange-600 tracking-wider">
                                  {item.verb}
                                </span>
                                <span className="block text-sm font-black font-display text-slate-800 mt-0.5">
                                  [{item.pronoun}]
                                </span>
                              </div>

                              <div className="h-10 flex items-center justify-center">
                                {placed ? (
                                  <span className="text-base font-black">{placed}</span>
                                ) : (
                                  <span className="text-xs text-slate-400 font-bold italic">ընտրել...</span>
                                )}
                              </div>

                              {g2Checked && (
                                <div className="text-[10px] font-black uppercase mt-1">
                                  {isCorrect ? "✓ Ճիշտ է" : `✗ Անհրաժեշտ է՝ ${item.correctForm}`}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanations block after check */}
                      {g2Checked && (
                        <div className="p-5 bg-yellow-50 border-2 border-slate-900 rounded-2xl text-slate-800 text-xs font-bold space-y-2 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                          <h5 className="font-black font-display text-orange-600 uppercase tracking-wider text-sm">💡 Փազլի քերականական վերլուծություն.</h5>
                          <ul className="list-disc pl-4 space-y-1 text-slate-700">
                            <li><strong>hacer [vosotros]</strong> = haced (կանոնավոր՝ ինֆինիտիվ առանց -r + d)։</li>
                            <li><strong>ser [usted]</strong> = sea (ըղձական եղանակի Presente de Subjuntivo-ից)։</li>
                            <li><strong>ir [ustedes]</strong> = vayan (բացառություն բայ, վերցնում է vayan հիմքը)։</li>
                            <li><strong>venir [tú]</strong> = ven (կրճատ ձև)։</li>
                          </ul>
                        </div>
                      )}

                      {/* Lower pool tiles */}
                      {!g2Checked && (
                        <div className="space-y-3">
                          <div className="text-xs font-black text-slate-500 uppercase tracking-wider text-center">Հասանելի ձևեր՝</div>
                          <div className="flex flex-wrap justify-center gap-2">
                            {PUZZLE_ITEMS.map((item) => {
                              const isPlaced = Object.values(g2Placements).includes(item.correctForm);
                              if (isPlaced) return null;

                              const isSelected = g2SelectedTile === item.correctForm;

                              return (
                                <motion.button
                                  whileHover={{ scale: 1.04 }}
                                  whileTap={{ scale: 0.98 }}
                                  key={item.correctForm}
                                  onClick={() => handleG2TileSelect(item.correctForm)}
                                  className={`px-4 py-2 rounded-2xl border-2 font-black text-sm transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                                    isSelected
                                      ? "bg-orange-500 border-slate-900 text-white ring-2 ring-yellow-400"
                                      : "bg-white border-slate-900 text-slate-700 hover:bg-yellow-50"
                                  }`}
                                >
                                  {item.correctForm}
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex justify-center border-t-2 border-slate-200 pt-6">
                        {!g2Checked ? (
                          <button
                            disabled={Object.keys(g2Placements).length < PUZZLE_ITEMS.length}
                            onClick={checkG2Answers}
                            className="flex items-center gap-1.5 px-6 py-3.5 rounded-2xl text-sm font-black bg-orange-500 border-2 border-slate-900 text-white hover:bg-orange-600 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                          >
                            <CheckCircle2 size={16} className="stroke-[2.5]" />
                            <span>Ստուգել խոնարհումները</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setG2Placements({});
                              setG2SelectedTile(null);
                              setG2Checked(false);
                              setG2Score(0);
                            }}
                            className="flex items-center gap-1.5 px-6 py-3.5 rounded-2xl text-sm font-black bg-orange-500 border-2 border-slate-900 text-white hover:bg-orange-600 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                          >
                            <RefreshCw size={14} className="stroke-[2.5]" />
                            <span>Անցնել նորից</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* GAME 3: La Sopa de Letras (Word Search) */}
                  {activeGameId === 3 && (
                    <div className="bg-white border-4 border-slate-900 rounded-3xl shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] p-6 sm:p-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
                      
                      {/* Left: 8x8 Grid */}
                      <div className="md:col-span-7 flex flex-col items-center space-y-4">
                        <div className="text-center md:text-left w-full">
                          <h4 className="text-xl font-black text-slate-900 font-display uppercase tracking-tight">Բառախաղ. Փնտրեք tú-ի 8 բացառությունները</h4>
                          <p className="text-xs text-slate-600 font-bold">Կտտացրեք տառերին հերթականությամբ՝ բառեր կազմելու համար։ Գտնված բառերը կմնան ընդգծված։</p>
                        </div>

                        <div className="grid grid-cols-8 gap-1.5 bg-yellow-100/50 p-3 rounded-2xl border-2 border-slate-900 w-fit shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                          {WORD_SEARCH_GRID.map((row, rIdx) =>
                            row.map((letter, cIdx) => {
                              const isSelected = g3SelectedCoords.some((coord) => coord.r === rIdx && coord.c === cIdx);
                              
                              // Check if cell is part of any found word
                              let isFound = false;
                              g3FoundWords.forEach((word) => {
                                const sw = SEARCH_WORDS.find((w) => w.word === word);
                                if (sw) {
                                  const matches = sw.coords.some((sc) => sc.r === rIdx && sc.c === cIdx);
                                  if (matches) isFound = true;
                                }
                              });

                              let cellClass = "bg-white text-slate-800 border-slate-900 hover:bg-yellow-50 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]";

                              if (isFound) {
                                cellClass = "bg-emerald-400 text-slate-950 border-slate-900 font-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]";
                              } else if (isSelected) {
                                cellClass = "bg-orange-500 text-white border-slate-900 font-black ring-2 ring-yellow-400 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]";
                              }

                              return (
                                <button
                                  key={`${rIdx}-${cIdx}`}
                                  onClick={() => handleG3CellClick(rIdx, cIdx)}
                                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl border-2 flex items-center justify-center font-black text-sm sm:text-base transition select-none ${cellClass}`}
                                >
                                  {letter}
                                </button>
                              );
                            })
                          )}
                        </div>

                        <div className="flex gap-2 w-full max-w-[350px]">
                          <button
                            onClick={() => setG3SelectedCoords([])}
                            className="w-full py-2.5 bg-slate-100 border-2 border-slate-900 rounded-xl text-xs font-black text-slate-700 hover:bg-slate-200 transition shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          >
                            Մաքրել նշումը
                          </button>
                        </div>
                      </div>

                      {/* Right: Score and checklist */}
                      <div className="md:col-span-5 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          <div className="bg-yellow-50 border-2 border-slate-900 p-4 rounded-xl flex justify-between items-center shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                            <span className="text-xs font-black text-slate-600 uppercase">Որոնման առաջընթաց՝</span>
                            <span className="text-lg font-black font-display text-orange-600">
                              {g3FoundWords.length} / {SEARCH_WORDS.length}
                            </span>
                          </div>

                          <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                            <h5 className="text-xs font-black text-slate-500 uppercase tracking-wider">tú-ի խոնարհումների ցանկը՝</h5>
                            <div className="grid grid-cols-2 gap-2">
                              {SEARCH_WORDS.map((sw) => {
                                const found = g3FoundWords.includes(sw.word);
                                return (
                                  <div
                                    key={sw.word}
                                    className={`flex items-center gap-2 p-2 rounded-xl border-2 text-xs transition ${
                                      found
                                        ? "bg-emerald-100 border-slate-900 text-emerald-950 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                        : "bg-slate-50 border-slate-200 text-slate-400 font-bold"
                                    }`}
                                  >
                                    <div className={`w-2.5 h-2.5 rounded-full border border-slate-900 ${found ? "bg-emerald-500" : "bg-slate-300"}`} />
                                    <span>{sw.word} ({sw.verb})</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Explanation panel for current word */}
                        <AnimatePresence mode="wait">
                          {g3CurrentExpl && (
                            <motion.div
                              key={g3CurrentExpl.word}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="bg-yellow-50 border-2 border-slate-900 p-4 rounded-xl space-y-2 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                            >
                              <div className="flex items-center gap-1 text-xs font-black text-orange-600 uppercase">
                                <Sparkles size={12} className="stroke-[2.5]" />
                                <span>Գտնված ձև՝ {g3CurrentExpl.word}</span>
                              </div>
                              <p className="text-slate-700 text-xs font-bold leading-relaxed">
                                Հրամայական եղանակի <strong>{g3CurrentExpl.word}</strong> ձևը կազմված է <strong>{g3CurrentExpl.verb}</strong> բայից ({g3CurrentExpl.meaning}) <strong>{g3CurrentExpl.pronoun}</strong> դերանվան համար։ Սա չափազանց կարևոր կարճ բացառիկ ձև է։
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {g3Finished && (
                          <div className="bg-yellow-100 border-4 border-slate-900 p-4 rounded-2xl text-center space-y-3 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                            <h5 className="font-black text-slate-900 font-display uppercase">🎉 Անհավանական է: Բոլոր բառերը գտնված են։</h5>
                            <p className="text-xs text-slate-700 font-bold">Դուք հիանալի կերպով մարզեցիք տեսողական հիշողությունը բացառիկ ձևերի նկատմամբ։</p>
                            <button
                              onClick={() => {
                                setG3FoundWords([]);
                                setG3SelectedCoords([]);
                                setG3CurrentExpl(null);
                                setG3Finished(false);
                              }}
                              className="w-full bg-orange-500 hover:bg-orange-600 border-2 border-slate-900 text-white py-3 rounded-xl text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                            >
                              Անցնել նորից
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* GAME 4: El Mensajero del Rey (RPG Quest) */}
                  {activeGameId === 4 && (
                    <div className="bg-white border-4 border-slate-900 rounded-3xl shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] p-6 sm:p-8 max-w-2xl mx-auto space-y-6">
                      {!g4Finished ? (
                        <div className="space-y-6">
                          {/* Quest Header */}
                          <div className="flex justify-between items-center border-b-2 border-slate-200 pb-4">
                            <div className="flex items-center gap-2">
                              <Crown className="text-amber-500 stroke-[2.5]" size={20} />
                              <h4 className="text-xl font-black font-display text-slate-900 uppercase tracking-tight">Թագավորական սուրհանդակ</h4>
                            </div>
                            <span className="text-xs font-black bg-yellow-300 border-2 border-slate-900 px-3 py-1 rounded-xl text-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                              Տեսարան {g4Stage + 1} / {QUEST_STAGES.length}-ից
                            </span>
                          </div>

                          {/* Scene Context */}
                          <p className="text-slate-700 text-sm font-bold leading-relaxed bg-amber-50/30 p-4.5 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            {QUEST_STAGES[g4Stage].context}
                          </p>

                          {/* Speaker Dialogue */}
                          <div className="flex gap-4 items-start bg-yellow-50/50 p-5 rounded-2xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                            <span className="text-4xl select-none leading-none pt-1">{QUEST_STAGES[g4Stage].avatar}</span>
                            <div className="space-y-1.5 flex-1">
                              <div className="text-xs font-black text-orange-600 uppercase tracking-wide">
                                {QUEST_STAGES[g4Stage].character} (Դիմելաձև՝ {QUEST_STAGES[g4Stage].pronoun})
                              </div>
                              <p className="text-lg font-black font-display text-slate-800 leading-normal italic">
                                {QUEST_STAGES[g4Stage].dialogue}
                              </p>
                            </div>
                          </div>

                          {/* Options */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {QUEST_STAGES[g4Stage].options.map((opt) => {
                              const isSelected = g4Answered && opt.correct;
                              let btnClass = "bg-white hover:bg-yellow-100 border-slate-900 text-slate-800 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]";

                              if (g4Answered) {
                                if (opt.correct) {
                                  btnClass = "bg-emerald-500 text-white border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] font-black";
                                } else {
                                  btnClass = "bg-slate-50 opacity-40 text-slate-400 border-slate-200 shadow-none pointer-events-none";
                                }
                              }

                              return (
                                <motion.button
                                  whileTap={{ scale: 0.98 }}
                                  disabled={g4Answered}
                                  key={opt.text}
                                  onClick={() => handleG4OptionClick(opt.correct)}
                                  className={`p-4 rounded-2xl border-2 text-left font-bold text-base flex justify-between items-center transition-all ${btnClass}`}
                                >
                                  <span>{opt.text}</span>
                                  {g4Answered && opt.correct && <CheckCircle2 size={16} className="stroke-[2.5]" />}
                                </motion.button>
                              );
                            })}
                          </div>

                          {/* Explanation and next button */}
                          {g4Answered && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-yellow-50 border-2 border-slate-900 p-5 rounded-2xl space-y-3.5 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
                            >
                              <div className="flex items-center gap-1.5">
                                {g4SelectedCorrect ? (
                                  <span className="text-xs font-black bg-emerald-100 text-emerald-800 border-2 border-slate-900 px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1">
                                    <CheckCircle2 size={12} className="stroke-[2.5]" /> Արքան գոհ է ձեր ընտրությունից։
                                  </span>
                                ) : (
                                  <span className="text-xs font-black bg-rose-100 text-rose-800 border-2 border-slate-900 px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1">
                                    <XCircle size={12} className="stroke-[2.5]" /> Արքայի զայրույթը։ Խախտվել են խոնարհման կանոնները։
                                  </span>
                                )}
                              </div>
                              <p className="text-slate-700 text-sm font-bold leading-relaxed pt-1">
                                {QUEST_STAGES[g4Stage].explanation}
                              </p>
                              <button
                                onClick={handleG4Next}
                                className="w-full flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 border-2 border-slate-900 text-white text-sm font-black py-3 rounded-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                              >
                                <span>Շարունակել ճանապարհը</span>
                                <ArrowRight size={14} className="stroke-[2.5]" />
                              </button>
                            </motion.div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center space-y-6 py-6">
                          <div className="w-20 h-20 bg-yellow-400 text-slate-900 border-2 border-slate-900 rounded-full flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                            <Trophy size={40} className="stroke-[2.5]" />
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-2xl font-black font-display text-slate-900 uppercase tracking-tight">Դուք անցաք քվեստը</h4>
                            <p className="text-sm text-slate-600 font-bold">Ձեր դիվանագիտական ճշգրտությունը որպես սուրհանդակ՝</p>
                          </div>
                          <div className="text-5xl font-black font-display text-orange-600 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.15)]">
                            {g4Score} <span className="text-2xl text-slate-400 font-bold">/ {QUEST_STAGES.length}</span>
                          </div>
                          <div className="max-w-md mx-auto p-4.5 bg-yellow-100/50 border-2 border-slate-900 rounded-2xl text-slate-800 text-xs font-bold leading-relaxed shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                            {g4Score === QUEST_STAGES.length ? (
                              "👑 Դուք անգերազանցելի Թագավորական Սուրհանդակ եք: Բոլոր հրամանները փոխանցվել են կատարյալ քերականական ճշգրտությամբ:"
                            ) : g4Score >= 4 ? (
                              "🎖️ Լավ աշխատանք է: Դուք հիանալի կերպով հաղթահարեցիք խոսքի էթիկետի բարդ առաջադրանքները:"
                            ) : (
                              "🛡️ Թվում է՝ պալատականները միշտ չէ, որ հասկանում էին ձեզ: Նորից կարդացեք usted, vosotros և ustedes ձևերի առանձնահատկությունները տեսության մեջ և կրկնեք քվեստը:"
                            )}
                          </div>
                          <button
                            onClick={() => {
                              setG4Stage(0);
                              setG4Answered(false);
                              setG4SelectedCorrect(null);
                              setG4Score(0);
                              setG4Finished(false);
                            }}
                            className="flex items-center gap-2 mx-auto bg-orange-500 hover:bg-orange-600 border-2 border-slate-900 text-white px-6 py-3.5 rounded-2xl text-sm font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                          >
                            <RefreshCw size={14} className="stroke-[2.5]" />
                            <span>Անցնել նորից</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* GAME 5: Mnemonic Memory Match */}
                  {activeGameId === 5 && (
                    <div className="bg-white border-4 border-slate-900 rounded-3xl shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] p-6 sm:p-8 max-w-4xl mx-auto space-y-8">
                      <div className="text-center max-w-xl mx-auto">
                        <h4 className="text-xl font-black text-slate-900 font-display uppercase tracking-tight">Մնեմոնիկ համընկնումների քարտեր</h4>
                        <p className="text-xs text-slate-600 mt-1 font-bold">
                          Գտեք զույգերը. համապատասխանեցрեք իսպաներեն հրամայական արտահայտությունը դրա հայերեն ճշգրիտ թարգմանության հետ։
                        </p>
                      </div>

                      {/* Scoreboard */}
                      <div className="flex justify-between items-center bg-yellow-50 border-2 border-slate-900 p-4 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex items-center gap-1.5 text-xs font-black text-slate-600 uppercase">
                          <span>Գտնված համընկնումներ՝</span>
                          <span className="text-orange-600 font-black text-sm ml-1">
                            {g5MatchedIds.length / 2} / {MNEMONIC_CARDS.length}
                          </span>
                        </div>
                        <span className="text-[10px] font-black text-slate-900 font-mono uppercase bg-yellow-300 border-2 border-slate-900 px-2.5 py-1 rounded-lg">
                          Քարտերը խառնված են
                        </span>
                      </div>

                      {/* Cards Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {g5Cards.map((card) => {
                          const isMatched = g5MatchedIds.includes(card.id);
                          const isSelected = g5SelectedCardId === card.id;

                          let cardClass = "bg-white border-slate-900 text-slate-800 hover:bg-yellow-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";

                          if (isMatched) {
                            cardClass = "bg-emerald-400 text-emerald-950 border-slate-900 opacity-60 pointer-events-none font-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]";
                          } else if (isSelected) {
                            cardClass = "bg-orange-500 border-slate-900 text-white font-black ring-2 ring-yellow-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
                          }

                          return (
                            <motion.button
                              whileHover={!isMatched ? { y: -2 } : {}}
                              whileTap={!isMatched ? { scale: 0.98 } : {}}
                              key={card.id}
                              onClick={() => handleG5CardClick(card)}
                              className={`h-28 rounded-2xl border-2 p-3.5 text-center flex items-center justify-center text-xs sm:text-sm font-black transition-all duration-150 select-none cursor-pointer ${cardClass}`}
                            >
                              <span className="leading-snug">{card.text}</span>
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Explanation drawer */}
                      <AnimatePresence mode="wait">
                        {g5ActiveExplanation && (
                          <motion.div
                            key={g5ActiveExplanation}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-yellow-50 border-2 border-slate-900 rounded-2xl p-5 space-y-1 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
                          >
                            <h5 className="font-black text-xs uppercase text-orange-600 tracking-wider font-display">
                              Վերլուծված արտահայտություն՝
                            </h5>
                            <p className="text-slate-700 text-sm font-bold leading-relaxed whitespace-pre-line">
                              {g5ActiveExplanation}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {g5Finished && (
                        <div className="bg-yellow-100 border-4 border-slate-900 p-6 rounded-2xl text-center space-y-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                          <h4 className="text-xl font-black text-slate-900 font-display uppercase">🎉 Շնորհավորում ենք: Բոլոր զույգերը հավաքված են։</h4>
                          <p className="text-sm text-slate-700 font-bold">Դուք հիանալի կերպով յուրացրեցիք խոսակցական դարձվածքները բացառություն բայերով։</p>
                          <button
                            onClick={initializeGame5}
                            className="bg-orange-500 hover:bg-orange-600 border-2 border-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                          >
                            Անցնել նորից
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* GAME 6: Grammar Defender */}
                  {activeGameId === 6 && (
                    <div className="bg-white border-4 border-slate-900 rounded-3xl shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] p-6 sm:p-8 max-w-2xl mx-auto space-y-6">
                      {!g6Finished ? (
                        <div className="space-y-6">
                          {/* Defender Header */}
                          <div className="flex justify-between items-center border-b-2 border-slate-200 pb-4">
                            <div className="flex items-center gap-2">
                              <ShieldCheck className="text-orange-500 stroke-[2.5]" size={20} />
                              <h4 className="text-xl font-black font-display text-slate-900 uppercase tracking-tight">Քերականության պաշտպան</h4>
                            </div>
                            <span className="text-xs font-black bg-yellow-300 border-2 border-slate-900 px-3 py-1 rounded-xl text-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                              Գրոհ {g6Index + 1} / {DEFENDER_SENTENCES.length}-ից
                            </span>
                          </div>

                          {/* Shield Sentence Card */}
                          <div className="bg-slate-900 border-4 border-slate-900 text-white rounded-3xl p-6 text-center space-y-3 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden">
                            <div className="absolute left-0 top-0 w-full h-1.5 bg-orange-500"></div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400 font-mono">Ստուգեք արտահայտությունը՝</span>
                            <p className="text-lg sm:text-xl font-black font-display leading-relaxed">
                              {DEFENDER_SENTENCES[g6Index].text}
                            </p>
                          </div>

                          {/* Decision Buttons */}
                          <div className="grid grid-cols-2 gap-4">
                            <motion.button
                              whileTap={{ scale: 0.98 }}
                              disabled={g6Answered}
                              onClick={() => handleG6DefenderClick(true)}
                              className={`p-4 rounded-xl border-2 font-black text-sm sm:text-base transition flex flex-col items-center justify-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${
                                g6Answered
                                  ? DEFENDER_SENTENCES[g6Index].isCorrect
                                    ? "bg-emerald-500 text-white border-slate-900 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                    : "bg-slate-50 opacity-40 text-slate-400 border-slate-200 shadow-none pointer-events-none"
                                  : "bg-white border-slate-900 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300"
                              }`}
                            >
                              <CheckCircle2 size={20} className="stroke-[2.5]" />
                              <span>✅ ԱՌԱՆՑ ՍԽԱԼԻ</span>
                            </motion.button>

                            <motion.button
                              whileTap={{ scale: 0.98 }}
                              disabled={g6Answered}
                              onClick={() => handleG6DefenderClick(false)}
                              className={`p-4 rounded-xl border-2 font-black text-sm sm:text-base transition flex flex-col items-center justify-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${
                                g6Answered
                                  ? !DEFENDER_SENTENCES[g6Index].isCorrect
                                    ? "bg-rose-500 text-white border-slate-900 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                    : "bg-slate-50 opacity-40 text-slate-400 border-slate-200 shadow-none pointer-events-none"
                                  : "bg-white border-slate-900 text-rose-600 hover:bg-rose-50 hover:border-rose-300"
                              }`}
                            >
                              <XCircle size={20} className="stroke-[2.5]" />
                              <span>❌ ՍԽԱԼ ԿԱ</span>
                            </motion.button>
                          </div>

                          {/* Feedback */}
                          {g6Answered && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-yellow-50 border-2 border-slate-900 p-5 rounded-2xl space-y-4 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
                            >
                              <div className="flex items-center gap-1.5">
                                {g6UserCorrect ? (
                                  <span className="text-xs font-black bg-emerald-100 text-emerald-800 border-2 border-slate-900 px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1">
                                    <CheckCircle2 size={12} className="stroke-[2.5]" /> Հարվածը կասեցվա՛ծ է: Ճիշտ վերլուծություն:
                                  </span>
                                ) : (
                                  <span className="text-xs font-black bg-rose-100 text-rose-800 border-2 border-slate-900 px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1">
                                    <XCircle size={12} className="stroke-[2.5]" /> Բաց թողնված հարված: Քերականական սխալը վիրավորեց ձեզ:
                                  </span>
                                )}
                              </div>

                              {!DEFENDER_SENTENCES[g6Index].isCorrect && DEFENDER_SENTENCES[g6Index].correction && (
                                <div className="space-y-1 bg-rose-50 p-3 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                  <span className="text-[10px] font-black text-rose-600 uppercase tracking-wider font-mono">Ճիշտ տարբերակը՝</span>
                                  <div className="text-base font-black text-slate-900">
                                    {DEFENDER_SENTENCES[g6Index].correction}
                                  </div>
                                </div>
                              )}

                              <p className="text-slate-700 text-sm font-bold leading-relaxed pt-1">
                                {DEFENDER_SENTENCES[g6Index].explanation}
                              </p>

                              <button
                                onClick={handleG6Next}
                                className="w-full flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 border-2 border-slate-900 text-white text-sm font-black py-3 rounded-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                              >
                                <span>Հաջորդ արտահայտությունը</span>
                                <ArrowRight size={14} className="stroke-[2.5]" />
                              </button>
                            </motion.div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center space-y-6 py-6">
                          <div className="w-20 h-20 bg-yellow-400 text-slate-900 border-2 border-slate-900 rounded-full flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                            <Trophy size={40} className="stroke-[2.5]" />
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-2xl font-black font-display text-slate-900 uppercase tracking-tight">Ամրոցի պաշտպանությունն ավարտվա՛ծ է:</h4>
                            <p className="text-sm text-slate-600 font-bold">Ձեր կասեցրած գրոհների հաշիվը՝</p>
                          </div>
                          <div className="text-5xl font-black font-display text-orange-600 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.15)]">
                            {g6Score} <span className="text-2xl text-slate-400 font-bold">/ {DEFENDER_SENTENCES.length}</span>
                          </div>
                          <div className="max-w-md mx-auto p-4.5 bg-yellow-100/50 border-2 border-slate-900 rounded-2xl text-slate-800 text-xs font-bold leading-relaxed shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                            {g6Score === DEFENDER_SENTENCES.length ? (
                              "🛡️ Անգերազանցելի վահան: Ոչ մի խորամանկ թակարդ կամ տիպիկ սխալ չկարողացավ շփոթեցնել ձեզ:"
                            ) : g6Score >= 5 ? (
                              "🛡️ Ամուր զրահ: Սխալների մեծ մասը ժամանակին բացահայտվել և վերացվել է:"
                            ) : (
                              "📚 Խոնարհման ձևերը պարունակում են բազմաթիվ թակարդներ (հատկապես հրամայականի և ներկա ժամանակի խառնումը)։ Կրկին ուսումնասիրեք տեսությունը:"
                            )}
                          </div>
                          <button
                            onClick={() => {
                              setG6Index(0);
                              setG6Answered(false);
                              setG6UserCorrect(null);
                              setG6Score(0);
                              setG6Finished(false);
                            }}
                            className="flex items-center gap-2 mx-auto bg-orange-500 hover:bg-orange-600 border-2 border-slate-900 text-white px-6 py-3.5 rounded-2xl text-sm font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                          >
                            <RefreshCw size={14} className="stroke-[2.5]" />
                            <span>Անցնել նորից</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-slate-900 bg-yellow-100 py-8 mt-16 text-center text-xs text-slate-700 font-bold">
        <div className="max-w-6xl mx-auto px-4 space-y-1">
          <p className="font-display uppercase tracking-wider text-slate-900">Իսպաներենի քերականության ինտերակտիվ վարժասարք • Imperativo Afirmativo</p>
          <p className="text-slate-500">© {new Date().getFullYear()} — Պատրաստված է սիրով ապագա իսպանախոսների համար</p>
        </div>
      </footer>
    </div>
  );
}
