/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const {
    activeScreen,
    navigateTo,
    user,
    preferences,
    toggleTheme,
    setFontSizeStep,
    toggleDeviceViewMode,
    selectedChapter,
  } = useApp();

  const isExam = activeScreen === 'exam';
  if (isExam) return null; // Exam screen has its own custom header

  const getTitle = () => {
    switch (activeScreen) {
      case 'home':
        return 'बिहार मैट्रिक 2027';
      case 'notes':
        return 'अध्याय नोट्स';
      case 'chapter-detail':
        return selectedChapter.title;
      case 'tests':
        return 'ऑनलाइन टेस्ट हब';
      case 'exam-result':
        return 'परीक्षा परिणाम एवं समीक्षा';
      case 'profile':
        return 'विद्यार्थी प्रोफ़ाइल';
      case 'register':
        return 'विद्यार्थी पंजीकरण';
      default:
        return 'बिहार मैट्रिक 2027';
    }
  };

  const getSubtitle = () => {
    switch (activeScreen) {
      case 'home':
        return 'टॉपर तैयारी हब • BSEB';
      case 'notes':
        return 'संपूर्ण सारांश व प्रश्न-उत्तर';
      case 'chapter-detail':
        return `${selectedChapter.sectionName} • पाठ ${selectedChapter.chapterNumber}`;
      case 'tests':
        return 'वस्तुनिष्ठ परीक्षा अभ्यास';
      case 'exam-result':
        return 'विस्तृत प्रश्न विश्लेषण';
      case 'profile':
        return `${user.district} • ${user.targetScore}`;
      case 'register':
        return 'BSEB 2027 ऑनलाइन';
      default:
        return 'BSEB 2027';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#051424]/90 dark:bg-[#051424]/90 backdrop-blur-xl border-b border-[#1c2b3c]/80 shadow-md">
      <div className="max-w-4xl mx-auto h-16 px-4 flex items-center justify-between gap-3">
        {/* Left: Brand / Back Button */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {activeScreen !== 'home' ? (
            <button
              onClick={() => {
                if (activeScreen === 'chapter-detail') navigateTo('notes');
                else if (activeScreen === 'exam-result') navigateTo('tests');
                else navigateTo('home');
              }}
              aria-label="वापस जाएं"
              className="w-10 h-10 rounded-xl bg-[#1c2b3c] hover:bg-[#2c3a4c] text-[#d4e4fa] flex items-center justify-center shrink-0 transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/20 border border-[#f59e0b]/40 flex items-center justify-center text-[#f59e0b] shrink-0 shadow-inner">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
          )}

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#f59e0b]">
                {getSubtitle()}
              </span>
            </div>
            <h1 className="text-[15px] sm:text-[17px] font-bold text-[#d4e4fa] truncate leading-tight">
              {getTitle()}
            </h1>
          </div>
        </div>

        {/* Right: Handset frame, Font scale, Theme, Profile pill */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Font scale button on reading pages */}
          {(activeScreen === 'chapter-detail' || activeScreen === 'notes') && (
            <button
              onClick={() => setFontSizeStep(preferences.fontSizeStep + 1)}
              title="फॉन्ट आकार बदलें"
              aria-label="फॉन्ट आकार बदलें"
              className="w-9 h-9 rounded-lg text-[#d8c3ad] hover:text-[#d4e4fa] hover:bg-[#1c2b3c] flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">format_size</span>
            </button>
          )}

          {/* Handset toggle preview */}
          <button
            onClick={toggleDeviceViewMode}
            title={preferences.deviceViewMode === 'handset' ? 'फुलस्क्रीन में देखें' : 'मोबाइल फोन फ्रेम में देखें'}
            aria-label="डिवाइस दृश्य बदलें"
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              preferences.deviceViewMode === 'handset'
                ? 'bg-[#f59e0b]/20 text-[#f59e0b]'
                : 'text-[#d8c3ad] hover:text-[#d4e4fa] hover:bg-[#1c2b3c]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {preferences.deviceViewMode === 'handset' ? 'stay_current_portrait' : 'devices'}
            </span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title={preferences.theme === 'dark' ? 'लाइट मोड में बदलें' : 'डार्क मोड में बदलें'}
            aria-label="थीम बदलें"
            className="w-9 h-9 rounded-lg text-[#d8c3ad] hover:text-[#d4e4fa] hover:bg-[#1c2b3c] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              {preferences.theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Profile Avatar */}
          <button
            onClick={() => navigateTo('profile')}
            aria-label="विद्यार्थी प्रोफाइल देखें"
            className="w-9 h-9 rounded-full bg-[#f59e0b] text-[#472a00] font-bold flex items-center justify-center text-sm shadow-[0_0_12px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 transition-transform shrink-0 ml-1"
          >
            {user.name.charAt(0) || 'आ'}
          </button>
        </div>
      </div>
    </header>
  );
};
