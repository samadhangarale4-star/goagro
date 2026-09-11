export type Language = 'en' | 'mr' | 'hi';

export type StakeholderRole = 
  | 'farmer' 
  | 'transporter' 
  | 'admin' 
  | 'agent' 
  | 'vendor' 
  | 'pricing' 
  | 'market_compare';

export interface FarmerProfile {
  id: string;
  name: string;
  village: string;
  taluka: string;
  district: string;
  state: string;
  phone: string;
  bankName: string;
  accountEnding: string;
  upiVerified: boolean;
  kycStatus: 'verified' | 'pending';
}

export interface SupplyStage {
  id: number;
  titleKey: string;
  defaultTitle: string;
  time: string;
  descriptionKey: string;
  defaultDesc: string;
  status: 'completed' | 'active' | 'pending';
  actor?: string;
  details?: string;
}

export interface ShipmentItem {
  id: string;
  crop: string;
  variety: string;
  farmerId: string;
  farmerName: string;
  farmerVillage: string;
  transporterId: string;
  transporterName: string;
  transporterPhone: string;
  vehicleNumber: string;
  expectedWeightKg: number;
  verifiedHubWeightKg: number;
  gradeA_Kg: number; // Premium 55mm+
  gradeB_Kg: number; // Standard 40-50mm
  gradeC_Kg: number; // Small / sorting loss
  baseFarmerRatePerKg: number; // ₹27.00
  advancePaidPerKg: number; // ₹13.50 (50%)
  advancePaidTotal: number;
  advanceUpiRef: string;
  finalSettlementTotal: number;
  transporterRatePerKg: number; // ₹1.75
  transporterTotal: number;
  goAgroMarginPerKg: number; // ₹0.75
  goAgroMarginTotal: number;
  agentCommissionPerKg: number; // ₹0.50
  agentCommissionTotal: number;
  vendorPurchaseRatePerKg: number; // ₹30.00
  vendorTotal: number;
  consumerRetailRatePerKg: number; // ₹37.00
  consumerRetailTotal: number;
  vendorName: string;
  agentName: string;
  currentStage: number; // 1 to 7
  status: 'booked' | 'collected' | 'at_hub' | 'graded' | 'in_transit_mumbai' | 'delivered_vendor' | 'settled';
  corridor: string;
  pickupTime: string;
  moistureVariance: string;
  stages: SupplyStage[];
}

export interface MarketComparisonData {
  marketName: string;
  state: string;
  distanceKm: number;
  wholesaleGrossPrice: number; // ₹/kg
  transportCostPerKg: number;
  handlingHamaliPerKg: number;
  transitShrinkagePercent: number; // e.g. 2% or 4%
  mandiCessPercent: number; // e.g. 1%
  estimatedHours: string;
  isRecommended?: boolean;
}
