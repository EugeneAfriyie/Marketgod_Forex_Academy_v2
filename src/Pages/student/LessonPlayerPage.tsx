import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, PlayCircle, CheckCircle2, Lock, Clock3, X, List, LineChart, HelpCircle, XCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import StudentSectionCard from "../../Components/student/StudentSectionCard";
// Mock curriculum data matching the course structure
const courseCurriculum = {
    title: "Beginner Mastery Course",
    modules: [
        {
            title: "Module 1: Introduction to Forex",
            lessons: [
                { id: 1, title: "What is Forex?", duration: "15:20", completed: true },
                { id: 2, title: "Currency Pairs & Pips", duration: "22:10", completed: true },
                {
                    id: 3,
                    title: "Market Sessions",
                    duration: "18:45",
                    completed: false,
                    isCurrent: true,
                    description: "Learn about the different trading sessions (London, New York, Tokyo) and when the market is most volatile to maximize your trading opportunities.",
                    notes: {
                        intro: "The forex market is open 24 hours a day, 5 days a week. However, not all hours are created equal. Understanding the different trading sessions is crucial for finding the best volume and avoiding flat, unpredictable markets.",
                        hasImage: true,
                        imageCaption: "London and New York session overlap showing high liquidity and strong directional price action.",
                        sections: [
                            { title: "The Asian Session (Tokyo)", content: "Characterized by lower volatility. It often sets the initial boundaries and consolidation ranges for the trading day. Pair focus typically revolves around JPY, AUD, and NZD." },
                            { title: "The European Session (London)", content: "The most active session. A vast majority of daily trends begin during London hours due to the massive volume of institutional capital entering the market. Breakouts from the Asian range are common here." },
                            { title: "The US Session (New York)", content: "High volatility, especially during the crucial 8:00 AM - 12:00 PM EST overlap with London. This 4-hour window offers some of the best high-probability, high-liquidity setups of the entire day." }
                        ]
                    },
                    quiz: {
                        requiredScore: 70,
                        questions: [
                            {
                                question: "Which trading session typically sees the most trading volume?",
                                options: ["Tokyo Session", "London Session", "Sydney Session", "Frankfurt Session"],
                                correctIndex: 1
                            },
                            {
                                question: "What happens during the London and New York session overlap?",
                                options: ["Volatility and liquidity are at their lowest", "The market closes for lunch", "Volatility and liquidity are usually at their highest", "Only EUR/USD can be traded"],
                                correctIndex: 2
                            },
                            {
                                question: "Which currency pairs are typically most active during the Asian session?",
                                options: ["GBP/CHF and EUR/GBP", "USD/CAD and USD/CHF", "AUD/JPY and NZD/USD", "EUR/USD and GBP/USD"],
                                correctIndex: 2
                            }
                        ]
                    }
                }
            ]
        },
        {
            title: "Module 2: Market Structure Basics",
            lessons: [
                { id: 4, title: "Uptrends and Downtrends", duration: "25:30", completed: false },
                { id: 5, title: "Support and Resistance", duration: "30:00", completed: false }
            ]
        }
    ]
};
export default function LessonPlayerPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { courseId } = useParams();
    const slug = courseId || "beginner-mastery-course";
    // Extracting the current lesson from mock data for display
    const currentLesson = courseCurriculum.modules[0].lessons[2];
    // Quiz State
    const [quizState, setQuizState] = useState<'idle' | 'active' | 'passed' | 'failed'>('idle');
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [score, setScore] = useState(0);
    const [shuffledQuestions, setShuffledQuestions] = useState(currentLesson.quiz?.questions || []);
    const shuffle = <T,>(array: readonly T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };
    const shuffleQuiz = () => {
        if (!currentLesson.quiz)
            return;
        const newShuffledQuestions = shuffle(currentLesson.quiz.questions).map(q => {
            const correctAnswer = q.options[q.correctIndex];
            const shuffledOptions = shuffle(q.options);
            const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);
            return { ...q, options: shuffledOptions, correctIndex: newCorrectIndex };
        });
        setShuffledQuestions(newShuffledQuestions);
    };
    const handleStartQuiz = () => {
        shuffleQuiz();
        setQuizState('active');
    };
    const handleSubmitQuiz = () => {
        if (!currentLesson.quiz)
            return;
        let correct = 0;
        shuffledQuestions.forEach((q, i) => {
            if (answers[i] === q.correctIndex)
                correct++;
        });
        const percentage = Math.round((correct / shuffledQuestions.length) * 100);
        setScore(percentage);
        setQuizState(percentage >= currentLesson.quiz.requiredScore ? 'passed' : 'failed');
    };
    const handleRetakeQuiz = () => {
        setAnswers({});
        shuffleQuiz();
        setQuizState('active');
    };
    const container: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
    };
    return (<motion.div initial="hidden" animate="show" variants={container} className="space-y-6">
      <motion.div variants={item} className="flex items-center justify-between">
        {/* Back to Courses Button */}
        <button onClick={() => navigate(`/dashboard/courses/${slug}/overview`)} className={`group inline-flex items-center gap-2 text-sm font-medium transition-colors ${isDark ? "text-white/60 hover:text-white" : "text-mg-light-textSecondary hover:text-black"}`}>
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1"/>
          {"Back to Syllabus"}
        </button>

        {/* Toggle Sidebar Button (Visible when closed) */}
        {!isSidebarOpen && (<button onClick={() => setIsSidebarOpen(true)} className={`group inline-flex items-center gap-2 text-sm font-medium transition-colors ${isDark ? "text-white/60 hover:text-white" : "text-mg-light-textSecondary hover:text-black"}`}>
            <List size={16} className="transition-transform group-hover:scale-110"/>
            {"Show Content"}
          </button>)}
      </motion.div>

      <motion.div variants={item} layout className={`grid grid-cols-1 gap-6 ${isSidebarOpen ? 'lg:grid-cols-3' : ''}`}>
        
        {/* Main Content: Video Player & Description */}
        <motion.div layout className={`space-y-6 ${isSidebarOpen ? 'lg:col-span-2' : ''}`}>
          {/* Video Player Placeholder */}
          <motion.div layout className={`relative aspect-video w-full overflow-hidden rounded-[2rem] border shadow-2xl ${isDark ? "border-white/10 bg-black" : "border-black/10 bg-gray-900"}`}>
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-mg-gold/20 to-transparent">
              <button className="group flex h-20 w-20 items-center justify-center rounded-full bg-mg-gold text-black shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-transform hover:scale-110">
                <PlayCircle size={40} className="ml-1 transition-transform group-hover:scale-110"/>
              </button>
            </div>
          </motion.div>

          {/* Lesson Details */}
          <motion.div layout className={`rounded-[2rem] border p-6 md:p-8 shadow-xl ${isDark ? "border-white/10 bg-black/25" : "border-black/10 bg-white"}`}>
            <h1 className={`text-2xl md:text-3xl font-black ${isDark ? "text-white" : "text-mg-light-text"}`}>
              {currentLesson.title}
            </h1>
            <p className={`mt-4 text-sm leading-relaxed md:text-base ${isDark ? "text-white/70" : "text-mg-light-textSecondary"}`}>
              {currentLesson.description || ("No lesson description available.")}
            </p>

            {/* Rich Text / Article Section */}
            {currentLesson.notes && (<motion.div layout className={`mt-8 pt-8 border-t ${isDark ? "border-white/10" : "border-black/10"}`}>
                <h2 className={`text-xl font-bold mb-6 ${isDark ? "text-white" : "text-mg-light-text"}`}>
                  {"Lesson Notes"}
                </h2>
                
                <article className={`space-y-6 text-sm md:text-base leading-relaxed ${isDark ? "text-white/80" : "text-mg-light-textSecondary"}`}>
                  <p>{currentLesson.notes.intro}</p>

                  {/* Example Image/Chart Placeholder */}
                  {currentLesson.notes.hasImage && (<figure className="my-8">
                      <div className={`w-full aspect-[21/9] rounded-2xl border flex flex-col items-center justify-center overflow-hidden ${isDark ? "bg-white/[0.02] border-white/10" : "bg-black/[0.02] border-black/10"}`}>
                        {/* Replace this div with an actual <img src="..." /> when you connect the backend */}
                        <LineChart size={48} className={`mb-3 ${isDark ? "text-white/20" : "text-black/20"}`} strokeWidth={1}/>
                        <span className={`text-sm font-medium ${isDark ? "text-white/40" : "text-black/40"}`}>
                          [Trading Chart Illustration]
                        </span>
                      </div>
                      <figcaption className={`mt-3 text-center text-xs italic ${isDark ? "text-white/50" : "text-mg-light-textSecondary/70"}`}>
                        {currentLesson.notes.imageCaption}
                      </figcaption>
                    </figure>)}

                  {/* Dynamic Article Sections */}
                  <div className="space-y-6">
                    {currentLesson.notes.sections.map((sec, idx) => (<div key={idx}>
                        <h3 className={`font-bold text-lg mb-2 ${isDark ? "text-mg-gold" : "text-mg-gold"}`}>{sec.title}</h3>
                        <p>{sec.content}</p>
                      </div>))}
                  </div>
                </article>
              </motion.div>)}

            {/* Next Action / Knowledge Check Section */}
            {currentLesson.quiz ? (<motion.div layout className={`mt-10 rounded-3xl border p-6 md:p-8 ${isDark ? "border-white/10 bg-white/[0.02]" : "border-black/10 bg-[#faf7f0]"}`}>
                <AnimatePresence mode="wait">
                {quizState === 'idle' && (<motion.div key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center text-center">
                     <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-mg-gold/20 mb-4`}>
                       <HelpCircle size={32} className="text-mg-gold"/>
                     </div>
                     <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-mg-light-text"}`}>
                        {"Knowledge Check"}
                     </h3>
                     <p className={`mt-2 text-sm max-w-md ${isDark ? "text-white/60" : "text-mg-light-textSecondary"}`}>
                        {`You must pass this short quiz (${currentLesson.quiz.requiredScore}%) to complete this lesson and move to the next one.`}
                     </p>
                     <button onClick={handleStartQuiz} className="mt-6 rounded-xl bg-mg-gold px-8 py-3 text-sm font-bold uppercase tracking-wider text-black transition-transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                       {"Start Quiz"}
                     </button>
                   </motion.div>)}

                {quizState === 'active' && (<motion.div key="active" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <h3 className={`text-lg font-bold mb-6 ${isDark ? "text-white" : "text-mg-light-text"}`}>
                      {"Lesson Quiz"}
                    </h3>
                    <div className="space-y-8">
                      {shuffledQuestions.map((q, qIdx) => (<div key={qIdx}>
                           <p className={`font-semibold mb-4 ${isDark ? "text-white" : "text-mg-light-text"}`}>
                             {qIdx + 1}. {q.question}
                           </p>
                           <div className="space-y-2">
                             {q.options.map((opt, oIdx) => {
                        const isSelected = answers[qIdx] === oIdx;
                        return (<button key={oIdx} onClick={() => setAnswers(prev => ({ ...prev, [qIdx]: oIdx }))} className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${isSelected
                                ? "border-mg-gold bg-mg-gold/10 text-mg-gold"
                                : isDark ? "border-white/10 text-white/70 hover:bg-white/5" : "border-black/10 text-mg-light-textSecondary hover:bg-black/5"}`}>
                                   <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${isSelected ? "border-mg-gold" : isDark ? "border-white/40" : "border-black/40"}`}>
                                      {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-mg-gold"/>}
                                   </div>
                                   <span className="text-sm">{opt}</span>
                                 </button>);
                    })}
                           </div>
                        </div>))}
                    </div>
                    <div className="mt-8 flex justify-end">
                      <button onClick={handleSubmitQuiz} disabled={Object.keys(answers).length < shuffledQuestions.length} className="rounded-xl bg-mg-gold px-8 py-3 text-sm font-bold uppercase tracking-wider text-black transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed">
                        {"Submit Quiz"}
                      </button>
                    </div>
                  </motion.div>)}

                {quizState === 'passed' && (<motion.div key="passed" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center text-center">
                     <CheckCircle2 size={56} className="text-mg-gold mb-4"/>
                     <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-mg-light-text"}`}>
                        {"Quiz Passed!"}
                     </h3>
                     <p className={`mt-2 text-sm ${isDark ? "text-white/60" : "text-mg-light-textSecondary"}`}>
                        {`You scored ${score}%. Great job.`}
                     </p>
                     <button className="mt-8 flex items-center gap-2 rounded-xl bg-mg-gold px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition-transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                       {"Complete & Next Lesson"}
                       <ArrowRight size={18}/>
                     </button>
                  </motion.div>)}

                {quizState === 'failed' && (<motion.div key="failed" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center text-center">
                     <XCircle size={56} className={`mb-4 ${isDark ? "text-white" : "text-gray-900"}`}/>
                     <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-mg-light-text"}`}>
                        {"Quiz Failed"}
                     </h3>
                     <p className={`mt-2 text-sm ${isDark ? "text-white/60" : "text-mg-light-textSecondary"}`}>
                        {`You scored ${score}%. You need at least ${currentLesson.quiz.requiredScore}% to pass.`}
                     </p>
                     <button onClick={handleRetakeQuiz} className={`mt-8 rounded-xl border px-8 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${isDark ? "border-white/20 text-white hover:bg-white/5" : "border-black/20 text-black hover:bg-black/5"}`}>
                       {"Retake Quiz"}
                     </button>
                  </motion.div>)}
                </AnimatePresence>
              </motion.div>) : (<motion.div layout className={`mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border p-6 md:p-8 ${isDark ? "border-white/10 bg-white/[0.02]" : "border-black/10 bg-[#faf7f0]"}`}>
                 <div>
                   <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-mg-light-text"}`}>
                      {"Finished this lesson?"}
                   </h3>
                   <p className={`mt-1 text-sm ${isDark ? "text-white/60" : "text-mg-light-textSecondary"}`}>
                      {"Mark it as complete to track your progress and move to the next topic."}
                   </p>
                 </div>
                 <button className="flex w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-mg-gold px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition-transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    {"Complete & Next"}
                    <ArrowRight size={18}/>
                 </button>
              </motion.div>)}
          </motion.div>
        </motion.div>

        {/* Sidebar: Course Curriculum/Playlist */}
        <AnimatePresence>
        {isSidebarOpen && (<motion.div layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }} className="relative lg:col-span-1">
            {/* Close Sidebar Button */}
            <button onClick={() => setIsSidebarOpen(false)} className={`absolute right-6 top-6 z-10 rounded-full p-2 transition-colors ${isDark ? "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white" : "bg-black/5 text-mg-light-textSecondary hover:bg-black/10 hover:text-black"}`} aria-label="Close course content">
              <X size={16}/>
            </button>
            <StudentSectionCard title={"Course Content"} description={courseCurriculum.title}>
              <div className="space-y-6">
                {courseCurriculum.modules.map((mod, mIdx) => (<div key={mIdx}>
                    <h3 className={`mb-3 text-xs font-bold uppercase tracking-wider ${isDark ? "text-white/40" : "text-mg-light-textSecondary/60"}`}>
                      {mod.title}
                    </h3>
                    <div className="flex flex-col gap-2">
                      {mod.lessons.map((lesson) => (<button key={lesson.id} className={`group flex w-full items-start gap-3 rounded-2xl p-3 text-left transition-all ${lesson.isCurrent
                        ? isDark ? "bg-mg-gold/10 border border-mg-gold/30" : "bg-mg-gold/10 border border-mg-gold/30"
                        : isDark ? "hover:bg-white/5 border border-transparent" : "hover:bg-black/5 border border-transparent"}`}>
                          <div className="mt-0.5 shrink-0">
                            {lesson.completed ? (<CheckCircle2 size={18} className="text-mg-gold"/>) : lesson.isCurrent ? (<PlayCircle size={18} className="text-mg-gold"/>) : (<Lock size={18} className={isDark ? "text-white/20" : "text-black/20"}/>)}
                          </div>
                          <div className="flex-1">
                            <h4 className={`text-sm font-bold ${lesson.isCurrent ? "text-mg-gold" : isDark ? "text-white" : "text-mg-light-text"}`}>{lesson.title}</h4>
                            <div className={`mt-1 flex items-center gap-2 text-xs font-medium ${lesson.isCurrent ? (isDark ? "text-mg-gold/80" : "text-mg-gold") : (isDark ? "text-white/40" : "text-mg-light-textSecondary/60")}`}>
                              <Clock3 size={12}/>
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                        </button>))}
                    </div>
                  </div>))}
              </div>
            </StudentSectionCard>
          </motion.div>)}
        </AnimatePresence>
      </motion.div>
    </motion.div>);
}
