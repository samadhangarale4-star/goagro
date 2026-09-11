import { Language } from '../types';

export interface TranslationDict {
  appName: string;
  appSub: string;
  corridorTag: string;
  liveTicker: string;
  apmcStream: string;
  roleOpsAdmin: string;
  roleFarmer: string;
  roleTransporter: string;
  roleAgent: string;
  roleBuyer: string;
  rolePricing: string;
  roleMarketCompare: string;
  audioGuide: string;
  audioGuideModalTitle: string;
  audioGuideHelp: string;
  dispatchOps: string;
  stakeholderViews: string;
  mandiGateOnline: string;
  sataraNode: string;
  
  // Farmer view
  farmerGuarantee: string;
  farmerName: string;
  verifiedKYC: string;
  farmerLocation: string;
  cropSpecialty: string;
  linkedAccount: string;
  instantUPI: string;
  updateBank: string;
  activeConsignment: string;
  inTransit: string;
  expectedGateWeight: string;
  verifiedHubWeight: string;
  farmScaleReading: string;
  certifiedScale: string;
  committedBaseRate: string;
  totalEstimatedValue: string;
  paidInstantAdvance: string;
  pendingFinalSettlement: string;
  scheduledOnAcceptance: string;
  visualProgression: string;
  stageCompleted: string;
  downloadReceipt: string;
  receiptIssued: string;
  pastDispatches: string;
  viewAll: string;
  bookNextCrop: string;
  bookCropDesc: string;
  selectCrop: string;
  onion: string;
  potato: string;
  tomato: string;
  garlic: string;
  produceVariety: string;
  estimatedQuantityKg: string;
  gunnyBagsNote: string;
  preferredDate: string;
  guaranteedPrice: string;
  totalGrossVal: string;
  advancePledge50: string;
  advanceDisbursedNotice: string;
  acceptOfferBtn: string;
  saveDraftBtn: string;
  ombudsmanTitle: string;
  ombudsmanSubtitle: string;
  ombudsmanDesc: string;
  ombudsmanPoint1: string;
  ombudsmanPoint2: string;
  helpline: string;
  callNow: string;
  weatherTransit: string;
  weatherOptimal: string;
  etaMumbai: string;
  raiseComplaint: string;

  // Transporter view
  transporterTitle: string;
  assignedRoute: string;
  vehicleAssigned: string;
  driverName: string;
  farmersToCollect: string;
  expectedWeight: string;
  actualLoadedWeight: string;
  confirmCollection: string;
  reportDiscrepancy: string;
  deliverToHub: string;
  transporterFeePerKg: string;
  totalTransporterEarnings: string;
  transitChecklist: string;

  // Ops Admin view
  opsDashboardTitle: string;
  totalAggregatedSupply: string;
  activeShipmentsCount: string;
  weighBridgeEntry: string;
  digitalGradingTitle: string;
  gradeA: string;
  gradeB: string;
  gradeC: string;
  recordWeighing: string;
  varianceToleranceNotice: string;
  approveSettlement: string;

  // Commission Agent view
  agentTitle: string;
  assignedLots: string;
  buyerBids: string;
  confirmSale: string;
  agentCommissionRate: string;
  totalCommissionEarned: string;

  // Buyer view
  buyerTitle: string;
  createDemand: string;
  availableSupply: string;
  orderAccepted: string;
  vendorPurchaseRate: string;
  consumerRetailSpread: string;
  confirmDeliveryAtMandi: string;

  // Price breakdown view
  priceDistributionTitle: string;
  illustrativeNotice: string;
  farmerShare: string;
  transporterShare: string;
  goAgroShare: string;
  agentShare: string;
  totalVendorPrice: string;
  consumerRetailPrice: string;
  shipment1000kgTitle: string;
  produceMoneyFlow: string;

  // Market comparison view
  marketCompareTitle: string;
  marketCompareDesc: string;
  netRealizationTitle: string;
  bestCorridor: string;
  grossPrice: string;
  freightCost: string;
  handlingCost: string;
  shrinkageLoss: string;
  netRealizationPerKg: string;
}

