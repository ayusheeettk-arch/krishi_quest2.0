import React, { useState, useEffect } from 'react';
import { Thermometer, Cloud, Droplets, Sun, Wind, Eye, AlertTriangle } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useAuth } from '../hooks/useAuth';
import { getWeatherData, getCropRecommendations } from '../services/weatherService';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [cropRecommendations, setCropRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.user_metadata?.location) {
        try {
          const weather = await getWeatherData(user.user_metadata.location);
          const crops = await getCropRecommendations(user.user_metadata.location, weather);
          setWeatherData(weather);
          setCropRecommendations(crops);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t('welcome')}, {user?.user_metadata?.name || user?.email}!
        </h2>
        <p className="text-gray-600">
          {t('dashboardDescription')}
        </p>
      </div>

      {/* Weather Cards */}
      {weatherData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('temperature')}</p>
                <p className="text-2xl font-bold text-gray-900">{weatherData.temperature}°C</p>
              </div>
              <Thermometer className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('humidity')}</p>
                <p className="text-2xl font-bold text-gray-900">{weatherData.humidity}%</p>
              </div>
              <Droplets className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('windSpeed')}</p>
                <p className="text-2xl font-bold text-gray-900">{weatherData.windSpeed} km/h</p>
              </div>
              <Wind className="w-8 h-8 text-gray-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('visibility')}</p>
                <p className="text-2xl font-bold text-gray-900">{weatherData.visibility} km</p>
              </div>
              <Eye className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>
      )}

      {/* Crop Recommendations */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('cropRecommendations')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cropRecommendations.map((crop, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">{crop.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{crop.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t('suitability')}:</span>
                  <span className={`font-medium ${
                    crop.suitability === 'High' ? 'text-green-600' :
                    crop.suitability === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {crop.suitability}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t('season')}:</span>
                  <span className="text-gray-900">{crop.season}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('alerts')}</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-800">{t('weatherAlert')}</p>
              <p className="text-sm text-yellow-700">{t('weatherAlertDescription')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;