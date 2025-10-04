export interface WeatherData {
  city: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  description: string;
  icon: string;
  timestamp: Date;
}

export interface ForecastDay {
  date: Date;
  tempMax: number;
  tempMin: number;
  description: string;
  icon: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

export interface HistoricalData {
  date: Date;
  temperature: number;
  humidity: number;
  precipitation: number;
}

export interface City {
  id: string;
  name: string;
  nameHebrew: string;
  latitude: number;
  longitude: number;
  region: string;
}

export interface ModelMap {
  id: string;
  name: string;
  type: 'GFS' | 'ECMWF' | 'WRF' | 'NAM';
  parameter: string;
  timestamp: Date;
  forecastHour: number;
  imageUrl: string;
}

export const ISRAEL_CITIES: City[] = [
  { id: 'tel-aviv', name: 'Tel Aviv', nameHebrew: 'תל אביב', latitude: 32.0853, longitude: 34.7818, region: 'Center' },
  { id: 'jerusalem', name: 'Jerusalem', nameHebrew: 'ירושלים', latitude: 31.7683, longitude: 35.2137, region: 'Jerusalem' },
  { id: 'haifa', name: 'Haifa', nameHebrew: 'חיפה', latitude: 32.7940, longitude: 34.9896, region: 'North' },
  { id: 'beersheba', name: 'Be\'er Sheva', nameHebrew: 'באר שבע', latitude: 31.2518, longitude: 34.7913, region: 'South' },
  { id: 'eilat', name: 'Eilat', nameHebrew: 'אילת', latitude: 29.5581, longitude: 34.9482, region: 'South' },
  { id: 'netanya', name: 'Netanya', nameHebrew: 'נתניה', latitude: 32.3328, longitude: 34.8567, region: 'Center' },
  { id: 'ashdod', name: 'Ashdod', nameHebrew: 'אשדוד', latitude: 31.8044, longitude: 34.6553, region: 'South' },
  { id: 'rishon-lezion', name: 'Rishon LeZion', nameHebrew: 'ראשון לציון', latitude: 31.9730, longitude: 34.7925, region: 'Center' },
  { id: 'petah-tikva', name: 'Petah Tikva', nameHebrew: 'פתח תקווה', latitude: 32.0878, longitude: 34.8878, region: 'Center' },
  { id: 'holon', name: 'Holon', nameHebrew: 'חולון', latitude: 32.0117, longitude: 34.7722, region: 'Center' },
  { id: 'bnei-brak', name: 'Bnei Brak', nameHebrew: 'בני ברק', latitude: 32.0839, longitude: 34.8339, region: 'Center' },
  { id: 'ramat-gan', name: 'Ramat Gan', nameHebrew: 'רמת גן', latitude: 32.0678, longitude: 34.8237, region: 'Center' },
  { id: 'ashkelon', name: 'Ashkelon', nameHebrew: 'אשקלון', latitude: 31.6688, longitude: 34.5742, region: 'South' },
  { id: 'rehovot', name: 'Rehovot', nameHebrew: 'רחובות', latitude: 31.8931, longitude: 34.8087, region: 'Center' },
  { id: 'bat-yam', name: 'Bat Yam', nameHebrew: 'בת ים', latitude: 32.0178, longitude: 34.7478, region: 'Center' },
  { id: 'herzliya', name: 'Herzliya', nameHebrew: 'הרצליה', latitude: 32.1628, longitude: 34.8433, region: 'Center' },
  { id: 'kfar-saba', name: 'Kfar Saba', nameHebrew: 'כפר סבא', latitude: 32.1772, longitude: 34.9086, region: 'Center' },
  { id: 'hadera', name: 'Hadera', nameHebrew: 'חדרה', latitude: 32.4339, longitude: 34.9186, region: 'North' },
  { id: 'modiin', name: 'Modi\'in', nameHebrew: 'מודיעין', latitude: 31.8967, longitude: 35.0106, region: 'Center' },
  { id: 'nazareth', name: 'Nazareth', nameHebrew: 'נצרת', latitude: 32.7022, longitude: 35.2978, region: 'North' },
  { id: 'tiberias', name: 'Tiberias', nameHebrew: 'טבריה', latitude: 32.7922, longitude: 35.5311, region: 'North' },
  { id: 'safed', name: 'Safed', nameHebrew: 'צפת', latitude: 32.9658, longitude: 35.4983, region: 'North' },
];
