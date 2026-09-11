import React, { useState, useEffect } from 'react';
import { 
  Tractor, 
  Truck, 
  ShoppingBag, 
  ShieldCheck, 
  Phone, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  Volume2, 
  HelpCircle,
  Clock,
  Sparkles,
  Lock,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { AppUser, Language } from '../types';
import { predefinedUsers } from '../data/mockUsers';

interface LoginPageProps {
  onLoginSuccess: (user: AppUser) => void;
  lang: Language;
  onSelectLang: (lang: Language) => void;
  onOpenAudioGuide: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  lang,
  onSelectLang,
  onOpenAudioGuide,
}) => {
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'transporter' | 'vendor'>('farmer');
  const [authMethod, setAuthMethod] = useState<'otp' | 'pin'>('otp');
  
  // Form fields
  const [phoneNumber, setPhoneNumber] = useState(predefinedUsers['farmer'].phone);
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState(['', '', '', '']);
  const [pinValue, setPinValue] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Sync phone when switching role tab
  useEffect(() => {
    setPhoneNumber(predefinedUsers[selectedRole].phone);
    setOtpSent(false);
    setOtpValue(['', '', '', '']);
    setPinValue('');
    setErrorMessage('');
  }, [selectedRole]);

  // Countdown timer for OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpSent && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpSent, countdown]);

  const t = {
    en: {
      brandSub: "Satara to Mumbai Direct Onion Corridor",
      loginTitle: "Login to Go Agro Portal",
      loginSubtitle: "Select your role to access your verified supply chain workspace",
      farmerRole: "Farmer",
      farmerSub: "शेतकरी / किसान",
      farmerDesc: "Guaranteed ₹27.00/kg • Instant 50% UPI advance • Zero mandi cess",
      transporterRole: "Transporter",
      transporterSub: "वाहतूकदार / ट्रांसपोर्टर",
      transporterDesc: "Freight rate ₹1.75/kg • Hub gate weighment • Direct bank payout",
      vendorRole: "Buyer",
      vendorSub: "घाऊक खरेदीदार / खरीदार",
      vendorDesc: "Direct farm sourcing ₹30/kg • 100% Grade A certified • Vashi delivery",
      fastDemoTitle: "1-Tap Quick Demo Access",
      fastDemoDesc: "Instant one-click authentication as verified stakeholder",
      loginAs: "Login directly as",
      phoneTab: "Mobile OTP Login",
      pinTab: "Security PIN Login",
      phoneLabel: "Enter Registered Mobile Number",
      sendOtp: "Get OTP via SMS",
      resendOtp: "Resend OTP in",
      enterOtp: "Enter 4-Digit Verification Code",
      demoOtpHint: "Demo OTP: 1 2 3 4",
      useDemoOtp: "Auto-fill 1234",
      verifyBtn: "Verify & Enter Workspace",
      pinLabel: "Enter 4-Digit Security PIN (Default: 1234)",
      pinLoginBtn: "Login with PIN",
      trustEscrow: "100% Escrow Secured by Bank of Maharashtra",
      trustKyc: "Govt APMC & Aadhaar / 7-12 KYC Compliant",
      helpline: "24x7 Kisan & Driver Helpline: 1800-890-AGRO",
      audioHelp: "Audio Help",
      verifiedBadge: "KYC Verified",
    },
    mr: {
      brandSub: "सातारा ते मुंबई थेट कांदा कॉरिडॉर",
      loginTitle: "गो ॲग्रो पोर्टल लॉगिन",
      loginSubtitle: "आपल्या भूमिकेनुसार लॉगिन करा आणि थेट शेतीमाल व्यापार सुरू करा",
      farmerRole: "शेतकरी",
      farmerSub: "शेतकरी (Farmer)",
      farmerDesc: "हमीभाव ₹२७.००/किलो • ५०% तत्काळ UPI आगाऊ रक्कम • शून्य आडत कपात",
      transporterRole: "वाहतूकदार",
      transporterSub: "वाहतूकदार (Transporter)",
      transporterDesc: "भाडे दर ₹१.७५/किलो • सातारा हब डिजिटल वजन • तत्काळ बँक जमा",
      vendorRole: "खरेदीदार",
      vendorSub: "घाऊक व्यापारी (Buyer)",
      vendorDesc: "थेट खरेदी ₹३०/किलो • १००% ग्रेड 'अ' हमी • वाशी यार्डात थेट पोहोच",
      fastDemoTitle: "१-क्लिक झटपट डेमो लॉगिन",
      fastDemoDesc: "सत्यापित खात्यात एका क्लिकवर तत्काळ प्रवेश करा",
      loginAs: "या नावाने थेट लॉगिन करा:",
      phoneTab: "मोबाईल OTP द्वारे लॉगिन",
      pinTab: "४-अंकी PIN द्वारे लॉगिन",
      phoneLabel: "नोंदणीकृत १०-अंकी मोबाईल क्रमांक टाका",
      sendOtp: "SMS द्वारे OTP मिळवा",
      resendOtp: "पुन्हा OTP पाठवा",
      enterOtp: "मोबाईलवर आलेला ४-अंकी OTP टाका",
      demoOtpHint: "डेमो OTP: १ २ ३ ४",
      useDemoOtp: "१२३४ भरा",
      verifyBtn: "सत्यापित करा आणि पुढे जा",
      pinLabel: "४-अंकी सुरक्षा पिन टाका (डिफॉल्ट: 1234)",
      pinLoginBtn: "पिन द्वारे लॉगिन करा",
      trustEscrow: "बँक ऑफ महाराष्ट्र द्वारे १००% सुरक्षित एस्क्रो व्यवहार",
      trustKyc: "शासकीय APMC व आधार / ७-१२ प्रमाणित खाते",
      helpline: "२४x७ शेतकरी व चालक हेल्पलाईन: १८००-८९०-AGRO",
      audioHelp: "ऑडिओ मदत",
      verifiedBadge: "सत्यापित खाते",
    },
    hi: {
      brandSub: "सतारा से मुंबई सीधा प्याज कॉरिडोर",
      loginTitle: "गो एग्रो पोर्टल लॉगिन",
      loginSubtitle: "अपनी भूमिका चुनें और सीधे कृषि व्यापार पोर्टल में प्रवेश करें",
      farmerRole: "किसान",
      farmerSub: "किसान (Farmer)",
      farmerDesc: "गारंटी भाव ₹27.00/किलो • 50% तुरंत UPI अग्रिम • शून्य मंडी कटौती",
      transporterRole: "ट्रांसपोर्टर",
      transporterSub: "ट्रांसपोर्टर (Transporter)",
      transporterDesc: "भाड़ा दर ₹1.75/किलो • सतारा हब पर डिजिटल तौल • सीधा बैंक भुगतान",
      vendorRole: "थोक खरीदार",
      vendorSub: "थोक खरीदार (Buyer)",
      vendorDesc: "सीधी खरीद ₹30/किलो • 100% ग्रेड 'ए' गारंटी • वाशी मंडी में डिलीवरी",
      fastDemoTitle: "1-क्लिक त्वरित डेमो लॉगिन",
      fastDemoDesc: "सत्यापित खाते में बिना किसी देरी के तुरंत प्रवेश करें",
      loginAs: "सीधे इस नाम से प्रवेश करें:",
      phoneTab: "मोबाइल OTP द्वारा लॉगिन",
      pinTab: "सुरक्षा PIN द्वारा लॉगिन",
      phoneLabel: "पंजीकृत 10-अंकों का मोबाइल नंबर दर्ज करें",
      sendOtp: "SMS द्वारा OTP प्राप्त करें",
      resendOtp: "पुनः OTP भेजें",
      enterOtp: "मोबाइल पर प्राप्त 4-अंकीय OTP दर्ज करें",
      demoOtpHint: "डेमो OTP: 1 2 3 4",
      useDemoOtp: "1234 भरें",
      verifyBtn: "सत्यापित करें और प्रवेश करें",
      pinLabel: "4-अंकीय सुरक्षा पिन दर्ज करें (डिफ़ॉल्ट: 1234)",
      pinLoginBtn: "पिन द्वारा लॉगिन करें",
      trustEscrow: "बैंक ऑफ महाराष्ट्र द्वारा 100% सुरक्षित एस्क्रो लेन-देन",
      trustKyc: "शासकीय APMC व आधार / 7-12 सत्यापित खाता",
      helpline: "24x7 किसान व ड्राइवर हेल्पलाइन: 1800-890-AGRO",
      audioHelp: "ऑडियो मदद",
      verifiedBadge: "सत्यापित खाता",
    },
  }[lang];

  const currentUser = predefinedUsers[selectedRole];

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      setErrorMessage(lang === 'mr' ? 'कृपया योग्य १०-अंकी मोबाईल नंबर टाका.' : 'Please enter a valid 10-digit mobile number.');
      return;
    }
    setErrorMessage('');
    setOtpSent(true);
    setCountdown(30);
    // Pre-fill or auto focus
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const updated = [...otpValue];
    updated[index] = val;
    setOtpValue(updated);

    // Auto focus next input
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleAutoFillOtp = () => {
    setOtpValue(['1', '2', '3', '4']);
    setErrorMessage('');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otpValue.join('');
    if (entered.length !== 4) {
      setErrorMessage(lang === 'mr' ? 'कृपया पूर्ण ४-अंकी OTP टाका.' : 'Please enter the complete 4-digit OTP.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onLoginSuccess(currentUser);
    }, 500);
  };

  const handlePinLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinValue || pinValue.length < 4) {
      setErrorMessage(lang === 'mr' ? 'कृपया ४-अंकी पिन टाका.' : 'Please enter your 4-digit PIN.');
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onLoginSuccess(currentUser);
    }, 500);
  };

  const handleDirectDemoLogin = () => {
    onLoginSuccess(currentUser);
  };

  return (
    <div className="min-h-screen bg-[#f4f7f4] flex flex-col justify-between selection:bg-[#92f5a4] selection:text-[#003b1b]">
      {/* Top Simple Utility Bar */}
      <header className="bg-white border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#003b1b] flex items-center justify-center text-[#92f5a4] shadow-xs">
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
                {t.brandSub}
              </p>
            </div>
          </div>

          {/* Audio Help & Language Switcher */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenAudioGuide}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors border border-slate-200"
              title="Listen to audio instructions in Marathi, Hindi, English"
            >
              <Volume2 className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline">{t.audioHelp}</span>
            </button>

            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => onSelectLang('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  lang === 'en' ? 'bg-[#003b1b] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onSelectLang('mr')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  lang === 'mr' ? 'bg-[#003b1b] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                मराठी
              </button>
              <button
                onClick={() => onSelectLang('hi')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  lang === 'hi' ? 'bg-[#003b1b] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Login Canvas */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8 w-full flex flex-col justify-center">
        {/* Title & Introduction */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#003b1b] text-xs font-bold mb-3 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Govt APMC & Escrow Certified Portal</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.loginTitle}
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            {t.loginSubtitle}
          </p>
        </div>

        {/* 3 Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* 1. Farmer Card */}
          <button
            type="button"
            onClick={() => setSelectedRole('farmer')}
            className={`p-5 rounded-3xl border-2 text-left transition-all relative overflow-hidden cursor-pointer ${
              selectedRole === 'farmer'
                ? 'bg-white border-[#003b1b] shadow-md ring-2 ring-emerald-500/20'
                : 'bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center text-2xl border border-emerald-100">
                🌾
              </div>
              {selectedRole === 'farmer' && (
                <span className="bg-[#003b1b] text-[#92f5a4] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Selected</span>
                </span>
              )}
            </div>

            <h2 className="text-lg font-black text-slate-900">
              {t.farmerRole}
            </h2>
            <p className="text-xs font-semibold text-emerald-700 mb-2">
              {t.farmerSub}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.farmerDesc}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>Satara & Koregaon Farmers</span>
              <span className="font-bold text-[#003b1b]">₹27/kg Farm Gate →</span>
            </div>
          </button>

          {/* 2. Transporter Card */}
          <button
            type="button"
            onClick={() => setSelectedRole('transporter')}
            className={`p-5 rounded-3xl border-2 text-left transition-all relative overflow-hidden cursor-pointer ${
              selectedRole === 'transporter'
                ? 'bg-white border-[#003b1b] shadow-md ring-2 ring-emerald-500/20'
                : 'bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center text-2xl border border-emerald-100">
                🚚
              </div>
              {selectedRole === 'transporter' && (
                <span className="bg-[#003b1b] text-[#92f5a4] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Selected</span>
                </span>
              )}
            </div>

            <h2 className="text-lg font-black text-slate-900">
              {t.transporterRole}
            </h2>
            <p className="text-xs font-semibold text-emerald-700 mb-2">
              {t.transporterSub}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.transporterDesc}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>Fleet & Canter Drivers</span>
              <span className="font-bold text-[#003b1b]">₹1.75/kg Freight →</span>
            </div>
          </button>

          {/* 3. Buyer / Vendor Card */}
          <button
            type="button"
            onClick={() => setSelectedRole('vendor')}
            className={`p-5 rounded-3xl border-2 text-left transition-all relative overflow-hidden cursor-pointer ${
              selectedRole === 'vendor'
                ? 'bg-white border-[#003b1b] shadow-md ring-2 ring-emerald-500/20'
                : 'bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center text-2xl border border-emerald-100">
                🛒
              </div>
              {selectedRole === 'vendor' && (
                <span className="bg-[#003b1b] text-[#92f5a4] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Selected</span>
                </span>
              )}
            </div>

            <h2 className="text-lg font-black text-slate-900">
              {t.vendorRole}
            </h2>
            <p className="text-xs font-semibold text-emerald-700 mb-2">
              {t.vendorSub}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.vendorDesc}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>Vashi & Urban APMC Buyers</span>
              <span className="font-bold text-[#003b1b]">₹30/kg Wholesale →</span>
            </div>
          </button>
        </div>

        {/* Interactive Login Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left / Top Banner: Selected Role Profile & 1-Tap Fast Demo Access */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#003b1b] to-[#005a2b] p-6 sm:p-8 text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#92f5a4] text-[#003b1b] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {currentUser.badge}
                </span>
                <span className="text-xs text-emerald-200">
                  ID: {currentUser.id}
                </span>
              </div>

              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-3xl">
                  {currentUser.avatarEmoji}
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight">{currentUser.name}</h3>
                  <p className="text-xs text-emerald-200">{currentUser.location}</p>
                  <p className="text-[11px] text-emerald-100 font-mono mt-0.5">+91 {currentUser.phone}</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-3 border border-white/15 text-xs text-emerald-100 space-y-1 my-4">
                <div className="text-[10px] uppercase font-bold text-emerald-300">Registered Details:</div>
                <div className="font-semibold text-white">{currentUser.identifier}</div>
              </div>
            </div>

            {/* Instant 1-Tap Login Action */}
            <div className="mt-6 pt-4 border-t border-white/15">
              <span className="text-xs text-emerald-200 font-semibold block mb-2">
                {t.fastDemoTitle}
              </span>
              <button
                type="button"
                onClick={handleDirectDemoLogin}
                className="w-full py-3.5 px-4 bg-[#92f5a4] hover:bg-[#a9fab9] text-[#003b1b] font-black text-sm rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Sparkles className="w-4 h-4 text-[#003b1b]" />
                <span>{t.loginAs} {currentUser.name.split(' ')[0]}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <p className="text-[11px] text-emerald-200/80 text-center mt-2">
                Instant access without phone verification (Preview Mode)
              </p>
            </div>
          </div>

          {/* Right Section: Authentic OTP / PIN Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-5 flex flex-col justify-center">
            {/* Form Mode Selector */}
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setAuthMethod('otp');
                  setErrorMessage('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  authMethod === 'otp'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t.phoneTab}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthMethod('pin');
                  setErrorMessage('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  authMethod === 'pin'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t.pinTab}</span>
              </button>
            </div>

            {/* Error Message if any */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold flex items-center gap-2">
                <span>⚠️</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* OTP FLOW */}
            {authMethod === 'otp' && (
              <div className="space-y-4">
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {t.phoneLabel}
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 text-xs font-bold text-slate-500">
                          🇮🇳 +91
                        </span>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="9423811092"
                          maxLength={10}
                          className="w-full pl-18 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Pre-filled with registered number for {currentUser.name}
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#003b1b] hover:bg-[#005226] text-white font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Phone className="w-4 h-4 text-[#92f5a4]" />
                      <span>{t.sendOtp}</span>
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-500">OTP sent to: </span>
                        <span className="font-bold text-slate-900">+91 {phoneNumber}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="text-emerald-700 font-bold underline cursor-pointer"
                      >
                        Change
                      </button>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-700">
                          {t.enterOtp}
                        </label>
                        <button
                          type="button"
                          onClick={handleAutoFillOtp}
                          className="text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200 cursor-pointer"
                        >
                          ⚡ {t.useDemoOtp}
                        </button>
                      </div>

                      {/* 4-digit OTP blocks */}
                      <div className="flex gap-3 justify-center">
                        {otpValue.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`otp-input-${idx}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Backspace' && !digit && idx > 0) {
                                const prev = document.getElementById(`otp-input-${idx - 1}`);
                                if (prev) prev.focus();
                              }
                            }}
                            className="w-14 h-14 text-center text-2xl font-black bg-slate-50 border-2 border-slate-200 rounded-2xl outline-none focus:border-emerald-600 focus:bg-white text-slate-900 transition-colors"
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                        <span>{t.demoOtpHint}</span>
                        {countdown > 0 ? (
                          <span className="font-semibold">{t.resendOtp} {countdown}s</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setCountdown(30)}
                            className="text-emerald-700 font-bold hover:underline cursor-pointer"
                          >
                            Resend Code
                          </button>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isVerifying}
                      className="w-full py-3.5 bg-[#003b1b] hover:bg-[#005226] text-white font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {isVerifying ? (
                        <span>Verifying...</span>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-[#92f5a4]" />
                          <span>{t.verifyBtn}</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* PIN FLOW */}
            {authMethod === 'pin' && (
              <form onSubmit={handlePinLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.pinLabel}
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      maxLength={4}
                      value={pinValue}
                      onChange={(e) => setPinValue(e.target.value.replace(/\D/g, ''))}
                      placeholder="• • • •"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-xl tracking-widest font-black text-slate-900 outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500">
                    <span>Default PIN for test users is 1234</span>
                    <button
                      type="button"
                      onClick={() => setPinValue('1234')}
                      className="text-emerald-700 font-bold hover:underline cursor-pointer"
                    >
                      Fill 1234
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full py-3.5 bg-[#003b1b] hover:bg-[#005226] text-white font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isVerifying ? (
                    <span>Logging in...</span>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4 text-[#92f5a4]" />
                      <span>{t.pinLoginBtn}</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Bottom Security Seals */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.trustEscrow}</span>
              </div>
              <span className="text-slate-400">•</span>
              <span>{t.trustKyc}</span>
            </div>
          </div>
        </div>

        {/* Footer Support Banner */}
        <div className="mt-8 text-center text-xs text-slate-500 flex flex-wrap items-center justify-center gap-4">
          <span className="font-semibold text-slate-700">{t.helpline}</span>
          <span className="text-slate-300">|</span>
          <span>Satara Aggregation Hub, NH48 Corridor</span>
          <span className="text-slate-300">|</span>
          <span>Vashi APMC Yard #12</span>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            <strong className="text-[#003b1b]">Go Agro</strong> • Agri Supply Chain OS (Satara ➔ Mumbai)
          </span>
          <span className="text-[11px] text-slate-400">
            Guaranteed ₹27/kg Farm Gate • ₹1.75/kg Transporter • ₹30/kg Direct Buyer
          </span>
        </div>
      </footer>
    </div>
  );
};
