import React, { useState } from 'react';
import { 
  ShoppingBag, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  PhoneCall, 
  FileText, 
  TrendingUp, 
  ShieldCheck,
  Check,
  ArrowRight,
  Clock
} from 'lucide-react';
import { Language, ShipmentItem } from '../types';

interface VendorViewProps {
  shipment: ShipmentItem;
  onUpdateShipment: (updated: ShipmentItem) => void;
  lang: Language;
}

export const VendorView: React.FC<VendorViewProps> = ({
  shipment,
  onUpdateShipment,
  lang,
}) => {
  const [orderQty, setOrderQty] = useState(1000);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [deliveryConfirmed, setDeliveryConfirmed] = useState(shipment.currentStage >= 6);

  const purchaseRatePerKg = 30.0;
  const consumerRetailRatePerKg = 37.0;
  const retailProfitPerKg = consumerRetailRatePerKg - purchaseRatePerKg; // ₹7.00

  const totalPurchase = orderQty * purchaseRatePerKg;
  const totalRetailRevenue = orderQty * consumerRetailRatePerKg;
  const totalRetailProfit = orderQty * retailProfitPerKg;

  const t = {
    en: {
      buyerName: "Apex Urban Grocery Syndicate",
      buyerLocation: "Vashi APMC Wholesale Terminal, Yard #12",
      badge: "Verified Bulk Buyer",
      wholesalePriceBanner: "Direct Wholesale Purchase Price: ₹30.00 / kg",
      priceSub: "Delivered at Vashi Yard • Grade A Quality Guaranteed • Zero Wastage Deduction",
      catalogTitle: "Fresh Farm Consignments (Direct Satara Hub)",
      cropName: "Satara Red Onions (Garva Grade A - 55mm+)",
      orderBoxTitle: "Place Direct Wholesale Order",
      qtyLabel: "Consignment Quantity (kg)",
      totalPayable: "Total Wholesale Cost:",
      btnOrder: "Confirm Wholesale Order",
      orderSuccess: "Wholesale order confirmed! Sourcing from Satara Aggregation Hub.",
      inboundTitle: "Active Inbound Shipment",
      inboundId: "Consignment",
      statusEnRoute: "En Route to Mumbai Vashi (NH48 Expressway)",
      eta: "Estimated Arrival: ~2 hours",
      driverContact: "Assigned Transporter Driver",
      callDriver: "Call Driver",
      btnConfirmDelivery: "Confirm Delivery at Vashi Yard #12",
      deliveryConfirmedText: "Delivery Confirmed & Accepted at Vashi Yard #12",
      deliveryDesc: "Commercial invoice generated. Escrow payout triggered to Satara farmers.",
      retailProfitTitle: "Your Retail Unit Economics",
      retailPrice: "Retail Selling Benchmark: ₹37.00 / kg",
      yourMargin: "Gross Retail Margin:",
      expectedProfit: "Gross Profit on",
    },
    mr: {
      buyerName: "एपेक्स अर्बन ग्रोसरी सिंडिकेट",
      buyerLocation: "वाशी एपीएमसी घाऊक मार्केट, यार्ड #१२",
      badge: "अधिकृत घाऊक खरेदीदार",
      wholesalePriceBanner: "थेट घाऊक खरेदी दर: ₹३०.०० / किलो",
      priceSub: "वाशी यार्डात थेट पोहोच • ग्रेड 'अ' हमी • मध्यस्थ कपात शून्य",
      catalogTitle: "ताजा शेतीमाल (थेट सातारा हबमधून)",
      cropName: "सातारा लाल कांदा (गरवा स्पेशल - ग्रेड 'अ' ५५ मिमी+)",
      orderBoxTitle: "थेट घाऊक खरेदी नोंदवा",
      qtyLabel: "खरेदी वजन (किलो)",
      totalPayable: "एकूण देय रक्कम:",
      btnOrder: "घाऊक खरेदी निश्चित करा",
      orderSuccess: "खरेदी यशस्वी! सातारा हबमधून माल पाठवला जात आहे.",
      inboundTitle: "मार्गावरील गाडीची माहिती",
      inboundId: "माल पाठवणी क्र.",
      statusEnRoute: "मुंबई वाशी मार्गावर (पुणे-मुंबई एक्सप्रेसवे)",
      eta: "अंदाजे पोहोच वेळ: २ तास",
      driverContact: "नेमणूक केलेला चालक",
      callDriver: "चालकाला फोन करा",
      btnConfirmDelivery: "वाशी यार्डात माल मिळाला - पोच द्या",
      deliveryConfirmedText: "वाशी यार्ड #१२ येथे माल मिळाला व तपासला गेला",
      deliveryDesc: "पावती व चलन जारी केले. सातारा शेतकऱ्यांना अंतिम रक्कम अदा करण्यात आली.",
      retailProfitTitle: "किरकोळ विक्री नफा गणित",
      retailPrice: "किरकोळ ग्राहक विक्री दर: ₹३७.०० / किलो",
      yourMargin: "प्रति किलो निव्वळ मार्जिन:",
      expectedProfit: "अंदाजे एकूण नफा",
    },
    hi: {
      buyerName: "एपेक्स अर्बन ग्रॉसरी सिंडिकेट",
      buyerLocation: "वाशी एपीएमसी थोक टर्मिनल, यार्ड #12",
      badge: "सत्यापित थोक खरीदार",
      wholesalePriceBanner: "सीधा थोक क्रय मूल्य: ₹30.00 / किलो",
      priceSub: "वाशी मंडी में डिलीवरी • ग्रेड 'ए' गुणवत्ता गारंटी • कोई बिचौलिया कटौती नहीं",
      catalogTitle: "ताजी फसल खेप (सतारा हब से सीधी)",
      cropName: "सतारा लाल प्याज (गरवा स्पेशल - ग्रेड 'ए' 55mm+)",
      orderBoxTitle: "सीधा थोक ऑर्डर बुक करें",
      qtyLabel: "ऑर्डर वजन (किलो)",
      totalPayable: "कुल देय राशि:",
      btnOrder: "थोक ऑर्डर पक्का करें",
      orderSuccess: "ऑर्डर पक्का हो गया! सतारा हब से खेप रवाना।",
      inboundTitle: "आ रही गाड़ी की स्थिति",
      inboundId: "खेप सं.",
      statusEnRoute: "मुंबई वाशी की ओर (NH48 एक्सप्रेसवे)",
      eta: "अनुमानित समय: ~2 घंटे",
      driverContact: "गाड़ी का ड्राइवर",
      callDriver: "ड्राइवर को कॉल करें",
      btnConfirmDelivery: "वाशी मंडी में माल प्राप्त हुआ - पुष्टि करें",
      deliveryConfirmedText: "वाशी यार्ड #12 पर माल प्राप्त और सत्यापित",
      deliveryDesc: "चालान जारी। सतारा के किसानों को एस्क्रो से अंतिम भुगतान जारी।",
      retailProfitTitle: "खुदरा बिक्री मुनाफा विश्लेषण",
      retailPrice: "उपभोक्ता खुदरा मूल्य: ₹37.00 / किलो",
      yourMargin: "प्रति किलो ग्रॉस मार्जिन:",
      expectedProfit: "अनुमानित मुनाफा",
    },
  }[lang];

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 4000);
  };

  const handleConfirmDelivery = () => {
    setDeliveryConfirmed(true);
    onUpdateShipment({
      ...shipment,
      currentStage: Math.max(shipment.currentStage, 6),
      status: 'delivered_vendor',
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6 w-full">
      {/* Top Buyer Banner */}
      <div className="bg-[#003b1b] rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#92f5a4] text-[#003b1b] text-xs font-bold px-2.5 py-0.5 rounded-full">
              {t.badge}
            </span>
            <span className="text-xs text-emerald-200">{t.buyerLocation}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{t.buyerName}</h1>
          <p className="text-sm text-emerald-100 mt-0.5">{t.priceSub}</p>
        </div>

        {/* Wholesale Purchase Price Tag */}
        <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl p-4 text-center md:text-right shrink-0">
          <span className="text-xs text-emerald-200 block font-semibold">Direct Wholesale Price</span>
          <div className="text-3xl sm:text-4xl font-black text-[#92f5a4] tracking-tight">
            ₹30.00 <span className="text-base font-medium text-white">/ kg</span>
          </div>
          <span className="text-[11px] text-emerald-200 block mt-0.5">Delivered at Vashi Yard</span>
        </div>
      </div>

      {/* Active Inbound Delivery Tracking Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <h2 className="text-lg font-bold text-slate-900">{t.inboundTitle}</h2>
              <span className="bg-slate-100 text-slate-700 font-mono text-xs font-bold px-2 py-0.5 rounded-md">
                {shipment.id}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              1,000 kg Grade A Satara Red Onions • Sourced from Koregaon Farmers
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-900">
            <Truck className="w-4 h-4 text-emerald-700" />
            <span>{t.eta}</span>
          </div>
        </div>

        {/* Route Status */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Current Transit Location</span>
            <span className="text-sm font-bold text-slate-900 block mt-0.5">{t.statusEnRoute}</span>
            <span className="text-xs text-emerald-700 font-medium">NH48 Expressway • Near Pune-Satara Toll</span>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <span className="text-[11px] text-slate-500 block text-right">{t.driverContact}</span>
              <span className="text-xs font-bold text-slate-800 block text-right">
                {shipment.transporterName} ({shipment.vehicleNumber.split(' ')[0]})
              </span>
            </div>
            <a
              href={`tel:${shipment.transporterPhone}`}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t.callDriver}</span>
            </a>
          </div>
        </div>

        {/* Delivery Confirmation Action */}
        <div>
          {deliveryConfirmed ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-1">
              <div className="flex items-center justify-center gap-2 text-emerald-900 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{t.deliveryConfirmedText}</span>
              </div>
              <p className="text-xs text-emerald-800">{t.deliveryDesc}</p>
            </div>
          ) : (
            <button
              onClick={handleConfirmDelivery}
              className="w-full py-3.5 bg-[#003b1b] hover:bg-[#005226] text-white font-black text-sm rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4 text-[#92f5a4]" />
              <span>{t.btnConfirmDelivery}</span>
            </button>
          )}
        </div>
      </div>

      {/* Place Wholesale Order & Retail Unit Economics Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Box */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">{t.orderBoxTitle}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{t.cropName}</p>
          </div>

          {orderPlaced && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t.orderSuccess}</span>
            </div>
          )}

          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.qtyLabel}</label>
              <div className="flex gap-2">
                {[500, 1000, 2000].map((val) => (
                  <button
                    type="button"
                    key={val}
                    onClick={() => setOrderQty(val)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      orderQty === val
                        ? 'bg-[#003b1b] text-white border-[#003b1b]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {val.toLocaleString()} kg
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">{t.totalPayable}</span>
              <span className="text-xl font-black text-slate-900">
                ₹{totalPurchase.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-slate-500 ml-1">(@ ₹30/kg)</span>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.btnOrder}</span>
            </button>
          </form>
        </div>

        {/* Retail Economics Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">{t.retailProfitTitle}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{t.retailPrice}</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
              <span className="text-emerald-900 font-semibold">{t.yourMargin}</span>
              <span className="text-base font-black text-emerald-950">+₹7.00 / kg</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <span className="text-slate-600">Expected Retail Revenue ({orderQty} kg):</span>
              <span className="font-bold text-slate-900">₹{totalRetailRevenue.toLocaleString('en-IN')}</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <span className="text-slate-600">Wholesale Procurement Cost:</span>
              <span className="font-bold text-slate-900">-₹{totalPurchase.toLocaleString('en-IN')}</span>
            </div>

            <div className="p-3.5 bg-[#003b1b] text-white rounded-xl flex items-center justify-between font-bold">
              <span>{t.expectedProfit} {orderQty} kg:</span>
              <span className="text-lg text-[#92f5a4] font-black">
                +₹{totalRetailProfit.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
