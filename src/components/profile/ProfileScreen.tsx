/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BIHAR_DISTRICTS, CHAPTERS, OBJECTIVE_QUESTIONS_CH1 } from '../../data/mockData';

export const ProfileScreen: React.FC = () => {
  const {
    user,
    updateUser,
    preferences,
    toggleTheme,
    setFontSizeStep,
    toggleDeviceViewMode,
    testHistory,
    navigateTo,
    resetAllData,
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editSchool, setEditSchool] = useState(user.school);
  const [editDistrict, setEditDistrict] = useState(user.district);
  const [editPincode, setEditPincode] = useState(user.pincode);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: editName,
      school: editSchool,
      district: editDistrict,
      pincode: editPincode,
    });
    setIsEditing(false);
  };

  const bookmarkedQuestions = OBJECTIVE_QUESTIONS_CH1.filter((q) =>
    preferences.bookmarks.questions.includes(q.id)
  );

  return (
    <div className="flex flex-col w-full gap-5 pb-12 max-w-xl mx-auto">
      {/* 1. Student Identity Card */}
      <section className="bg-gradient-to-br from-[#122131] to-[#1c2b3c] rounded-2xl p-5 border border-[#273647] shadow-xl relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-16 h-16 rounded-2xl bg-[#f59e0b] text-[#472a00] font-bold text-2xl flex items-center justify-center shrink-0 shadow-lg shadow-[#f59e0b]/25">
              {user.name.charAt(0) || 'आ'}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#ffc174] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">school</span>
                  BSEB 2027 पंजीकृत
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#56e5a9]" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-[#d4e4fa] truncate">
                {user.name}
              </h2>
              <p className="text-xs text-[#d8c3ad] truncate mt-0.5">
                {user.school}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1.5 rounded-xl bg-[#1c2b3c] hover:bg-[#273647] text-[#ffc174] text-xs font-semibold flex items-center gap-1 border border-[#273647] transition-all shrink-0 active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            <span>बदलें</span>
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2.5 mt-4 pt-4 border-t border-[#273647]/70 text-xs text-[#d8c3ad]">
          <div className="bg-[#010f1f]/60 p-2.5 rounded-xl border border-[#1c2b3c]">
            <span className="text-[10px] text-[#a08e7a] block">जिला (District)</span>
            <span className="text-[#d4e4fa] font-semibold">{user.district}</span>
          </div>
          <div className="bg-[#010f1f]/60 p-2.5 rounded-xl border border-[#1c2b3c]">
            <span className="text-[10px] text-[#a08e7a] block">पिन कोड</span>
            <span className="text-[#d4e4fa] font-semibold">{user.pincode}</span>
          </div>
          <div className="bg-[#010f1f]/60 p-2.5 rounded-xl border border-[#1c2b3c]">
            <span className="text-[10px] text-[#a08e7a] block">मोबाइल नंबर</span>
            <span className="text-[#d4e4fa] font-semibold">+91 {user.mobile}</span>
          </div>
          <div className="bg-[#010f1f]/60 p-2.5 rounded-xl border border-[#1c2b3c]">
            <span className="text-[10px] text-[#a08e7a] block">टॉपर लक्ष्य</span>
            <span className="text-[#ffc174] font-bold">{user.targetScore}</span>
          </div>
        </div>
      </section>

      {/* 2. Bookmarked Items Section */}
      <section className="bg-[#122131] rounded-2xl p-4 sm:p-5 border border-[#273647] shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#1c2b3c]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f59e0b] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              bookmark
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#d4e4fa]">
              सहेजे गए प्रश्न व अध्याय ({preferences.bookmarks.questions.length + preferences.bookmarks.chapters.length})
            </h3>
          </div>
          <span className="text-xs text-[#56e5a9] font-semibold">त्वरित पुनरावलोकन</span>
        </div>

        {bookmarkedQuestions.length > 0 ? (
          <div className="flex flex-col gap-2">
            {bookmarkedQuestions.map((q) => (
              <div
                key={q.id}
                onClick={() => navigateTo('notes', { chapterId: q.chapterId })}
                className="p-3 rounded-xl bg-[#0d1c2d] hover:bg-[#1c2b3c] border border-[#1c2b3c] flex items-center justify-between gap-3 cursor-pointer transition-all"
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-bold text-[#ffc174]">
                    {q.pyqBadge} • प्रश्न {q.questionNumber}
                  </span>
                  <p className="text-xs text-[#d4e4fa] truncate mt-0.5">
                    {q.stem}
                  </p>
                </div>
                <span className="material-symbols-outlined text-[#d8c3ad] text-[18px] shrink-0">
                  chevron_right
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#d8c3ad] text-center py-2">
            कोई प्रश्न बुकमार्क नहीं किया गया है। प्रश्न पत्र में बुकमार्क आइकन दबाकर सहेजें।
          </p>
        )}
      </section>

      {/* 3. Test History List */}
      <section className="bg-[#122131] rounded-2xl p-4 sm:p-5 border border-[#273647] shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#1c2b3c]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7bd0ff] text-[20px]">
              history
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#d4e4fa]">
              परीक्षा इतिहास ({testHistory.length})
            </h3>
          </div>
          <button
            onClick={() => navigateTo('tests')}
            className="text-xs text-[#ffc174] font-semibold hover:underline"
          >
            नया टेस्ट दें ›
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {testHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => navigateTo('exam-result', { result: item })}
              className="p-3 rounded-xl bg-[#0d1c2d] hover:bg-[#1c2b3c] border border-[#1c2b3c] flex items-center justify-between gap-3 cursor-pointer transition-all"
            >
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#d4e4fa] truncate">
                  {item.title}
                </span>
                <span className="text-[10px] text-[#d8c3ad]">
                  {item.timestamp} • रैंक #{item.rank}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2.5 py-1 rounded-lg bg-[#56e5a9]/20 text-[#56e5a9] text-xs font-bold">
                  {item.score}/{item.totalMarks}
                </span>
                <span className="material-symbols-outlined text-[#d8c3ad] text-[18px]">
                  chevron_right
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. App Preferences & Handset Options */}
      <section className="bg-[#122131] rounded-2xl p-4 sm:p-5 border border-[#273647] shadow-sm flex flex-col gap-3">
        <h3 className="text-sm sm:text-base font-bold text-[#d4e4fa] pb-2 border-b border-[#1c2b3c] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ffc174]">tune</span>
          ऐप प्राथमिकताएं व दृश्य (Preferences)
        </h3>

        {/* Dark / Light Mode */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#0d1c2d] border border-[#1c2b3c]">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#ffc174] text-[20px]">
              {preferences.theme === 'dark' ? 'dark_mode' : 'light_mode'}
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#d4e4fa]">थीम मोड</span>
              <span className="text-[10px] text-[#d8c3ad]">
                {preferences.theme === 'dark' ? 'डार्क मोड सक्रिय (OLED फ्रेंडली)' : 'लाइट मोड'}
              </span>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 rounded-lg bg-[#1c2b3c] text-xs font-bold text-[#ffc174] border border-[#273647]"
          >
            {preferences.theme === 'dark' ? 'लाइट करें' : 'डार्क करें'}
          </button>
        </div>

        {/* Font Scaling */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#0d1c2d] border border-[#1c2b3c]">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#7bd0ff] text-[20px]">
              format_size
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#d4e4fa]">फॉन्ट आकार (Reading Scale)</span>
              <span className="text-[10px] text-[#d8c3ad]">
                वर्तमान: {preferences.fontSizeStep === 0 ? 'सामान्य (100%)' : preferences.fontSizeStep === 1 ? 'मध्यम (105%)' : 'बड़ा (112%)'}
              </span>
            </div>
          </div>
          <button
            onClick={() => setFontSizeStep(preferences.fontSizeStep + 1)}
            className="px-3 py-1.5 rounded-lg bg-[#1c2b3c] text-xs font-bold text-[#7bd0ff] border border-[#273647]"
          >
            आकार बदलें
          </button>
        </div>

        {/* Handset Viewport Simulator */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#0d1c2d] border border-[#1c2b3c]">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#56e5a9] text-[20px]">
              stay_current_portrait
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#d4e4fa]">मोबाइल हैंडसेट फ्रेम (390px)</span>
              <span className="text-[10px] text-[#d8c3ad]">
                {preferences.deviceViewMode === 'handset' ? 'फोन स्क्रीन फ्रेम चालू है' : 'पूर्ण स्क्रीन उत्तरदायी'}
              </span>
            </div>
          </div>
          <button
            onClick={toggleDeviceViewMode}
            className="px-3 py-1.5 rounded-lg bg-[#1c2b3c] text-xs font-bold text-[#56e5a9] border border-[#273647]"
          >
            {preferences.deviceViewMode === 'handset' ? 'फुलस्क्रीन' : 'फोन फ्रेम'}
          </button>
        </div>
      </section>

      {/* 5. Account Switch & Reset Actions */}
      <section className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigateTo('register')}
          className="flex-1 py-3 px-4 rounded-xl bg-[#1c2b3c] hover:bg-[#273647] text-[#d4e4fa] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border border-[#273647] transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          <span>नया खाता बनाएं / लॉगिन</span>
        </button>

        <button
          onClick={() => {
            if (confirm('क्या आप सचमुच सभी सहेजा गया डेटा रीसेट करना चाहते हैं?')) {
              resetAllData();
            }
          }}
          className="py-3 px-4 rounded-xl bg-[#ffb4ab]/15 hover:bg-[#ffb4ab]/25 text-[#ffb4ab] border border-[#ffb4ab]/30 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">restart_alt</span>
          <span>डेटा रीसेट</span>
        </button>
      </section>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-[#010f1f]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveProfile}
            className="bg-[#122131] border border-[#273647] rounded-3xl p-5 max-w-sm w-full shadow-2xl flex flex-col gap-3.5"
          >
            <div className="flex items-center justify-between border-b border-[#1c2b3c] pb-2.5">
              <h3 className="text-base font-bold text-[#d4e4fa]">प्रोफ़ाइल विवरण संपादित करें</h3>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-8 h-8 rounded-full bg-[#1c2b3c] text-[#d4e4fa] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#d8c3ad]">विद्यार्थी का नाम</label>
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#010f1f] border border-[#273647] text-[#d4e4fa] text-xs focus:outline-none focus:border-[#f59e0b]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#d8c3ad]">विद्यालय का नाम</label>
              <input
                type="text"
                required
                value={editSchool}
                onChange={(e) => setEditSchool(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#010f1f] border border-[#273647] text-[#d4e4fa] text-xs focus:outline-none focus:border-[#f59e0b]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#d8c3ad]">जिला</label>
              <select
                value={editDistrict}
                onChange={(e) => setEditDistrict(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#010f1f] border border-[#273647] text-[#d4e4fa] text-xs focus:outline-none focus:border-[#f59e0b]"
              >
                {BIHAR_DISTRICTS.map((d) => (
                  <option key={d} value={d} className="bg-[#051424] text-[#d4e4fa]">
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#d8c3ad]">पिन कोड</label>
              <input
                type="text"
                maxLength={6}
                value={editPincode}
                onChange={(e) => setEditPincode(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#010f1f] border border-[#273647] text-[#d4e4fa] text-xs focus:outline-none focus:border-[#f59e0b]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1c2b3c]">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-[#1c2b3c] text-[#d4e4fa] text-xs font-semibold"
              >
                रद्द करें
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#f59e0b] text-[#472a00] text-xs font-bold shadow-md shadow-[#f59e0b]/25"
              >
                सहेजें
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
