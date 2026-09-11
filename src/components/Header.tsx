import React from 'react';
import { 
  Tractor, 
  Truck, 
  ShoppingBag, 
  Volume2, 
  Coins,
  ShieldCheck,
  Check,
  LogOut,
  UserCheck
} from 'lucide-react';
import { AppUser, Language, StakeholderRole } from '../types';
import { translations } from '../i18n/translations';

interface HeaderProps {
  currentRole: StakeholderRole;
  onSelectRole: (role: StakeholderRole) => void;
  currentUser: AppUser | null;
  onLogout: () => void;
  lang: Language;
  onSelectLang: (lang: Language) => void;
  onOpenAudioGuide: () => void;
  onOpenPriceModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onSelectRole,
  currentUser,
  onLogout,
  lang,
  onSelectLang,
  onOpenAudioGuide,
  onOpenPriceModal,
}) => {
  const roleNames = {
    en: {
      farmer: "🌾 Farmer",
      transporter: "🚚 Transporter",
      buyer: "🛒 Buyer",
      priceInfo: "💰 Price Breakdown",
      audioHelp: "Audio Help",
      subline: "Satara to Mumbai Direct Onion Corridor",
      switchUser: "Switch / Logout",
    },
    mr: {
      farmer: "🌾 शेतकरी",
      transporter: "🚚 वाहतूकदार",
      buyer: "🛒 खरेदीदार",
      priceInfo: "💰 दर माहिती",
      audioHelp: "ऑडिओ मदत",
      subline: "सातारा ते मुंबई थेट कांदा कॉरिडॉर",
      switchUser: "खाते बदला / बाहेर पडा",
    },
    hi: {
      farmer: "🌾 किसान",
      transporter: "🚚 ट्रांसपोर्टर",
      buyer: "🛒 खरीदार",
      priceInfo: "💰 मूल्य जानकारी",
      audioHelp: "ऑडियो मदद",
      subline: "सतारा से मुंबई सीधा प्याज कॉरिडोर",
      switchUser: "खाता बदलें / लॉगआउट",
    },
  }[lang];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-xs">
      {/* Top Single Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div 
            onClick={() => onSelectRole('farmer')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#003b1b] flex items-center justify-center text-[#92f5a4] shadow-xs group-hover:scale-105 transition-transform">
              <Tractor className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl text-[#003b1b] tracking-tight leading-none">
                  Go Agro
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                  DIRECT
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block leading-tight mt-0.5">
                {roleNames.subline}
              </p>
            </div>
          </div>
        </div>

        {/* Center: 3 Primary Stakeholders (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80">
          <button
            onClick={() => onSelectRole('farmer')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              currentRole === 'farmer'
                ? 'bg-[#003b1b] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>🌾</span>
            <span>{lang === 'en' ? 'Farmer' : lang === 'mr' ? 'शेतकरी' : 'किसान'}</span>
          </button>

          <button
            onClick={() => onSelectRole('transporter')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              currentRole === 'transporter'
                ? 'bg-[#003b1b] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>🚚</span>
            <span>{lang === 'en' ? 'Transporter' : lang === 'mr' ? 'वाहतूकदार' : 'ट्रांसपोर्टर'}</span>
          </button>

          <button
            onClick={() => onSelectRole('vendor')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              currentRole === 'vendor'
                ? 'bg-[#003b1b] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>🛒</span>
            <span>{lang === 'en' ? 'Buyer' : lang === 'mr' ? 'खरेदीदार' : 'खरीदार'}</span>
          </button>
        </nav>

        {/* Right Tools: Price Breakdown, Audio Help, Language Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Price Breakdown Trigger */}
          <button
            onClick={onOpenPriceModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors shadow-2xs"
            title="View ₹30/kg transparent money distribution"
          >
            <Coins className="w-4 h-4 text-emerald-700" />
            <span className="hidden lg:inline">{roleNames.priceInfo}</span>
            <span className="lg:hidden text-xs">₹30</span>
          </button>

          {/* Audio Assistance */}
          <button
            onClick={onOpenAudioGuide}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200 rounded-xl text-xs font-semibold transition-colors"
            title="Listen to audio instructions in Marathi, Hindi, English"
          >
            <Volume2 className="w-4 h-4 text-emerald-700" />
            <span className="hidden xl:inline">{roleNames.audioHelp}</span>
          </button>

          {/* Language Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => onSelectLang('en')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                lang === 'en' ? 'bg-[#003b1b] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onSelectLang('mr')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                lang === 'mr' ? 'bg-[#003b1b] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => onSelectLang('hi')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                lang === 'hi' ? 'bg-[#003b1b] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* User Account / Logout */}
          {currentUser && (
            <div className="flex items-center gap-1.5 pl-1 border-l border-slate-200">
              <div 
                className="hidden xl:flex items-center gap-2 bg-emerald-50/80 border border-emerald-200/80 py-1 px-2.5 rounded-xl text-xs"
                title={`${currentUser.name} (${currentUser.identifier})`}
              >
                <span className="text-sm">{currentUser.avatarEmoji}</span>
                <div className="leading-tight">
                  <span className="font-bold text-slate-900 block truncate max-w-[110px]">{currentUser.name.split(' ')[0]}</span>
                  <span className="text-[10px] text-emerald-800 font-semibold">{currentUser.role === 'farmer' ? 'Farmer' : currentUser.role === 'transporter' ? 'Transporter' : 'Buyer'}</span>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 border border-slate-200 hover:border-red-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                title={roleNames.switchUser}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{roleNames.switchUser}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Role Switcher Tabs */}
      <div className="md:hidden flex border-t border-slate-200 bg-slate-50 p-1.5 gap-1.5 justify-center">
        <button
          onClick={() => onSelectRole('farmer')}
          className={`flex-1 py-2 px-1 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            currentRole === 'farmer'
              ? 'bg-[#003b1b] text-white shadow-xs'
              : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          <span>🌾</span>
          <span>{lang === 'en' ? 'Farmer' : lang === 'mr' ? 'शेतकरी' : 'किसान'}</span>
        </button>

        <button
          onClick={() => onSelectRole('transporter')}
          className={`flex-1 py-2 px-1 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            currentRole === 'transporter'
              ? 'bg-[#003b1b] text-white shadow-xs'
              : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          <span>🚚</span>
          <span>{lang === 'en' ? 'Transporter' : lang === 'mr' ? 'वाहतूकदार' : 'ट्रांसपोर्टर'}</span>
        </button>

        <button
          onClick={() => onSelectRole('vendor')}
          className={`flex-1 py-2 px-1 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            currentRole === 'vendor'
              ? 'bg-[#003b1b] text-white shadow-xs'
              : 'text-slate-700 bg-white border border-slate-200'
          }`}
        >
          <span>🛒</span>
          <span>{lang === 'en' ? 'Buyer' : lang === 'mr' ? 'खरेदीदार' : 'खरीदार'}</span>
        </button>

        {currentUser && (
          <button
            onClick={onLogout}
            className="py-2 px-2 text-center rounded-xl text-xs font-bold bg-slate-200/80 text-slate-700 hover:text-red-700 flex items-center justify-center shrink-0"
            title={roleNames.switchUser}
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </header>
  );
};
