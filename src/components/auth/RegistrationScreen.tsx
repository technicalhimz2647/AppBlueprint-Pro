/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BIHAR_DISTRICTS } from '../../data/mockData';
import { User } from '../../types';

export const RegistrationScreen: React.FC = () => {
  const { user, registerUser, navigateTo, showToast } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [showPassword, setShowPassword] = useState(false);

  // Registration Form State
  const [fullName, setFullName] = useState(user.name || '');
  const [dob, setDob] = useState(user.dob || '2010-08-15');
  const [schoolName, setSchoolName] = useState(user.school || 'राजकीय उच्च विद्यालय, पटना');
  const [district, setDistrict] = useState(user.district || 'पटना');
  const [mobileNo, setMobileNo] = useState(user.mobile || '9876543210');
  const [pincode, setPincode] = useState(user.pincode || '800001');

  // Login Form State
  const [loginMobile, setLoginMobile] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !mobileNo.trim() || mobileNo.length < 10) {
      showToast('कृपया सभी अनिवार्य फील्ड सही भरें');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newUser: User = {
        id: 'bseb_' + Date.now(),
        name: fullName.trim(),
        dob,
        school: schoolName.trim(),
        district,
        mobile: mobileNo,
        pincode,
        targetScore: '450+ (स्टेट टॉपर)',
        avatarUrl: user.avatarUrl,
      };
      registerUser(newUser);
      setIsSubmitting(false);
    }, 600);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginMobile || loginMobile.length < 10) {
      showToast('कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      registerUser({
        ...user,
        mobile: loginMobile,
      });
      setIsSubmitting(false);
    }, 600);
  };

  const handleGoogleAuth = () => {
    showToast('Google प्रमाणीकरण सफल रहा!');
    navigateTo('home');
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto py-2 pb-12">
      {/* Top Branding & Badge */}
      <div className="flex flex-col items-center text-center space-y-2 pt-2 pb-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-16 h-16 rounded-full bg-[#f59e0b]/20 blur-md pointer-events-none" />
          <div className="relative w-14 h-14 rounded-2xl bg-[#122131] border border-[#f59e0b]/40 flex items-center justify-center text-[#ffc174] shadow-md shadow-[#f59e0b]/20">
            <span className="material-symbols-outlined text-[32px]">school</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c2b3c] border border-[#ffc174]/30">
          <span className="text-sm">🎓</span>
          <span className="text-xs font-semibold tracking-wide text-[#ffc174]">
            बिहार बोर्ड मैट्रिक परीक्षा 2027
          </span>
        </div>

        <div className="space-y-0.5 px-2">
          <h1 className="text-xl sm:text-2xl font-bold text-[#d4e4fa]">
            {mode === 'register' ? 'विद्यार्थी पंजीकरण फॉर्म' : 'विद्यार्थी लॉगिन'}
          </h1>
          <p className="text-xs text-[#d8c3ad] max-w-xs mx-auto">
            {mode === 'register'
              ? 'कृपया अपनी सही जानकारी भरें ताकि आपका सटीक रैंक और स्टडी प्रोफाइल तैयार हो सके'
              : 'मोबाइल नंबर और पासवर्ड से प्रवेश करें'}
          </p>
        </div>

        {/* Verified Google Account Pill */}
        <div className="w-full max-w-sm mt-1">
          <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#0d1c2d] border border-[#273647]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6 h-6 rounded-full bg-[#273647] flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z" fill="#4285F4" />
                  <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z" fill="#34A853" />
                  <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.98 0 12s.45 3.83 1.25 5.42l4.03-3.15z" fill="#FBBC05" />
                  <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335" />
                </svg>
              </div>
              <div className="flex items-center gap-1.5 truncate text-xs text-[#d4e4fa]">
                <span className="truncate">student.bihar27@gmail.com</span>
                <span className="material-symbols-outlined text-[#56e5a9] text-sm shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>
            </div>
            <button
              onClick={() => showToast('Google खाता प्रमाणित है')}
              type="button"
              className="ml-2 text-xs text-[#ffc174] font-semibold hover:underline shrink-0"
            >
              सत्यापित
            </button>
          </div>
        </div>
      </div>

      {/* Main Form Container Card */}
      <section className="bg-[#122131] rounded-2xl p-4 sm:p-5 shadow-xl border border-[#273647] flex flex-col gap-4">
        {/* Segmented Switcher: Login / Register */}
        <div className="grid grid-cols-2 p-1 bg-[#010f1f] rounded-xl border border-[#1c2b3c]">
          <button
            onClick={() => setMode('login')}
            type="button"
            className={`w-full py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mode === 'login'
                ? 'bg-[#f59e0b] text-[#472a00] shadow-md shadow-[#f59e0b]/30'
                : 'text-[#d8c3ad] hover:text-[#d4e4fa]'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">login</span>
            <span>लॉगिन करें</span>
          </button>
          <button
            onClick={() => setMode('register')}
            type="button"
            className={`w-full py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mode === 'register'
                ? 'bg-[#f59e0b] text-[#472a00] shadow-md shadow-[#f59e0b]/30'
                : 'text-[#d8c3ad] hover:text-[#d4e4fa]'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">person_add</span>
            <span>नया खाता बनाएं</span>
          </button>
        </div>

        {mode === 'register' ? (
          /* REGISTRATION FORM (Matching Image_6_5b560ce7.html) */
          <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3.5">
            {/* Progress Micro-Tracker */}
            <div className="flex items-center justify-between pb-2 border-b border-[#273647]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#ffc174] text-base">fact_check</span>
                <span className="text-xs text-[#d4e4fa] font-semibold">अनिवार्य विवरण</span>
              </div>
              <span className="text-[10px] text-[#d8c3ad] bg-[#1c2b3c] px-2 py-0.5 rounded-full">
                सभी 6 फील्ड जरूरी (*)
              </span>
            </div>

            {/* Field 1: Full Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#d4e4fa] flex items-center justify-between">
                <span>1. विद्यार्थी का पूरा नाम <span className="text-[#f59e0b] font-bold">*</span></span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#d8c3ad] text-lg pointer-events-none">
                  person
                </span>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="उदा. राहुल कुमार — यही नाम होम स्क्रीन पर दिखेगा"
                  className="w-full h-11 pl-10 pr-3 rounded-xl bg-[#010f1f] border border-[#273647] text-[#d4e4fa] placeholder:text-[#a08e7a]/50 text-xs sm:text-sm focus:outline-none focus:border-[#f59e0b] transition-colors"
                />
              </div>
            </div>

            {/* Field 2: Date of Birth */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#d4e4fa] flex items-center justify-between">
                <span>2. जन्म तिथि (DOB) <span className="text-[#f59e0b] font-bold">*</span></span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#d8c3ad] text-lg pointer-events-none">
                  calendar_month
                </span>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 rounded-xl bg-[#010f1f] border border-[#273647] text-[#d4e4fa] text-xs sm:text-sm focus:outline-none focus:border-[#f59e0b] transition-colors"
                />
              </div>
              <span className="text-[10px] text-[#56e5a9] flex items-center gap-1 pl-1">
                <span className="material-symbols-outlined text-xs">verified_user</span>
                पासवर्ड रिकवरी व रोल कोड मिलान हेतु आवश्यक
              </span>
            </div>

            {/* Field 3: School Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#d4e4fa] flex items-center justify-between">
                <span>3. विद्यालय का नाम <span className="text-[#f59e0b] font-bold">*</span></span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#d8c3ad] text-lg pointer-events-none">
                  school
                </span>
                <input
                  type="text"
                  required
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="अपने स्कूल का नाम लिखें (उदा. उच्च विद्यालय...)"
                  className="w-full h-11 pl-10 pr-3 rounded-xl bg-[#010f1f] border border-[#273647] text-[#d4e4fa] placeholder:text-[#a08e7a]/50 text-xs sm:text-sm focus:outline-none focus:border-[#f59e0b] transition-colors"
                />
              </div>
            </div>

            {/* Field 4: District */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#d4e4fa] flex items-center justify-between">
                <span>4. जिला (District) <span className="text-[#f59e0b] font-bold">*</span></span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#d8c3ad] text-lg pointer-events-none">
                  location_on
                </span>
                <select
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full h-11 pl-10 pr-10 rounded-xl bg-[#010f1f] border border-[#273647] text-[#d4e4fa] text-xs sm:text-sm focus:outline-none focus:border-[#f59e0b] transition-colors appearance-none"
                >
                  {BIHAR_DISTRICTS.map((dist) => (
                    <option key={dist} value={dist} className="bg-[#051424] text-[#d4e4fa]">
                      {dist}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 text-[#d8c3ad] text-lg pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            {/* Field 5: Mobile Number */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#d4e4fa] flex items-center justify-between">
                <span>5. मोबाइल नंबर (10 अंक) <span className="text-[#f59e0b] font-bold">*</span></span>
              </label>
              <div className="flex items-center gap-2">
                <div className="h-11 px-3 rounded-xl bg-[#1c2b3c] border border-[#273647] flex items-center gap-1 shrink-0">
                  <span className="text-xs">🇮🇳</span>
                  <span className="text-xs font-bold text-[#ffc174]">+91</span>
                </div>
                <div className="relative flex-1 flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[#d8c3ad] text-lg pointer-events-none">
                    call
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                    placeholder="10 अंकों का मोबाइल नंबर"
                    className="w-full h-11 pl-10 pr-3 rounded-xl bg-[#010f1f] border border-[#273647] text-[#d4e4fa] placeholder:text-[#a08e7a]/50 text-xs sm:text-sm focus:outline-none focus:border-[#f59e0b] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Field 6: Pin Code */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#d4e4fa] flex items-center justify-between">
                <span>6. पिन कोड (6 अंक) <span className="text-[#f59e0b] font-bold">*</span></span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#d8c3ad] text-lg pointer-events-none">
                  pin
                </span>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                  placeholder="उदा. 800001 (स्थानीय पोस्टल कोड)"
                  className="w-full h-11 pl-10 pr-3 rounded-xl bg-[#010f1f] border border-[#273647] text-[#d4e4fa] placeholder:text-[#a08e7a]/50 text-xs sm:text-sm focus:outline-none focus:border-[#f59e0b] transition-colors"
                />
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 mt-2 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#ffb95f] hover:opacity-95 text-[#472a00] font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#f59e0b]/25 active:scale-[0.98] transition-all"
            >
              <span>{isSubmitting ? 'प्रोफ़ाइल तैयार हो रही है...' : 'पंजीकरण पूरा करें और पढ़ाई शुरू करें'}</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </form>
        ) : (
          /* LOGIN FORM (Matching Image_4_3cb483a3.html) */
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3.5">
            {/* Mobile Number Field */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[#d4e4fa] flex items-center justify-between">
                <span>मोबाइल नंबर</span>
                <span className="text-[10px] text-[#ffc174] font-semibold">BSEB पंजीकृत</span>
              </label>
              <div className="flex items-center rounded-xl bg-[#010f1f] border border-[#273647] focus-within:border-[#f59e0b] transition-all">
                <div className="flex items-center gap-1 px-3 py-2.5 bg-[#1c2b3c] rounded-l-xl text-[#ffc174] font-bold text-xs">
                  <span>🇮🇳 +91</span>
                </div>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={loginMobile}
                  onChange={(e) => setLoginMobile(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                  placeholder="10 अंकों का मोबाइल नंबर"
                  className="w-full bg-transparent px-3 py-2.5 text-[#d4e4fa] placeholder:text-[#a08e7a]/50 text-xs sm:text-sm focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-1.5 px-0.5 mt-0.5">
                <span className="material-symbols-outlined text-[#56e5a9] text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                <span className="text-[11px] text-[#56e5a9]">बिना महँगे OTP के त्वरित लॉगिन</span>
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-[#d4e4fa]">पासवर्ड</label>
                <button
                  type="button"
                  onClick={() => showToast('पासवर्ड रीसेट लिंक आपके नंबर पर भेजा जाएगा')}
                  className="text-[11px] text-[#ffc174] font-semibold hover:underline"
                >
                  पासवर्ड भूल गए?
                </button>
              </div>
              <div className="flex items-center rounded-xl bg-[#010f1f] border border-[#273647] px-3 py-1 focus-within:border-[#f59e0b] transition-all">
                <span className="material-symbols-outlined text-[#d8c3ad] text-[18px] mr-2">lock</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="अपना पासवर्ड दर्ज करें"
                  className="w-full bg-transparent py-2 text-[#d4e4fa] placeholder:text-[#a08e7a]/50 text-xs sm:text-sm focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#d8c3ad] hover:text-[#d4e4fa] p-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Login CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-1.5 py-3 rounded-xl bg-[#f59e0b] hover:bg-[#ffc174] text-[#472a00] font-bold text-sm sm:text-base shadow-lg shadow-[#f59e0b]/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? 'लॉगिन हो रहा है...' : 'लॉगिन करें'}</span>
              <span className="material-symbols-outlined text-[20px] font-bold">arrow_forward</span>
            </button>
          </form>
        )}

        {/* Social Sign-in Divider */}
        <div className="flex items-center gap-3 my-0.5">
          <div className="flex-1 h-px bg-[#273647]" />
          <span className="text-[10px] text-[#d8c3ad] uppercase tracking-widest font-semibold">अथवा (OR)</span>
          <div className="flex-1 h-px bg-[#273647]" />
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleAuth}
          type="button"
          className="w-full py-2.5 px-4 rounded-xl bg-[#1c2b3c] hover:bg-[#273647] text-[#d4e4fa] text-xs sm:text-sm font-semibold flex items-center justify-center gap-3 active:scale-[0.99] transition-all border border-[#273647]"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
          </svg>
          <span>Google के साथ जारी रखें</span>
        </button>
      </section>

      {/* Micro Footer Assurance */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-[#d8c3ad]/80 text-center">
        <span className="material-symbols-outlined text-[15px] text-[#56e5a9]">lock</span>
        <span className="text-[11px]">256-bit एन्क्रिप्टेड • BSEB 2027 मान्यता प्राप्त</span>
      </div>

      {/* Motivational Student Micro-Quote */}
      <div className="mt-3 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#0d1c2d]/70 border border-[#1c2b3c] text-center">
        <span className="material-symbols-outlined text-[#ffc174] text-sm">military_tech</span>
        <span className="text-[11px] text-[#d8c3ad]">
          "कठिन परिश्रम ही सफलता की एकमात्र कुंजी है" — मैट्रिक 2027 टॉपर बैच
        </span>
      </div>
    </div>
  );
};
