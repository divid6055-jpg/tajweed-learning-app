"use client";

import { motion } from "framer-motion";
import { 
  BookOpen, Sparkles, Layers, Waves, Scroll, Smile,
  ChevronLeft, Star, Clock, TrendingUp, Award, Flame
} from "lucide-react";
import type { TajweedSection } from "@/lib/tajweed/data";
import type { UserProgress } from "@/lib/tajweed/use-progress";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface HomeScreenProps {
  sections: TajweedSection[];
  onNavigateToSection: (section: TajweedSection) => void;
  progress: UserProgress;
  overallProgress: number;
  totalLessons: number;
  completedLessons: number;
  onNavigateToQuiz: () => void;
}

const iconMap: Record<string, typeof BookOpen> = {
  Smile,
  Sparkles,
  BookOpen,
  Layers,
  Waves,
  Scroll,
};

const levelColors: Record<string, string> = {
  "مبتدئ": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "متوسط": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "متقدم": "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
};

export function HomeScreen({
  sections,
  onNavigateToSection,
  progress,
  overallProgress,
  totalLessons,
  completedLessons,
  onNavigateToQuiz,
}: HomeScreenProps) {
  return (
    <div className="max-w-md mx-auto px-4 pb-6 pt-12 safe-top">
      {/* Header */}
      <header className="mb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-2"
        >
          <div>
            <p className="text-sm text-muted-foreground mb-0.5">السلام عليكم 👋</p>
            <h1 className="text-2xl font-bold font-display text-foreground">
              تعلّم التجويد
            </h1>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-full">
            <Flame className="w-4 h-4" />
            <span className="text-sm font-bold">{progress.streakDays}</span>
          </div>
        </motion.div>
      </header>

      {/* Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-6"
      >
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white relative">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10" aria-hidden>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="islamic-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="white" strokeWidth="0.5"/>
                <circle cx="20" cy="20" r="3" fill="white" opacity="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#islamic-pattern)"/>
            </svg>
          </div>
          
          <div className="relative p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-emerald-100 text-sm mb-0.5">رحلتك في التعلم</p>
                <p className="text-3xl font-bold font-display">{overallProgress}%</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
                <Award className="w-8 h-8 text-amber-300" />
              </div>
            </div>
            
            <div className="relative h-2 bg-white/15 rounded-full overflow-hidden mb-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-y-0 right-0 bg-gradient-to-l from-amber-400 to-amber-300 rounded-full"
              />
            </div>
            
            <div className="flex justify-between text-xs text-emerald-100">
              <span>{completedLessons} من {totalLessons} درس</span>
              <span>{sections.length} أقسام</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="grid grid-cols-2 gap-3 mb-6"
      >
        <Button
          variant="outline"
          onClick={onNavigateToQuiz}
          className="h-auto py-4 justify-start border-2 hover:border-primary/40 hover:bg-primary/5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-right">
              <p className="font-bold text-sm">اختبر نفسك</p>
              <p className="text-xs text-muted-foreground">اختبارات تفاعلية</p>
            </div>
          </div>
        </Button>
        
        <Card className="p-4 border-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="font-bold text-sm">{progress.totalStudyTime} د</p>
              <p className="text-xs text-muted-foreground">وقت الدراسة</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Sections */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-display">الأقسام</h2>
          <span className="text-sm text-muted-foreground">{sections.length} أقسام</span>
        </div>
        
        <div className="space-y-3">
          {sections.map((section, idx) => {
            const Icon = iconMap[section.icon] || BookOpen;
            const sectionCompleted = section.rules.filter(rule => 
              progress.completedLessons.includes(rule.id)
            ).length;
            const sectionProgress = Math.round((sectionCompleted / section.rules.length) * 100);
            const isComplete = sectionProgress === 100;
            
            return (
              <motion.button
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
                onClick={() => onNavigateToSection(section)}
                className="w-full text-right group"
              >
                <Card className="p-4 border-2 hover:border-primary/30 hover:shadow-lg transition-all duration-200 group-hover:-translate-y-0.5">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 relative
                      ${section.color === 'emerald' 
                        ? 'bg-gradient-to-br from-emerald-500 to-emerald-700 text-white' 
                        : 'bg-gradient-to-br from-amber-400 to-amber-600 text-white'}
                    `}>
                      <Icon className="w-7 h-7" strokeWidth={2} />
                      {isComplete && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-background">
                          <Star className="w-2.5 h-2.5 text-white fill-white" />
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-base text-foreground leading-tight">
                          {section.title}
                        </h3>
                        <ChevronLeft className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2 leading-relaxed">
                        {section.description}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${levelColors[section.level]}`}
                        >
                          {section.level}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {section.estimatedMinutes} د
                        </span>
                        <span className="text-xs text-muted-foreground">
                          • {section.rules.length} دروس
                        </span>
                      </div>
                      
                      {/* Progress bar */}
                      {sectionProgress > 0 && (
                        <div className="mt-3 flex items-center gap-2">
                          <Progress value={sectionProgress} className="h-1.5 flex-1" />
                          <span className="text-xs font-medium text-muted-foreground">
                            {sectionProgress}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Footer Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mt-8 text-center"
      >
        <Card className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-900/30">
          <p className="font-arabic text-lg leading-relaxed text-foreground mb-2">
            وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا
          </p>
          <p className="text-xs text-muted-foreground">
            سورة المزمل - آية 4
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
