/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SUBJECTIVE_QUESTIONS_CH1 } from '../../data/mockData';

export const ChapterDetailScreen: React.FC = () => {
  const {
    selectedChapter,
    startTest,
    preferences,
    setFontSizeStep,
    toggleBookmark,
    isBookmarked,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'summary' | 'qa'>('summary');
  const [qaFilter, setQaFilter] = useState<'all' | 'short' | 'long' | 'vvi'>('all');

  // Helpful states for interactive thumbs up / doubt per question
  const [understoodMap, setUnderstoodMap] = useState<Record<string, number>>({
    sub_ch1_01: 142,
    sub_ch1_02: 98,
    sub_ch1_03: 115,
    sub_ch1_04: 186,
    sub_ch1_05: 89,
    sub_ch1_06: 130,
  });

  const [doubtMap, setDoubtMap] = useState<Record<string, number>>({
    sub_ch1_01: 12,
    sub_ch1_02: 8,
    sub_ch1_03: 14,
    sub_ch1_04: 19,
    sub_ch1_05: 6,
    sub_ch1_06: 11,
  });

  const [userVoteMap, setUserVoteMap] = useState<Record<string, 'up' | 'doubt'>>({});

  const handleVote = (qId: string, type: 'up' | 'doubt') => {
    if (userVoteMap[qId] === type) return;

    setUserVoteMap((prev) => ({ ...prev, [qId]: type }));
    if (type === 'up') {
      setUnderstoodMap((prev) => ({ ...prev, [qId]: (prev[qId] || 0) + 1 }));
      showToast('प्रतिक्रिया दर्ज हुई: उत्तर समझ आया 👍');
    } else {
      setDoubtMap((prev) => ({ ...prev, [qId]: (prev[qId] || 0) + 1 }));
      showToast('संशय दर्ज किया गया। शिक्षक समीक्षा करेंगे 💡');
    }
  };

  const isChapterBookmarked = isBookmarked('chapters', selectedChapter.id);

  const filteredQuestions = SUBJECTIVE_QUESTIONS_CH1.filter((q) => {
    if (qaFilter === 'all') return true;
    if (qaFilter === 'short') return q.type === 'short';
    if (qaFilter === 'long') return q.type === 'long';
    if (qaFilter === 'vvi') return q.isVVI;
    return true;
  });

  // Calculate font size multiplier based on preferences.fontSizeStep
  const fontStyle = {
    fontSize:
      preferences.fontSizeStep === 1
        ? '105%'
        : preferences.fontSizeStep === 2
        ? '112%'
        : '100%',
  };

  return (
    <div className="flex flex-col w-full pb-28 max-w-2xl mx-auto" style={fontStyle}>
      {/* Chapter Sub-Header Strip */}
      <div className="bg-[#122131] rounded-2xl p-3 sm:p-4 mb-4 border border-[#273647] flex items-center justify-between gap-3 shadow-sm">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f59e0b]/20 text-[#ffc174] uppercase">
              {selectedChapter.sectionName}
            </span>
            <span className="text-[11px] text-[#56e5a9] font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              BSEB 2027
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#d4e4fa] truncate mt-1">
            पाठ {selectedChapter.chapterNumber}: {selectedChapter.title}
          </h2>
          <p className="text-xs text-[#d8c3ad]">लेखक: {selectedChapter.author}</p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setFontSizeStep(preferences.fontSizeStep + 1)}
            title="फॉन्ट आकार बदलें"
            className="w-9 h-9 rounded-xl bg-[#1c2b3c] text-[#d8c3ad] hover:text-[#d4e4fa] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">format_size</span>
          </button>
          <button
            onClick={() => toggleBookmark('chapters', selectedChapter.id)}
            title="अध्याय बुकमार्क करें"
            className={`w-9 h-9 rounded-xl bg-[#1c2b3c] flex items-center justify-center transition-colors ${
              isChapterBookmarked ? 'text-[#f59e0b]' : 'text-[#d8c3ad] hover:text-[#ffc174]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={isChapterBookmarked ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              bookmark
            </span>
          </button>
        </div>
      </div>

      {/* Sticky 2-Mode Segmented Switcher */}
      <div className="sticky top-16 z-30 bg-[#051424]/95 backdrop-blur-md py-2 -mx-2 px-2 mb-4">
        <div className="p-1 bg-[#010f1f] rounded-xl flex items-center gap-1 border border-[#273647]/60 shadow-sm">
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex-1 py-2.5 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'summary'
                ? 'bg-[#f59e0b] text-[#472a00] shadow-[0_2px_10px_rgba(245,158,11,0.25)]'
                : 'text-[#d8c3ad] hover:text-[#d4e4fa]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">auto_stories</span>
            <span>सारांश व परिचय</span>
          </button>
          <button
            onClick={() => setActiveTab('qa')}
            className={`flex-1 py-2.5 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'qa'
                ? 'bg-[#f59e0b] text-[#472a00] shadow-[0_2px_10px_rgba(245,158,11,0.25)]'
                : 'text-[#d8c3ad] hover:text-[#d4e4fa]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">assignment</span>
            <span>प्रश्नोत्तर (Q&A)</span>
            <span className="ml-1 px-1.5 py-0.2 text-[9px] rounded-full bg-[#1c2b3c] text-[#ffc174] font-bold">
              15
            </span>
          </button>
        </div>
      </div>

      {/* MODE 1: SUMMARY & AUTHOR INTRO */}
      {activeTab === 'summary' ? (
        <div className="flex flex-col gap-4">
          {/* Author Profile Card */}
          <section className="bg-[#122131] rounded-2xl p-4 sm:p-5 border border-[#273647] shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#ffc174]">
                लेखक जीवन परिचय • बोर्ड स्पेशल
              </span>
            </div>

            <div className="border-l-4 border-[#f59e0b] bg-[#010f1f]/70 rounded-r-xl p-3.5 flex flex-col gap-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#d4e4fa] leading-tight">
                    {selectedChapter.author}
                  </h3>
                  <p className="text-xs text-[#d8c3ad] mt-0.5">
                    {selectedChapter.authorBio.bioSummary}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#f59e0b]/20 text-[#ffc174] border border-[#f59e0b]/30 shrink-0">
                  जन्म: 1891
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-2 border-t border-[#1c2b3c] text-xs">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#ffc174] shrink-0 mt-0.5">
                    calendar_month
                  </span>
                  <span className="text-[#d4e4fa]">
                    <strong className="text-[#d8c3ad] font-medium">जन्म तिथि व स्थान:</strong>{' '}
                    {selectedChapter.authorBio.birthPlace}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#7bd0ff] shrink-0 mt-0.5">
                    menu_book
                  </span>
                  <span className="text-[#d4e4fa]">
                    <strong className="text-[#d8c3ad] font-medium">प्रमुख रचनाएं:</strong>{' '}
                    <em>{selectedChapter.authorBio.works}</em>
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#56e5a9] shrink-0 mt-0.5">
                    history_edu
                  </span>
                  <span className="text-[#d4e4fa]">
                    <strong className="text-[#d8c3ad] font-medium">पाठ का स्रोत:</strong>{' '}
                    {selectedChapter.authorBio.source}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Chapter Detailed Concept Notes */}
          <section className="bg-[#122131] rounded-2xl p-4 sm:p-5 border border-[#273647] flex flex-col gap-3 shadow-sm">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#1c2b3c]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#f59e0b]/20 flex items-center justify-center text-[#ffc174]">
                  <span className="material-symbols-outlined text-[20px]">article</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#d4e4fa]">
                  पाठ का मुख्य सारांश (Concept Notes)
                </h3>
              </div>
              <span className="text-[11px] font-medium text-[#56e5a9] bg-[#56e5a9]/10 px-2.5 py-0.5 rounded-full border border-[#56e5a9]/20">
                100% परीक्षा उपयोगी
              </span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-[#d4e4fa]">
              {selectedChapter.summaryPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0d1c2d] border border-[#1c2b3c]"
                >
                  <span className="w-6 h-6 rounded-full bg-[#f59e0b] text-[#472a00] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    {index + 1}
                  </span>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-[#ffc174] text-xs sm:text-sm">
                      {point.title}:
                    </h4>
                    <p className="text-[#d8c3ad] mt-1 leading-relaxed">
                      {point.description}
                    </p>
                    {point.highlight && (
                      <span className="text-[11px] text-[#56e5a9] mt-1 font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">lightbulb</span>
                        मुख्य बिंदु: {point.highlight}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Revision Tip Box */}
            <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-xl p-3 flex items-start gap-2.5 mt-2">
              <span className="material-symbols-outlined text-[#f59e0b] text-[20px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                tips_and_updates
              </span>
              <div className="text-xs leading-snug">
                <span className="font-bold text-[#ffc174]">मैट्रिक बोर्ड परीक्षा सूत्र:</span>
                <p className="text-[#d8c3ad] mt-0.5">
                  {selectedChapter.examFormulaTip}
                </p>
              </div>
            </div>
          </section>

          {/* Switch to Q&A CTA Banner */}
          <section className="bg-[#1c2b3c] rounded-2xl p-4 flex items-center justify-between border border-[#273647] shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#ffc174] text-[24px]">
                quiz
              </span>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-[#d4e4fa]">
                  सारांश पढ़ लिया? अब प्रश्नोत्तर याद करें
                </span>
                <span className="text-[11px] text-[#d8c3ad]">15 लघु व दीर्घ उत्तरीय प्रश्न बैंक</span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('qa')}
              className="px-3.5 py-2 rounded-xl bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] text-xs font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-all shrink-0"
            >
              <span>प्रश्नोत्तर देखें</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </section>
        </div>
      ) : (
        /* MODE 2: SUBJECTIVE QUESTION-ANSWERS (Q&A Mode) */
        <div className="flex flex-col gap-4">
          {/* Sub-Filters Bar (Horizontal Chips) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 select-none">
            <button
              onClick={() => setQaFilter('all')}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                qaFilter === 'all'
                  ? 'bg-[#f59e0b] text-[#472a00] shadow-sm'
                  : 'bg-[#1c2b3c] text-[#d8c3ad] hover:text-[#d4e4fa]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                list_alt
              </span>
              <span>सभी प्रश्न (15)</span>
            </button>

            <button
              onClick={() => setQaFilter('short')}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                qaFilter === 'short'
                  ? 'bg-[#f59e0b] text-[#472a00] shadow-sm'
                  : 'bg-[#1c2b3c] text-[#d8c3ad] hover:text-[#d4e4fa]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7bd0ff]" />
              <span>लघु उत्तरीय (2 अंक - 10)</span>
            </button>

            <button
              onClick={() => setQaFilter('long')}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                qaFilter === 'long'
                  ? 'bg-[#f59e0b] text-[#472a00] shadow-sm'
                  : 'bg-[#1c2b3c] text-[#d8c3ad] hover:text-[#d4e4fa]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffc174]" />
              <span>दीर्घ उत्तरीय (5 अंक - 5)</span>
            </button>

            <button
              onClick={() => setQaFilter('vvi')}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                qaFilter === 'vvi'
                  ? 'bg-[#f59e0b] text-[#472a00] shadow-sm'
                  : 'bg-[#1c2b3c] text-[#ffc174] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <span>VVI बोर्ड मॉडल</span>
            </button>
          </div>

          {/* Study Progress Banner */}
          <div className="bg-[#0d1c2d] rounded-2xl p-3.5 shadow-sm flex items-center justify-between gap-3 border border-[#1c2b3c]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#122131] flex items-center justify-center shrink-0 text-[#ffc174]">
                <span className="material-symbols-outlined text-[24px]">school</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-[#56e5a9] font-bold uppercase tracking-wider">मैट्रिक मिशन 2027</span>
                  <span className="text-[#d8c3ad]">•</span>
                  <span className="text-[#ffc174] font-semibold">100% NCERT आधारित</span>
                </div>
                <p className="text-xs text-[#d4e4fa] truncate">अध्याय 1 के सभी संभावित बोर्ड प्रश्नोत्तर</p>
              </div>
            </div>
            <div className="shrink-0 flex flex-col items-end">
              <span className="text-base font-bold text-[#ffc174] leading-none">15/15</span>
              <span className="text-[10px] text-[#d8c3ad] mt-0.5">कंठस्थ लक्ष्य</span>
            </div>
          </div>

          {/* Question Cards Stream */}
          <div className="flex flex-col gap-4">
            {filteredQuestions.map((q) => {
              const isQBookmarked = isBookmarked('subjectives', q.id);
              const userVote = userVoteMap[q.id];

              return (
                <article
                  key={q.id}
                  className="bg-[#122131] rounded-2xl p-4 border border-[#273647] shadow-md flex flex-col gap-3 relative transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md bg-[#273647] text-[#7bd0ff] text-[11px] font-semibold">
                        {q.type === 'short' ? 'लघु उत्तरीय • 2 अंक' : 'दीर्घ उत्तरीय • 5 अंक'}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#0d1c2d] text-[#56e5a9] text-[11px] flex items-center gap-0.5 border border-[#1c2b3c]">
                        <span className="material-symbols-outlined text-[13px]">history_edu</span>
                        {q.pyqYears}
                      </span>
                      {q.isVVI && (
                        <span className="px-1.5 py-0.5 rounded-md bg-[#f59e0b]/20 text-[#ffc174] text-[11px] font-bold flex items-center gap-0.5 border border-[#f59e0b]/30">
                          <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                          VVI
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => toggleBookmark('subjectives', q.id)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isQBookmarked ? 'text-[#f59e0b]' : 'text-[#d8c3ad] hover:text-[#ffc174]'
                      }`}
                      aria-label="प्रश्न सहेजें"
                    >
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={isQBookmarked ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        bookmark
                      </span>
                    </button>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-[#d4e4fa] leading-snug">
                    {q.questionText}
                  </h3>

                  {/* Ideal Answer Box */}
                  <div className="bg-[#0d1c2d] rounded-xl p-3.5 flex flex-col gap-2 border border-[#1c2b3c]">
                    <div className="flex items-center gap-1.5 text-[#56e5a9] text-xs font-semibold">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>आदर्श उत्तर (NCERT प्रमाणित):</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#d4e4fa] leading-relaxed text-justify">
                      {q.answerSummary}
                    </p>

                    {/* Bullet Points for 5 marks */}
                    {q.bulletPoints && q.bulletPoints.length > 0 && (
                      <div className="flex flex-col gap-2 mt-1">
                        {q.bulletPoints.map((pt, ptIdx) => (
                          <div key={ptIdx} className="bg-[#122131] p-2.5 rounded-lg flex items-start gap-2 border border-[#273647]">
                            <span className="w-5 h-5 rounded-full bg-[#f59e0b]/20 text-[#ffc174] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {ptIdx + 1}
                            </span>
                            <p className="text-xs text-[#d8c3ad] leading-normal">{pt}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Interactive Understanding Feedback */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#1c2b3c] mt-0.5">
                    <span className="text-[11px] font-medium text-[#d8c3ad] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#ffc174]">help</span>
                      क्या उत्तर समझ आया?
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleVote(q.id, 'up')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                          userVote === 'up'
                            ? 'bg-[#56e5a9] text-[#051424] font-bold'
                            : 'bg-[#1c2b3c] hover:bg-[#56e5a9]/20 text-[#56e5a9]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">thumb_up</span>
                        <span>समझ आ गया</span>
                        <span className="text-[10px] ml-0.5 opacity-90">{understoodMap[q.id]}</span>
                      </button>

                      <button
                        onClick={() => handleVote(q.id, 'doubt')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                          userVote === 'doubt'
                            ? 'bg-[#ffc174] text-[#051424] font-bold'
                            : 'bg-[#1c2b3c] hover:bg-[#2c3a4c] text-[#d8c3ad]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px] text-[#ffc174]">
                          psychology_alt
                        </span>
                        <span>संशय है</span>
                        <span className="text-[10px] ml-0.5 opacity-90">{doubtMap[q.id]}</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Encouraging Completion Card */}
          <div className="w-full mt-3 p-4 rounded-2xl bg-[#0d1c2d] flex items-center justify-between gap-3 border border-[#1c2b3c]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#56e5a9]/20 text-[#56e5a9] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">military_tech</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-[#d4e4fa]">सभी प्रश्न दोहरा लिए?</span>
                <span className="text-[11px] text-[#d8c3ad]">अब वस्तुनिष्ठ प्रश्नों से अपनी गति परखें</span>
              </div>
            </div>
            <button
              onClick={() => startTest(selectedChapter.id)}
              className="px-3 py-1.5 rounded-xl bg-[#f59e0b] text-[#472a00] text-xs font-bold shrink-0 shadow-sm"
            >
              टेस्ट दें ›
            </button>
          </div>
        </div>
      )}

      {/* Sticky Bottom Practice Action Dock */}
      <footer className="fixed bottom-0 inset-x-0 z-40 bg-[#051424]/95 backdrop-blur-xl border-t border-[#1c2b3c] p-3 shadow-[0_-4px_16px_rgba(0,0,0,0.4)]">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[10px] font-semibold text-[#d8c3ad] flex items-center gap-1 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-[#56e5a9]" /> 20 वस्तुनिष्ठ प्रश्न तैयार
            </span>
            <span className="text-xs font-bold text-[#d4e4fa] truncate">
              नोट्स पढ़ लिए? परीक्षा अभ्यास करें
            </span>
          </div>
          <button
            onClick={() => startTest(selectedChapter.id)}
            className="px-4 py-2.5 rounded-xl bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-[0_0_16px_rgba(245,158,11,0.3)] active:scale-95 transition-all shrink-0"
          >
            <span>MCQ टेस्ट दें</span>
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
