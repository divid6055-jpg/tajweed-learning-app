"use client";

import { useState, useCallback } from "react";

export interface UserProgress {
  completedLessons: string[];
  completedQuizzes: string[];
  quizScores: Record<string, number>;
  bookmarkedLessons: string[];
  streakDays: number;
  lastVisit: string;
  totalStudyTime: number; // minutes
}

const STORAGE_KEY = "tajweed-progress-v1";

const defaultProgress: UserProgress = {
  completedLessons: [],
  completedQuizzes: [],
  quizScores: {},
  bookmarkedLessons: [],
  streakDays: 1,
  lastVisit: new Date().toDateString(),
  totalStudyTime: 0,
};

export function useProgress() {
  // Load from localStorage (using lazy initializer pattern to avoid setState in effect)
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window === "undefined") return defaultProgress;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as UserProgress;
        // Calculate streak
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (parsed.lastVisit === today) {
          // Same day, keep streak
        } else if (parsed.lastVisit === yesterday) {
          // Consecutive day, increment streak
          parsed.streakDays = (parsed.streakDays || 0) + 1;
          parsed.lastVisit = today;
        } else {
          // Streak broken
          parsed.streakDays = 1;
          parsed.lastVisit = today;
        }
        // Save the updated streak back to localStorage
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...defaultProgress, ...parsed }));
        } catch {}
        return { ...defaultProgress, ...parsed };
      }
    } catch (e) {
      console.error("Failed to load progress:", e);
    }
    return defaultProgress;
  });

  // Save to localStorage
  const saveProgress = useCallback((newProgress: UserProgress) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (e) {
      console.error("Failed to save progress:", e);
    }
  }, []);

  const markLessonComplete = useCallback((lessonId: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const newProgress = {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      } catch (e) {
        console.error(e);
      }
      return newProgress;
    });
  }, []);

  const toggleBookmark = useCallback((lessonId: string) => {
    setProgress((prev) => {
      const newBookmarked = prev.bookmarkedLessons.includes(lessonId)
        ? prev.bookmarkedLessons.filter((id) => id !== lessonId)
        : [...prev.bookmarkedLessons, lessonId];
      const newProgress = { ...prev, bookmarkedLessons: newBookmarked };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      } catch (e) {
        console.error(e);
      }
      return newProgress;
    });
  }, []);

  const recordQuizScore = useCallback((quizId: string, score: number) => {
    setProgress((prev) => {
      const newScores = { ...prev.quizScores };
      // Only keep the highest score
      if (!newScores[quizId] || score > newScores[quizId]) {
        newScores[quizId] = score;
      }
      const newQuizzes = prev.completedQuizzes.includes(quizId)
        ? prev.completedQuizzes
        : [...prev.completedQuizzes, quizId];
      const newProgress = {
        ...prev,
        quizScores: newScores,
        completedQuizzes: newQuizzes,
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      } catch (e) {
        console.error(e);
      }
      return newProgress;
    });
  }, []);

  const addStudyTime = useCallback((minutes: number) => {
    setProgress((prev) => {
      const newProgress = {
        ...prev,
        totalStudyTime: prev.totalStudyTime + minutes,
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      } catch (e) {
        console.error(e);
      }
      return newProgress;
    });
  }, []);

  const resetProgress = useCallback(() => {
    saveProgress(defaultProgress);
  }, [saveProgress]);

  return {
    progress,
    markLessonComplete,
    toggleBookmark,
    recordQuizScore,
    addStudyTime,
    resetProgress,
  };
}
