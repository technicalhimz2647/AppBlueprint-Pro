/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CHAPTERS, SUBJECTS } from '../../data/mockData';
import { SubjectId } from '../../types';

export const TestHubScreen: React.FC = () => {
  const { startTest } = useApp();

  const [selectedSubject, setSelectedSubject] = useState<SubjectId>('hindi');
  const [activeCategory, setActiveCategory] = useState<'gadya' | 'kavya' | 'varnika' | 'grammar'>('gadya');
  const [showNoticeDialog, setShowNoticeDialog] = useState(false);

  const chaptersForCategory = CHAPTERS.filter((ch) => {
    if (activeCategory === 'gadya') return ch.section === 'gadya';
    if (activeCategory === 'kavya') return ch.section === 'kavya';
    if (activeCategory === 'varnika') return ch.section === 'varnika';
    return ch.section === 'writing';
  });

  return (
    <div className="flex flex-col w-full gap-5 pb-8 relative">
      {/* 1. Horizontal Subject Selector Bar */}
      <section className="flex flex-col gap-1.5 -mx-4 px-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold text-[#d8c3ad] uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-[#ffc174]">
              auto_stories
            </span>
            विषय चुनें (Subject)
          </span>
          <span className="text-[11px] text-[#56e5a9] font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#56e5a9] animate-pulse" />
            मैट्रिक 2027 सत्र
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {SUBJECTS.map((sub) => {
            const isSelected = selectedSubject === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubject(sub.id)}
                className={`flex items-center gap-1.5 shrink-0 px-3.5 py-2 rounded-full text-xs font-bold transition-transform active:scale-95 ${
                  isSelected
                    ? 'bg-[#f59e0b] text-[#472a00] shadow-md shadow-[#f59e0b]/25'
                    : 'bg-[#122131] text-[#d4e4fa] hover:bg-[#1c2b3c] border border-[#273647]'
                }`}
              >
                {isSelected && (
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                )}
                <span>{sub.name === 'Hindi' ? 'हिंदी' : sub.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Segmented Category Sub-tabs */}
      <section className="flex flex-col">
        <div className="flex items-center bg-[#010f1f] p-1 rounded-xl overflow-x-auto no-scrollbar border border-[#1c2b3c]">
          <button
            onClick={() => setActiveCategory('gadya')}
            className={`flex items-center justify-center shrink-0 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeCategory === 'gadya'
                ? 'bg-[#1c2b3c] text-[#ffc174] shadow-sm border border-[#f59e0b]/40'
                : 'text-[#d8c3ad] hover:text-[#d4e4fa]'
            }`}
          >
            <span>गोधूलि गद्य</span>
            <span className="ml-1.5 px-1.5 py-0.2 bg-[#f59e0b]/20 text-[#ffc174] rounded-full text-[10px]">
              12
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('kavya')}
            className={`flex items-center justify-center shrink-0 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeCategory === 'kavya'
                ? 'bg-[#1c2b3c] text-[#7bd0ff] shadow-sm border border-[#7bd0ff]/40'
                : 'text-[#d8c3ad] hover:text-[#d4e4fa]'
            }`}
          >
            <span>गोधूलि काव्य</span>
            <span className="ml-1.5 px-1.5 py-0.2 bg-[#7bd0ff]/20 text-[#7bd0ff] rounded-full text-[10px]">
              12
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('varnika')}
            className={`flex items-center justify-center shrink-0 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeCategory === 'varnika'
                ? 'bg-[#1c2b3c] text-[#56e5a9] shadow-sm border border-[#56e5a9]/40'
                : 'text-[#d8c3ad] hover:text-[#d4e4fa]'
            }`}
          >
            <span>वर्णिका भाग 2</span>
            <span className="ml-1.5 px-1.5 py-0.2 bg-[#56e5a9]/20 text-[#56e5a9] rounded-full text-[10px]">
              5
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('grammar')}
            className={`flex items-center justify-center shrink-0 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeCategory === 'grammar'
                ? 'bg-[#1c2b3c] text-[#ffb95f] shadow-sm border border-[#ffb95f]/40'
                : 'text-[#d8c3ad] hover:text-[#d4e4fa]'
            }`}
          >
            <span>व्याकरण व लेखन</span>
            <span className="ml-1.5 px-1.5 py-0.2 bg-[#ffb95f]/20 text-[#ffb95f] rounded-full text-[10px]">
              6
            </span>
          </button>
        </div>
      </section>

      {/* 3. Quick Mode Strip (Two Interactive Action Banners) */}
      <section className="grid grid-cols-2 gap-3">
        {/* Daily Test Booster */}
        <div
          onClick={() => startTest('hindi_g_01', undefined, 'दैनिक बूस्टर टेस्ट (10 प्रश्न)')}
          className="relative overflow-hidden flex flex-col justify-between p-3.5 rounded-2xl bg-gradient-to-br from-[#122131] to-[#1c2b3c] border border-[#273647] shadow-md active:scale-[0.98] transition-all cursor-pointer group"
        >
          <div className="absolute -right-3 -bottom-3 w-16 h-16 rounded-full bg-[#f59e0b]/10 blur-xl pointer-events-none" />
          <div className="flex items-center gap-1.5 text-[#ffc174] mb-1">
            <span className="material-symbols-outlined text-[18px] animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
              bolt
            </span>
            <span className="text-[10px] font-bold tracking-wider uppercase">दैनिक बूस्टर</span>
          </div>
          <div className="text-xs sm:text-sm font-bold text-[#d4e4fa] line-clamp-1">
            आज का दैनिक टेस्ट
          </div>
          <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#273647]/50">
            <span className="text-[10px] text-[#d8c3ad]">10 प्रश्न • 10 मिनट</span>
            <span className="w-6 h-6 rounded-full bg-[#f59e0b] text-[#472a00] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </span>
          </div>
        </div>

        {/* Model Paper Banner */}
        <div
          onClick={() => startTest('hindi_g_01', undefined, 'BSEB 2027 मैट्रिक मॉडल पेपर (सेट A)')}
          className="relative overflow-hidden flex flex-col justify-between p-3.5 rounded-2xl bg-[#0d1c2d] border border-[#273647] shadow-sm active:scale-[0.98] transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-1.5 text-[#7bd0ff] mb-1">
            <span className="material-symbols-outlined text-[18px]">description</span>
            <span className="text-[10px] font-bold tracking-wider uppercase">BSEB 2027</span>
          </div>
          <div className="text-xs sm:text-sm font-bold text-[#d4e4fa] line-clamp-1">
            मैट्रिक मॉडल पेपर
          </div>
          <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#273647]/50">
            <span className="text-[10px] text-[#d8c3ad]">20 प्रश्न • 15 मिनट</span>
            <span className="w-6 h-6 rounded-full bg-[#1c2b3c] text-[#d4e4fa] flex items-center justify-center">
              <span className="material-symbols-outlined text-[14px]">play_arrow</span>
            </span>
          </div>
        </div>
      </section>

      {/* 4. Chapter List Section Header */}
      <div className="flex flex-col gap-0.5 mt-1">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-[#d4e4fa] flex items-center gap-2">
            <span>📚 अध्यायवार वस्तुनिष्ठ टेस्ट</span>
          </h2>
          <span className="text-[10px] text-[#ffc174] font-semibold px-2 py-0.5 rounded-full bg-[#1c2b3c] border border-[#f59e0b]/30">
            {activeCategory === 'gadya' ? 'गद्य खंड' : activeCategory === 'kavya' ? 'काव्य खंड' : 'वर्णिका'}
          </span>
        </div>
        <p className="text-xs text-[#d8c3ad]">
          पाठ चुनें और बिहार बोर्ड परीक्षा स्तर पर अपनी तैयारी परखें
        </p>
      </div>

      {/* 5. Chapter List Cards */}
      <section className="flex flex-col gap-3">
        {chaptersForCategory.map((chapter) => (
          <article
            key={chapter.id}
            className="flex flex-col p-4 rounded-2xl bg-[#122131] border border-[#273647] shadow-md transition-all hover:border-[#f59e0b]/40"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-[#f59e0b]/20 text-[#ffc174] text-[10px] font-bold">
                    पाठ {chapter.chapterNumber}
                  </span>
                  <span className="text-[11px] text-[#56e5a9] flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      task_alt
                    </span>
                    {chapter.chapterNumber === 1 ? 'सर्वाधिक महत्वपूर्ण' : 'PYQ प्रश्न शामिल'}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#d4e4fa] leading-tight">
                  {chapter.title}
                </h3>
                <p className="text-xs text-[#d8c3ad] mt-0.5">लेखक: {chapter.author}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 mt-1 border-t border-[#1c2b3c]">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#56e5a9]/15 text-[#56e5a9] text-xs font-bold">
                <span className="material-symbols-outlined text-[15px]">checklist</span>
                <span>{chapter.totalQuestions} प्रश्न उपलब्ध</span>
              </div>
              <button
                onClick={() => startTest(chapter.id)}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] text-xs font-bold shadow-md shadow-[#f59e0b]/25 active:scale-95 transition-all"
              >
                <span>टेस्ट दें</span>
                <span className="material-symbols-outlined text-[16px]">play_arrow</span>
              </button>
            </div>
          </article>
        ))}

        {/* Upcoming Chapter Card (Empty/Upcoming state as in HTML mockup) */}
        {activeCategory === 'gadya' && (
          <article className="flex flex-col p-4 rounded-2xl bg-[#0d1c2d] opacity-80 border border-[#1c2b3c] transition-all">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-[#1c2b3c] text-[#d8c3ad] text-[10px] font-semibold">
                    पाठ 4
                  </span>
                  <span className="text-[11px] text-[#d8c3ad]">ललित निबंध</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#d8c3ad] leading-tight">
                  नाखून क्यों बढ़ते हैं
                </h3>
                <p className="text-xs text-[#a08e7a] mt-0.5">लेखक: हजारी प्रसाद द्विवेदी</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 mt-1 border-t border-[#1c2b3c]">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1c2b3c] text-[#d8c3ad] text-xs font-medium">
                <span className="material-symbols-outlined text-[15px]">pending</span>
                <span>0 प्रश्न</span>
              </div>
              <button
                onClick={() => setShowNoticeDialog(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1c2b3c] text-[#ffc174] text-xs font-semibold active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[15px]">lock_clock</span>
                <span>शीघ्र आएगा</span>
              </button>
            </div>
          </article>
        )}
      </section>

      {/* Motivational Micro-Banner */}
      <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#1c2b3c]/60 border border-[#273647] mt-1">
        <div className="w-10 h-10 rounded-full bg-[#f59e0b]/15 text-[#ffc174] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[22px]">military_tech</span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs sm:text-sm font-bold text-[#d4e4fa]">
            लक्ष्य मैट्रिक 2027: 450+ अंक
          </span>
          <span className="text-[11px] text-[#d8c3ad]">
            प्रतिदिन कम से कम 2 अध्यायवार टेस्ट अवश्य हल करें।
          </span>
        </div>
      </div>

      {/* Notice Dialog Modal (Matching Image_12_fcb35437.html) */}
      {showNoticeDialog && (
        <div className="fixed inset-x-4 bottom-24 z-50 flex flex-col p-4 rounded-2xl bg-[#273647]/95 backdrop-blur-md shadow-2xl border border-[#ffc174]/40 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f59e0b]/20 text-[#ffc174] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[22px]">info</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-[#d4e4fa] flex items-center gap-1">
                  ⚠️ सूचना: इस पाठ में प्रश्न तैयार हो रहे हैं
                </span>
                <span className="text-xs text-[#d8c3ad] mt-1">
                  शीघ्र ही BSEB 2027 नवीनतम प्रश्न बैंक एवं मॉडल सेट 2027 अपडेट होगा।
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowNoticeDialog(false)}
              className="w-8 h-8 rounded-full bg-[#1c2b3c] text-[#d8c3ad] hover:text-[#d4e4fa] flex items-center justify-center shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <div className="flex justify-end mt-3">
            <button
              onClick={() => setShowNoticeDialog(false)}
              className="px-4 py-1.5 rounded-xl bg-[#f59e0b] text-[#472a00] text-xs font-bold shadow-sm active:scale-95 transition-transform"
            >
              ठीक है, समझ गया
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
