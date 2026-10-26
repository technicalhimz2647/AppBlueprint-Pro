/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const ExamResultScreen: React.FC = () => {
  const {
    currentTestResult,
    testHistory,
    retestIncorrectQuestions,
    navigateTo,
    startTest,
    toggleBookmark,
    isBookmarked,
    showToast,
  } = useApp();

  const [filterType, setFilterType] = useState<'all' | 'correct' | 'incorrect' | 'skipped'>('all');

  const result = currentTestResult || testHistory[0];

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[50vh]">
        <p className="text-sm text-[#d8c3ad]">कोई परीक्षा परिणाम उपलब्ध नहीं है।</p>
        <button
          onClick={() => navigateTo('tests')}
          className="mt-4 px-4 py-2 bg-[#f59e0b] text-[#472a00] font-bold rounded-xl"
        >
          टेस्ट सूची पर जाएं
        </button>
      </div>
    );
  }

  const { questions, userAnswers } = result;

  // Filter questions according to selection
  const filteredQuestionList = questions.map((q, idx) => {
    const selected = userAnswers[idx];
    let type: 'correct' | 'incorrect' | 'skipped' = 'skipped';
    if (selected === undefined || selected === -1) {
      type = 'skipped';
    } else if (selected === q.correctAnswer) {
      type = 'correct';
    } else {
      type = 'incorrect';
    }
    return { question: q, index: idx, userChoice: selected, type };
  }).filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  const percentage = Math.round((result.score / result.totalMarks) * 100);
  const strokeOffset = 314.159 - (314.159 * percentage) / 100;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `🏆 बिहार मैट्रिक 2027: मेरा स्कोर ${result.score}/${result.totalMarks} (${percentage}%) रहा! बिहार रैंक #${result.rank}।`
      );
    }
    showToast('स्कोरकार्ड कॉपी हो गया! दोस्तों के साथ साझा करें 📤');
  };

  return (
    <div className="flex flex-col w-full pb-28 max-w-2xl mx-auto">
      {/* Top Context Header Strip */}
      <section className="pt-2 pb-3 flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2 text-[#d8c3ad] text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1c2b3c] text-[#ffc174] text-[11px] font-bold border border-[#273647]">
              <span className="material-symbols-outlined text-[13px]">auto_stories</span>
              गोधूलि गद्य • पाठ 1
            </span>
            <span className="text-[#d8c3ad] truncate">श्रम विभाजन और जाति प्रथा</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[#d8c3ad] bg-[#0d1c2d] px-2.5 py-0.5 rounded-full border border-[#1c2b3c]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#56e5a9] animate-pulse" />
            {result.timestamp}
          </div>
        </div>
      </section>

      {/* Main Hero Score Card */}
      <section className="pb-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#1c2b3c] via-[#122131] to-[#0d1c2d] p-5 sm:p-6 shadow-xl border border-[#273647]">
          {/* Ambient Glow Behind Score */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[#f59e0b]/15 blur-3xl pointer-events-none" />

          {/* Trophy Ring Gauge */}
          <div className="relative flex flex-col items-center text-center">
            <div className="relative flex items-center justify-center my-2">
              <svg className="w-36 h-36 -rotate-90 transform" viewBox="0 0 120 120">
                <circle
                  className="stroke-[#273647]"
                  cx="60"
                  cy="60"
                  fill="none"
                  r="50"
                  strokeWidth="8"
                />
                <circle
                  className="stroke-[#f59e0b] transition-all duration-1000 ease-out"
                  cx="60"
                  cy="60"
                  fill="none"
                  r="50"
                  strokeDasharray="314.159"
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                  strokeWidth="8"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl font-bold text-[#d4e4fa] tracking-tight font-headline">
                  {result.score}
                  <span className="text-[#d8c3ad] text-base font-normal">/{result.totalMarks}</span>
                </span>
                <span className="text-[11px] text-[#ffc174] font-bold uppercase tracking-wider mt-0.5">
                  {percentage}% कुल अंक
                </span>
              </div>
            </div>

            {/* Excellence Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#56e5a9]/15 text-[#56e5a9] text-xs font-bold border border-[#56e5a9]/30 mt-1">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                stars
              </span>
              <span>{percentage >= 75 ? 'उत्कृष्ट प्रदर्शन! प्रथम श्रेणी' : 'अच्छा प्रयास! और बेहतर करें'}</span>
            </div>

            {/* Rank & Comparison Banner */}
            <div className="w-full mt-4 py-2 px-3 rounded-xl bg-[#273647]/60 border border-[#273647] flex items-center justify-between text-[#d8c3ad] text-xs">
              <span className="flex items-center gap-1.5 text-[#d4e4fa]">
                <span className="material-symbols-outlined text-[#ffc174] text-[16px]">leaderboard</span>
                मैट्रिक रैंक: <strong className="text-[#ffc174]">#{result.rank}</strong> / {result.totalParticipants} छात्र
              </span>
              <span className="flex items-center gap-1 text-[#56e5a9] font-semibold">
                <span className="material-symbols-outlined text-[15px]">trending_up</span>
                {result.percentile}% परसेंटाइल
              </span>
            </div>
          </div>

          {/* 4-Column Compact Metric Grid */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-[#273647]/60">
            {/* Metric 1: Correct */}
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-[#010f1f]/60 border border-[#1c2b3c]">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#56e5a9]/20 text-[#56e5a9] mb-1">
                <span className="material-symbols-outlined text-[14px]">check</span>
              </span>
              <span className="text-base font-bold text-[#d4e4fa]">{result.correctCount}</span>
              <span className="text-[10px] text-[#d8c3ad]">सही</span>
              <span className="text-[9px] text-[#56e5a9] font-bold mt-0.5">+{result.correctCount}.0</span>
            </div>

            {/* Metric 2: Incorrect */}
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-[#010f1f]/60 border border-[#1c2b3c]">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#ffb4ab]/20 text-[#ffb4ab] mb-1">
                <span className="material-symbols-outlined text-[14px]">close</span>
              </span>
              <span className="text-base font-bold text-[#d4e4fa]">{result.incorrectCount}</span>
              <span className="text-[10px] text-[#d8c3ad]">गलत</span>
              <span className="text-[9px] text-[#ffb4ab] font-bold mt-0.5">
                -{result.incorrectCount * 0.25}
              </span>
            </div>

            {/* Metric 3: Skipped */}
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-[#010f1f]/60 border border-[#1c2b3c]">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1c2b3c] text-[#d8c3ad] mb-1">
                <span className="material-symbols-outlined text-[14px]">remove</span>
              </span>
              <span className="text-base font-bold text-[#d4e4fa]">{result.skippedCount}</span>
              <span className="text-[10px] text-[#d8c3ad]">छोड़े</span>
              <span className="text-[9px] text-[#d8c3ad] font-bold mt-0.5">0.0</span>
            </div>

            {/* Metric 4: Pace */}
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-[#010f1f]/60 border border-[#1c2b3c]">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#f59e0b]/20 text-[#ffc174] mb-1">
                <span className="material-symbols-outlined text-[14px]">timer</span>
              </span>
              <span className="text-base font-bold text-[#d4e4fa]">
                {Math.round(result.timeSpentSeconds / 60)}m
              </span>
              <span className="text-[10px] text-[#d8c3ad]">समय</span>
              <span className="text-[9px] text-[#ffc174] font-bold mt-0.5">
                {Math.round(result.timeSpentSeconds / (result.questions.length || 1))}s/प्रश्न
              </span>
            </div>
          </div>

          {/* Action Row inside Hero */}
          <div className="flex flex-col sm:flex-row gap-2.5 mt-4">
            <button
              onClick={retestIncorrectQuestions}
              className="flex-1 min-h-[46px] px-4 py-2.5 rounded-xl bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#f59e0b]/20 active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">replay</span>
              <span>गलत प्रश्नों का पुनः अभ्यास ({result.incorrectCount})</span>
            </button>
            <button
              onClick={handleShare}
              className="min-h-[46px] px-4 py-2.5 rounded-xl bg-[#1c2b3c] hover:bg-[#273647] text-[#d4e4fa] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#273647] active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-[#ffc174] text-[18px]">share</span>
              <span>स्कोरकार्ड</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filter & Tab Strip for Analysis */}
      <section className="sticky top-16 z-30 bg-[#051424]/95 backdrop-blur-md py-2 -mx-2 px-2 border-b border-[#1c2b3c]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs sm:text-sm font-bold text-[#d4e4fa] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffc174] text-[18px]">quiz</span>
            विस्तृत प्रश्न विश्लेषण
          </h3>
          <span className="text-[11px] text-[#d8c3ad]">{result.totalMarks} प्रश्न कुल</span>
        </div>

        {/* Scrollable Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shrink-0 transition-all ${
              filterType === 'all'
                ? 'bg-[#f59e0b] text-[#472a00] font-bold shadow-sm'
                : 'bg-[#1c2b3c] text-[#d8c3ad] hover:text-[#d4e4fa]'
            }`}
          >
            <span>सभी ({result.totalMarks})</span>
          </button>
          <button
            onClick={() => setFilterType('correct')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shrink-0 transition-all ${
              filterType === 'correct'
                ? 'bg-[#56e5a9] text-[#051424] font-bold shadow-sm'
                : 'bg-[#1c2b3c] text-[#56e5a9] hover:bg-[#273647]'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            <span>सही उत्तर ({result.correctCount})</span>
          </button>
          <button
            onClick={() => setFilterType('incorrect')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shrink-0 transition-all ${
              filterType === 'incorrect'
                ? 'bg-[#ffb4ab] text-[#690005] font-bold shadow-sm'
                : 'bg-[#1c2b3c] text-[#ffb4ab] hover:bg-[#273647]'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">cancel</span>
            <span>गलत प्रयास ({result.incorrectCount})</span>
          </button>
          <button
            onClick={() => setFilterType('skipped')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shrink-0 transition-all ${
              filterType === 'skipped'
                ? 'bg-[#d8c3ad] text-[#051424] font-bold shadow-sm'
                : 'bg-[#1c2b3c] text-[#d8c3ad] hover:text-[#d4e4fa]'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">help_center</span>
            <span>छोड़े गए ({result.skippedCount})</span>
          </button>
        </div>
      </section>

      {/* Question List Analysis */}
      <section className="py-4 flex flex-col gap-4">
        {filteredQuestionList.map(({ question: q, index, userChoice, type }) => {
          const isQBookmarked = isBookmarked('questions', q.id);
          const letters = ['A', 'B', 'C', 'D'];

          return (
            <article
              key={q.id}
              className="rounded-2xl bg-[#122131] border border-[#273647] p-4 flex flex-col gap-3 shadow-md relative"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-[#1c2b3c] text-[#ffc174] text-[11px] font-bold border border-[#273647]">
                    प्रश्न {index + 1}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#0d1c2d] text-[#d8c3ad] text-[11px] border border-[#1c2b3c]">
                    {q.pyqBadge}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {type === 'correct' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#56e5a9]/20 text-[#56e5a9] text-[11px] font-bold border border-[#56e5a9]/30">
                      <span className="material-symbols-outlined text-[13px]">check</span>
                      सही (+1.0)
                    </span>
                  ) : type === 'incorrect' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffb4ab]/20 text-[#ffb4ab] text-[11px] font-bold border border-[#ffb4ab]/30">
                      <span className="material-symbols-outlined text-[13px]">close</span>
                      गलत (-0.25)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1c2b3c] text-[#d8c3ad] text-[11px] font-medium border border-[#273647]">
                      <span className="material-symbols-outlined text-[13px]">help</span>
                      छोड़ा गया (0.0)
                    </span>
                  )}

                  <button
                    onClick={() => toggleBookmark('questions', q.id)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      isQBookmarked ? 'text-[#f59e0b]' : 'text-[#d8c3ad] hover:text-[#ffc174]'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={isQBookmarked ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      bookmark
                    </span>
                  </button>
                </div>
              </div>

              {/* Stem */}
              <h4 className="text-xs sm:text-sm font-semibold text-[#d4e4fa] leading-relaxed">
                {q.stem}
              </h4>

              {/* Options Breakdown */}
              <div className="flex flex-col gap-2">
                {q.options.map((optText, optIdx) => {
                  const isCorrect = optIdx === q.correctAnswer;
                  const isUserSelection = optIdx === userChoice;

                  let optClass = 'bg-[#0d1c2d] text-[#d8c3ad] border-[#1c2b3c]';
                  let badge = null;

                  if (isCorrect) {
                    optClass = 'bg-[#56e5a9]/15 text-[#56e5a9] border-[#56e5a9]/40 font-semibold';
                    badge = (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#56e5a9] bg-[#56e5a9]/20 px-2 py-0.5 rounded-full border border-[#56e5a9]/30">
                        <span className="material-symbols-outlined text-[13px]">check_circle</span>
                        {isUserSelection ? 'आपका सही उत्तर' : 'सही उत्तर'}
                      </span>
                    );
                  } else if (isUserSelection && !isCorrect) {
                    optClass = 'bg-[#ffb4ab]/20 text-[#ffb4ab] border-[#ffb4ab]/40 line-through opacity-90';
                    badge = (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#ffb4ab] bg-[#ffb4ab]/30 px-2 py-0.5 rounded-full border border-[#ffb4ab]/40">
                        <span className="material-symbols-outlined text-[13px]">cancel</span>
                        आपका चयन
                      </span>
                    );
                  }

                  return (
                    <div
                      key={optIdx}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm ${optClass}`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isCorrect
                              ? 'bg-[#56e5a9] text-[#051424]'
                              : isUserSelection
                              ? 'bg-[#ffb4ab] text-[#690005]'
                              : 'bg-[#1c2b3c] text-[#d8c3ad]'
                          }`}
                        >
                          {letters[optIdx]}
                        </span>
                        <span className="leading-normal">{optText}</span>
                      </div>
                      {badge}
                    </div>
                  );
                })}
              </div>

              {/* Verified Master Key Explanation */}
              <div className="mt-1 p-3.5 rounded-xl bg-[#1c2b3c]/70 border border-[#273647] flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[#ffc174] text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">school</span>
                  <span>बोर्ड समाधान कुंजी (Master Key):</span>
                </div>
                <p className="text-xs text-[#d8c3ad] leading-relaxed">
                  {q.explanation}
                </p>
              </div>
            </article>
          );
        })}
      </section>

      {/* Sticky Bottom Navigation Bar */}
      <aside className="fixed bottom-0 inset-x-0 z-40 bg-[#0d1c2d]/95 backdrop-blur-xl px-4 py-3 border-t border-[#1c2b3c] shadow-[0_-4px_16px_rgba(0,0,0,0.4)]">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="min-h-[46px] px-3.5 py-2 rounded-xl bg-[#1c2b3c] hover:bg-[#273647] text-[#d4e4fa] text-xs font-semibold flex items-center justify-center gap-1 border border-[#273647] shrink-0 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            <span className="hidden xs:inline">होम</span>
          </button>

          <button
            onClick={() => {
              // Next chapter recommendation
              navigateTo('notes', { chapterId: 'hindi_g_02' });
            }}
            className="flex-1 min-h-[46px] px-4 py-2 rounded-xl bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] font-bold text-xs sm:text-sm flex items-center justify-between shadow-lg shadow-[#f59e0b]/20 active:scale-[0.98] transition-all"
          >
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase font-bold text-[#472a00]/80">अगला अध्याय पढ़ें</span>
              <span className="truncate">पाठ 2: विष के दांत ›</span>
            </div>
            <span className="material-symbols-outlined text-[20px] shrink-0">arrow_forward</span>
          </button>
        </div>
      </aside>
    </div>
  );
};
