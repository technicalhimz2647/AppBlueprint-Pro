/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ScreenName, useApp } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeScreen, navigateTo } = useApp();

  // Hide bottom nav in full-screen exam mode for maximum focus
  if (activeScreen === 'exam') return null;

  const navItems: Array<{
    id: ScreenName;
    label: string;
    icon: string;
  }> = [
    { id: 'home', label: 'होम', icon: 'home' },
    { id: 'tests', label: 'टेस्ट', icon: 'quiz' },
    { id: 'notes', label: 'नोट्स', icon: 'menu_book' },
    { id: 'profile', label: 'प्रोफाइल', icon: 'account_circle' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#051424]/95 dark:bg-[#051424]/95 backdrop-blur-xl border-t border-[#1c2b3c]/80 shadow-[0_-4px_20px_rgba(0,0,0,0.4)] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="max-w-md mx-auto grid grid-cols-4 items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive =
            activeScreen === item.id ||
            (item.id === 'notes' && activeScreen === 'chapter-detail') ||
            (item.id === 'tests' && activeScreen === 'exam-result');

          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-all relative group active:scale-95 ${
                isActive
                  ? 'text-[#f59e0b] font-bold'
                  : 'text-[#d8c3ad] hover:text-[#d4e4fa]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[24px] mb-0.5 transition-transform group-hover:scale-110 ${
                  isActive ? 'font-variation-fill' : ''
                }`}
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="text-[11px] leading-tight font-medium tracking-tight">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-6 h-1 rounded-full bg-[#f59e0b] shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
