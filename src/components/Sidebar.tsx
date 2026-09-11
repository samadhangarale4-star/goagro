import React from 'react';
import { 
  LayoutDashboard, 
  Truck, 
  Scale, 
  Handshake, 
  ReceiptText, 
  TrendingUp, 
  Tractor, 
  Store, 
  ShoppingBasket,
  Radio,
  X
} from 'lucide-react';
import { Language, StakeholderRole } from '../types';
import { translations } from '../i18n/translations';

interface SidebarProps {
  currentRole: StakeholderRole;
  onSelectRole: (role: StakeholderRole) => void;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  onSelectRole,
  isOpen,
  onClose,
  lang,
}) => {
  const t = translations[lang];

  const dispatchOpsNav = [
    { id: 'admin' as StakeholderRole, label: t.opsDashboardTitle, icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'transporter' as StakeholderRole, label: t.roleTransporter, icon: <Truck className="w-4 h-4" /> },
    { id: 'admin' as StakeholderRole, label: "Weigh & Grade QC", icon: <Scale className="w-4 h-4" /> },
    { id: 'agent' as StakeholderRole, label: "Demand & Matching", icon: <Handshake className="w-4 h-4" /> },
    { id: 'pricing' as StakeholderRole, label: t.rolePricing, icon: <ReceiptText className="w-4 h-4" /> },
    { id: 'market_compare' as StakeholderRole, label: t.roleMarketCompare, icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const stakeholderNav = [
    { id: 'farmer' as StakeholderRole, label: t.roleFarmer, icon: <Tractor className="w-4 h-4" /> },
    { id: 'transporter' as StakeholderRole, label: t.roleTransporter, icon: <Truck className="w-4 h-4" /> },
    { id: 'agent' as StakeholderRole, label: t.roleAgent, icon: <Store className="w-4 h-4" /> },
    { id: 'vendor' as StakeholderRole, label: t.roleBuyer, icon: <ShoppingBasket className="w-4 h-4" /> },
  ];

  const handleNavClick = (role: StakeholderRole) => {
    onSelectRole(role);
    onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-2xs lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-24 md:top-28 bottom-0 w-64 bg-white border-r border-slate-200 z-40 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto pt-4">
          {/* Mobile Close Button */}
          <div className="lg:hidden px-4 pb-2 flex items-center justify-between border-b border-slate-100">
            <span className="text-xs font-bold text-slate-700">Navigation Menu</span>
            <button onClick={onClose} className="p-1 rounded-md text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section 1: Dispatch Operations */}
          <div className="px-4 mb-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              {t.dispatchOps}
            </span>
          </div>
          <nav className="px-2 space-y-1 mb-6">
            {dispatchOpsNav.map((item, idx) => {
              const isActive = currentRole === item.id;
              return (
                <button
                  key={`${item.id}-${idx}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-[#14532d] text-white font-semibold shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className={isActive ? 'text-[#92f5a4]' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Section 2: Stakeholder Views */}
          <div className="px-4 mb-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              {t.stakeholderViews}
            </span>
          </div>
          <nav className="px-2 space-y-1">
            {stakeholderNav.map((item) => {
              const isActive = currentRole === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-[#14532d] text-white font-semibold shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className={isActive ? 'text-[#92f5a4]' : 'text-slate-500'}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info: Satara APMC Aggregator Node */}
        <div className="p-4 bg-[#f2f3ff] border-t border-slate-200">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-slate-500 font-semibold">
              Mandi Gate #4
            </span>
            <span className="flex items-center gap-1 font-mono text-[11px] font-bold text-[#006d30]">
              <Radio className="w-3 h-3 animate-ping text-emerald-600" />
              ONLINE
            </span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            {t.sataraNode}
          </div>
        </div>
      </aside>
    </>
  );
};
