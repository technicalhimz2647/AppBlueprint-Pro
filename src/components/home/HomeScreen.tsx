/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import { SUBJECTS } from '../../data/mockData';

export const HomeScreen: React.FC = () => {
  const { user, navigateTo, startTest, currentTestResult, testHistory } = useApp();

  const latestResult = currentTestResult || (testHistory.length > 0 ? testHistory[0] : null);

  return (
    <div className="flex flex-col w-full gap-5 pb-8">
      {/* 1. Student Welcome Header Card */}
      <section className="bg-gradient-to-r from-[#122131] to-[#1c2b3c] rounded-2xl p-4 sm:p-5 shadow-lg border border-[#273647]/70 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-[#f59e0b]/15 blur-2xl pointer-events-none" />

        <div className="relative flex items-center justify-between gap-3">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#f59e0b]/20 text-[#ffc174] text-[11px] font-bold border border-[#f59e0b]/30">
                <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  military_tech
                </span>
                BSEB 2027 टॉपर बैच
              </span>
              <span className="text-[11px] text-[#56e5a9] font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#56e5a9] animate-pulse" />
                {user.district} जिला
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#d4e4fa] tracking-tight">
              नमस्ते, {user.name} 👋
            </h2>
            <p className="text-xs sm:text-sm text-[#d8c3ad] truncate mt-0.5">
              {user.school} • <strong className="text-[#ffc174]">{user.targetScore}</strong>
            </p>
          </div>

          <button
            onClick={() => navigateTo('profile')}
            className="w-12 h-12 rounded-2xl bg-[#f59e0b] text-[#472a00] font-bold text-lg flex items-center justify-center shrink-0 shadow-lg shadow-[#f59e0b]/25 active:scale-95 transition-transform"
          >
            {user.name.charAt(0) || 'आ'}
          </button>
        </div>

        {/* 4-Stat Rapid Dashboard Strip */}
        <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-[#273647]/60 text-center">
          <div className="bg-[#051424]/60 p-2 rounded-xl">
            <span className="text-[10px] text-[#d8c3ad] block">मैट्रिक रैंक</span>
            <span className="text-base sm:text-lg font-bold text-[#ffc174]">#42</span>
          </div>
          <div className="bg-[#051424]/60 p-2 rounded-xl">
            <span className="text-[10px] text-[#d8c3ad] block">परसेंटाइल</span>
            <span className="text-base sm:text-lg font-bold text-[#56e5a9]">94.2%</span>
          </div>
          <div className="bg-[#051424]/60 p-2 rounded-xl">
            <span className="text-[10px] text-[#d8c3ad] block">टेस्ट दिए</span>
            <span className="text-base sm:text-lg font-bold text-[#7bd0ff]">
              {testHistory.length > 0 ? testHistory.length : 1}
            </span>
          </div>
          <div className="bg-[#051424]/60 p-2 rounded-xl">
            <span className="text-[10px] text-[#d8c3ad] block">स्ट्रीक</span>
            <span className="text-base sm:text-lg font-bold text-[#f59e0b] flex items-center justify-center gap-0.5">
              <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_fire_department
              </span>
              7 दिन
            </span>
          </div>
        </div>
      </section>

      {/* 2. Visual Topper Banner (Utilizing User Uploaded Media) */}
      <section className="relative rounded-2xl overflow-hidden shadow-xl border border-[#273647]/70 group">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#051424]">
          <img
            src="/public/assets/aistudio/Image_23_4d235813.jpeg"
            alt="Bihar Matric 2027 Target 450+ Bihar Topper"
            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
            onError={(e) => {
              // Fallback styling if local image path fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051424] via-[#051424]/40 to-transparent flex flex-col justify-end p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-md bg-[#f59e0b] text-[#472a00] font-bold text-[11px] uppercase tracking-wide">
                टॉपर मिशन 2027
              </span>
              <span className="text-[12px] text-[#7bd0ff] font-semibold">100% बोर्ड आधारित</span>
            </div>
            <h3 className="text-base sm:text-xl font-bold text-white leading-snug drop-shadow-md">
              BSEB 2027 टारगेट 450+ : संपूर्ण तैयारी हब
            </h3>
            <p className="text-xs sm:text-sm text-[#d4e4fa] opacity-90 line-clamp-1 mt-0.5">
              अध्यायवार नोट्स • 100+ वस्तुनिष्ठ प्रश्न • बोर्ड मॉडल पेपर • स्टेट टॉपर गाइडेंस
            </p>
            <div className="flex items-center gap-2.5 mt-3">
              <button
                onClick={() => startTest('hindi_g_01')}
                className="px-4 py-2 rounded-xl bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-[#f59e0b]/30 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                <span>लाइव टेस्ट शुरू करें</span>
              </button>
              <button
                onClick={() => navigateTo('notes', { chapterId: 'hindi_g_01' })}
                className="px-3.5 py-2 rounded-xl bg-[#1c2b3c]/80 hover:bg-[#273647] text-[#d4e4fa] text-xs sm:text-sm font-semibold flex items-center gap-1 border border-[#273647] active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
                <span>पाठ 1 नोट्स</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Quick Action Feature Grid */}
      <section className="grid grid-cols-2 gap-3">
        {/* Action 1: Chapter Notes */}
        <button
          onClick={() => navigateTo('notes')}
          className="text-left p-3.5 rounded-2xl bg-[#122131] hover:bg-[#1c2b3c] border border-[#273647]/70 shadow-sm flex flex-col justify-between min-h-[110px] active:scale-[0.98] transition-all group"
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/15 text-[#ffc174] flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[22px]">auto_stories</span>
            </div>
            <span className="text-[10px] font-bold text-[#ffc174] bg-[#f59e0b]/20 px-2 py-0.5 rounded-full">
              36+ पाठ
            </span>
          </div>
          <div className="mt-2">
            <h4 className="text-sm font-bold text-[#d4e4fa] group-hover:text-[#ffc174] transition-colors">
              अध्याय नोट्स व सारांश
            </h4>
            <p className="text-[11px] text-[#d8c3ad] line-clamp-1 mt-0.5">
              गोधूलि, वर्णिका व लेखन
            </p>
          </div>
        </button>

        {/* Action 2: MCQ Test Hub */}
        <button
          onClick={() => navigateTo('tests')}
          className="text-left p-3.5 rounded-2xl bg-[#122131] hover:bg-[#1c2b3c] border border-[#273647]/70 shadow-sm flex flex-col justify-between min-h-[110px] active:scale-[0.98] transition-all group"
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-10 h-10 rounded-xl bg-[#56e5a9]/15 text-[#56e5a9] flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[22px]">quiz</span>
            </div>
            <span className="text-[10px] font-bold text-[#56e5a9] bg-[#56e5a9]/20 px-2 py-0.5 rounded-full">
              100% NCERT
            </span>
          </div>
          <div className="mt-2">
            <h4 className="text-sm font-bold text-[#d4e4fa] group-hover:text-[#56e5a9] transition-colors">
              ऑनलाइन टेस्ट हब
            </h4>
            <p className="text-[11px] text-[#d8c3ad] line-clamp-1 mt-0.5">
              अध्यायवार वस्तुनिष्ठ टेस्ट
            </p>
          </div>
        </button>

        {/* Action 3: Daily Booster */}
        <button
          onClick={() => startTest('hindi_g_01', undefined, 'आज का दैनिक बूस्टर टेस्ट (10 प्रश्न)')}
          className="text-left p-3.5 rounded-2xl bg-[#122131] hover:bg-[#1c2b3c] border border-[#273647]/70 shadow-sm flex flex-col justify-between min-h-[110px] active:scale-[0.98] transition-all group"
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-10 h-10 rounded-xl bg-[#7bd0ff]/15 text-[#7bd0ff] flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                bolt
              </span>
            </div>
            <span className="text-[10px] font-bold text-[#7bd0ff] bg-[#7bd0ff]/20 px-2 py-0.5 rounded-full">
              दैनिक 10 Min
            </span>
          </div>
          <div className="mt-2">
            <h4 className="text-sm font-bold text-[#d4e4fa] group-hover:text-[#7bd0ff] transition-colors">
              दैनिक टेस्ट बूस्टर
            </h4>
            <p className="text-[11px] text-[#d8c3ad] line-clamp-1 mt-0.5">
              गति और सटीकता बढ़ाएं
            </p>
          </div>
        </button>

        {/* Action 4: Subjective Q&A */}
        <button
          onClick={() => navigateTo('chapter-detail', { chapterId: 'hindi_g_01' })}
          className="text-left p-3.5 rounded-2xl bg-[#122131] hover:bg-[#1c2b3c] border border-[#273647]/70 shadow-sm flex flex-col justify-between min-h-[110px] active:scale-[0.98] transition-all group"
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-10 h-10 rounded-xl bg-[#f43f5e]/15 text-[#f43f5e] flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[22px]">assignment</span>
            </div>
            <span className="text-[10px] font-bold text-[#f43f5e] bg-[#f43f5e]/20 px-2 py-0.5 rounded-full">
              2 व 5 अंक VVI
            </span>
          </div>
          <div className="mt-2">
            <h4 className="text-sm font-bold text-[#d4e4fa] group-hover:text-[#f43f5e] transition-colors">
              प्रश्नोत्तर (Q&A) बैंक
            </h4>
            <p className="text-[11px] text-[#d8c3ad] line-clamp-1 mt-0.5">
              बोर्ड आदर्श उत्तर सहित
            </p>
          </div>
        </button>
      </section>

      {/* 4. Second Banner: Special Topper Batch (Image 24) */}
      <section className="relative rounded-2xl overflow-hidden shadow-md border border-[#273647]/70">
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-[#051424]">
          <img
            src="/public/assets/aistudio/Image_24_84804487.jpeg"
            alt="हिन्दी स्पेशल टॉपर बैच मैट्रिक 2027"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#051424]/90 via-[#051424]/60 to-transparent flex items-center p-4">
            <div className="flex flex-col max-w-xs">
              <span className="text-[11px] text-[#ffc174] font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">stars</span>
                विशेष टॉपर बैच
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white leading-tight mt-0.5">
                हिन्दी स्पेशल: 100/100 अंक मिशन
              </h4>
              <p className="text-[11px] text-[#d8c3ad] mt-0.5">
                गद्य, पद्य व व्याकरण का संपूर्ण हल
              </p>
              <button
                onClick={() => navigateTo('notes', { chapterId: 'hindi_g_01' })}
                className="mt-2 w-fit px-3 py-1 rounded-lg bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] font-bold text-xs flex items-center gap-1 active:scale-95 transition-all"
              >
                <span>अभी पढ़ें</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Latest Scorecard Snippet (If available) */}
      {latestResult && (
        <section className="bg-[#122131] rounded-2xl p-4 border border-[#273647]/80 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-[#1c2b3c]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffc174] text-[20px]">
                workspace_premium
              </span>
              <div>
                <h4 className="text-sm font-bold text-[#d4e4fa]">हालिया परीक्षा समीक्षा</h4>
                <p className="text-[10px] text-[#d8c3ad]">{latestResult.timestamp}</p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#56e5a9]/20 text-[#56e5a9] text-xs font-bold">
              {Math.round((latestResult.score / latestResult.totalMarks) * 100)}% अंक
            </span>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex flex-col">
              <span className="text-xs text-[#d8c3ad] truncate max-w-[200px]">
                {latestResult.title}
              </span>
              <span className="text-xl font-bold text-[#ffc174] mt-0.5">
                {latestResult.score} <span className="text-xs text-[#d8c3ad]">/ {latestResult.totalMarks}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo('exam-result', { result: latestResult })}
                className="px-3.5 py-2 rounded-xl bg-[#1c2b3c] hover:bg-[#273647] text-[#d4e4fa] text-xs font-semibold flex items-center gap-1 transition-all"
              >
                <span>स्कोरकार्ड</span>
                <span className="material-symbols-outlined text-[16px]">visibility</span>
              </button>
              <button
                onClick={() => startTest(latestResult.testId)}
                className="px-3.5 py-2 rounded-xl bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] text-xs font-bold flex items-center gap-1 transition-all shadow-sm"
              >
                <span>पुनः प्रयास</span>
                <span className="material-symbols-outlined text-[16px]">replay</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 6. Subject Syllabus Matrix */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffc174] text-[20px]">
              school
            </span>
            <h3 className="text-base font-bold text-[#d4e4fa]">विषयवार पाठ्यक्रम (6 विषय)</h3>
          </div>
          <span className="text-xs text-[#d8c3ad]">BSEB मैट्रिक 2027</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {SUBJECTS.map((sub) => {
            const pct = Math.round((sub.completedChapters / sub.totalChapters) * 100);
            return (
              <div
                key={sub.id}
                onClick={() => {
                  if (sub.id === 'hindi') {
                    navigateTo('notes');
                  } else {
                    navigateTo('tests');
                  }
                }}
                className="p-3 rounded-xl bg-[#122131] hover:bg-[#1c2b3c] border border-[#1c2b3c] cursor-pointer transition-all active:scale-[0.99] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${sub.accentColor}20`, color: sub.accentColor }}
                  >
                    <span className="material-symbols-outlined text-[20px]">{sub.icon}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-[#d4e4fa] truncate">
                      {sub.hindiName}
                    </span>
                    <span className="text-[11px] text-[#d8c3ad]">
                      {sub.completedChapters} / {sub.totalChapters} पाठ पूर्ण • कोड {sub.code}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0">
                  <span className="text-xs font-bold text-[#d4e4fa]">{pct}%</span>
                  <div className="w-14 h-1.5 rounded-full bg-[#051424] mt-1 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: sub.accentColor }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Motivational Topper Quote */}
      <section className="p-3.5 rounded-xl bg-[#0d1c2d] border border-[#1c2b3c] flex items-center gap-3 text-center sm:text-left">
        <div className="w-10 h-10 rounded-full bg-[#f59e0b]/20 text-[#ffc174] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[22px]">lightbulb</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[#ffc174]">टॉपर सूत्र 2027:</span>
          <p className="text-xs text-[#d8c3ad] leading-relaxed">
            "प्रतिदिन 1 अध्याय का सारांश और 20 वस्तुनिष्ठ प्रश्न हल करने से 450+ अंक निश्चित होते हैं।"
          </p>
        </div>
      </section>
    </div>
  );
};
