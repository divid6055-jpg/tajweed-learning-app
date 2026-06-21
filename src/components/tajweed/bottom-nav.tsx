"use client";

import { motion } from "framer-motion";
import { Home, TrendingUp, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab: "home" | "progress" | "quiz";
  onTabChange: (tab: "home" | "progress" | "quiz") => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home" as const, label: "الرئيسية", icon: Home },
    { id: "quiz" as const, label: "الاختبارات", icon: HelpCircle },
    { id: "progress" as const, label: "تقدمي", icon: TrendingUp },
  ];

  return (
    <nav className="sticky bottom-0 z-40 glass border-t border-border/40 safe-bottom">
      <div className="max-w-md mx-auto px-2 py-2">
        <div className="grid grid-cols-3 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "relative flex flex-col items-center justify-center py-2.5 px-3 rounded-2xl transition-all duration-200",
                  "min-h-[52px] touch-manipulation",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
                aria-label={tab.label}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-primary/10 rounded-2xl"
                    transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
                  />
                )}
                <motion.div
                  animate={isActive ? { scale: 1, y: 0 } : { scale: 0.9, y: 0 }}
                  className="relative z-10 flex flex-col items-center gap-1"
                >
                  <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5]")} />
                  <span className={cn(
                    "text-xs font-medium",
                    isActive ? "font-bold" : "font-normal"
                  )}>
                    {tab.label}
                  </span>
                </motion.div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
