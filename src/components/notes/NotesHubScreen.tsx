/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CHAPTERS } from '../../data/mockData';
import { SectionType } from '../../types';

export const NotesHubScreen: React.FC = () => {
  const { navigateTo } = useApp();

  const [selectedSection, setSelectedSection] = useState<SectionType>('gadya');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenreFilter, setSelectedGenreFilter] = useState<string>('all');

  const filteredChapters = CHAPTERS.filter((ch) => {
    // Check section match
    if (ch.section !== selectedSection) return false;

    // Check genre filter
    if (selectedGenreFilter !== 'all' && !ch.genre.includes(selectedGenreFilter)) {
      return false;
    }

    // Check search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = ch.title.toLowerCase().includes(q);
      const matchAuthor = ch.author.toLowerCase().includes(q);
      const matchGenre = ch.genre.toLowerCase().includes(q);
      return matchTitle || matchAuthor || matchGenre;
    }

    return true;
  });

  return (
    <div className="flex flex-col w-full gap-5 pb-8">
      {/* 1. Info Header Banner */}
      <section className="bg-[#122131] rounded-2xl p-4 sm:p-5 border border-[#273647] shadow-sm relative overflow-hidden">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="material-symbols-outlined text-[#ffc174] text-[20px]">
              auto_stories
            </span>
            <span className="text-[11px] font-bold text-[#ffc174] tracking-wide uppercase">
              BSEB 2027 सिलेबस
            </span>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#1c2b3c] text-[#d8c3ad]">
            36+ अध्याय नोट्स
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#d4e4fa] leading-snug">
          बिहार बोर्ड कक्षा 10वीं हिंदी — संपूर्ण सारांश, लेखक परिचय एवं प्रश्न-उत्तर
        </p>

        {/* Search Input Bar */}
        <div className="mt-3 flex items-center gap-2 bg-[#010f1f] border border-[#273647] rounded-xl px-3 py-2 focus-within:border-[#f59e0b] transition-all">
          <span className="material-symbols-outlined text-[#a08e7a] text-[20px] shrink-0">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="अध्याय या लेखक खोजें (उदा. अंबेडकर, विष के दांत)..."
            className="bg-transparent text-xs sm:text-sm text-[#d4e4fa] placeholder:text-[#a08e7a]/60 w-full focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#a08e7a] hover:text-[#d4e4fa] p-0.5"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
      </section>

      {/* 2. Book & Section Selector (4 Sections Grid) */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#f59e0b] text-[20px]">
              library_books
            </span>
            <h2 className="text-sm sm:text-base font-bold text-[#d4e4fa]">
              पुस्तक व खंड चयन (4 खंड)
            </h2>
          </div>
          <span className="text-[11px] text-[#d8c3ad]">मैट्रिक 100 अंक</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Card 1: Godhuli Gadya */}
          <button
            onClick={() => {
              setSelectedSection('gadya');
              setSelectedGenreFilter('all');
            }}
            className={`text-left rounded-2xl p-3.5 flex flex-col justify-between transition-all min-h-[110px] border active:scale-[0.98] ${
              selectedSection === 'gadya'
                ? 'bg-[#1c2b3c] border-[#f59e0b]/60 shadow-[0_0_16px_-2px_rgba(245,158,11,0.25)]'
                : 'bg-[#122131] border-[#273647] hover:bg-[#1c2b3c]'
            }`}
          >
            <div className="flex items-start justify-between w-full">
              <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/20 flex items-center justify-center text-[#ffc174]">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  menu_book
                </span>
              </div>
              {selectedSection === 'gadya' ? (
                <span className="material-symbols-outlined text-[#f59e0b] text-[18px]">check_circle</span>
              ) : (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#273647] text-[#d8c3ad] font-semibold">
                  12 पाठ
                </span>
              )}
            </div>
            <div className="mt-2">
              <h3 className={`text-xs sm:text-sm font-bold line-clamp-1 ${selectedSection === 'gadya' ? 'text-[#ffc174]' : 'text-[#d4e4fa]'}`}>
                गोधूलि: गद्य खंड
              </h3>
              <p className="text-[11px] text-[#d8c3ad] line-clamp-1 mt-0.5">
                12 अध्याय (कहानियाँ व निबंध)
              </p>
              <div className="mt-1 flex items-center gap-1">
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#f59e0b]/20 text-[#ffc174] font-bold">
                  सक्रिय • 12 पाठ
                </span>
              </div>
            </div>
          </button>

          {/* Card 2: Godhuli Kavya */}
          <button
            onClick={() => {
              setSelectedSection('kavya');
              setSelectedGenreFilter('all');
            }}
            className={`text-left rounded-2xl p-3.5 flex flex-col justify-between transition-all min-h-[110px] border active:scale-[0.98] ${
              selectedSection === 'kavya'
                ? 'bg-[#1c2b3c] border-[#7bd0ff]/60 shadow-[0_0_16px_-2px_rgba(123,208,255,0.25)]'
                : 'bg-[#122131] border-[#273647] hover:bg-[#1c2b3c]'
            }`}
          >
            <div className="flex items-start justify-between w-full">
              <div className="w-8 h-8 rounded-lg bg-[#7bd0ff]/20 flex items-center justify-center text-[#7bd0ff]">
                <span className="material-symbols-outlined text-[20px]">history_edu</span>
              </div>
              {selectedSection === 'kavya' ? (
                <span className="material-symbols-outlined text-[#7bd0ff] text-[18px]">check_circle</span>
              ) : (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#273647] text-[#d8c3ad] font-semibold">
                  12 पाठ
                </span>
              )}
            </div>
            <div className="mt-2">
              <h3 className={`text-xs sm:text-sm font-bold line-clamp-1 ${selectedSection === 'kavya' ? 'text-[#7bd0ff]' : 'text-[#d4e4fa]'}`}>
                गोधूलि: काव्य खंड
              </h3>
              <p className="text-[11px] text-[#d8c3ad] line-clamp-1 mt-0.5">
                12 अध्याय (कविताएं व पद)
              </p>
              <span className="text-[10px] text-[#7bd0ff] mt-1 inline-block">पद्य व दोहे</span>
            </div>
          </button>

          {/* Card 3: Varnika Bhag 2 */}
          <button
            onClick={() => {
              setSelectedSection('varnika');
              setSelectedGenreFilter('all');
            }}
            className={`text-left rounded-2xl p-3.5 flex flex-col justify-between transition-all min-h-[110px] border active:scale-[0.98] ${
              selectedSection === 'varnika'
                ? 'bg-[#1c2b3c] border-[#56e5a9]/60 shadow-[0_0_16px_-2px_rgba(86,229,169,0.25)]'
                : 'bg-[#122131] border-[#273647] hover:bg-[#1c2b3c]'
            }`}
          >
            <div className="flex items-start justify-between w-full">
              <div className="w-8 h-8 rounded-lg bg-[#56e5a9]/20 flex items-center justify-center text-[#56e5a9]">
                <span className="material-symbols-outlined text-[20px]">import_contacts</span>
              </div>
              {selectedSection === 'varnika' ? (
                <span className="material-symbols-outlined text-[#56e5a9] text-[18px]">check_circle</span>
              ) : (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#273647] text-[#d8c3ad] font-semibold">
                  5 पाठ
                </span>
              )}
            </div>
            <div className="mt-2">
              <h3 className={`text-xs sm:text-sm font-bold line-clamp-1 ${selectedSection === 'varnika' ? 'text-[#56e5a9]' : 'text-[#d4e4fa]'}`}>
                वर्णिका भाग 2
              </h3>
              <p className="text-[11px] text-[#d8c3ad] line-clamp-1 mt-0.5">
                5 कहानियां (पूरक पुस्तक)
              </p>
              <span className="text-[10px] text-[#56e5a9] mt-1 inline-block">दही वाली मंगम्मा आदि</span>
            </div>
          </button>

          {/* Card 4: Subjective Writing */}
          <button
            onClick={() => {
              setSelectedSection('writing');
              setSelectedGenreFilter('all');
            }}
            className={`text-left rounded-2xl p-3.5 flex flex-col justify-between transition-all min-h-[110px] border active:scale-[0.98] ${
              selectedSection === 'writing'
                ? 'bg-[#1c2b3c] border-[#ffb95f]/60 shadow-[0_0_16px_-2px_rgba(255,185,95,0.25)]'
                : 'bg-[#122131] border-[#273647] hover:bg-[#1c2b3c]'
            }`}
          >
            <div className="flex items-start justify-between w-full">
              <div className="w-8 h-8 rounded-lg bg-[#ffb95f]/20 flex items-center justify-center text-[#ffb95f]">
                <span className="material-symbols-outlined text-[20px]">edit_note</span>
              </div>
              {selectedSection === 'writing' ? (
                <span className="material-symbols-outlined text-[#ffb95f] text-[18px]">check_circle</span>
              ) : (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#273647] text-[#d8c3ad] font-semibold">
                  7 प्रारूप
                </span>
              )}
            </div>
            <div className="mt-2">
              <h3 className={`text-xs sm:text-sm font-bold line-clamp-1 ${selectedSection === 'writing' ? 'text-[#ffb95f]' : 'text-[#d4e4fa]'}`}>
                सब्जेक्टिव लेखन
              </h3>
              <p className="text-[11px] text-[#d8c3ad] line-clamp-1 mt-0.5">
                पत्र, निबंध, गद्यांश व संवाद
              </p>
              <span className="text-[10px] text-[#ffb95f] mt-1 inline-block">25 अंक पक्के</span>
            </div>
          </button>
        </div>
      </section>

      {/* 3. Chapter List Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[#d4e4fa]">
              {selectedSection === 'gadya'
                ? 'गद्य खंड अध्याय सूची'
                : selectedSection === 'kavya'
                ? 'काव्य खंड अध्याय सूची'
                : selectedSection === 'varnika'
                ? 'वर्णिका कहानियां सूची'
                : 'सब्जेक्टिव रचना सूची'}
            </h2>
            <p className="text-[11px] text-[#d8c3ad]">
              सम्पूर्ण परीक्षा उपयोगी नोट्स व प्रश्नोत्तर
            </p>
          </div>
          <span className="text-sm font-bold text-[#ffc174]">
            {filteredChapters.length} पाठ उपलब्ध
          </span>
        </div>

        {/* Filter Pills Scrollable (Only for Gadya) */}
        {selectedSection === 'gadya' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setSelectedGenreFilter('all')}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedGenreFilter === 'all'
                  ? 'bg-[#f59e0b] text-[#472a00]'
                  : 'bg-[#122131] text-[#d8c3ad] hover:text-[#d4e4fa]'
              }`}
            >
              सभी पाठ ({filteredChapters.length})
            </button>
            <button
              onClick={() => setSelectedGenreFilter('निबंध')}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedGenreFilter === 'निबंध'
                  ? 'bg-[#f59e0b] text-[#472a00]'
                  : 'bg-[#122131] text-[#d8c3ad] hover:text-[#d4e4fa]'
              }`}
            >
              निबंध
            </button>
            <button
              onClick={() => setSelectedGenreFilter('कहानी')}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedGenreFilter === 'कहानी'
                  ? 'bg-[#f59e0b] text-[#472a00]'
                  : 'bg-[#122131] text-[#d8c3ad] hover:text-[#d4e4fa]'
              }`}
            >
              कहानी
            </button>
            <button
              onClick={() => setSelectedGenreFilter('भाषण')}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedGenreFilter === 'भाषण'
                  ? 'bg-[#f59e0b] text-[#472a00]'
                  : 'bg-[#122131] text-[#d8c3ad] hover:text-[#d4e4fa]'
              }`}
            >
              भाषण व ललित
            </button>
          </div>
        )}

        {/* Chapters Stream */}
        <div className="flex flex-col gap-3">
          {filteredChapters.map((chapter) => (
            <article
              key={chapter.id}
              className="bg-[#122131] rounded-2xl p-4 border border-[#273647] hover:bg-[#1c2b3c] transition-all flex flex-col gap-3 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-[#f59e0b] text-[#472a00]">
                      पाठ {chapter.chapterNumber}
                    </span>
                    <span className="text-[11px] font-medium text-[#ffc174]">
                      {chapter.genre}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#d4e4fa] leading-snug mt-1">
                    {chapter.title}
                  </h3>
                  <p className="text-xs text-[#d8c3ad] truncate">
                    लेखक: {chapter.author}
                  </p>
                </div>

                <div className="shrink-0 flex flex-col items-end">
                  <span className="text-[11px] text-[#56e5a9] font-bold flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    VVI
                  </span>
                </div>
              </div>

              {/* Study Stats Bar */}
              <div className="flex items-center gap-3 text-[11px] text-[#d8c3ad] bg-[#010f1f]/80 rounded-xl px-3 py-2 border border-[#1c2b3c]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#ffc174]">
                    schedule
                  </span>
                  8 मिनट पठन
                </span>
                <span className="w-1 h-1 rounded-full bg-[#273647]" />
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#7bd0ff]">
                    quiz
                  </span>
                  {chapter.subjectiveCount} लघु व दीर्घ प्रश्नोत्तर
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => navigateTo('chapter-detail', { chapterId: chapter.id })}
                  className="flex-1 min-h-[40px] rounded-xl bg-[#1c2b3c] hover:bg-[#273647] text-[#d4e4fa] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#273647]"
                >
                  <span className="material-symbols-outlined text-[18px]">menu_book</span>
                  <span>सारांश पढ़ें</span>
                </button>
                <button
                  onClick={() => navigateTo('chapter-detail', { chapterId: chapter.id })}
                  className="flex-1 min-h-[40px] rounded-xl bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] text-xs font-bold flex items-center justify-center gap-1 shadow-[0_0_12px_rgba(245,158,11,0.25)] transition-all active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[18px]">assignment</span>
                  <span>प्रश्न-उत्तर ›</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Motivational Board Examination Tip Banner */}
      <section className="bg-[#1c2b3c] rounded-2xl p-4 flex items-start gap-3 border border-[#273647] shadow-sm">
        <div className="w-9 h-9 rounded-xl bg-[#f59e0b]/20 flex items-center justify-center text-[#ffc174] shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            lightbulb
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-bold text-[#ffc174] tracking-wide uppercase">
            बोर्ड परीक्षा सूत्र
          </span>
          <p className="text-xs text-[#d4e4fa] leading-relaxed">
            गद्य खंड से प्रत्येक वर्ष 10 अंक के विषयनिष्ठ (लघु उत्तरीय) प्रश्न पूछे जाते हैं। प्रत्येक अध्याय का मुख्य सारांश और लेखक का जीवन परिचय अवश्य याद करें।
          </p>
        </div>
      </section>
    </div>
  );
};
