const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-api.com' 
  : 'http://localhost:5000';

// Types for API responses
export interface WeatherData {
  location: string;
  current: {
    temperature: number;
    humidity: number;
    feelsLike: number;
    description: string;
    heatIndex: number;
    riskLevel: 'low' | 'moderate' | 'high' | 'extreme';
  };
  risk: {
    level: 'low' | 'moderate' | 'high' | 'extreme';
    score: number;
    tips: string[];
  };
  timestamp: string;
}

export interface ForecastData {
  location: string;
  forecast: {
    time: string;
    temperature: number;
    humidity: number;
    heatIndex: number;
    riskLevel: 'low' | 'moderate' | 'high' | 'extreme';
    description: string;
  }[];
  timestamp: string;
}

export interface MitigationStrategies {
  riskLevel: string;
  strategies: {
    personal: string[];
    community: string[];
    infrastructure: string[];
  };
  timestamp: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
}

export interface FeedbackSubmission {
  name?: string;
  email?: string;
  rating?: number;
  category: string;
  feedback: string;
  anonymous?: boolean;
}

// Generic API response wrapper
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// Weather API functions
export const weatherApi = {
  async getCurrentWeather(city: string): Promise<WeatherData> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/weather?city=${encodeURIComponent(city)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch weather data');
      }
      
      const result: ApiResponse<WeatherData> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Weather API error:', error);
      throw error;
    }
  },

  async getCurrentWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/weather?lat=${lat}&lon=${lon}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch weather data');
      }
      
      const result: ApiResponse<WeatherData> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Weather API error:', error);
      throw error;
    }
  },

  async getForecast(city: string): Promise<ForecastData> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/weather/forecast?city=${encodeURIComponent(city)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch forecast data');
      }
      
      const result: ApiResponse<ForecastData> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Forecast API error:', error);
      throw error;
    }
  },

  async getForecastByCoords(lat: number, lon: number): Promise<ForecastData> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/weather/forecast?lat=${lat}&lon=${lon}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch forecast data');
      }
      
      const result: ApiResponse<ForecastData> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Forecast API error:', error);
      throw error;
    }
  }
};

// Mitigation API functions
export const mitigationApi = {
  async getStrategies(level?: string): Promise<MitigationStrategies> {
    try {
      const url = level 
        ? `${API_BASE_URL}/api/mitigation/strategies?level=${level}`
        : `${API_BASE_URL}/api/mitigation/strategies`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch mitigation strategies');
      }
      
      const result: ApiResponse<MitigationStrategies> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Mitigation API error:', error);
      throw error;
    }
  },

  async getTips(category?: string): Promise<any> {
    try {
      const url = category 
        ? `${API_BASE_URL}/api/mitigation/tips?category=${category}`
        : `${API_BASE_URL}/api/mitigation/tips`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch mitigation tips');
      }
      
      const result: ApiResponse<any> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Mitigation tips API error:', error);
      throw error;
    }
  },

  async getResources(): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mitigation/resources`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch resources');
      }
      
      const result: ApiResponse<any> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Resources API error:', error);
      throw error;
    }
  }
};

// Contact API functions
export const contactApi = {
  async submitContact(contactData: ContactSubmission): Promise<{ id: string; timestamp: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit contact form');
      }
      
      const result: ApiResponse<{ id: string; timestamp: string }> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Contact API error:', error);
      throw error;
    }
  },

  async submitFeedback(feedbackData: FeedbackSubmission): Promise<{ id: string; timestamp: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit feedback');
      }
      
      const result: ApiResponse<{ id: string; timestamp: string }> = await response.json();
      return result.data;
    } catch (error) {
      console.error('Feedback API error:', error);
      throw error;
    }
  }
};

// Health check function
export const healthCheck = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return response.ok;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
};

// Utility function to get user's location
export const getCurrentLocation = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        reject(new Error('Unable to retrieve location'));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};