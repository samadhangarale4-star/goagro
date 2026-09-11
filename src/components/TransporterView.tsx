import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  CheckCircle2, 
  PhoneCall, 
  Scale, 
  Navigation,
  ShieldCheck,
  Check,
  ArrowRight
} from 'lucide-react';
import { Language, ShipmentItem } from '../types';

interface TransporterViewProps {
  shipment: ShipmentItem;
  onUpdateShipment: (updated: ShipmentItem) => void;
  lang: Language;
}

export const TransporterView: React.FC<TransporterViewProps> = ({
  shipment,
  onUpdateShipment,
  lang,
}) => {
  const [pickups, setPickups] = useState([
    {
      id: 'PK-01',
      farmerName: 'Ramesh Patil',
      village: 'Koregaon (North)',
      bags: 10,
      weightKg: 500,
      phone: '+91 98221 00123',
      status: 'collected', // or 'pending'
    },
    {
      id: 'PK-02',
      farmerName: 'Dnyaneshwar Jadhav',
      village: 'Koregaon (Bazaar Talav)',
      bags: 6,
      weightKg: 300,
      phone: '+91 98222 44551',
      status: 'collected',
    },
    {
      id: 'PK-03',
      farmerName: 'Vitthal Kadam',
      village: 'Rahimatpur Road',
      bags: 4,
      weightKg: 200,
      phone: '+91 98223 88992',
      status: 'collected',
    },
  ]);

  const [hubDelivered, setHubDelivered] = useState(shipment.currentStage >= 4);

  const totalLoadedKg = pickups.reduce((acc, p) => acc + p.weightKg, 0);
  const freightRatePerKg = 1.75;
  const totalFreight = totalLoadedKg * freightRatePerKg;

  const t = {
    en: {
      title: "Transporter Fleet Portal",
      sub: "Koregaon Farm Clusters ➔ Satara Aggregation Hub",
      driverName: "Suresh Shinde",
      vehicle: "MH-11-BV-8402 (14ft Eicher Canter)",
      earningBanner: "Freight Payout Rate: ₹1.75 / kg",
      totalLoaded: "Total Onboarded Cargo",
      freightEarned: "Your Trip Earnings",
      payoutNote: "Credited immediately after hub weigh-bridge verification",
      pickupTitle: "Today's Farm Gate Pickups (Koregaon Cluster)",
      callFarmer: "Call Farmer",
      pickedUp: "Loaded & Picked Up",
      pending: "Pending Pickup",
      bagsLabel: "Bags",
      hubButton: "Deliver to Satara Hub Weigh-Bridge",
      hubDeliveredText: "Delivered & Verified at Hub Gate #4",
      hubDesc: "Tare weight verified on central digital scale. Payout approved.",
    },
    mr: {
      title: "वाहतूकदार पोर्टल",
      sub: "कोरेगाव शिवार ➔ सातारा कृषी हब",
      driverName: "सुरेश शिंदे",
      vehicle: "MH-11-BV-8402 (आयशर १४ फूट)",
      earningBanner: "वाहतूक भाडे दर: ₹१.७५ / किलो",
      totalLoaded: "गाडीत भरलेला एकूण माल",
      freightEarned: "या फेरीचे एकूण भाडे",
      payoutNote: "सातारा हबवर काटा वजन होताच तत्काळ जमा",
      pickupTitle: "आजचे शिवार उचल यादी (कोरेगाव विभाग)",
      callFarmer: "शेतकऱ्याला फोन करा",
      pickedUp: "गाडीत भरले",
      pending: "भर बाकी",
      bagsLabel: "गोणी",
      hubButton: "सातारा हब येथे वजन व माल सुपूर्द करा",
      hubDeliveredText: "सातारा हब गेट #४ येथे माल जमा व सत्यापित",
      hubDesc: "काट्यावर अचूक वजन नोंदवले गेले आहे. भाडे मंजूर झाले.",
    },
    hi: {
      title: "ट्रांसपोर्टर फ्लीट पोर्टल",
      sub: "कोरेगांव खेत ➔ सतारा एग्री हब",
      driverName: "सुरेश शिंदे",
      vehicle: "MH-11-BV-8402 (14ft आयशर कैंटर)",
      earningBanner: "भाड़ा दर: ₹1.75 / किलो",
      totalLoaded: "गाड़ी में कुल लोड माल",
      freightEarned: "इस ट्रिप की कुल कमाई",
      payoutNote: "सतारा हब पर कांटा होते ही तुरंत भुगतान",
      pickupTitle: "आज की खेत से लोडिंग सूची (कोरेगांव)",
      callFarmer: "किसान को कॉल करें",
      pickedUp: "लोड हो गया",
      pending: "पिकअप बाकी",
      bagsLabel: "बोरी",
      hubButton: "सतारा हब पर वजन और माल सुपुर्द करें",
      hubDeliveredText: "सतारा हब गेट #4 पर माल जमा व सत्यापित",
      hubDesc: "सेंट्रल कांटे पर वजन सत्यापित। भाड़े का भुगतान स्वीकृत।",
    },
  }[lang];

  const handleTogglePickup = (id: string) => {
    setPickups((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === 'collected' ? 'pending' : 'collected' }
          : p
      )
    );
  };

  const handleDeliverToHub = () => {
    setHubDelivered(true);
    onUpdateShipment({
      ...shipment,
      verifiedHubWeightKg: totalLoadedKg,
      currentStage: Math.max(shipment.currentStage, 4),
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6 w-full">
      {/* Top Transporter Card */}
      <div className="bg-[#003b1b] rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#92f5a4] text-[#003b1b] text-xs font-bold px-2.5 py-0.5 rounded-full">
              {t.earningBanner}
            </span>
            <span className="text-xs text-emerald-200">{t.sub}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{t.driverName}</h1>
          <p className="text-sm text-emerald-100 font-mono mt-0.5">{t.vehicle}</p>
        </div>

        {/* Total Earnings Highlight */}
        <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl p-4 text-center md:text-right shrink-0">
          <span className="text-xs text-emerald-200 block font-semibold">{t.freightEarned}</span>
          <div className="text-3xl font-black text-[#92f5a4] tracking-tight">
            ₹{totalFreight.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-200 block mt-0.5">
            ({totalLoadedKg} kg @ ₹1.75/kg)
          </span>
        </div>
      </div>

      {/* Trip Load Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
            {t.totalLoaded}
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {totalLoadedKg.toLocaleString()} kg
          </div>
          <span className="text-xs text-emerald-700 font-medium">20 Standard Gunny Bags</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
            Route Corridor
          </span>
          <div className="text-base font-bold text-slate-900 mt-1">
            Koregaon ➔ Satara Hub
          </div>
          <span className="text-xs text-slate-500">18 km • Gate #4 Receiving</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
            Payment Status
          </span>
          <div className="text-base font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Direct Bank Transfer</span>
          </div>
          <span className="text-[11px] text-slate-500">Credited same-day at Hub</span>
        </div>
      </div>

      {/* Farm Gate Pickups Checklist */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">{t.pickupTitle}</h2>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {pickups.filter((p) => p.status === 'collected').length} / {pickups.length} Picked Up
          </span>
        </div>

        <div className="space-y-3">
          {pickups.map((p) => (
            <div
              key={p.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                p.status === 'collected'
                  ? 'bg-emerald-50/60 border-emerald-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3">
                <button
                  onClick={() => handleTogglePickup(p.id)}
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                    p.status === 'collected'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 border border-slate-300 text-slate-400'
                  }`}
                >
                  {p.status === 'collected' ? '✓' : ''}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{p.farmerName}</span>
                    <span className="text-xs text-slate-500 font-normal">({p.village})</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-600 mt-0.5">
                    {p.weightKg} kg • {p.bags} {t.bagsLabel} Red Onions
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`tel:${p.phone}`}
                  className="flex-1 sm:flex-none px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{t.callFarmer}</span>
                </a>

                <button
                  onClick={() => handleTogglePickup(p.id)}
                  className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    p.status === 'collected'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-slate-800 text-white'
                  }`}
                >
                  {p.status === 'collected' ? t.pickedUp : t.pending}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hub Delivery Action */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 text-center space-y-3">
        {hubDelivered ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
            <div className="flex items-center justify-center gap-2 text-emerald-900 font-bold text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>{t.hubDeliveredText}</span>
            </div>
            <p className="text-xs text-emerald-800">{t.hubDesc}</p>
          </div>
        ) : (
          <div>
            <button
              onClick={handleDeliverToHub}
              className="w-full py-4 bg-[#003b1b] hover:bg-[#005226] text-white font-black text-base rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Truck className="w-5 h-5 text-[#92f5a4]" />
              <span>{t.hubButton}</span>
            </button>
            <p className="text-xs text-slate-500 mt-2">
              Tap once you enter Satara Hub Gate #4 with the 1,000 kg consignment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
