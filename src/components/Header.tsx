import React, { useState, useEffect } from 'react';
import { 
  Tractor, 
  Truck, 
  Building2, 
  Store, 
  ShoppingBag, 
  ReceiptText, 
  TrendingUp, 
  Bell, 
  User, 
  Volume2, 
  Menu, 
  X,
  Globe,
  Radio,
  ArrowRight
} from 'lucide-react';
import { Language, StakeholderRole } from '../types';
import { translations } from '../i18n/translations';

interface HeaderProps {
  currentRole: StakeholderRole;
  onSelectRole: (role: StakeholderRole) => void;
  lang: Language;
  onSelectLang: (lang: Language) => void;
  onOpenAudioGuide: () => void;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onSelectRole,
  lang,
  onSelectLang,
  onOpenAudioGuide,
  onToggleSidebar,
}) => {
  const t = translations[lang];
  const [time, setTime] = useState('14:28:42');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour12: false }));
    };
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const roles: { id: StakeholderRole; label: string; icon: React.ReactNode }[] = [
    { id: 'admin', label: t.roleOpsAdmin, icon: <Building2 className="w-4 h-4" /> },
    { id: 'farmer', label: t.roleFarmer, icon: <Tractor className="w-4 h-4" /> },
    { id: 'transporter', label: t.roleTransporter, icon: <Truck className="w-4 h-4" /> },
    { id: 'agent', label: t.roleAgent, icon: <Store className="w-4 h-4" /> },
    { id: 'vendor', label: t.roleBuyer, icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'pricing', label: t.rolePricing, icon: <ReceiptText className="w-4 h-4" /> },
    { id: 'market_compare', label: t.roleMarketCompare, icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const getProfileName = () => {
    switch (currentRole) {
      case 'farmer':
        return { name: "Ramesh Patil", sub: "Koregaon Node" };
      case 'transporter':
        return { name: "Suresh Shinde", sub: "TR-102 Eicher" };
      case 'agent':
        return { name: "Dilip Deshmukh", sub: "Vashi APMC #AG-77" };
      case 'vendor':
        return { name: "Apex Groceries", sub: "Vashi Yard #12" };
      case 'pricing':
      case 'market_compare':
      case 'admin':
      default:
        return { name: "HQ Control", sub: "Vashi Terminal" };
    }
  };

  const profile = getProfileName();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
      {/* Top Navbar */}
      <div className="h-16 md:h-20 w-full px-4 lg:px-6 flex items-center justify-between gap-3">
        {/* Left: Mobile Toggle + Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            title="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div 
            onClick={() => onSelectRole('farmer')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#003b1b] flex items-center justify-center text-[#92f5a4] shadow-xs group-hover:scale-105 transition-transform">
              <Tractor className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base md:text-lg text-[#003b1b] uppercase tracking-tight leading-none">
                {t.appName}
              </span>
              <span className="text-[11px] font-medium text-slate-500 hidden sm:inline leading-tight">
                {t.appSub}
              </span>
            </div>
          </div>

          {/* Active Corridor pill */}
          <div className="hidden xl:flex items-center gap-1.5 bg-[#eaedff] px-3 py-1 rounded-full border border-[#dae2fd] text-[11px] font-mono font-medium text-slate-800">
            <Radio className="w-3.5 h-3.5 text-[#006d30] animate-pulse" />
            <span>{t.corridorTag}</span>
          </div>
        </div>

        {/* Center: Role Switcher Carousel / Tabs */}
        <div className="hidden md:flex items-center bg-[#eaedff] p-1 rounded-xl border border-slate-200 max-w-2xl overflow-x-auto">
          {roles.map((r) => {
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => onSelectRole(r.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#14532d] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {r.icon}
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Audio Guide, Language Toggle, Clock & User */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Audio Guide Quick Access */}
          <button
            onClick={onOpenAudioGuide}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 text-[#003b1b] border border-emerald-200 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors shadow-2xs"
            title="Audio Guide in Marathi/Hindi/English"
          >
            <Volume2 className="w-4 h-4 text-[#006d30]" />
            <span className="hidden md:inline">{t.audioGuide}</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 shadow-2xs">
            <button
              onClick={() => onSelectLang('en')}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                lang === 'en' ? 'bg-[#003b1b] text-white font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onSelectLang('mr')}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                lang === 'mr' ? 'bg-[#003b1b] text-white font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => onSelectLang('hi')}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                lang === 'hi' ? 'bg-[#003b1b] text-white font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* IST Clock */}
          <div className="hidden 2xl:flex flex-col text-right">
            <span className="text-[10px] font-mono text-slate-400 uppercase leading-none">SYSTEM IST</span>
            <span className="text-xs font-mono font-bold text-slate-700 leading-tight">{time}</span>
          </div>

          {/* User profile */}
          <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-[#003b1b] text-white flex items-center justify-center shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 leading-tight">{profile.name}</span>
              <span className="text-[10px] font-mono text-[#006d30] font-semibold leading-tight">{profile.sub}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-bar Live Ticker */}
      <div className="h-8 bg-[#f2f3ff] px-4 lg:px-6 flex items-center justify-between border-t border-slate-200/60 text-xs overflow-hidden">
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-600 overflow-x-auto whitespace-nowrap py-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
          <span className="font-bold text-[#003b1b] shrink-0">TICKER:</span>
          <span>{t.liveTicker}</span>
        </div>
        <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-slate-500 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#006d30]"></span>
          <span>{t.apmcStream}</span>
        </div>
      </div>

      {/* Mobile Role Switcher Scroll Bar */}
      <div className="md:hidden flex items-center bg-[#eaedff] px-2 py-1.5 border-t border-slate-200 overflow-x-auto gap-1">
        {roles.map((r) => {
          const isActive = currentRole === r.id;
          return (
            <button
              key={r.id}
              onClick={() => onSelectRole(r.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition-all ${
                isActive ? 'bg-[#14532d] text-white' : 'text-slate-600 bg-white/50'
              }`}
            >
              {r.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
