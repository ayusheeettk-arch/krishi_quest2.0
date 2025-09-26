import React, { useState, useEffect } from 'react';
import { Sprout, Globe, User, MapPin, Thermometer, Cloud, Droplets, Sun } from 'lucide-react';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import SmartPlanning from './components/SmartPlanning';
import FarmGame from './components/FarmGame';
import LanguageSelector from './components/LanguageSelector';
import { useAuth } from './hooks/useAuth';
import { useTranslation } from './hooks/useTranslation';

function App() {
  const { user, loading } = useAuth();
  const { t, currentLanguage, setLanguage } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Sprout className="w-12 h-12 text-green-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Sprout className="w-8 h-8 text-green-600" />
              <h1 className="text-xl font-bold text-gray-900">{t('appTitle')}</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSelector 
                currentLanguage={currentLanguage}
                onLanguageChange={setLanguage}
              />
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: t('dashboard'), icon: Globe },
              { id: 'planning', label: t('smartPlanning'), icon: MapPin },
              { id: 'farm', label: t('farmProgress'), icon: Sprout }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'planning' && <SmartPlanning />}
        {activeTab === 'farm' && <FarmGame />}
      </main>
    </div>
  );
}

export default App;