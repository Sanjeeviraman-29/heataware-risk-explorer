const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  feelsLike: number;
  description: string;
  pressure: number;
  windSpeed: number;
  visibility: number;
  timestamp: string;
}

export interface HeatRisk {
  level: 'low' | 'moderate' | 'high' | 'extreme';
  color: string;
  priority: number;
  heatIndex: number;
  recommendations: string[];
}

export interface HistoricalData {
  date: string;
  temperature: number;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  heatIndex: number;
}

export interface AreaData {
  name: string;
  risk: string;
  population: number;
  temp: number;
  area?: string;
}

export interface WeatherResponse {
  weather: WeatherData;
  heatRisk: HeatRisk;
  historical: HistoricalData[];
  areas: AreaData[];
}

export interface DashboardSummary {
  avgTemperature: number;
  extremeAreas: number;
  affectedPopulation: number;
  riskTrend: string;
}

export interface DashboardResponse {
  summary: DashboardSummary;
  historical: HistoricalData[];
  zones: AreaData[];
  riskDistribution: {
    extreme: number;
    high: number;
    moderate: number;
    low: number;
  };
}

export interface MitigationStrategy {
  title: string;
  description: string;
  riskLevel: string[];
  priority: 'urgent' | 'high' | 'medium' | 'low';
}

export interface MitigationResponse {
  riskLevel: string;
  category: string;
  strategies: {
    immediate?: MitigationStrategy[];
    shortTerm?: MitigationStrategy[];
    longTerm?: MitigationStrategy[];
  };
  summary: {
    totalStrategies: number;
    urgentActions: number;
    recommendations: string[];
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  organization?: string;
  message: string;
  type?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  id: number;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Weather API
  async getWeatherData(city?: string, lat?: number, lon?: number): Promise<WeatherResponse> {
    const params = new URLSearchParams();
    
    if (city) {
      params.append('city', city);
    } else if (lat && lon) {
      params.append('lat', lat.toString());
      params.append('lon', lon.toString());
    }

    return this.makeRequest<WeatherResponse>(`/weather?${params.toString()}`);
  }

  // Dashboard API
  async getDashboardData(dateRange: string = '30d', location: string = 'metro-area'): Promise<DashboardResponse> {
    const params = new URLSearchParams({
      dateRange,
      location,
    });

    return this.makeRequest<DashboardResponse>(`/dashboard?${params.toString()}`);
  }

  // Mitigation API
  async getMitigationStrategies(
    riskLevel: string = 'moderate',
    category: string = 'all'
  ): Promise<MitigationResponse> {
    const params = new URLSearchParams({
      riskLevel,
      category,
    });

    return this.makeRequest<MitigationResponse>(`/mitigation?${params.toString()}`);
  }

  // Contact API
  async submitContactForm(data: ContactFormData): Promise<ContactResponse> {
    return this.makeRequest<ContactResponse>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.makeRequest<{ status: string; timestamp: string }>('/health');
  }
}

export const apiService = new ApiService();

// Export individual methods for easier use
export const weatherApi = {
  getWeatherData: (city?: string, lat?: number, lon?: number) => 
    apiService.getWeatherData(city, lat, lon),
};

export const dashboardApi = {
  getDashboardData: (dateRange?: string, location?: string) => 
    apiService.getDashboardData(dateRange, location),
};

export const mitigationApi = {
  getMitigationStrategies: (riskLevel?: string, category?: string) => 
    apiService.getMitigationStrategies(riskLevel, category),
};

export const contactApi = {
  submitContactForm: (data: ContactFormData) => 
    apiService.submitContactForm(data),
};

export default apiService;