import axios from 'axios';
import { WeatherData, ForecastDay, HistoricalData, ModelMap } from '@/types/weather';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const weatherApi = {
  getCurrentWeather: async (cityId: string): Promise<WeatherData> => {
    try {
      const response = await api.get(`/weather/current/${cityId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching current weather:', error);
      // Return mock data for development
      return getMockCurrentWeather(cityId);
    }
  },

  getForecast: async (cityId: string, days: number = 7): Promise<ForecastDay[]> => {
    try {
      const response = await api.get(`/weather/forecast/${cityId}`, {
        params: { days },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      return getMockForecast(cityId, days);
    }
  },

  getHistoricalData: async (
    cityId: string,
    startDate: Date,
    endDate: Date
  ): Promise<HistoricalData[]> => {
    try {
      const response = await api.get(`/weather/historical/${cityId}`, {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      return getMockHistoricalData(cityId, startDate, endDate);
    }
  },

  getModelMaps: async (modelType?: string): Promise<ModelMap[]> => {
    try {
      const response = await api.get('/models/maps', {
        params: { type: modelType },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching model maps:', error);
      return getMockModelMaps();
    }
  },
};

// Mock data functions for development
function getMockCurrentWeather(cityId: string): WeatherData {
  return {
    city: cityId,
    temperature: 25 + Math.random() * 10,
    feelsLike: 24 + Math.random() * 10,
    humidity: 50 + Math.random() * 30,
    windSpeed: 5 + Math.random() * 15,
    windDirection: Math.random() * 360,
    pressure: 1010 + Math.random() * 20,
    description: 'Partly cloudy',
    icon: '02d',
    timestamp: new Date(),
  };
}

function getMockForecast(cityId: string, days: number): ForecastDay[] {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
    tempMax: 28 + Math.random() * 8,
    tempMin: 18 + Math.random() * 6,
    description: ['Clear sky', 'Partly cloudy', 'Cloudy', 'Light rain'][Math.floor(Math.random() * 4)],
    icon: ['01d', '02d', '03d', '10d'][Math.floor(Math.random() * 4)],
    precipitation: Math.random() * 10,
    humidity: 50 + Math.random() * 30,
    windSpeed: 5 + Math.random() * 15,
  }));
}

function getMockHistoricalData(cityId: string, startDate: Date, endDate: Date): HistoricalData[] {
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000),
    temperature: 20 + Math.random() * 15,
    humidity: 40 + Math.random() * 40,
    precipitation: Math.random() * 5,
  }));
}

function getMockModelMaps(): ModelMap[] {
  const now = new Date();
  const models: Array<'GFS' | 'ECMWF' | 'WRF' | 'NAM'> = ['GFS', 'ECMWF', 'WRF', 'NAM'];
  const parameters = ['Temperature', 'Precipitation', 'Wind', 'Pressure'];
  const forecastHours = [0, 6, 12, 24, 48, 72];
  
  const maps: ModelMap[] = [];
  
  models.forEach((model) => {
    parameters.forEach((parameter) => {
      forecastHours.forEach((hour) => {
        // Generate unique colors for different combinations
        const colors = {
          Temperature: { GFS: 'f59e0b', ECMWF: 'ef4444', WRF: 'f97316', NAM: 'fb923c' },
          Precipitation: { GFS: '3b82f6', ECMWF: '2563eb', WRF: '1d4ed8', NAM: '60a5fa' },
          Wind: { GFS: '10b981', ECMWF: '059669', WRF: '047857', NAM: '34d399' },
          Pressure: { GFS: '8b5cf6', ECMWF: '7c3aed', WRF: '6d28d9', NAM: 'a78bfa' },
        };
        
        const color = colors[parameter as keyof typeof colors][model];
        
        // Create SVG data URL for inline rendering (no external requests)
        const svg = `
          <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad-${model}-${parameter}-${hour}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#${color};stop-opacity:1" />
                <stop offset="50%" style="stop-color:#${color};stop-opacity:0.6" />
                <stop offset="100%" style="stop-color:#${color};stop-opacity:0.3" />
              </linearGradient>
            </defs>
            <rect width="800" height="600" fill="url(#grad-${model}-${parameter}-${hour})"/>
            <path d="M 350 100 L 380 150 L 390 250 L 410 350 L 420 450 L 430 550 L 420 560 L 400 540 L 380 480 L 370 400 L 350 320 L 340 240 L 330 180 L 340 120 Z" 
                  fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="3"/>
            <text x="20" y="50" font-family="Arial" font-size="36" font-weight="bold" fill="rgba(255,255,255,0.9)">${model}</text>
            <text x="20" y="90" font-family="Arial" font-size="28" font-weight="bold" fill="rgba(255,255,255,0.9)">${parameter}</text>
            <text x="650" y="580" font-family="Arial" font-size="20" fill="rgba(255,255,255,0.7)">+${hour}h</text>
            <rect x="20" y="520" width="180" height="60" fill="rgba(0,0,0,0.4)" rx="8"/>
            <text x="30" y="545" font-family="Arial" font-size="14" fill="white">Israel Region</text>
            <text x="30" y="565" font-family="Arial" font-size="14" fill="white">Forecast Data</text>
          </svg>
        `.trim();
        
        const mapUrl = `data:image/svg+xml;base64,${btoa(svg)}`;
        
        maps.push({
          id: `${model.toLowerCase()}-${parameter.toLowerCase()}-${hour}`,
          name: `${model} ${parameter}`,
          type: model,
          parameter: parameter,
          timestamp: now,
          forecastHour: hour,
          imageUrl: mapUrl,
        });
      });
    });
  });
  
  return maps;
}
