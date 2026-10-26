/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { RegistrationScreen } from './components/auth/RegistrationScreen';
import { BottomNav } from './components/common/BottomNav';
import { Header } from './components/common/Header';
import { Toast } from './components/common/Toast';
import { HomeScreen } from './components/home/HomeScreen';
import { ChapterDetailScreen } from './components/notes/ChapterDetailScreen';
import { NotesHubScreen } from './components/notes/NotesHubScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { ExamResultScreen } from './components/tests/ExamResultScreen';
import { ExamScreen } from './components/tests/ExamScreen';
import { TestHubScreen } from './components/tests/TestHubScreen';
import { AppProvider, useApp } from './context/AppContext';

const AppContent: React.FC = () => {
  const { activeScreen, preferences, toggleDeviceViewMode } = useApp();

  const isExam = activeScreen === 'exam';

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen />;
      case 'notes':
        return <NotesHubScreen />;
      case 'chapter-detail':
        return <ChapterDetailScreen />;
      case 'tests':
        return <TestHubScreen />;
      case 'exam':
        return <ExamScreen />;
      case 'exam-result':
        return <ExamResultScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'register':
        return <RegistrationScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const isHandset = preferences.deviceViewMode === 'handset';

  return (
    <div className={`min-h-screen bg-[#010f1f] flex flex-col items-center justify-start ${isHandset ? 'py-4 sm:py-8 px-2' : ''}`}>
      {/* Device Frame Wrapper (Active when handset preview mode is enabled) */}
      <div
        className={`w-full transition-all duration-300 ${
          isHandset
            ? 'max-w-[412px] min-h-[850px] bg-[#051424] rounded-[44px] shadow-[0_25px_70px_rgba(0,0,0,0.85)] border-[8px] border-[#1c2b3c] overflow-hidden flex flex-col relative'
            : 'max-w-2xl bg-[#051424] min-h-screen flex flex-col shadow-2xl relative'
        }`}
      >
        {/* Android Phone Speaker / Camera Notch Pill in Handset Mode */}
        {isHandset && (
          <div className="w-full bg-[#051424] pt-2 pb-1 flex items-center justify-between px-6 text-[11px] text-[#d8c3ad] font-semibold select-none z-50">
            <span>09:41</span>
            <div className="w-20 h-4 bg-[#1c2b3c] rounded-full mx-auto" />
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">signal_cellular_4_bar</span>
              <span className="material-symbols-outlined text-[14px]">wifi</span>
              <span className="material-symbols-outlined text-[14px]">battery_full</span>
            </div>
          </div>
        )}

        {/* Global Header */}
        <Header />

        {/* Main Body with Smooth Page Transitions */}
        <main className={`flex-1 flex flex-col relative w-full px-4 pt-3 ${isExam ? 'pt-0' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="flex-1 flex flex-col w-full"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Global Bottom Navigation */}
        <BottomNav />

        {/* Floating Feedback Toast */}
        <Toast />

        {/* Android Home Bar Indicator in Handset Mode */}
        {isHandset && (
          <div className="w-full py-2 bg-[#051424] flex items-center justify-center select-none z-50">
            <div className="w-32 h-1 bg-[#273647] rounded-full" />
          </div>
        )}
      </div>

      {/* Floating Handset Preview Switcher on Desktop */}
      <div className="fixed bottom-4 right-4 z-50 hidden sm:flex items-center gap-2 bg-[#122131]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#273647] shadow-xl text-xs text-[#d4e4fa]">
        <span className="material-symbols-outlined text-[16px] text-[#f59e0b]">
          {isHandset ? 'stay_current_portrait' : 'devices'}
        </span>
        <button
          onClick={toggleDeviceViewMode}
          className="font-bold text-[#ffc174] hover:underline"
        >
          {isHandset ? 'फुलस्क्रीन दृश्य' : 'एंड्रॉयड फोन फ्रेम (390px)'}
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
