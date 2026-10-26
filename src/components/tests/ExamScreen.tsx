/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OBJECTIVE_QUESTIONS_CH1 } from '../../data/mockData';

export const ExamScreen: React.FC = () => {
  const {
    activeTestSession,
    selectOption,
    toggleMarkForReview,
    submitCurrentTest,
    navigateTo,
    toggleBookmark,
    isBookmarked,
    showToast,
  } = useApp();

  const [currentIndex, setCurrentIndex] = useState(activeTestSession?.currentQuestionIndex || 0);
  const [secondsRemaining, setSecondsRemaining] = useState(activeTestSession?.timeRemainingSeconds || 600);
  const [showPalette, setShowPalette] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitCurrentTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitCurrentTest]);

  if (!activeTestSession) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[50vh]">
        <p className="text-sm text-[#d8c3ad]">सक्रिय परीक्षा सत्र नहीं मिला।</p>
        <button
          onClick={() => navigateTo('tests')}
          className="mt-4 px-4 py-2 bg-[#f59e0b] text-[#472a00] font-bold rounded-xl"
        >
          टेस्ट हब पर जाएं
        </button>
      </div>
    );
  }

  const questions = OBJECTIVE_QUESTIONS_CH1;
  const totalQuestions = questions.length;
  const currentQ = questions[currentIndex] || questions[0];
  const selectedOption = activeTestSession.answers[currentIndex];
  const isMarkedReview = activeTestSession.markedForReview.includes(currentIndex);
  const isQuestionBookmarked = isBookmarked('questions', currentQ.id);

  // Stats calculation
  const answeredCount = Object.keys(activeTestSession.answers).filter(
    (k) => activeTestSession.answers[Number(k)] !== undefined && activeTestSession.answers[Number(k)] !== -1
  ).length;
  const reviewCount = activeTestSession.markedForReview.length;
  const remainingCount = totalQuestions - answeredCount;

  // Format time (MM:SS)
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const isCriticalTime = secondsRemaining < 180; // < 3 mins

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowSubmitConfirm(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#051424] text-[#d4e4fa] -mx-4 px-4 select-none">
      {/* 1. Micro Test Metadata Bar */}
      <div className="flex items-center justify-between py-2 border-b border-[#1c2b3c] -mx-4 px-4 bg-[#0d1c2d]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse shrink-0" />
          <span className="text-[11px] text-[#d8c3ad] font-medium truncate">
            {activeTestSession.title}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1c2b3c] text-[#7bd0ff] font-bold border border-[#7bd0ff]/30">
            +1.0 / -0.25
          </span>
        </div>
      </div>

      {/* 2. Interactive Test Header Status */}
      <div className="flex items-center justify-between py-2.5 border-b border-[#1c2b3c] -mx-4 px-4 bg-[#122131]">
        {/* Exit & Question Counter */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowExitConfirm(true)}
            aria-label="परीक्षा छोड़ें"
            className="w-9 h-9 rounded-xl bg-[#1c2b3c] hover:bg-[#273647] text-[#d8c3ad] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <div className="flex items-center gap-1 font-bold text-sm sm:text-base">
              <span className="text-[#ffc174]">प्रश्न {String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="text-[#d8c3ad] text-xs">/ {totalQuestions}</span>
            </div>
            <span className="text-[10px] text-[#d8c3ad]">BSEB मैट्रिक 2027</span>
          </div>
        </div>

        {/* Countdown Timer Pill */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#010f1f] border transition-all ${
            isCriticalTime
              ? 'text-[#ffb4ab] border-[#ffb4ab]/50 shadow-[0_0_12px_rgba(255,180,171,0.3)] animate-pulse'
              : 'text-[#ffc174] border-[#f59e0b]/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            timer
          </span>
          <span className="text-xs sm:text-sm font-bold tracking-wider font-mono">
            {formatTime(secondsRemaining)}
          </span>
        </div>

        {/* Action Shortcuts: Palette & Submit */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowPalette(true)}
            aria-label="प्रश्न पैलेट खोलें"
            className="w-9 h-9 rounded-xl bg-[#1c2b3c] hover:bg-[#273647] text-[#d4e4fa] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
          </button>
          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="h-9 px-3 rounded-xl bg-[#56e5a9] hover:bg-[#4edea3] text-[#051424] font-bold text-xs flex items-center gap-1 shadow-sm transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">task_alt</span>
            <span>सबमिट</span>
          </button>
        </div>
      </div>

      {/* 3. Horizontal Question Navigator Strip */}
      <div className="py-2 flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 bg-[#010f1f] border-b border-[#1c2b3c]">
        {questions.map((_, idx) => {
          const isCurrent = idx === currentIndex;
          const isAnswered =
            activeTestSession.answers[idx] !== undefined &&
            activeTestSession.answers[idx] !== -1;
          const isReview = activeTestSession.markedForReview.includes(idx);

          let btnClass = 'bg-[#1c2b3c] text-[#d8c3ad]';
          if (isCurrent) {
            btnClass = 'bg-[#f59e0b] text-[#472a00] font-bold ring-2 ring-[#ffc174] ring-offset-2 ring-offset-[#051424]';
          } else if (isReview) {
            btnClass = 'bg-[#00a6e0] text-[#051424] font-bold';
          } else if (isAnswered) {
            btnClass = 'bg-[#56e5a9] text-[#051424] font-bold';
          }

          return (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-8 h-8 rounded-full text-xs shrink-0 flex items-center justify-center transition-all ${btnClass}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* 4. Question Sheet & Options Container */}
      <div className="py-4 flex flex-col gap-3 flex-1">
        {/* Question Card */}
        <div className="bg-[#122131] rounded-2xl p-4 sm:p-5 border border-[#273647] shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#1c2b3c] text-[#ffc174] text-[11px] font-semibold border border-[#273647]">
              <span className="material-symbols-outlined text-[13px]">history_edu</span>
              <span>{currentQ.pyqBadge}</span>
            </div>
            <button
              onClick={() => toggleBookmark('questions', currentQ.id)}
              className={`w-8 h-8 rounded-lg bg-[#0d1c2d] flex items-center justify-center transition-colors ${
                isQuestionBookmarked ? 'text-[#f59e0b]' : 'text-[#d8c3ad] hover:text-[#ffc174]'
              }`}
              aria-label="प्रश्न बुकमार्क करें"
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={isQuestionBookmarked ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                bookmark
              </span>
            </button>
          </div>

          <h2 className="text-sm sm:text-base font-semibold text-[#d4e4fa] leading-snug mt-1">
            {currentQ.stem}
          </h2>
        </div>

        {/* Options Radio List */}
        <div className="flex flex-col gap-2.5">
          {currentQ.options.map((optionText, optIdx) => {
            const isSelected = selectedOption === optIdx;
            const letters = ['A', 'B', 'C', 'D'];

            return (
              <div
                key={optIdx}
                onClick={() => selectOption(currentIndex, optIdx)}
                className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl cursor-pointer transition-all active:scale-[0.99] border ${
                  isSelected
                    ? 'bg-[#1c2b3c] border-[#f59e0b] shadow-[0_0_14px_rgba(245,158,11,0.25)] ring-1 ring-[#f59e0b]'
                    : 'bg-[#0d1c2d] border-[#1c2b3c] hover:bg-[#122131]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#f59e0b] text-[#472a00]'
                        : 'bg-[#1c2b3c] text-[#d8c3ad]'
                    }`}
                  >
                    {letters[optIdx]}
                  </span>
                  <span
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isSelected ? 'text-[#ffc174] font-semibold' : 'text-[#d4e4fa]'
                    }`}
                  >
                    {optionText}
                  </span>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-[#f59e0b] text-[#472a00] flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Status Legend Strip */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#010f1f] text-[#d8c3ad] text-[11px] border border-[#1c2b3c] mt-auto">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#56e5a9]" />
            <span>उत्तर: {answeredCount}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
            <span>सक्रिय: 1</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00a6e0]" />
            <span>समीक्षा: {reviewCount}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1c2b3c]" />
            <span>शेष: {remainingCount}</span>
          </div>
        </div>
      </div>

      {/* 5. Persistent Bottom Action Console */}
      <div className="sticky bottom-0 inset-x-0 bg-[#0d1c2d]/95 backdrop-blur-md py-3 -mx-4 px-4 border-t border-[#1c2b3c] shadow-[0_-2px_12px_rgba(0,0,0,0.4)] flex items-center gap-2.5 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)]">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="h-12 px-3 rounded-xl bg-[#1c2b3c] hover:bg-[#273647] disabled:opacity-40 text-[#d4e4fa] flex items-center justify-center gap-1 text-xs font-semibold active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          <span>पिछला</span>
        </button>

        {/* Review / Flag Button */}
        <button
          onClick={() => toggleMarkForReview(currentIndex)}
          className={`h-12 px-3.5 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold active:scale-95 transition-all border ${
            isMarkedReview
              ? 'bg-[#00a6e0] text-[#051424] border-[#00a6e0]'
              : 'bg-[#1c2b3c] text-[#7bd0ff] border-[#273647] hover:bg-[#273647]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            flag
          </span>
          <span>{isMarkedReview ? 'समीक्षा अंकित' : 'समीक्षा'}</span>
        </button>

        {/* Save & Next CTA */}
        <button
          onClick={handleNext}
          className="flex-1 h-12 px-4 rounded-xl bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(245,158,11,0.25)] active:scale-98 transition-all"
        >
          <span>{currentIndex === totalQuestions - 1 ? 'समीक्षा व सबमिट' : 'सेव व अगला'}</span>
          <span className="material-symbols-outlined text-[18px] font-bold">arrow_forward</span>
        </button>
      </div>

      {/* 6. Question Palette Bottom Drawer Modal */}
      {showPalette && (
        <div className="fixed inset-0 z-50 bg-[#010f1f]/80 backdrop-blur-sm flex flex-col justify-end animate-in fade-in">
          <div className="w-full bg-[#122131] rounded-t-3xl p-4 sm:p-6 flex flex-col gap-4 shadow-2xl max-h-[85vh] overflow-y-auto border-t border-[#273647]">
            <div className="flex items-center justify-between border-b border-[#1c2b3c] pb-3">
              <div className="flex flex-col">
                <span className="text-base font-bold text-[#d4e4fa]">प्रश्न सारांश शीट</span>
                <span className="text-xs text-[#d8c3ad]">
                  {totalQuestions} में से {answeredCount} प्रश्नों का उत्तर दिया
                </span>
              </div>
              <button
                onClick={() => setShowPalette(false)}
                className="w-8 h-8 rounded-full bg-[#1c2b3c] text-[#d4e4fa] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Quick 4-Grid Stats */}
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-[#010f1f] p-2.5 rounded-xl border border-[#1c2b3c]">
                <p className="text-base font-bold text-[#56e5a9]">{String(answeredCount).padStart(2, '0')}</p>
                <p className="text-[10px] text-[#d8c3ad]">हल किया</p>
              </div>
              <div className="bg-[#010f1f] p-2.5 rounded-xl border border-[#1c2b3c]">
                <p className="text-base font-bold text-[#7bd0ff]">{String(reviewCount).padStart(2, '0')}</p>
                <p className="text-[10px] text-[#d8c3ad]">समीक्षा</p>
              </div>
              <div className="bg-[#010f1f] p-2.5 rounded-xl border border-[#1c2b3c]">
                <p className="text-base font-bold text-[#f59e0b]">01</p>
                <p className="text-[10px] text-[#d8c3ad]">सक्रिय</p>
              </div>
              <div className="bg-[#010f1f] p-2.5 rounded-xl border border-[#1c2b3c]">
                <p className="text-base font-bold text-[#d8c3ad]">{String(remainingCount).padStart(2, '0')}</p>
                <p className="text-[10px] text-[#d8c3ad]">शेष</p>
              </div>
            </div>

            {/* Grid of 20 Question Buttons */}
            <div className="grid grid-cols-5 gap-2.5 py-2">
              {questions.map((_, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered =
                  activeTestSession.answers[idx] !== undefined &&
                  activeTestSession.answers[idx] !== -1;
                const isReview = activeTestSession.markedForReview.includes(idx);

                let btnClass = 'bg-[#1c2b3c] text-[#d8c3ad]';
                if (isCurrent) {
                  btnClass = 'bg-[#f59e0b] text-[#472a00] font-bold ring-2 ring-[#ffc174]';
                } else if (isReview) {
                  btnClass = 'bg-[#00a6e0] text-[#051424] font-bold';
                } else if (isAnswered) {
                  btnClass = 'bg-[#56e5a9] text-[#051424] font-bold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowPalette(false);
                    }}
                    className={`h-10 rounded-xl text-xs font-bold flex items-center justify-center transition-all ${btnClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowPalette(false)}
              className="w-full py-3 rounded-xl bg-[#1c2b3c] hover:bg-[#273647] text-[#d4e4fa] text-xs font-bold"
            >
              वर्तमान प्रश्न पर लौटें
            </button>
          </div>
        </div>
      )}

      {/* 7. Exit Confirmation Dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 bg-[#010f1f]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#122131] border border-[#273647] rounded-2xl p-5 max-w-sm w-full shadow-2xl flex flex-col gap-3">
            <h3 className="text-base font-bold text-[#d4e4fa] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffc174]">warning</span>
              क्या आप परीक्षा छोड़ना चाहते हैं?
            </h3>
            <p className="text-xs text-[#d8c3ad] leading-relaxed">
              यदि आप अभी बाहर जाते हैं तो आपके मौजूदा उत्तर सबमिट नहीं होंगे।
            </p>
            <div className="flex items-center justify-end gap-2 mt-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-2 rounded-xl bg-[#1c2b3c] text-[#d4e4fa] text-xs font-semibold"
              >
                जारी रखें
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  navigateTo('tests');
                }}
                className="px-4 py-2 rounded-xl bg-[#ffb4ab]/20 text-[#ffb4ab] border border-[#ffb4ab]/30 text-xs font-bold"
              >
                परीक्षा छोड़ें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Submit Confirmation Dialog */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 bg-[#010f1f]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#122131] border border-[#273647] rounded-2xl p-5 max-w-sm w-full shadow-2xl flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#56e5a9] text-[24px]">task_alt</span>
              <h3 className="text-base font-bold text-[#d4e4fa]">परीक्षा सबमिट करें?</h3>
            </div>
            <p className="text-xs text-[#d8c3ad] leading-relaxed">
              आपने {totalQuestions} में से {answeredCount} प्रश्नों का उत्तर दिया है और {remainingCount} प्रश्न शेष हैं। क्या आप अभी अंतिम परिणाम देखना चाहते हैं?
            </p>
            <div className="flex items-center justify-end gap-2 mt-2">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 rounded-xl bg-[#1c2b3c] text-[#d4e4fa] text-xs font-semibold"
              >
                पुनः जांचें
              </button>
              <button
                onClick={() => {
                  setShowSubmitConfirm(false);
                  submitCurrentTest();
                }}
                className="px-4 py-2 rounded-xl bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] text-xs font-bold shadow-md shadow-[#f59e0b]/25"
              >
                हाँ, सबमिट करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
