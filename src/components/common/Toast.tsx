/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../../context/AppContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 flex items-center gap-2 px-4 py-2.5 bg-[#273647] text-[#ffc174] text-xs sm:text-sm font-semibold rounded-full shadow-2xl border border-[#ffc174]/30 animate-in fade-in slide-in-from-top-4">
      <span className="material-symbols-outlined text-[18px] text-[#56e5a9]">
        verified
      </span>
      <span>{toastMessage}</span>
    </div>
  );
};
