import React, { useState } from 'react';
import { Header } from './components/Header';
import { LoginPage } from './components/LoginPage';
import { FarmerView } from './components/FarmerView';
import { TransporterView } from './components/TransporterView';
import { VendorView } from './components/VendorView';
import { PriceBreakdownModal } from './components/PriceBreakdownModal';
import { ReceiptModal } from './components/ReceiptModal';
import { AudioGuideModal } from './components/AudioGuideModal';
import { ComplaintModal } from './components/ComplaintModal';
import { defaultShipments } from './data/mockData';
import { predefinedUsers } from './data/mockUsers';
import { Language, StakeholderRole, ShipmentItem, AppUser } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [currentRole, setCurrentRole] = useState<StakeholderRole>('farmer');
  const [language, setLanguage] = useState<Language>('en');
  const [shipments, setShipments] = useState<ShipmentItem[]>(defaultShipments);
  const [activeShipmentId, setActiveShipmentId] = useState<string>('GA-ON-00125');

  // Modals state
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showAudioGuideModal, setShowAudioGuideModal] = useState(false);
  const [showComplaintModal, setShowComplaintModal] = useState(false);

  const activeShipment = shipments.find((s) => s.id === activeShipmentId) || shipments[0];

  const handleLoginSuccess = (user: AppUser) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleSelectRole = (role: StakeholderRole) => {
    setCurrentRole(role);
    if (role === 'farmer' || role === 'transporter' || role === 'vendor') {
      setCurrentUser(predefinedUsers[role]);
    }
  };

  const handleUpdateShipment = (updated: ShipmentItem) => {
    setShipments((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleAddNewBooking = (booking: { crop: string; variety: string; qtyKg: number; date: string }) => {
    const newId = `GA-ON-00${Math.floor(130 + Math.random() * 50)}`;
    const grossVal = booking.qtyKg * 27.0;
    const advanceVal = grossVal * 0.5;

    const newShipment: ShipmentItem = {
      id: newId,
      farmerId: 'PAT-SAT-482',
      farmerName: 'Ramesh Patil',
      farmerVillage: 'Koregaon, Satara',
      transporterId: 'TR-102',
      transporterName: 'Suresh Shinde',
      transporterPhone: '+91 98220 44102',
      vehicleNumber: 'MH-11-BV-8402 (Eicher 14ft Canter)',
      crop: booking.crop,
      variety: booking.variety,
      expectedWeightKg: booking.qtyKg,
      verifiedHubWeightKg: booking.qtyKg,
      baseFarmerRatePerKg: 27.0,
      advancePaidPerKg: 13.5,
      advancePaidTotal: advanceVal,
      advanceUpiRef: `UPI${Math.floor(1000000 + Math.random() * 9000000)}`,
      finalSettlementTotal: advanceVal,
      transporterRatePerKg: 1.75,
      transporterTotal: booking.qtyKg * 1.75,
      goAgroMarginPerKg: 0.75,
      goAgroMarginTotal: booking.qtyKg * 0.75,
      agentCommissionPerKg: 0.50,
      agentCommissionTotal: booking.qtyKg * 0.50,
      vendorPurchaseRatePerKg: 30.0,
      vendorTotal: booking.qtyKg * 30.0,
      consumerRetailRatePerKg: 37.0,
      consumerRetailTotal: booking.qtyKg * 37.0,
      vendorName: 'Apex Urban Grocery Syndicate',
      agentName: 'Dilip Deshmukh',
      currentStage: 1,
      status: 'booked',
      corridor: 'Satara Hub ➔ Mumbai Vashi (NH48)',
      pickupTime: `${booking.date} 09:00 AM`,
      moistureVariance: '0.0%',
      stages: [
        { id: 1, titleKey: 'Supply Accepted by Go Agro', defaultTitle: 'Supply Accepted by Go Agro', descriptionKey: 'Offer locked at ₹27.00/kg guaranteed farm gate benchmark.', defaultDesc: 'Offer locked at ₹27.00/kg guaranteed farm gate benchmark.', time: 'Just now', status: 'completed' },
        { id: 2, titleKey: 'Transporter Assigned', defaultTitle: 'Transporter Assigned', descriptionKey: 'Aggregator truck queued for Koregaon corridor collection.', defaultDesc: 'Aggregator truck queued for Koregaon corridor collection.', time: 'Pending', status: 'active' },
        { id: 3, titleKey: 'Produce Collected from Farm Gate', defaultTitle: 'Produce Collected from Farm Gate', descriptionKey: 'Bags loaded with digital tare weigh receipt.', defaultDesc: 'Bags loaded with digital tare weigh receipt.', time: 'Pending', status: 'pending' },
        { id: 4, titleKey: 'Received & Weighed at Satara Hub', defaultTitle: 'Received & Weighed at Satara Hub', descriptionKey: 'Central digital scale verification at Hub gate #4.', defaultDesc: 'Central digital scale verification at Hub gate #4.', time: 'Pending', status: 'pending' },
        { id: 5, titleKey: 'Quality Grading & Batch Sorting', defaultTitle: 'Quality Grading & Batch Sorting', descriptionKey: 'Grading into Grade A (55mm+) and Grade B (40-50mm).', defaultDesc: 'Grading into Grade A (55mm+) and Grade B (40-50mm).', time: 'Pending', status: 'pending' },
        { id: 6, titleKey: 'Transfer & Sale to Mumbai Vendor', defaultTitle: 'Transfer & Sale to Mumbai Vendor', descriptionKey: 'APMC terminal sale to verified buyer at ₹30/kg.', defaultDesc: 'APMC terminal sale to verified buyer at ₹30/kg.', time: 'Pending', status: 'pending' },
        { id: 7, titleKey: 'Final Escrow Payment Release', defaultTitle: 'Final Escrow Payment Release', descriptionKey: 'Remaining 50% balance sent to Bank of Maharashtra A/C.', defaultDesc: 'Remaining 50% balance sent to Bank of Maharashtra A/C.', time: 'Pending', status: 'pending' },
      ],
      gradeA_Kg: Math.round(booking.qtyKg * 0.67),
      gradeB_Kg: Math.round(booking.qtyKg * 0.33),
      gradeC_Kg: 0,
    };

    setShipments((prev) => [newShipment, ...prev]);
    setActiveShipmentId(newId);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 flex flex-col font-sans antialiased selection:bg-[#92f5a4] selection:text-[#003b1b]">
      {/* If not logged in, show dedicated 3-Role Login Page */}
      {!currentUser ? (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          lang={language}
          onSelectLang={setLanguage}
          onOpenAudioGuide={() => setShowAudioGuideModal(true)}
        />
      ) : (
        <>
          {/* Streamlined Clean Header with 3 Role Tabs & Account Status */}
          <Header
            currentRole={currentRole}
            onSelectRole={handleSelectRole}
            currentUser={currentUser}
            onLogout={handleLogout}
            lang={language}
            onSelectLang={setLanguage}
            onOpenAudioGuide={() => setShowAudioGuideModal(true)}
            onOpenPriceModal={() => setShowPriceModal(true)}
          />

          {/* Main Role Content (Full-width clean card layout, no cumbersome sidebar) */}
          <main className="flex-1 w-full flex flex-col pb-12">
            {currentRole === 'farmer' && (
              <FarmerView
                shipments={shipments}
                currentShipment={activeShipment}
                onSelectShipment={setActiveShipmentId}
                onAddBooking={handleAddNewBooking}
                lang={language}
                onSelectLang={setLanguage}
                onOpenAudioGuide={() => setShowAudioGuideModal(true)}
                onOpenReceipt={() => setShowReceiptModal(true)}
                onOpenComplaint={() => setShowComplaintModal(true)}
              />
            )}

            {currentRole === 'transporter' && (
              <TransporterView
                shipment={activeShipment}
                onUpdateShipment={handleUpdateShipment}
                lang={language}
              />
            )}

            {currentRole === 'vendor' && (
              <VendorView
                shipment={activeShipment}
                onUpdateShipment={handleUpdateShipment}
                lang={language}
              />
            )}
          </main>

          {/* Simple Footer */}
          <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
            <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>
                <strong className="text-[#003b1b]">Go Agro</strong> • Direct Satara to Mumbai Agricultural Corridor
              </span>
              <span className="text-[11px] text-slate-400">
                Guaranteed ₹27/kg Farm Gate • ₹1.75/kg Transporter • ₹30/kg Bulk Buyer
              </span>
            </div>
          </footer>
        </>
      )}

      {/* Modals */}
      <PriceBreakdownModal
        isOpen={showPriceModal}
        onClose={() => setShowPriceModal(false)}
        shipment={activeShipment}
        lang={language}
      />

      <ReceiptModal
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        shipment={activeShipment}
        lang={language}
      />

      <AudioGuideModal
        isOpen={showAudioGuideModal}
        onClose={() => setShowAudioGuideModal(false)}
        lang={language}
      />

      <ComplaintModal
        isOpen={showComplaintModal}
        onClose={() => setShowComplaintModal(false)}
        shipmentId={activeShipment.id}
        farmerName={activeShipment.farmerName}
        lang={language}
      />
    </div>
  );
}
