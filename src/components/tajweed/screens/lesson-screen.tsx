"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ChevronRight, CheckCircle2, Bookmark, BookmarkCheck,
  Volume2, BookMarked, ArrowLeft, Lightbulb, Info
} from "lucide-react";
import type { TajweedRule, TajweedSection } from "@/lib/tajweed/data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface LessonScreenProps {
  lesson: TajweedRule;
  section: TajweedSection | null;
  onBack: () => void;
  onComplete: (lessonId: string) => void;
  isCompleted: boolean;
  isBookmarked: boolean;
  onToggleBookmark: (lessonId: string) => void;
}

export function LessonScreen({
  lesson,
  section,
  onBack,
  onComplete,
  isCompleted,
  isBookmarked,
  onToggleBookmark,
}: LessonScreenProps) {
  // Track time spent for study tracking
  useEffect(() => {
    const startTime = Date.now();
    return () => {
      const minutes = Math.max(1, Math.round((Date.now() - startTime) / 60000));
      // We could log study time here
    };
  }, [lesson.id]);

  const handleComplete = () => {
    if (!isCompleted) {
      onComplete(lesson.id);
      toast.success("أحسنت! تم إكمال الدرس بنجاح 🎉");
    }
  };

  const handleBookmark = () => {
    onToggleBookmark(lesson.id);
    toast.success(isBookmarked ? "تمت إزالة العلامة" : "تمت الإضافة للمحفوظات ⭐");
  };

  // Speak text using Web Speech API
  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ar-SA";
      utterance.rate = 0.75;
      utterance.pitch = 1;
      
      // Try to find an Arabic voice
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find(v => v.lang.startsWith("ar"));
      if (arabicVoice) {
        utterance.voice = arabicVoice;
      }
      
      window.speechSynthesis.speak(utterance);
      toast.info("جاري التشغيل... 🔊");
    } else {
      toast.error("عذراً، لا يدعم متصفحك ميزة النطق");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 pb-6 pt-12 safe-top">
      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-4"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
          <span className="text-sm font-medium">
            {section?.title || "رجوع"}
          </span>
        </button>
        
        <button
          onClick={handleBookmark}
          className="w-9 h-9 rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
          aria-label={isBookmarked ? "إزالة من المحفوظات" : "إضافة للمحفوظات"}
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-5 h-5 text-amber-500" />
          ) : (
            <Bookmark className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
      </motion.div>

      {/* Lesson header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <Badge variant="secondary" className="mb-2 text-xs">
          {lesson.nameEn}
        </Badge>
        <h1 className="text-2xl font-bold font-display mb-3 leading-tight">
          {lesson.name}
        </h1>
        
        {/* Description */}
        <Card className="p-4 bg-primary/5 border-primary/20 mb-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Info className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm leading-relaxed text-foreground">
              {lesson.description}
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Letters (if any) */}
      {lesson.letters && lesson.letters.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6"
        >
          <h2 className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wide">
            الحروف
          </h2>
          <Card className="p-4">
            <div className="flex flex-wrap gap-2">
              {lesson.letters.map((letter, idx) => (
                <div
                  key={idx}
                  className="min-w-12 h-14 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800/40 flex items-center justify-center px-3"
                >
                  <span className="font-arabic text-2xl text-emerald-700 dark:text-emerald-300">
                    {letter}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Detailed explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mb-6"
      >
        <h2 className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wide flex items-center gap-2">
          <Lightbulb className="w-4 h-4" />
          الشرح المفصل
        </h2>
        <Card className="p-5">
          <p className="text-base leading-loose text-foreground">
            {lesson.detailedExplanation}
          </p>
        </Card>
      </motion.div>

      {/* Examples */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-6"
      >
        <h2 className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wide">
          الأمثلة التطبيقية
        </h2>
        <div className="space-y-3">
          {lesson.examples.map((example, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.25 + idx * 0.05 }}
            >
              <Card className="p-4 border-2">
                {/* Example text with audio */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex-1 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/10 dark:to-orange-950/10 rounded-xl p-4 text-center">
                    <p className="font-arabic text-3xl leading-loose text-foreground">
                      {example.text}
                    </p>
                  </div>
                  <button
                    onClick={() => speakText(example.text)}
                    className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 hover:bg-primary/90 active:scale-95 transition-all"
                    aria-label="استماع للمثال"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Rule badge */}
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="text-xs" variant="secondary">
                    {example.rule}
                  </Badge>
                </div>
                
                {/* Explanation */}
                <div className="flex items-start gap-2">
                  <div className="w-1 self-stretch rounded-full bg-primary/30 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                    {example.explanation}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Complete button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="sticky bottom-4"
      >
        <Button
          onClick={handleComplete}
          disabled={isCompleted}
          className={`
            w-full h-14 text-base font-bold rounded-2xl shadow-lg
            ${isCompleted 
              ? 'bg-emerald-500 hover:bg-emerald-500 text-white' 
              : 'bg-primary hover:bg-primary/90 text-primary-foreground'
            }
          `}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-5 h-5 ml-2" />
              تم إكمال هذا الدرس
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5 ml-2" />
              إكمال الدرس
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
