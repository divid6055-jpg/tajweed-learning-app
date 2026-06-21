"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HomeScreen } from "@/components/tajweed/screens/home-screen";
import { SectionScreen } from "@/components/tajweed/screens/section-screen";
import { LessonScreen } from "@/components/tajweed/screens/lesson-screen";
import { QuizScreen } from "@/components/tajweed/screens/quiz-screen";
import { ProgressScreen } from "@/components/tajweed/screens/progress-screen";
import { BottomNav } from "@/components/tajweed/bottom-nav";
import { useProgress } from "@/lib/tajweed/use-progress";
import { allSections, type TajweedSection, type TajweedRule } from "@/lib/tajweed/data";

export type ScreenType = "home" | "section" | "lesson" | "quiz" | "progress";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("home");
  const [selectedSection, setSelectedSection] = useState<TajweedSection | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<TajweedRule | null>(null);
  const [activeTab, setActiveTab] = useState<"home" | "progress" | "quiz">("home");

  const {
    progress,
    markLessonComplete,
    toggleBookmark,
    recordQuizScore,
  } = useProgress();

  // Navigate to a specific section
  const navigateToSection = (section: TajweedSection) => {
    setSelectedSection(section);
    setCurrentScreen("section");
  };

  // Navigate to a specific lesson
  const navigateToLesson = (lesson: TajweedRule) => {
    setSelectedLesson(lesson);
    setCurrentScreen("lesson");
  };

  // Navigate back
  const goBack = () => {
    if (currentScreen === "lesson") {
      setCurrentScreen("section");
      setSelectedLesson(null);
    } else if (currentScreen === "section") {
      setCurrentScreen("home");
      setSelectedSection(null);
    } else if (currentScreen === "quiz") {
      setCurrentScreen("home");
      setActiveTab("home");
    }
  };

  // Handle tab change
  const handleTabChange = (tab: "home" | "progress" | "quiz") => {
    setActiveTab(tab);
    if (tab === "home") {
      setCurrentScreen("home");
      setSelectedSection(null);
      setSelectedLesson(null);
    } else if (tab === "progress") {
      setCurrentScreen("progress");
    } else if (tab === "quiz") {
      setCurrentScreen("quiz");
    }
  };

  // Mark lesson complete and go back
  const handleLessonComplete = (lessonId: string) => {
    markLessonComplete(lessonId);
  };

  // Compute total lessons
  const totalLessons = allSections.reduce((acc, s) => acc + s.rules.length, 0);
  const completedLessons = progress.completedLessons.length;
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const screenVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pattern-bg">
      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {currentScreen === "home" && (
            <motion.div
              key="home"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="h-full"
            >
              <HomeScreen
                sections={allSections}
                onNavigateToSection={navigateToSection}
                progress={progress}
                overallProgress={overallProgress}
                totalLessons={totalLessons}
                completedLessons={completedLessons}
                onNavigateToQuiz={() => handleTabChange("quiz")}
              />
            </motion.div>
          )}

          {currentScreen === "section" && selectedSection && (
            <motion.div
              key={`section-${selectedSection.id}`}
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="h-full"
            >
              <SectionScreen
                section={selectedSection}
                onBack={goBack}
                onNavigateToLesson={navigateToLesson}
                completedLessons={progress.completedLessons}
                bookmarkedLessons={progress.bookmarkedLessons}
              />
            </motion.div>
          )}

          {currentScreen === "lesson" && selectedLesson && (
            <motion.div
              key={`lesson-${selectedLesson.id}`}
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="h-full"
            >
              <LessonScreen
                lesson={selectedLesson}
                section={selectedSection}
                onBack={goBack}
                onComplete={handleLessonComplete}
                isCompleted={progress.completedLessons.includes(selectedLesson.id)}
                isBookmarked={progress.bookmarkedLessons.includes(selectedLesson.id)}
                onToggleBookmark={toggleBookmark}
              />
            </motion.div>
          )}

          {currentScreen === "quiz" && (
            <motion.div
              key="quiz"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="h-full"
            >
              <QuizScreen
                onBack={goBack}
                quizScores={progress.quizScores}
                onRecordScore={recordQuizScore}
              />
            </motion.div>
          )}

          {currentScreen === "progress" && (
            <motion.div
              key="progress"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="h-full"
            >
              <ProgressScreen
                progress={progress}
                sections={allSections}
                totalLessons={totalLessons}
                overallProgress={overallProgress}
                onNavigateToSection={navigateToSection}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
