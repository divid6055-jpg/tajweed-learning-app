"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, CheckCircle2, XCircle, RotateCcw, 
  Trophy, Award, Star, Brain, Target
} from "lucide-react";
import { quizQuestions, type QuizQuestion } from "@/lib/tajweed/data";
import { allSections } from "@/lib/tajweed/data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface QuizScreenProps {
  onBack: () => void;
  quizScores: Record<string, number>;
  onRecordScore: (quizId: string, score: number) => void;
}

type QuizState = "intro" | "playing" | "results";

export function QuizScreen({ onBack, quizScores, onRecordScore }: QuizScreenProps) {
  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  // Start a new quiz
  const startQuiz = (filterSection?: string) => {
    let qs = [...quizQuestions];
    if (filterSection) {
      qs = qs.filter(q => q.sectionId === filterSection);
    }
    // Shuffle questions
    qs = qs.sort(() => Math.random() - 0.5).slice(0, Math.min(10, qs.length));
    setQuestions(qs);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setAnsweredQuestions(new Array(qs.length).fill(false));
    setQuizState("playing");
  };

  // Handle answer selection
  const handleAnswer = (answerIdx: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIdx);
    setShowFeedback(true);
    
    const isCorrect = answerIdx === questions[currentIdx].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      const newAnswered = [...answeredQuestions];
      newAnswered[currentIdx] = true;
      setAnsweredQuestions(newAnswered);
      toast.success("إجابة صحيحة! 🎉");
    } else {
      toast.error("إجابة خاطئة");
    }
  };

  // Move to next question
  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Quiz finished
      const finalScore = Math.round((score / questions.length) * 100);
      onRecordScore("main-quiz", finalScore);
      setQuizState("results");
    }
  };

  // Restart
  const handleRestart = () => {
    setQuizState("intro");
    setQuestions([]);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
  };

  // INTRO SCREEN
  if (quizState === "intro") {
    const previousScore = quizScores["main-quiz"];
    
    return (
      <div className="max-w-md mx-auto px-4 pb-6 pt-12 safe-top">
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronRight className="w-5 h-5" />
          <span className="text-sm font-medium">رجوع</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold font-display mb-2">الاختبارات التفاعلية</h1>
          <p className="text-muted-foreground leading-relaxed px-4">
            اختبر معلوماتك في أحكام التجويد من خلال أسئلة متنوعة
          </p>
        </motion.div>

        {/* Previous score */}
        {previousScore !== undefined && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-6"
          >
            <Card className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-900/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">أفضل نتيجة لك</p>
                  <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {previousScore}%
                  </p>
                </div>
                <Trophy className="w-12 h-12 text-amber-500" />
              </div>
            </Card>
          </motion.div>
        )}

        {/* Quiz options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="space-y-3"
        >
          <h2 className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wide">
            اختر نوع الاختبار
          </h2>
          
          <Card 
            className="p-4 border-2 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
            onClick={() => startQuiz()}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-base mb-0.5">اختبار شامل</h3>
                <p className="text-xs text-muted-foreground">10 أسئلة عشوائية من جميع الأقسام</p>
              </div>
            </div>
          </Card>

          {allSections.map(section => {
            const sectionQuestions = quizQuestions.filter(q => q.sectionId === section.id);
            if (sectionQuestions.length === 0) return null;
            
            return (
              <Card
                key={section.id}
                className="p-4 border-2 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
                onClick={() => startQuiz(section.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center
                    ${section.color === 'emerald' 
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-700' 
                      : 'bg-gradient-to-br from-amber-400 to-amber-600'}
                  `}>
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base mb-0.5">{section.title}</h3>
                    <p className="text-xs text-muted-foreground">{sectionQuestions.length} أسئلة</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </motion.div>
      </div>
    );
  }

  // PLAYING SCREEN
  if (quizState === "playing" && questions.length > 0) {
    const question = questions[currentIdx];
    const progress = ((currentIdx) / questions.length) * 100;
    
    return (
      <div className="max-w-md mx-auto px-4 pb-6 pt-12 safe-top min-h-screen flex flex-col">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              السؤال {currentIdx + 1} من {questions.length}
            </span>
            <span className="text-sm font-bold text-primary">
              النقاط: {score}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            {/* Question */}
            <Card className="p-6 mb-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-bold text-sm">
                  {currentIdx + 1}
                </div>
                <h2 className="text-lg font-bold leading-relaxed pt-1">
                  {question.question}
                </h2>
              </div>
            </Card>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === question.correctAnswer;
                const showCorrect = showFeedback && isCorrect;
                const showWrong = showFeedback && isSelected && !isCorrect;
                
                return (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(idx)}
                    disabled={showFeedback}
                    className={`
                      w-full p-4 rounded-2xl border-2 text-right transition-all duration-200
                      ${showCorrect 
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' 
                        : showWrong 
                        ? 'border-red-500 bg-red-50 dark:bg-red-950/30'
                        : isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:border-primary/30 hover:bg-muted/50'
                      }
                      ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-base">{option}</span>
                      {showCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      )}
                      {showWrong && (
                        <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4"
                >
                  <Card className={`
                    p-4 border-2
                    ${selectedAnswer === question.correctAnswer
                      ? 'border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800/40'
                      : 'border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800/40'
                    }
                  `}>
                    <div className="flex items-start gap-3">
                      {selectedAnswer === question.correctAnswer ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-bold text-sm mb-1">
                          {selectedAnswer === question.correctAnswer ? 'إجابة صحيحة!' : 'إجابة خاطئة'}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </Card>
                  
                  <Button
                    onClick={handleNext}
                    className="w-full mt-4 h-12 text-base font-bold rounded-2xl"
                  >
                    {currentIdx + 1 < questions.length ? "السؤال التالي" : "عرض النتائج"}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // RESULTS SCREEN
  if (quizState === "results") {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 60;
    const isExcellent = percentage >= 90;
    
    return (
      <div className="max-w-md mx-auto px-4 pb-6 pt-12 safe-top min-h-screen flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Trophy/Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className={`
              w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl
              ${isExcellent 
                ? 'bg-gradient-to-br from-amber-300 to-amber-500' 
                : passed
                ? 'bg-gradient-to-br from-emerald-400 to-emerald-600'
                : 'bg-gradient-to-br from-slate-400 to-slate-500'
              }
            `}
          >
            {isExcellent ? (
              <Trophy className="w-16 h-16 text-white" />
            ) : passed ? (
              <Award className="w-16 h-16 text-white" />
            ) : (
              <RotateCcw className="w-16 h-16 text-white" />
            )}
          </motion.div>

          {/* Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold font-display mb-2">
              {percentage}%
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              {score} من {questions.length} إجابات صحيحة
            </p>
            <p className={`text-xl font-bold mb-8 ${passed ? 'text-emerald-600' : 'text-amber-600'}`}>
              {isExcellent ? 'ممتاز! أداء رائع 🌟' : passed ? 'أحسنت! نجحت في الاختبار 👏' : 'تحتاج للمزيد من الممارسة 📚'}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="grid grid-cols-3 gap-3 mb-8"
          >
            <Card className="p-4">
              <div className="text-2xl font-bold text-emerald-600">{score}</div>
              <div className="text-xs text-muted-foreground mt-1">صحيحة</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-red-500">{questions.length - score}</div>
              <div className="text-xs text-muted-foreground mt-1">خاطئة</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-primary">{questions.length}</div>
              <div className="text-xs text-muted-foreground mt-1">المجموع</div>
            </Card>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="space-y-3"
          >
            <Button
              onClick={handleRestart}
              className="w-full h-14 text-base font-bold rounded-2xl"
            >
              <RotateCcw className="w-5 h-5 ml-2" />
              اختبار جديد
            </Button>
            <Button
              onClick={onBack}
              variant="outline"
              className="w-full h-14 text-base font-bold rounded-2xl"
            >
              العودة للرئيسية
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return null;
}
