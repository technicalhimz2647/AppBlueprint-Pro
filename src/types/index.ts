/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  name: string;
  dob: string;
  school: string;
  district: string;
  mobile: string;
  pincode: string;
  targetScore: string;
  avatarUrl?: string;
}

export type SubjectId = 'hindi' | 'maths' | 'science' | 'social_science' | 'sanskrit' | 'english';

export interface Subject {
  id: SubjectId;
  name: string;
  hindiName: string;
  icon: string;
  code: string;
  totalChapters: number;
  completedChapters: number;
  accentColor: string;
}

export type SectionType = 'gadya' | 'kavya' | 'varnika' | 'writing';

export interface Chapter {
  id: string;
  subjectId: SubjectId;
  section: SectionType;
  sectionName: string;
  chapterNumber: number;
  title: string;
  author: string;
  authorBio: {
    birthYear: string;
    birthPlace: string;
    works: string;
    source: string;
    bioSummary: string;
  };
  genre: string;
  totalQuestions: number;
  subjectiveCount: number;
  summaryPoints: Array<{
    title: string;
    description: string;
    highlight?: string;
  }>;
  examFormulaTip: string;
  pyqFrequency: string;
}

export interface Question {
  id: number;
  chapterId: string;
  questionNumber: number;
  stem: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0 for A, 1 for B, 2 for C, 3 for D
  pyqBadge: string;
  explanation: string;
}

export interface SubjectiveQuestion {
  id: string;
  chapterId: string;
  type: 'short' | 'long';
  marks: 2 | 5;
  pyqYears: string;
  isVVI: boolean;
  questionText: string;
  answerSummary: string;
  bulletPoints?: string[];
}

export interface TestSession {
  testId: string;
  chapterId: string;
  title: string;
  subtitle: string;
  totalQuestions: number;
  currentQuestionIndex: number;
  answers: Record<number, number>; // questionIndex -> optionIndex
  markedForReview: number[]; // array of questionIndex
  timeRemainingSeconds: number;
  totalDurationSeconds: number;
  isCompleted: boolean;
}

export interface TestResultRecord {
  id: string;
  testId: string;
  title: string;
  score: number;
  totalMarks: number;
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
  timeSpentSeconds: number;
  rank: number;
  totalParticipants: number;
  percentile: number;
  userAnswers: Record<number, number>;
  questions: Question[];
  timestamp: string;
}

export interface UserPreferences {
  theme: 'dark' | 'light';
  fontSizeStep: number; // 0, 1, 2 (100%, 105%, 112%)
  deviceViewMode: 'handset' | 'fullscreen';
  bookmarks: {
    chapters: string[];
    questions: number[];
    subjectives: string[];
  };
}
