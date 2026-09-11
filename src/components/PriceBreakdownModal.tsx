import React from 'react';
import { X, CheckCircle2, ShieldCheck, UserCheck, Truck, Building2, Store, ShoppingBag, ArrowRight } from 'lucide-react';
import { Language, ShipmentItem } from '../types';

interface PriceBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipment: ShipmentItem;
  lang: Language;
}

export const PriceBreakdownModal: React.FC<PriceBreakdownModalProps> = ({
  isOpen,
  onClose,
  shipment,
  lang,
}) => {
  if (!isOpen) return null;

  const labels = {
    en: {
      title: "Transparent Price Breakdown",
      sub: "Zero hidden cuts: Where every rupee of the ₹30.00/kg goes",
      buyerPays: "Buyer Wholesale Purchase Price",
      perKg: "₹30.00 / kg",
      lotTotal: "₹30,000 total for 1,000 kg",
      farmerTitle: "Farmer Net Take-Home (90.0%)",
      farmerDesc: "₹27.00 / kg guaranteed at farm gate. Zero transport or mandi cuts.",
      advance: "50% Advance via UPI:",
      final: "50% Final Settlement in Bank:",
      transporterTitle: "Transporter Freight (5.8%)",
      transporterDesc: "₹1.75 / kg for Koregaon to Satara Hub aggregation.",
      hubTitle: "Go Agro Platform & Hub Ops (2.5%)",
      hubDesc: "₹0.75 / kg for digital weighbridge, grading & logistics tech.",
      agentTitle: "Commission Agent (1.7%)",
      agentDesc: "₹0.50 / kg statutory agent matching fee.",
      retailNote: "Consumer Retail Benchmark: ₹37.00/kg (Buyer earns ₹7.00/kg retail margin)",
      close: "Close",
    },
    mr: {
      title: "पारदर्शक दर विभागणी",
      sub: "कोणतीही छुपी कपात नाही: ₹३०.००/किलो मधील प्रत्येक रुपया कुठे जातो",
      buyerPays: "खरेदीदाराचा घाऊक खरेदी दर",
      perKg: "₹३०.०० / किलो",
      lotTotal: "१,००० किलोसाठी एकूण ₹३०,०००",
      farmerTitle: "शेतकऱ्याला मिळणारा निव्वळ दर (९०.०%)",
      farmerDesc: "शिवार दारात हमीभाव ₹२७.००/किलो. हमाली किंवा वाहतूक कपात शून्य.",
      advance: "५०% आगाऊ रक्कम UPI द्वारे:",
      final: "५०% अंतिम रक्कम बँक खात्यात:",
      transporterTitle: "वाहतूकदार भाडे (५.८%)",
      transporterDesc: "कोरेगाव ते सातारा हब वाहतुकीसाठी ₹१.७५/किलो.",
      hubTitle: "गो ऍग्रो प्लॅटफॉर्म आणि हब खर्च (२.५%)",
      hubDesc: "काटा वजन, प्रतवारी आणि तंत्रज्ञानासाठी ₹०.७५/किलो.",
      agentTitle: "विक्री दलाल / अडत्या (१.७%)",
      agentDesc: "अधिकृत अडत ₹०.५०/किलो.",
      retailNote: "किरकोळ ग्राहक दर: ₹३७.००/किलो (खरेदीदाराला ₹७.००/किलो नफा)",
      close: "बंद करा",
    },
    hi: {
      title: "पारदर्शी मूल्य विभाजन",
      sub: "कोई छिपी कटौती नहीं: ₹30.00/किलो का पाई-पाई का हिसाब",
      buyerPays: "खरीदार का थोक क्रय मूल्य",
      perKg: "₹30.00 / किलो",
      lotTotal: "1,000 किलो के लिए कुल ₹30,000",
      farmerTitle: "किसान को मिलने वाला शुद्ध मूल्य (90.0%)",
      farmerDesc: "खेत पर गारंटीशुदा ₹27.00/किलो। कोई हम्माली या भाड़ा कटौती नहीं।",
      advance: "50% अग्रिम UPI द्वारा:",
      final: "50% अंतिम भुगतान बैंक खाते में:",
      transporterTitle: "ट्रांसपोर्टर का भाड़ा (5.8%)",
      transporterDesc: "कोरेगांव से सतारा हब तक ₹1.75/किलो भाड़ा।",
      hubTitle: "गो एग्रो प्लेटफॉर्म और हब खर्च (2.5%)",
      hubDesc: "कांटा वजन, ग्रेडिंग और तकनीकी प्रबंधन ₹0.75/किलो।",
      agentTitle: "कमीशन एजेंट / आढ़ती (1.7%)",
      agentDesc: "पारदर्शी आढ़त ₹0.50/किलो।",
      retailNote: "उपभोक्ता खुदरा मूल्य: ₹37.00/किलो (खरीदार का ₹7.00/किलो मुनाफा)",
      close: "बंद करें",
    },
  }[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base">
                ₹
              </span>
              <h2 className="text-xl font-bold text-slate-900">{labels.title}</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">{labels.sub}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Buyer Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
              {labels.buyerPays}
            </span>
            <div className="text-2xl font-black text-emerald-950">{labels.perKg}</div>
          </div>
          <div className="text-right">
            <span className="text-xs text-emerald-700 font-medium block">1,000 kg Consignment</span>
            <span className="text-lg font-bold text-emerald-900">{labels.lotTotal}</span>
          </div>
        </div>

        {/* Breakdown Items */}
        <div className="space-y-3">
          {/* Farmer Card */}
          <div className="border border-emerald-300 bg-emerald-50/50 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                  🌾
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-950">{labels.farmerTitle}</h3>
                  <p className="text-xs text-emerald-800">{labels.farmerDesc}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-black text-emerald-900">₹27.00 / kg</span>
                <span className="text-[11px] font-bold text-emerald-700 block">₹27,000 total</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-200/60 text-xs">
              <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
                <span className="text-slate-500 block">{labels.advance}</span>
                <span className="font-bold text-emerald-900">₹13.50/kg (₹13,500)</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
                <span className="text-slate-500 block">{labels.final}</span>
                <span className="font-bold text-emerald-900">₹13.50/kg (₹13,500)</span>
              </div>
            </div>
          </div>

          {/* Transporter */}
          <div className="border border-slate-200 bg-white rounded-2xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                🚚
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">{labels.transporterTitle}</h3>
                <p className="text-[11px] text-slate-500">{labels.transporterDesc}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-slate-900">₹1.75 / kg</span>
              <span className="text-[11px] text-slate-500 block">₹1,750 total</span>
            </div>
          </div>

          {/* Go Agro Hub */}
          <div className="border border-slate-200 bg-white rounded-2xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                🏢
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">{labels.hubTitle}</h3>
                <p className="text-[11px] text-slate-500">{labels.hubDesc}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-slate-900">₹0.75 / kg</span>
              <span className="text-[11px] text-slate-500 block">₹750 total</span>
            </div>
          </div>

          {/* Commission Agent */}
          <div className="border border-slate-200 bg-white rounded-2xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                🤝
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">{labels.agentTitle}</h3>
                <p className="text-[11px] text-slate-500">{labels.agentDesc}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-slate-900">₹0.50 / kg</span>
              <span className="text-[11px] text-slate-500 block">₹500 total</span>
            </div>
          </div>
        </div>

        {/* Consumer Retail Note */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 text-center">
          {labels.retailNote}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-[#003b1b] hover:bg-[#005226] text-white font-bold rounded-2xl text-sm transition-colors"
        >
          {labels.close}
        </button>
      </div>
    </div>
  );
};
