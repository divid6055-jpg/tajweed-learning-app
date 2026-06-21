"use client";

import { motion } from "framer-motion";
import { 
  ChevronRight, BookOpen, Sparkles, Layers, Waves, Scroll, Smile,
  CheckCircle2, Circle, Bookmark, Clock, PlayCircle
} from "lucide-react";
import type { TajweedSection, TajweedRule } from "@/lib/tajweed/data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface SectionScreenProps {
  section: TajweedSection;
  onBack: () => void;
  onNavigateToLesson: (lesson: TajweedRule) => void;
  completedLessons: string[];
  bookmarkedLessons: string[];
}

const iconMap: Record<string, typeof BookOpen> = {
  Smile,
  Sparkles,
  BookOpen,
  Layers,
  Waves,
  Scroll,
};

export function SectionScreen({
  section,
  onBack,
  onNavigateToLesson,
  completedLessons,
  bookmarkedLessons,
}: SectionScreenProps) {
  const Icon = iconMap[section.icon] || BookOpen;
  const completedCount = section.rules.filter(r => completedLessons.includes(r.id)).length;
  const sectionProgress = Math.round((completedCount / section.rules.length) * 100);

  return (
    <div className="max-w-md mx-auto px-4 pb-6 pt-12 safe-top">
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ChevronRight className="w-5 h-5" />
        <span className="text-sm font-medium">رجوع</span>
      </motion.button>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <div className={`
          w-20 h-20 rounded-3xl flex items-center justify-center mb-4 shadow-lg
          ${section.color === 'emerald' 
            ? 'bg-gradient-to-br from-emerald-500 to-emerald-700 text-white' 
            : 'bg-gradient-to-br from-amber-400 to-amber-600 text-white'}
        `}>
          <Icon className="w-10 h-10" strokeWidth={2} />
        </div>
        
        <h1 className="text-2xl font-bold font-display mb-2">{section.title}</h1>
        <p className="text-muted-foreground leading-relaxed mb-3">{section.description}</p>
        
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="text-xs">
            {section.level}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {section.estimatedMinutes} دقيقة
          </span>
          <span className="text-xs text-muted-foreground">
            • {section.rules.length} دروس
          </span>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">تقدم القسم</span>
            <span className="font-medium">{completedCount}/{section.rules.length} ({sectionProgress}%)</span>
          </div>
          <Progress value={sectionProgress} className="h-2" />
        </div>
      </motion.div>

      {/* Lessons list */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold font-display mb-3">الدروس</h2>
        {section.rules.map((lesson, idx) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isBookmarked = bookmarkedLessons.includes(lesson.id);
          
          return (
            <motion.button
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => onNavigateToLesson(lesson)}
              className="w-full text-right group"
            >
              <Card className={`
                p-4 border-2 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md
                ${isCompleted ? 'border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/10 dark:border-emerald-900/30' : 'hover:border-primary/30'}
              `}>
                <div className="flex items-start gap-3">
                  {/* Number/Status */}
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                    ${isCompleted 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                    }
                  `}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span className="font-bold text-sm">{idx + 1}</span>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-base leading-tight">{lesson.name}</h3>
                      <div className="flex items-center gap-1 shrink-0">
                        {isBookmarked && (
                          <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />
                        )}
                        <ChevronRight className="w-4 h-4 text-muted-foreground rotate-180" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-2">
                      {lesson.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <PlayCircle className="w-3 h-3" />
                        {lesson.examples.length} أمثلة
                      </span>
                      {lesson.letters && lesson.letters.length > 0 && (
                        <span className="flex items-center gap-1">
                          <span className="text-base leading-none">
                            {Array.isArray(lesson.letters) ? lesson.letters[0]?.slice(0, 5) : ''}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
