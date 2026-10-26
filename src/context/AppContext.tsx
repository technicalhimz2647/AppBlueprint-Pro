/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  CHAPTERS,
  DEFAULT_USER,
  OBJECTIVE_QUESTIONS_CH1,
} from '../data/mockData';
import {
  Chapter,
  Question,
  TestResultRecord,
  TestSession,
  User,
  UserPreferences,
} from '../types';

export type ScreenName =
  | 'home'
  | 'notes'
  | 'chapter-detail'
  | 'tests'
  | 'exam'
  | 'exam-result'
  | 'profile'
  | 'register';

interface AppContextType {
  user: User;
  updateUser: (updated: Partial<User>) => void;
  registerUser: (newUser: User) => void;
  preferences: UserPreferences;
  toggleTheme: () => void;
  setFontSizeStep: (step: number) => void;
  toggleDeviceViewMode: () => void;
  toggleBookmark: (type: 'chapters' | 'questions' | 'subjectives', id: string | number) => void;
  isBookmarked: (type: 'chapters' | 'questions' | 'subjectives', id: string | number) => boolean;
  activeScreen: ScreenName;
  navigateTo: (screen: ScreenName, params?: { chapterId?: string; result?: TestResultRecord }) => void;
  selectedChapterId: string;
  selectedChapter: Chapter;
  activeTestSession: TestSession | null;
  startTest: (chapterId?: string, customQuestions?: Question[], titleOverride?: string) => void;
  selectOption: (questionIndex: number, optionIndex: number) => void;
  toggleMarkForReview: (questionIndex: number) => void;
  submitCurrentTest: () => void;
  retestIncorrectQuestions: () => void;
  currentTestResult: TestResultRecord | null;
  testHistory: TestResultRecord[];
  toastMessage: string | null;
  showToast: (msg: string) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const PREFERENCES_STORAGE_KEY = 'bseb_2027_preferences';
const USER_STORAGE_KEY = 'bseb_2027_user';
const HISTORY_STORAGE_KEY = 'bseb_2027_test_history';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load persistent user or default
  const [user, setUser] = useState<User>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  // Load persistent preferences
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem(PREFERENCES_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {
      theme: 'dark',
      fontSizeStep: 0,
      deviceViewMode: 'fullscreen',
      bookmarks: {
        chapters: ['hindi_g_01'],
        questions: [1, 3],
        subjectives: ['sub_ch1_01', 'sub_ch1_03'],
      },
    };
  });

  // Test History
  const [testHistory, setTestHistory] = useState<TestResultRecord[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Seed initial high-score test result matching the user mockup
    const initialResult: TestResultRecord = {
      id: 'res_sample_01',
      testId: 'hindi_g_01',
      title: 'गोधूलि गद्य • पाठ 1: श्रम विभाजन और जाति प्रथा',
      score: 16,
      totalMarks: 20,
      correctCount: 16,
      incorrectCount: 2,
      skippedCount: 2,
      timeSpentSeconds: 360, // 6 minutes
      rank: 42,
      totalParticipants: 1280,
      percentile: 94.2,
      userAnswers: {
        0: 1, // correct
        1: 1, // incorrect (chose 1, correct was 0)
        2: 1, // correct
        3: -1, // skipped
        4: 1, // correct
        5: 0, // correct
        6: 2, // correct
        7: 0, // correct
        8: 0, // correct
        9: 2, // correct
        10: 1, // correct
        11: 3, // correct
        12: 2, // correct
        13: 0, // correct
        14: 1, // correct
        15: 1, // correct
        16: 1, // correct
        17: 0, // correct
        18: 1, // correct
        19: 1, // incorrect (chose 1, correct was 2)
      },
      questions: OBJECTIVE_QUESTIONS_CH1,
      timestamp: 'आज 04:30 PM • सेट A',
    };
    return [initialResult];
  });

  // Navigation & Active States
  const [activeScreen, setActiveScreen] = useState<ScreenName>('home');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('hindi_g_01');
  const [activeTestSession, setActiveTestSession] = useState<TestSession | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(OBJECTIVE_QUESTIONS_CH1);
  const [currentTestResult, setCurrentTestResult] = useState<TestResultRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync theme with DOM
  useEffect(() => {
    if (preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [preferences.theme]);

  // Persist preferences
  useEffect(() => {
    try {
      localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // ignore
    }
  }, [preferences]);

  // Persist user
  useEffect(() => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch {
      // ignore
    }
  }, [user]);

  // Persist test history
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(testHistory));
    } catch {
      // ignore
    }
  }, [testHistory]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  const toggleTheme = () => {
    setPreferences((prev) => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark',
    }));
    showToast(preferences.theme === 'dark' ? 'लाइट थीम सक्रिय की गई' : 'डार्क मोड सक्रिय किया गया');
  };

  const setFontSizeStep = (step: number) => {
    setPreferences((prev) => ({
      ...prev,
      fontSizeStep: step % 3,
    }));
  };

  const toggleDeviceViewMode = () => {
    setPreferences((prev) => {
      const next = prev.deviceViewMode === 'handset' ? 'fullscreen' : 'handset';
      showToast(next === 'handset' ? 'मोबाइल हैंडसेट दृश्य (390px)' : 'पूर्ण स्क्रीन उत्तरदायी दृश्य');
      return { ...prev, deviceViewMode: next };
    });
  };

  const toggleBookmark = (type: 'chapters' | 'questions' | 'subjectives', id: string | number) => {
    setPreferences((prev) => {
      const list = prev.bookmarks[type] as (string | number)[];
      const exists = list.includes(id);
      const updated = exists ? list.filter((item) => item !== id) : [...list, id];
      const updatedBookmarks = {
        ...prev.bookmarks,
        [type]: updated,
      };
      showToast(exists ? 'बुकमार्क हटाया गया' : 'बुकमार्क में सहेजा गया');
      return { ...prev, bookmarks: updatedBookmarks as any };
    });
  };

  const isBookmarked = (type: 'chapters' | 'questions' | 'subjectives', id: string | number): boolean => {
    const list = preferences.bookmarks[type] as (string | number)[];
    return list.includes(id);
  };

  const updateUser = (updated: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...updated }));
    showToast('विद्यार्थी प्रोफ़ाइल अपडेट की गई!');
  };

  const registerUser = (newUser: User) => {
    setUser(newUser);
    showToast(`स्वागत है ${newUser.name}! पंजीकरण सफल रहा।`);
    setActiveScreen('home');
  };

  const navigateTo = (screen: ScreenName, params?: { chapterId?: string; result?: TestResultRecord }) => {
    if (params?.chapterId) {
      setSelectedChapterId(params.chapterId);
    }
    if (params?.result) {
      setCurrentTestResult(params.result);
    }
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedChapter =
    CHAPTERS.find((c) => c.id === selectedChapterId) || CHAPTERS[0];

  const startTest = (
    chapterId?: string,
    customQuestions?: Question[],
    titleOverride?: string
  ) => {
    const targetChapter = CHAPTERS.find((c) => c.id === chapterId) || selectedChapter;
    const questionsToUse = customQuestions && customQuestions.length > 0
      ? customQuestions
      : OBJECTIVE_QUESTIONS_CH1;

    setActiveQuestions(questionsToUse);

    const newSession: TestSession = {
      testId: targetChapter.id,
      chapterId: targetChapter.id,
      title: titleOverride || `${targetChapter.sectionName} • ${targetChapter.title}`,
      subtitle: 'BSEB मैट्रिक 2027 • सेट A',
      totalQuestions: questionsToUse.length,
      currentQuestionIndex: 0,
      answers: {},
      markedForReview: [],
      timeRemainingSeconds: questionsToUse.length * 45, // 45 seconds per question
      totalDurationSeconds: questionsToUse.length * 45,
      isCompleted: false,
    };

    setActiveTestSession(newSession);
    setActiveScreen('exam');
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  };

  const selectOption = (questionIndex: number, optionIndex: number) => {
    if (!activeTestSession) return;
    setActiveTestSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [questionIndex]: optionIndex,
        },
      };
    });
  };

  const toggleMarkForReview = (questionIndex: number) => {
    if (!activeTestSession) return;
    setActiveTestSession((prev) => {
      if (!prev) return null;
      const exists = prev.markedForReview.includes(questionIndex);
      return {
        ...prev,
        markedForReview: exists
          ? prev.markedForReview.filter((idx) => idx !== questionIndex)
          : [...prev.markedForReview, questionIndex],
      };
    });
  };

  const submitCurrentTest = () => {
    if (!activeTestSession) return;
    const questions = activeQuestions;
    let correct = 0;
    let incorrect = 0;
    let skipped = 0;

    questions.forEach((q, idx) => {
      const selected = activeTestSession.answers[idx];
      if (selected === undefined || selected === -1) {
        skipped++;
      } else if (selected === q.correctAnswer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const timeSpent = Math.max(
      15,
      activeTestSession.totalDurationSeconds - activeTestSession.timeRemainingSeconds
    );
    const score = Math.max(0, correct - incorrect * 0.25);
    const total = questions.length;
    const percentile = Math.min(99.9, Math.max(50, Math.round((correct / total) * 98 * 10) / 10));
    const randomRank = Math.max(1, Math.round((1 - correct / total) * 200 + 12));

    const resultRecord: TestResultRecord = {
      id: 'res_' + Date.now(),
      testId: activeTestSession.testId,
      title: activeTestSession.title,
      score: Math.round(score * 10) / 10,
      totalMarks: total,
      correctCount: correct,
      incorrectCount: incorrect,
      skippedCount: skipped,
      timeSpentSeconds: timeSpent,
      rank: randomRank,
      totalParticipants: 1450,
      percentile: percentile,
      userAnswers: { ...activeTestSession.answers },
      questions: [...questions],
      timestamp: 'आज • सेट A',
    };

    setTestHistory((prev) => [resultRecord, ...prev]);
    setCurrentTestResult(resultRecord);
    setActiveTestSession(null);
    setActiveScreen('exam-result');
    showToast('टेस्ट सफलता पूर्वक सबमिट हुआ! स्कोरकार्ड तैयार है।');
  };

  const retestIncorrectQuestions = () => {
    if (!currentTestResult) return;
    const incorrectQs = currentTestResult.questions.filter((q, idx) => {
      const ans = currentTestResult.userAnswers[idx];
      return ans !== undefined && ans !== -1 && ans !== q.correctAnswer;
    });

    if (incorrectQs.length === 0) {
      showToast('कोई गलत प्रश्न नहीं है! पूर्ण टेस्ट दोबारा दें।');
      startTest(currentTestResult.testId);
      return;
    }

    startTest(
      currentTestResult.testId,
      incorrectQs,
      `पुनः अभ्यास: गलत प्रश्न (${incorrectQs.length})`
    );
  };

  const resetAllData = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(PREFERENCES_STORAGE_KEY);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    setUser(DEFAULT_USER);
    setPreferences({
      theme: 'dark',
      fontSizeStep: 0,
      deviceViewMode: 'fullscreen',
      bookmarks: { chapters: ['hindi_g_01'], questions: [1, 3], subjectives: ['sub_ch1_01'] },
    });
    showToast('सभी डेटा और प्रगति को रीसेट किया गया।');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        updateUser,
        registerUser,
        preferences,
        toggleTheme,
        setFontSizeStep,
        toggleDeviceViewMode,
        toggleBookmark,
        isBookmarked,
        activeScreen,
        navigateTo,
        selectedChapterId,
        selectedChapter,
        activeTestSession,
        startTest,
        selectOption,
        toggleMarkForReview,
        submitCurrentTest,
        retestIncorrectQuestions,
        currentTestResult,
        testHistory,
        toastMessage,
        showToast,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
