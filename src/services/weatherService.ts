// Mock weather service for demonstration
// In a real app, this would connect to a weather API like OpenWeatherMap

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  condition: string;
  location: string;
}

export interface CropRecommendation {
  name: string;
  description: string;
  suitability: 'High' | 'Medium' | 'Low';
  season: string;
}

export const getWeatherData = async (location: string): Promise<WeatherData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock weather data based on location
  const mockData: WeatherData = {
    temperature: Math.floor(Math.random() * 15) + 20, // 20-35°C
    humidity: Math.floor(Math.random() * 30) + 50, // 50-80%
    windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
    visibility: Math.floor(Math.random() * 5) + 10, // 10-15 km
    condition: ['sunny', 'cloudy', 'partly-cloudy'][Math.floor(Math.random() * 3)],
    location
  };
  
  return mockData;
};

export const getCropRecommendations = async (
  location: string, 
  weather: WeatherData
): Promise<CropRecommendation[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock crop recommendations based on weather and location
  const crops = [
    {
      name: 'Rice',
      description: 'High-yield variety suitable for monsoon season',
      suitability: 'High' as const,
      season: 'Kharif'
    },
    {
      name: 'Wheat',
      description: 'Winter crop with good market demand',
      suitability: weather.temperature < 25 ? 'High' as const : 'Medium' as const,
      season: 'Rabi'
    },
    {
      name: 'Corn',
      description: 'Versatile crop suitable for various conditions',
      suitability: 'Medium' as const,
      season: 'Kharif'
    },
    {
      name: 'Tomato',
      description: 'High-value vegetable crop',
      suitability: weather.humidity < 70 ? 'High' as const : 'Medium' as const,
      season: 'Year-round'
    },
    {
      name: 'Cotton',
      description: 'Cash crop with good export potential',
      suitability: weather.temperature > 25 ? 'High' as const : 'Low' as const,
      season: 'Kharif'
    },
    {
      name: 'Sugarcane',
      description: 'Long-duration crop with steady income',
      suitability: weather.humidity > 60 ? 'High' as const : 'Medium' as const,
      season: 'Year-round'
    }
  ];
  
  return crops.slice(0, 4); // Return top 4 recommendations
};