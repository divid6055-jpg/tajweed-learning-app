"use client";

import { motion } from "framer-motion";
import { 
  ChevronRight, Award, Flame, Clock, TrendingUp, 
  BookOpen, Star, Target, Bookmark
} from "lucide-react";
import type { TajweedSection } from "@/lib/tajweed/data";
import type { UserProgress } from "@/lib/tajweed/use-progress";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ProgressScreenProps {
  progress: UserProgress;
  sections: TajweedSection[];
  totalLessons: number;
  overallProgress: number;
  onNavigateToSection: (section: TajweedSection) => void;
}

export function ProgressScreen({
  progress,
  sections,
  totalLessons,
  overallProgress,
  onNavigateToSection,
}: ProgressScreenProps) {
  const completedLessons = progress.completedLessons.length;
  const completedQuizzes = progress.completedQuizzes.length;
  const averageQuizScore = Object.values(progress.quizScores).length > 0
    ? Math.round(Object.values(progress.quizScores).reduce((a, b) => a + b, 0) / Object.values(progress.quizScores).length)
    : 0;

  return (
    <div className="max-w-md mx-auto px-4 pb-6 pt-12 safe-top">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold font-display mb-1">تقدمي في التعلم</h1>
        <p className="text-sm text-muted-foreground">تابع رحلتك في إتقان التجويد</p>
      </motion.div>

      {/* Stats grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-2 gap-3 mb-6"
      >
        <Card className="p-4 border-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{completedLessons}</p>
              <p className="text-xs text-muted-foreground">دروس مكتملة</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Target className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{completedQuizzes}</p>
              <p className="text-xs text-muted-foreground">اختبارات</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
              <Flame className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{progress.streakDays}</p>
              <p className="text-xs text-muted-foreground">أيام متتالية</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{progress.totalStudyTime}</p>
              <p className="text-xs text-muted-foreground">دقيقة دراسة</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Overall progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mb-6"
      >
        <Card className="p-5 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white border-0 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" aria-hidden>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="progress-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="2" fill="white"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#progress-pattern)"/>
            </svg>
          </div>
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-emerald-100 text-sm mb-1">التقدم الإجمالي</p>
                <p className="text-4xl font-bold font-display">{overallProgress}%</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center">
                <Award className="w-8 h-8 text-amber-300" />
              </div>
            </div>
            <div className="relative h-2.5 bg-white/20 rounded-full overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-y-0 right-0 bg-gradient-to-l from-amber-400 to-amber-300 rounded-full"
              />
            </div>
            <p className="text-xs text-emerald-100">
              {completedLessons} من {totalLessons} دروس مكتملة
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Quiz average */}
      {Object.keys(progress.quizScores).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wide">
            نتائج الاختبارات
          </h2>
          <Card className="p-4 border-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="font-bold">المتوسط</p>
                  <p className="text-xs text-muted-foreground">من {Object.keys(progress.quizScores).length} اختبارات</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {averageQuizScore}%
              </div>
            </div>
            <Progress value={averageQuizScore} className="h-2" />
          </Card>
        </motion.div>
      )}

      {/* Bookmarked lessons */}
      {progress.bookmarkedLessons.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mb-6"
        >
          <h2 className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wide flex items-center gap-2">
            <Bookmark className="w-4 h-4" />
            الدروس المحفوظة ({progress.bookmarkedLessons.length})
          </h2>
          <Card className="p-4 border-2">
            <p className="text-sm text-muted-foreground">
              لديك {progress.bookmarkedLessons.length} دروس محفوظة للرجوع إليها لاحقاً
            </p>
          </Card>
        </motion.div>
      )}

      {/* Sections progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h2 className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wide">
          تقدم الأقسام
        </h2>
        <div className="space-y-3">
          {sections.map((section, idx) => {
            const completed = section.rules.filter(r => 
              progress.completedLessons.includes(r.id)
            ).length;
            const sectionProgress = Math.round((completed / section.rules.length) * 100);
            const isComplete = sectionProgress === 100;
            
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.35 + idx * 0.05 }}
              >
                <Card 
                  className="p-4 border-2 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => onNavigateToSection(section)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-10 h-10 rounded-xl flex items-center justify-center
                        ${isComplete 
                          ? 'bg-emerald-500 text-white' 
                          : section.color === 'emerald'
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                        }
                      `}>
                        {isComplete ? (
                          <Star className="w-5 h-5 fill-white" />
                        ) : (
                          <BookOpen className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm">{section.title}</h3>
                        <p className="text-xs text-muted-foreground">{completed}/{section.rules.length} دروس</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{sectionProgress}%</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground rotate-180" />
                    </div>
                  </div>
                  <Progress value={sectionProgress} className="h-1.5" />
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Motivational message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mt-8"
      >
        <Card className="p-5 text-center bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-900/30">
          <p className="font-arabic text-lg leading-relaxed mb-2">
            {overallProgress === 0 
              ? "ابدأ رحلتك في تعلم التجويد اليوم 🌱"
              : overallProgress < 25
              ? "خطوة رائعة! استمر في التعلم 📚"
              : overallProgress < 50
              ? "نصف الطريق! أنت تتقدم بثبات 💪"
              : overallProgress < 75
              ? "أداء متميز! اقتربت من إكمال المنهج 🎯"
              : overallProgress < 100
              ? "رائع! على وشك إكمال جميع الدروس 🌟"
              : "ما شاء الله! أكملت جميع الدروس بنجاح 🏆"
            }
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
