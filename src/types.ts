export type LanguageCode = 'en' | 'sw' | 'ki' | 'luo' | 'luh' | 'kal' | 'kam' | 'som';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flagEmoji: string;
  greeting: string;
}

export interface FarmerProfile {
  phone: string;
  name: string;
  county: string;
  subCounty?: string;
  farmSizeAcres: number;
  primaryCrops: string[];
  livestock: string[];
  preferredLanguage: LanguageCode;
  isAuthenticated: boolean;
  token?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  audioUrl?: string;
  imageUrl?: string;
  language?: LanguageCode;
  toolData?: {
    type: 'disease_result' | 'price_card' | 'product_recommendation' | 'weather_alert' | 'quick_action';
    data: any;
  };
  isLoading?: boolean;
}

export interface DiseaseDiagnosis {
  id: string;
  plantName: string;
  diseaseName: string;
  localName?: string;
  scientificName?: string;
  confidence: number;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  symptoms: string[];
  causes: string[];
  organicTreatment: string[];
  chemicalTreatment: string[];
  preventiveMeasures: string[];
  estimatedYieldLoss?: string;
  recommendedProducts: {
    name: string;
    category: string;
    dosage: string;
    priceKES: number;
    marketplaceId?: string;
  }[];
  urgencyDays: number;
}

export interface MarketPrice {
  id: string;
  commodity: string;
  category: 'Cereals & Grains' | 'Vegetables' | 'Legumes' | 'Fruits' | 'Roots & Tubers' | 'Livestock & Poultry';
  unit: string; // e.g. "90 kg bag", "1 kg", "50 kg bag", "Crate (64kg)"
  wholesalePriceKES: number;
  retailPriceKES: number;
  previousWholesaleKES: number;
  changePercentage: number;
  marketName: string; // e.g. "Wakulima Market (Nairobi)", "Kongowea (Mombasa)"
  county: string;
  dateUpdated: string;
  trend: 'up' | 'down' | 'stable';
  supplyStatus: 'Scarce' | 'Moderate' | 'Abundant';
  notes?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'Seeds' | 'Fertilizers' | 'Crop Protection' | 'Tools & Irrigation' | 'Animal Feeds';
  brand: string;
  packageSize: string;
  priceKES: number;
  originalPriceKES?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  isCertified: boolean;
  certifyingBody: string; // e.g. "KEPHIS Approved", "PCPB Registered", "KEBS Quality"
  seller: {
    name: string;
    location: string;
    county: string;
    phone: string;
    verified: boolean;
  };
  image: string;
  description: string;
  suitableCrops: string[];
  applicationRate: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface CountyWeather {
  county: string;
  temperatureC: number;
  condition: string;
  rainfallProbability: number;
  humidity: number;
  advisory: string;
  forecast: {
    day: string;
    temp: number;
    rainProb: number;
    icon: string;
  }[];
}
