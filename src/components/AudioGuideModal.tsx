import React, { useState } from 'react';
import { X, Volume2, Play, Pause, RotateCcw, CheckCircle, ShieldAlert } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface AudioGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSelectLang: (lang: Language) => void;
}

export const AudioGuideModal: React.FC<AudioGuideModalProps> = ({ isOpen, onClose, lang, onSelectLang }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);

  if (!isOpen) return null;
  const t = translations[lang];

  const audioScripts: Record<Language, { title: string; lines: string[] }> = {
    mr: {
      title: "शेतकऱ्यांसाठी ध्वनी सूचना (मराठी)",
      lines: [
        "नमस्कार शेतकरी बंधूंनो, गो अ‍ॅग्रो ॲपमध्ये आपले स्वागत आहे.",
        "१. कांद्याची नोंदणी: तुमच्या शेतातील अंदाजे कांदा निवडा आणि वजन नोंदवा.",
        "२. हमी भाव: गो अ‍ॅग्रोकडून कांद्याला हमीभाव ₹२७/किलो दिला जातो.",
        "३. ५०% त्वरित उचल: माल भरताच ५०% उचल म्हणजेच ₹१३.५०/किलो थेट तुमच्या बँक खात्यात जमा होते.",
        "४. मोफत वाहतूक: गो अ‍ॅग्रोचे वाहतूकदार स्वतः शेतावर येऊन माल उचलतात.",
        "५. धर्मकाटा वजन: सातारा हबवर डिजिटल वजन व ५५मिमी+ ग्रेडिंग केले जाते.",
        "६. शून्य छुपी कपात: कोणत्याही प्रकारची अवाजवी कपात होणार नाही. तक्रारीसाठी १८००-४२०-९९२१ वर संपर्क साधा."
      ]
    },
    hi: {
      title: "किसान ध्वनि मार्गदर्शिका (हिन्दी)",
      lines: [
        "नमस्ते किसान भाइयों, गो एग्रो ऐप में आपका स्वागत है।",
        "1. फसल बुकिंग: अपने खेत के प्याज की मात्रा और तिथि चुनें।",
        "2. पारदर्शी मूल्य: गो एग्रो द्वारा प्याज का आधार मूल्य ₹27/किग्रा सुनिश्चित किया गया है।",
        "3. 50% तत्काल अग्रिम: खेत से माल उठते ही ₹13.50/किग्रा आपके बैंक खाते में तुरंत ट्रांसफर किया जाता है।",
        "4. ट्रांसपोर्टर सुविधा: पंजीकृत ट्रांसपोर्टर सीधे आपके खेत पर आकर माल लोड करेंगे।",
        "5. डिजिटल तौल: सातारा हब पर प्रमाणित धर्मकांटे से वजन और 55mm+ छंटाई होगी।",
        "6. शून्य कटौती गारंटी: बिना सहमति कोई कटौती नहीं होगी। सहायता के लिए टोल-फ्री 1800-420-9921 डायल करें।"
      ]
    },
    en: {
      title: "Farmer Audio Guide & Voice Instructions (English)",
      lines: [
        "Welcome to Go Agro Agricultural Supply Chain Operating System.",
        "1. Crop Booking: Select your onion quantity (e.g., 500 or 1,000 kg) and pickup date.",
        "2. Guaranteed Rate: Go Agro commits a benchmark farm-gate price of ₹27.00/kg.",
        "3. 50% Instant Advance: Upon farm-gate collection, ₹13.50/kg is immediately credited to your bank via UPI.",
        "4. Transporter Aggregation: Authorized transporters collect produce from multiple farms and deliver to Satara Hub.",
        "5. Certified Weighing & QC: Net weight and Grade A/B sorting are certified on calibrated digital scales.",
        "6. Zero Deductions Ombudsman: Any moisture variance >2% is covered under Go Agro protection. Call 1800-420-9921 anytime."
      ]
    }
  };

  const script = audioScripts[lang];

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate playback progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 10;
        });
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-[#003b1b] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#14532d] flex items-center justify-center text-[#92f5a4]">
              <Volume2 className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold">{t.audioGuideModalTitle}</h3>
              <p className="text-xs text-[#92f5a4]">{script.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Language Selection Pills inside modal */}
          <div className="flex items-center justify-between bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => onSelectLang('en')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                lang === 'en' ? 'bg-[#003b1b] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              English
            </button>
            <button
              onClick={() => onSelectLang('mr')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                lang === 'mr' ? 'bg-[#003b1b] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              मराठी (Marathi)
            </button>
            <button
              onClick={() => onSelectLang('hi')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                lang === 'hi' ? 'bg-[#003b1b] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              हिन्दी (Hindi)
            </button>
          </div>

          {/* Audio Player Controls */}
          <div className="bg-[#f2f3ff] border border-[#dae2fd] rounded-xl p-4 flex flex-col items-center text-center space-y-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setProgress(0)}
                className="p-2 rounded-full text-slate-600 hover:bg-slate-200 transition-colors"
                title="Rewind"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handlePlayToggle}
                className="w-12 h-12 rounded-full bg-[#006d30] text-white flex items-center justify-center shadow-md hover:bg-[#003b1b] transition-all transform active:scale-95"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </button>
              <div className="text-left text-xs">
                <span className="font-semibold text-slate-800 block">
                  {isPlaying ? "Playing Voice Guide..." : "Click to Play Voice Explanation"}
                </span>
                <span className="text-slate-500 font-mono text-[11px]">01:45 Audio Guide • High Quality</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#006d30] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Script Display */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 max-h-56 overflow-y-auto space-y-2 text-xs text-slate-700">
            <span className="font-semibold text-slate-900 block border-b border-slate-200 pb-1">
              Audio Transcript / पठण मजकूर:
            </span>
            {script.lines.map((line, idx) => (
              <p key={idx} className="leading-relaxed flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#006d30] shrink-0 mt-0.5" />
                <span>{line}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <ShieldAlert className="w-4 h-4 text-[#006d30]" />
            <span>Toll-Free Farmer Hotline: 1800-420-9921</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#003b1b] text-white text-xs font-semibold rounded-lg hover:bg-[#14532d] transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