export const translations: Record<Language, TranslationDict> = {
  en: {
    appName: "Go Agro",
    appSub: "Agri Supply Chain OS",
    corridorTag: "Active Corridor: Satara Hub ➔ Vashi APMC Mumbai | Onion Season",
    liveTicker: "TICKER: Current Demo: 1,000 kg Onion | Satara ➔ Mumbai | Vendor ₹30/kg → Farmer ₹27/kg (Advance ₹13.50/kg paid) | Status: Fully Verified",
    apmcStream: "APMC Stream: Live Connected",
    roleOpsAdmin: "Ops Admin",
    roleFarmer: "Farmer",
    roleTransporter: "Transporter",
    roleAgent: "Selling Agent",
    roleBuyer: "Buyer",
    rolePricing: "Price & Settlement",
    roleMarketCompare: "Market Comparison",
    audioGuide: "Audio Guide (मदत ऑडिओ)",
    audioGuideModalTitle: "Farmer Voice Guide & Instructions",
    audioGuideHelp: "Click listen to hear clear voice instructions about your booking, advance payment, and weighing rights.",
    dispatchOps: "Dispatch Operations",
    stakeholderViews: "Stakeholder Views",
    mandiGateOnline: "Mandi Gate #4 ONLINE",
    sataraNode: "Satara APMC Aggregator Node",

    farmerGuarantee: "Farmer Direct Guarantee: Zero Hidden Deductions • Daily APMC Price Lock",
    farmerName: "Ramesh Patil",
    verifiedKYC: "Verified Farmer KYC",
    farmerLocation: "Koregaon, Taluka Koregaon, Dist. Satara, Maharashtra",
    cropSpecialty: "Red Onion (Garva Special)",
    linkedAccount: "Linked Settlement Account",
    instantUPI: "Instant UPI Autopay Verified",
    updateBank: "Update Bank",
    activeConsignment: "Active Consignment",
    inTransit: "In Transit • Satara Hub",
    expectedGateWeight: "Expected Gate Weight",
    verifiedHubWeight: "Verified Net Hub Weight",
    farmScaleReading: "Farm Scale Reading",
    certifiedScale: "Certified Digital Scale",
    committedBaseRate: "Committed Base Rate",
    totalEstimatedValue: "Total Estimated Value",
    paidInstantAdvance: "₹6,750 (50% Advance)",
    pendingFinalSettlement: "Pending Final Settlement",
    scheduledOnAcceptance: "Scheduled on Mumbai APMC Buyer Acceptance",
    visualProgression: "Visual Supply Progression",
    stageCompleted: "Stage 5 of 7 Completed",
    downloadReceipt: "Download Collection Receipt #CR-8821",
    receiptIssued: "Collection Slip Issued & Digitally Signed",
    pastDispatches: "Past Completed Dispatches",
    viewAll: "View All (18)",
    bookNextCrop: "Book Next Crop Collection",
    bookCropDesc: "Lock transparent APMC prices right at your farm gate with Go Agro 50% immediate advance.",
    selectCrop: "Select Crop",
    onion: "Onion (कांदा)",
    potato: "Potato (बटाटा)",
    tomato: "Tomato (टोमॅटो)",
    garlic: "Garlic (लसूण)",
    produceVariety: "Produce Variety",
    estimatedQuantityKg: "Estimated Quantity (Kilograms)",
    gunnyBagsNote: "Equal to approx 10 standard 50kg gunny bags.",
    preferredDate: "Preferred Collection Date",
    guaranteedPrice: "Go Agro Guaranteed Price",
    totalGrossVal: "Estimated Total Gross:",
    advancePledge50: "50% Instant Advance Pledge:",
    advanceDisbursedNotice: "Paid immediately into Bank of Maharashtra A/C upon farm gate weighing.",
    acceptOfferBtn: "Accept Offer & Request Transporter",
    saveDraftBtn: "Save Draft / Negotiate Later",
    ombudsmanTitle: "Farmer Protection Ombudsman",
    ombudsmanSubtitle: "ZERO SILENT DEDUCTIONS POLICY",
    ombudsmanDesc: "Every gram is recorded digitally at Satara Weigh-bridge. If grading or tare weight does not match your Koregaon receipt, Go Agro covers the dispute escrow instantly.",
    ombudsmanPoint1: "Tolerance limit strictly restricted to ±2% moisture loss.",
    ombudsmanPoint2: "CCTV photo evidence recorded for Grade A/B sorting.",
    helpline: "Direct Farmer Helpline",
    callNow: "Call Now",
    weatherTransit: "Satara Weather & Road Condition",
    weatherOptimal: "Humidity 42% (Optimal for Onion)",
    etaMumbai: "Mumbai NH48 ETA",
    raiseComplaint: "Report Weighing/Grading Dispute",

    transporterTitle: "Transporter Fleet Management",
    assignedRoute: "Assigned Corridor: Koregaon / Satara Hub ➔ Mumbai Vashi APMC",
    vehicleAssigned: "Vehicle: TR-102 (Eicher 14ft Pro Canter)",
    driverName: "Driver: Suresh Shinde (+91 98220 44102)",
    farmersToCollect: "Farmers Collection Route (Aggregation)",
    expectedWeight: "Expected Qty",
    actualLoadedWeight: "Actual Loaded Qty",
    confirmCollection: "Confirm Farm-Gate Pickup",
    reportDiscrepancy: "Report Weight Discrepancy",
    deliverToHub: "Handover Consignment at Satara Hub",
    transporterFeePerKg: "Freight Rate: ₹1.75 / kg",
    totalTransporterEarnings: "Transporter Payout: ₹1,750 (for 1,000 kg)",
    transitChecklist: "Transit Geostamp & Quality Checklist",

    opsDashboardTitle: "Go Agro Operations Control & Aggregator Hub",
    totalAggregatedSupply: "Total Aggregated Supply",
    activeShipmentsCount: "Active Corridors",
    weighBridgeEntry: "Weigh-Bridge Digital Receiving Scale",
    digitalGradingTitle: "Quality QC & Grading (55mm+ / 40-50mm)",
    gradeA: "Grade A (Premium 55mm+)",
    gradeB: "Grade B (Standard 40-50mm)",
    gradeC: "Grade C (Sorting Loss / Small)",
    recordWeighing: "Record Scale Reading & Print Receipt",
    varianceToleranceNotice: "Moisture variance tolerance capped at 2.0%. Discrepancies >2% trigger automatic supervisor inspection.",
    approveSettlement: "Approve Remaining 50% Farmer Settlement",

    agentTitle: "Selling / Commission Agent Marketplace (APMC Vashi)",
    assignedLots: "Assigned Go Agro Lots for Auction / Trade",
    buyerBids: "Matching Buyer Demand & Price Bids",
    confirmSale: "Confirm Sale to Verified Vendor",
    agentCommissionRate: "Commission Benchmark: ₹0.50 / kg",
    totalCommissionEarned: "Agent Commission: ₹500 (1,000 kg shipment)",

    buyerTitle: "Vendor / Retail Procurement Portal",
    createDemand: "Post Bulk Onion Procurement Requirement",
    availableSupply: "Available Go Agro Graded Supply",
    orderAccepted: "Order Accepted & Locked at ₹30.00 / kg",
    vendorPurchaseRate: "Vendor Purchase Price: ₹30.00 / kg",
    consumerRetailSpread: "Retail Selling Price: ₹37.00 / kg (₹7.00/kg Gross Spread)",
    confirmDeliveryAtMandi: "Confirm Unloading at Vashi Mandi Yard",

    priceDistributionTitle: "Transparent Price & Money Distribution Model",
    illustrativeNotice: "All numbers are illustrative prototype values for demonstration of the supply chain economy, not live APMC quotes.",
    farmerShare: "Farmer Gate Price",
    transporterShare: "Transporter Freight",
    goAgroShare: "Go Agro Platform & Hub Ops",
    agentShare: "Selling / Commission Agent",
    totalVendorPrice: "Total Vendor Purchase Price",
    consumerRetailPrice: "Consumer Retail Sales Value",
    shipment1000kgTitle: "Complete 1,000 kg Onion Consignment Breakdown",
    produceMoneyFlow: "End-to-End Produce & Cash Settlement Cycle",

    marketCompareTitle: "Corridor Market Net Realization Engine",
    marketCompareDesc: "Optimize for highest NET REALIZATION (Gross Price minus Transport, Handling, Shrinkage & Mandi Taxes), not simply the gross wholesale price.",
    netRealizationTitle: "Net Realization Comparison",
    bestCorridor: "Highest Net Realization Route",
    grossPrice: "Gross APMC Rate",
    freightCost: "Freight / Transport",
    handlingCost: "Handling & Hamali",
    shrinkageLoss: "Moisture / Shrinkage Loss",
    netRealizationPerKg: "Net Farmer Realization / kg",
  },
  mr: {
    appName: "गो अ‍ॅग्रो",
    appSub: "कृषी पुरवठा साखळी ऑपरेटिंग सिस्टीम",
    corridorTag: "सक्रिय मार्ग: सातारा हब ➔ वाशी एपीएमसी मुंबई | कांदा हंगाम",
    liveTicker: "लाईव्ह टिकर: चालू डेमो: १,००० किलो कांदा | सातारा ➔ मुंबई | व्यापारी ₹३०/किलो → शेतकरी भाव ₹२७/किलो (५०% उचल ₹१३.५० जमा) | स्थिती: पूर्णपणे प्रमाणित",
    apmcStream: "एपीएमसी लाईव्ह प्रवाह: कनेक्टेड",
    roleOpsAdmin: "ऑप्स ॲडमिन",
    roleFarmer: "शेतकरी पोर्टल",
    roleTransporter: "वाहतूकदार फ्लीट",
    roleAgent: "विक्री / कमिशन एजंट",
    roleBuyer: "व्यापारी / खरेदीदार",
    rolePricing: "किंमत व पैसे वाटप",
    roleMarketCompare: "बाजारभाव तुलना (नेट नफा)",
    audioGuide: "मदत ऑडिओ (Audio Guide)",
    audioGuideModalTitle: "शेतकऱ्यांसाठी ध्वनी सूचना व मार्गदर्शन",
    audioGuideHelp: "तुमच्या कांदा नोंदणी, ५०% उचल आणि डिजिटल वजन हक्कांविषयी ऐकण्यासाठी प्ले करा.",
    dispatchOps: "डिस्पॅच ऑपरेशन्स",
    stakeholderViews: "घटक / भागीदार दृश्ये",
    mandiGateOnline: "मार्केट यार्ड गेट #४ ऑनलाईन",
    sataraNode: "सातारा एपीएमसी संकलन केंद्र",

    farmerGuarantee: "शेतकरी थेट हमी: शून्य लपवलेली कपात • दररोज एपीएमसी भाव हमी",
    farmerName: "रमेश पाटील",
    verifiedKYC: "प्रमाणित शेतकरी केवायसी",
    farmerLocation: "कोरेगाव, ता. कोरेगाव, जि. सातारा, महाराष्ट्र",
    cropSpecialty: "लाल कांदा (गरवा स्पेशल)",
    linkedAccount: "जोडलेले बँक खाते",
    instantUPI: "झटपट युपीआय ऑटोपे प्रमाणित",
    updateBank: "बँक बदला",
    activeConsignment: "सक्रिय माल / लॉट",
    inTransit: "प्रवासात • सातारा हब",
    expectedGateWeight: "अंदाजे शेतातील वजन",
    verifiedHubWeight: "प्रमाणित हब वजन",
    farmScaleReading: "काट्यावरील नोंद",
    certifiedScale: "डिजिटल वजनकाटा प्रमाणित",
    committedBaseRate: "मंजूर हमी भाव",
    totalEstimatedValue: "अंदाजे एकूण रक्कम",
    paidInstantAdvance: "₹६,७५० (५०% त्वरित उचल)",
    pendingFinalSettlement: "अंतिम उर्वरित बाकी",
    scheduledOnAcceptance: "मुंबई एपीएमसी व्यापाऱ्याच्या वितरणावर थेट जमा",
    visualProgression: "पुरवठा साखळी प्रगती",
    stageCompleted: "टप्पा ५ पैकी ७ पूर्ण",
    downloadReceipt: "संकलन पावती डाऊनलोड #CR-8821",
    receiptIssued: "डिजिटल स्वाक्षरीत संकलन पावती जारी",
    pastDispatches: "पूर्वी पाठवलेला माल व हिशोब",
    viewAll: "सर्व पहा (१८)",
    bookNextCrop: "पुढील शेतीमाल संकलन नोंदवा",
    bookCropDesc: "शेताच्या बांधावरच पारदर्शक एपीएमसी भाव मिळवा, गो अ‍ॅग्रोकडून ५०% त्वरित उचल खात्यावर मिळवा.",
    selectCrop: "पीक निवडा",
    onion: "कांदा (Onion)",
    potato: "बटाटा (Potato)",
    tomato: "टोमॅटो (Tomato)",
    garlic: "लसूण (Garlic)",
    produceVariety: "मालाची जात / प्रकार",
    estimatedQuantityKg: "अंदाजे वजन (किलोग्रॅम)",
    gunnyBagsNote: "अंदाजे १० प्रमाणित ५० किलोच्या पोत्यांइतके.",
    preferredDate: "माल उचलण्याची तारीख",
    guaranteedPrice: "गो अ‍ॅग्रो हमी भाव",
    totalGrossVal: "अंदाजे एकूण रक्कम:",
    advancePledge50: "५०% त्वरित उचल हमी:",
    advanceDisbursedNotice: "शेतावर वजन होताच बँक ऑफ महाराष्ट्र खात्यावर त्वरित जमा होईल.",
    acceptOfferBtn: "ऑफर स्वीकारा आणि गाडी बोलवा",
    saveDraftBtn: "ड्राफ्ट सेव्ह करा / नंतर ठरवा",
    ombudsmanTitle: "शेतकरी संरक्षण लोकपाल",
    ombudsmanSubtitle: "शून्य छुपी कपात धोरण (ZERO DEDUCTIONS)",
    ombudsmanDesc: "प्रत्येक ग्रॅम सातारा डिजिटल वजन काट्यावर नोंदवला जातो. प्रतवारी किंवा वजनात फरक आढळल्यास गो अ‍ॅग्रो एस्क्रोमधून त्वरित भरपाई देते.",
    ombudsmanPoint1: "ओलाव्याची घट मर्यादा केवळ ±२% पर्यंत मर्यादित.",
    ombudsmanPoint2: "ग्रेड अ/ब वर्गवारीचे सीसीटीव्ही छायाचित्र पुरावा जतन.",
    helpline: "थेट शेतकरी हेल्पलाईन",
    callNow: "कॉल करा",
    weatherTransit: "सातारा हवामान व रस्ता स्थिती",
    weatherOptimal: "आर्द्रता ४२% (कांद्यासाठी उत्तम)",
    etaMumbai: "मुंबई महामार्ग NH48 वेळ",
    raiseComplaint: "वजन / प्रतवारी तक्रार नोंदवा",

    transporterTitle: "वाहतूकदार फ्लीट व्यवस्थापन",
    assignedRoute: "नेमून दिलेला मार्ग: कोरेगाव / सातारा हब ➔ मुंबई वाशी एपीएमसी",
    vehicleAssigned: "वाहन: TR-102 (आयशर १४ फूट प्रो कॅन्टर)",
    driverName: "चालक: सुरेश शिंदे (+91 98220 44102)",
    farmersToCollect: "शेतकऱ्यांकडून माल संकलन यादी",
    expectedWeight: "अपेक्षित वजन",
    actualLoadedWeight: "प्रत्यक्ष भरलेले वजन",
    confirmCollection: "शेतकऱ्याकडून माल उचलल्याची नोंद",
    reportDiscrepancy: "वजनात तफावत नोंदवा",
    deliverToHub: "सातारा हबवर माल सुपूर्द करा",
    transporterFeePerKg: "वाहतूक दर: ₹१.७५ / किलो",
    totalTransporterEarnings: "वाहतूकदार एकूण कमाई: ₹१,७५० (१,००० किलोसाठी)",
    transitChecklist: "जिओ-स्टॅम्प व सुरक्षितता तपासणी",

    opsDashboardTitle: "गो अ‍ॅग्रो ऑपरेशन्स हब व संकलन केंद्र",
    totalAggregatedSupply: "एकूण संकलित शेतीमाल",
    activeShipmentsCount: "सक्रिय मार्ग",
    weighBridgeEntry: "डिजिटल धर्मकाटा नोंद",
    digitalGradingTitle: "कांदा प्रतवारी व दर्जा तपासणी (५५मिमी+ / ४०-५०मिमी)",
    gradeA: "ग्रेड अ (प्रीमियम ५५ मिमी+)",
    gradeB: "ग्रेड ब (मध्यम ४०-५० मिमी)",
    gradeC: "ग्रेड क (लहान / छाटणी)",
    recordWeighing: "वजन नोंदवून डिजिटल पावती काढा",
    varianceToleranceNotice: "ओलावा तफावत मर्यादा २.०% पर्यंत. २% पेक्षा जास्त फरक आढळल्यास सुपरवायझर तपासणी अनिवार्य.",
    approveSettlement: "उर्वरित ५०% शेतकरी रक्कम मंजूर करा",

    agentTitle: "विक्री / कमिशन एजंट मार्केटप्लेस (वाशी एपीएमसी)",
    assignedLots: "विक्रीसाठी उपलब्ध गो अ‍ॅग्रो लॉट्स",
    buyerBids: "खरेदीदारांची मागणी व बोली",
    confirmSale: "नोंदणीकृत व्यापाऱ्यास विक्री निश्चित करा",
    agentCommissionRate: "कमिशन दर: ₹०.५० / किलो",
    totalCommissionEarned: "एजंट कमिशन: ₹५०० (१,००० किलो लॉट)",

    buyerTitle: "व्यापारी / किरकोळ खरेदीदार पोर्टल",
    createDemand: "घाऊक कांदा खरेदी मागणी नोंदवा",
    availableSupply: "उपलब्ध गो अ‍ॅग्रो वर्गीकृत कांदा",
    orderAccepted: "ऑर्डर मंजूर - दर ₹३०.०० / किलो निश्चित",
    vendorPurchaseRate: "व्यापारी खरेदी दर: ₹३०.०० / किलो",
    consumerRetailSpread: "ग्राहक किरकोळ विक्री: ₹३७.०० / किलो (₹७.००/किलो नफा गाळा)",
    confirmDeliveryAtMandi: "वाशी यार्डमध्ये माल उतरवून स्वीकार करा",

    priceDistributionTitle: "पारदर्शक किंमत व पैसे वाटप रचना",
    illustrativeNotice: "ही सर्व आकडेवारी पुरवठा साखळी समजण्यासाठी प्रात्यक्षिक (इलस्ट्रेटिव्ह) मूल्ये आहेत, थेट बाजारभाव नव्हेत.",
    farmerShare: "शेतकरी शेतभाव",
    transporterShare: "वाहतूकदार भाडे",
    goAgroShare: "गो अ‍ॅग्रो संकलन व सेवा",
    agentShare: "विक्री / कमिशन एजंट",
    totalVendorPrice: "व्यापारी खरेदी एकूण दर",
    consumerRetailPrice: "ग्राहक किरकोळ मूल्य",
    shipment1000kgTitle: "१,००० किलो कांद्याचे परिपूर्ण आर्थिक विवरण",
    produceMoneyFlow: "शेतकरी ते ग्राहक संपूर्ण माल व पैशांचा प्रवाह",

    marketCompareTitle: "बाजारभाव नेट नफा तुलना इंजिन",
    marketCompareDesc: "केवळ जास्त घाऊक भाव न पाहता 'निव्वळ नफा' (विक्री भाव वजा वाहतूक, हमाली, घट आणि बाजार सेस) यावर निर्णय घ्या.",
    netRealizationTitle: "विविध बाजारांची निव्वळ प्राप्ती",
    bestCorridor: "सर्वात जास्त निव्वळ नफा देणारा मार्ग",
    grossPrice: "घाऊक बाजारभाव",
    freightCost: "वाहतूक खर्च",
    handlingCost: "हमाली व हाताळणी",
    shrinkageLoss: "वजन घट / ओलावा नुकसान",
    netRealizationPerKg: "शेतकऱ्यास मिळणारा निव्वळ दर / किलो",
  },
  hi: {
    appName: "गो एग्रो",
    appSub: "कृषि आपूर्ति श्रृंखला ऑपरेटिंग सिस्टम",
    corridorTag: "सक्रिय कॉरिडोर: सातारा हब ➔ वाशी एपीएमसी मुंबई | प्याज सीजन",
    liveTicker: "लाइव टिकर: चालू डेमो: 1,000 किग्रा प्याज | सातारा ➔ मुंबई | व्यापारी ₹30/किग्रा → किसान दर ₹27/किग्रा (50% अग्रिम ₹13.50 जमा) | स्थिति: पूर्णतः सत्यापित",
    apmcStream: "एपीएमसी लाइव स्ट्रीम: कनेक्टेड",
    roleOpsAdmin: "ऑप्स एडमिन",
    roleFarmer: "किसान पोर्टल",
    roleTransporter: "ट्रांसपोर्टर बेड़ा",
    roleAgent: "कमीशन एजेंट",
    roleBuyer: "थोक व्यापारी / खरीदार",
    rolePricing: "मूल्य व भुगतान वितरण",
    roleMarketCompare: "मंडी तुलना (शुद्ध लाभ)",
    audioGuide: "ऑडियो सहायता (मदत ऑडिओ)",
    audioGuideModalTitle: "किसान ध्वनि मार्गदर्शिका व नियम",
    audioGuideHelp: "अपनी बुकिंग, 50% अग्रिम भुगतान और धर्मकांटा वजन अधिकारों के बारे में सुनने के लिए प्ले करें।",
    dispatchOps: "डिस्पैच संचालन",
    stakeholderViews: "हितधारक दृश्य",
    mandiGateOnline: "मंडी गेट #4 ऑनलाइन",
    sataraNode: "सातारा एपीएमसी संकलन नोड",

    farmerGuarantee: "किसान प्रत्यक्ष गारंटी: शून्य छिपी कटौती • दैनिक एपीएमसी मूल्य लॉक",
    farmerName: "रमेश पाटिल",
    verifiedKYC: "सत्यापित किसान केवाईसी",
    farmerLocation: "कोरेगांव, तालुका कोरेगांव, जिला सातारा, महाराष्ट्र",
    cropSpecialty: "लाल प्याज (गरवा स्पेशल)",
    linkedAccount: "लिंक्ड बैंक खाता",
    instantUPI: "त्वरित यूपीआई ऑटोपे सत्यापित",
    updateBank: "बैंक बदलें",
    activeConsignment: "सक्रिय खेप / लॉट",
    inTransit: "पारगमन में • सातारा हब",
    expectedGateWeight: "खेत पर अपेक्षित वजन",
    verifiedHubWeight: "सत्यापित हब वजन",
    farmScaleReading: "खेत तौल रीडिंग",
    certifiedScale: "डिजिटल तौल कांटा प्रमाणित",
    committedBaseRate: "प्रतिबद्ध आधार मूल्य",
    totalEstimatedValue: "कुल अनुमानित मूल्य",
    paidInstantAdvance: "₹6,750 (50% तत्काल अग्रिम)",
    pendingFinalSettlement: "लंबित अंतिम भुगतान",
    scheduledOnAcceptance: "मुंबई मंडी में व्यापारी डिलीवरी पर स्वचालित रिलीज",
    visualProgression: "सप्लाई चेन प्रगति ट्रैकर",
    stageCompleted: "चरण 5 / 7 पूर्ण",
    downloadReceipt: "कलेक्शन रसीद डाउनलोड करें #CR-8821",
    receiptIssued: "डिजिटल हस्ताक्षरित संग्रह पर्ची जारी",
    pastDispatches: "विगत पूर्ण प्रेषण इतिहास",
    viewAll: "सभी देखें (18)",
    bookNextCrop: "अगली फसल संकलन बुक करें",
    bookCropDesc: "खेत पर ही पारदर्शी मंडी भाव प्राप्त करें, गो एग्रो से 50% तत्काल अग्रिम भुगतान अपने खाते में पाएं।",
    selectCrop: "फसल चुनें",
    onion: "प्याज (कांदा)",
    potato: "आलू (बटाटा)",
    tomato: "टमाटर (टोमॅटो)",
    garlic: "लहसुन (लसूण)",
    produceVariety: "उत्पाद की किस्म",
    estimatedQuantityKg: "अनुमानित मात्रा (किलोग्राम)",
    gunnyBagsNote: "लगभग 10 मानक 50 किग्रा बोरी के बराबर।",
    preferredDate: "माल उठाने की पसंदीदा तारीख",
    guaranteedPrice: "गो एग्रो गारंटीड मूल्य",
    totalGrossVal: "अनुमानित कुल मूल्य:",
    advancePledge50: "50% तत्काल अग्रिम प्रतिज्ञा:",
    advanceDisbursedNotice: "खेत पर तौल होते ही बैंक ऑफ महाराष्ट्र खाते में तत्काल भेजा जाएगा।",
    acceptOfferBtn: "ऑफर स्वीकारें और ट्रांसपोर्टर बुलाएं",
    saveDraftBtn: "ड्राफ्ट सहेजें / बाद में तय करें",
    ombudsmanTitle: "किसान सुरक्षा लोकपाल",
    ombudsmanSubtitle: "शून्य अनुचित कटौती नीति",
    ombudsmanDesc: "सातारा डिजिटल धर्मकांटे पर प्रत्येक ग्राम दर्ज होता है। यदि ग्रेडिंग या तौल में अंतर हो तो गो एग्रो सुरक्षा एस्क्रो से तत्काल भरपाई करता है।",
    ombudsmanPoint1: "नमी सहिष्णुता सीमा अधिकतम ±2% तक सीमित।",
    ombudsmanPoint2: "ग्रेड ए/बी छंटाई के लिए सीसीटीवी साक्ष्य सुरक्षित।",
    helpline: "सीधी किसान हेल्पलाइन",
    callNow: "कॉल करें",
    weatherTransit: "सातारा मौसम व सड़क स्थिति",
    weatherOptimal: "आर्द्रता 42% (प्याज के लिए उपयुक्त)",
    etaMumbai: "मुंबई NH48 अनुमानित समय",
    raiseComplaint: "तौल / ग्रेडिंग शिकायत दर्ज करें",

    transporterTitle: "ट्रांसपोर्टर बेड़ा प्रबंधन",
    assignedRoute: "आवंटित मार्ग: कोरेगांव / सातारा हब ➔ मुंबई वाशी एपीएमसी",
    vehicleAssigned: "वाहन: TR-102 (आयशर 14 फीट प्रो कैंटर)",
    driverName: "चालक: सुरेश शिंदे (+91 98220 44102)",
    farmersToCollect: "किसानों से माल संग्रह सूची",
    expectedWeight: "अपेक्षित मात्रा",
    actualLoadedWeight: "वास्तविक लदी मात्रा",
    confirmCollection: "खेत से पिकअप की पुष्टि करें",
    reportDiscrepancy: "वजन विसंगति रिपोर्ट करें",
    deliverToHub: "सातारा हब पर माल सुपुर्द करें",
    transporterFeePerKg: "भाड़ा दर: ₹1.75 / किग्रा",
    totalTransporterEarnings: "ट्रांसपोर्टर कुल कमाई: ₹1,750 (1,000 किग्रा पर)",
    transitChecklist: "जियो-स्टैम्प और सुरक्षा जांच",

    opsDashboardTitle: "गो एग्रो ऑपरेशंस हब व संकलन केंद्र",
    totalAggregatedSupply: "कुल एकत्रित उपज",
    activeShipmentsCount: "सक्रिय गलियारे",
    weighBridgeEntry: "डिजिटल धर्मकांटा आवक एंट्री",
    digitalGradingTitle: "गुणवत्ता छंटाई व ग्रेडिंग (55मिमी+ / 40-50मिमी)",
    gradeA: "ग्रेड ए (प्रीमियम 55मिमी+)",
    gradeB: "ग्रेड बी (मानक 40-50मिमी)",
    gradeC: "ग्रेड सी (छंटाई नुकसान / छोटा)",
    recordWeighing: "वजन दर्ज करें व डिजिटल रसीद निकालें",
    varianceToleranceNotice: "नमी विचलन सहनशीलता 2.0% पर सीमित। 2% से अधिक अंतर पर सुपरवाइजर जांच अनिवार्य।",
    approveSettlement: "शेष 50% किसान भुगतान स्वीकृत करें",

    agentTitle: "कमीशन एजेंट / आढ़तिया मार्केटप्लेस (वाशी एपीएमसी)",
    assignedLots: "बिक्री हेतु आवंटित गो एग्रो लॉट्स",
    buyerBids: "व्यापारी मांग व बोलियां",
    confirmSale: "सत्यापित थोक व्यापारी को बिक्री पक्की करें",
    agentCommissionRate: "कमीशन दर: ₹0.50 / किग्रा",
    totalCommissionEarned: "एजेंट कमीशन: ₹500 (1,000 किग्रा लॉट)",

    buyerTitle: "थोक व्यापारी / खरीदार पोर्टल",
    createDemand: "थोक प्याज खरीद आवश्यकता पोस्ट करें",
    availableSupply: "उपलब्ध गो एग्रो वर्गीकृत प्याज",
    orderAccepted: "ऑर्डर स्वीकृत - दर ₹30.00 / किग्रा लॉक",
    vendorPurchaseRate: "व्यापारी खरीद मूल्य: ₹30.00 / किग्रा",
    consumerRetailSpread: "उपभोक्ता खुदरा बिक्री: ₹37.00 / किग्रा (₹7.00/किग्रा सकल मार्जिन)",
    confirmDeliveryAtMandi: "वाशी मंडी में माल अनलोडिंग व स्वीकृति",

    priceDistributionTitle: "पारदर्शी मूल्य व धन वितरण मॉडल",
    illustrativeNotice: "ये सभी आंकड़े आपूर्ति श्रृंखला को समझने हेतु प्रोटोटाइप निदर्शी मूल्य हैं, न कि लाइव मंडी भाव।",
    farmerShare: "किसान का खेत मूल्य",
    transporterShare: "ट्रांसपोर्टर का भाड़ा",
    goAgroShare: "गो एग्रो हब व संचालन",
    agentShare: "कमीशन एजेंट का हिस्सा",
    totalVendorPrice: "व्यापारी का कुल खरीद मूल्य",
    consumerRetailPrice: "उपभोक्ता खुदरा बिक्री मूल्य",
    shipment1000kgTitle: "1,000 किग्रा प्याज की पूरी वित्तीय गणना",
    produceMoneyFlow: "किसान से उपभोक्ता तक संपूर्ण उपज व धन चक्र",

    marketCompareTitle: "मंडी शुद्ध प्राप्ति (Net Realization) इंजन",
    marketCompareDesc: "केवल सबसे ऊंचे थोक भाव पर नहीं, बल्कि 'शुद्ध आय' (बिक्री मूल्य घटाकर परिवहन, हम्माली, नमी नुकसान व मंडी टैक्स) पर निर्णय लें।",
    netRealizationTitle: "विभिन्न मंडियों की शुद्ध आय तुलना",
    bestCorridor: "सर्वाधिक शुद्ध आय देने वाला मार्ग",
    grossPrice: "थोक मंडी भाव",
    freightCost: "परिवहन / भाड़ा",
    handlingCost: "हम्माली व हैंडलिंग",
    shrinkageLoss: "नमी / वजन ह्रास नुकसान",
    netRealizationPerKg: "किसान को प्राप्त शुद्ध दर / किग्रा",
  }
};
