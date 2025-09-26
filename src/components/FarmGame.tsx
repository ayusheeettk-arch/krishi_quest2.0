import React, { useState, useEffect } from 'react';
import { Camera, Upload, Sprout, Star, Trophy, Target } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useAuth } from '../hooks/useAuth';

interface FarmProgress {
  level: number;
  experience: number;
  maxExperience: number;
  completedTasks: number;
  totalTasks: number;
  crops: Array<{
    id: string;
    type: string;
    stage: number;
    position: { x: number; y: number };
  }>;
}

const FarmGame: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [farmProgress, setFarmProgress] = useState<FarmProgress>({
    level: 1,
    experience: 0,
    maxExperience: 100,
    completedTasks: 0,
    totalTasks: 10,
    crops: []
  });
  const [fieldScanned, setFieldScanned] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    // Load farm progress from localStorage or API
    const savedProgress = localStorage.getItem(`farm_progress_${user?.id}`);
    if (savedProgress) {
      setFarmProgress(JSON.parse(savedProgress));
      setFieldScanned(true);
    }
  }, [user]);

  const handleFieldScan = (file: File) => {
    // Simulate field scanning and 2D model creation
    const reader = new FileReader();
    reader.onload = () => {
      // Generate initial crops based on "scanned" field
      const initialCrops = Array.from({ length: 6 }, (_, i) => ({
        id: `crop_${i}`,
        type: ['wheat', 'corn', 'tomato', 'carrot'][Math.floor(Math.random() * 4)],
        stage: 0,
        position: {
          x: 20 + (i % 3) * 120,
          y: 40 + Math.floor(i / 3) * 80
        }
      }));

      const newProgress = {
        ...farmProgress,
        crops: initialCrops
      };

      setFarmProgress(newProgress);
      setFieldScanned(true);
      setShowUpload(false);
      localStorage.setItem(`farm_progress_${user?.id}`, JSON.stringify(newProgress));
    };
    reader.readAsDataURL(file);
  };

  const completeTask = () => {
    const newProgress = {
      ...farmProgress,
      completedTasks: farmProgress.completedTasks + 1,
      experience: farmProgress.experience + 20,
      crops: farmProgress.crops.map(crop => ({
        ...crop,
        stage: Math.min(crop.stage + 1, 4)
      }))
    };

    if (newProgress.experience >= newProgress.maxExperience) {
      newProgress.level += 1;
      newProgress.experience = 0;
      newProgress.maxExperience += 50;
    }

    setFarmProgress(newProgress);
    localStorage.setItem(`farm_progress_${user?.id}`, JSON.stringify(newProgress));
  };

  const getCropEmoji = (type: string, stage: number) => {
    const crops = {
      wheat: ['🌱', '🌿', '🌾', '🌾', '🌾'],
      corn: ['🌱', '🌿', '🌽', '🌽', '🌽'],
      tomato: ['🌱', '🌿', '🍅', '🍅', '🍅'],
      carrot: ['🌱', '🌿', '🥕', '🥕', '🥕']
    };
    return crops[type as keyof typeof crops]?.[stage] || '🌱';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('farmProgress')}</h2>
        <p className="text-gray-600">{t('farmGameDescription')}</p>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('level')}</p>
              <p className="text-2xl font-bold text-green-600">{farmProgress.level}</p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('experience')}</p>
              <p className="text-2xl font-bold text-blue-600">
                {farmProgress.experience}/{farmProgress.maxExperience}
              </p>
            </div>
            <Trophy className="w-8 h-8 text-blue-500" />
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(farmProgress.experience / farmProgress.maxExperience) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('tasksCompleted')}</p>
              <p className="text-2xl font-bold text-purple-600">
                {farmProgress.completedTasks}/{farmProgress.totalTasks}
              </p>
            </div>
            <Target className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('crops')}</p>
              <p className="text-2xl font-bold text-green-600">{farmProgress.crops.length}</p>
            </div>
            <Sprout className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Field Scanner */}
      {!fieldScanned && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-center">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('scanYourField')}</h3>
            <p className="text-gray-600 mb-6">{t('scanFieldDescription')}</p>
            <button
              onClick={() => setShowUpload(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              {t('uploadFieldPhoto')}
            </button>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('uploadFieldPhoto')}</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFieldScan(file);
                }}
                className="hidden"
                id="field-upload"
              />
              <label
                htmlFor="field-upload"
                className="cursor-pointer text-green-600 hover:text-green-700 font-medium"
              >
                {t('chooseFile')}
              </label>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowUpload(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2D Farm View */}
      {fieldScanned && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{t('yourFarm')}</h3>
            <button
              onClick={completeTask}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              {t('completeTask')}
            </button>
          </div>
          
          <div className="relative bg-gradient-to-b from-blue-100 to-green-100 rounded-lg h-64 overflow-hidden">
            {/* Sky */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-blue-200 to-blue-100">
              <div className="absolute top-2 right-4 text-2xl">☀️</div>
              <div className="absolute top-3 left-8 text-lg">☁️</div>
            </div>
            
            {/* Ground */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-green-200 to-green-100">
              {/* Crops */}
              {farmProgress.crops.map(crop => (
                <div
                  key={crop.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 text-2xl transition-all duration-1000"
                  style={{
                    left: `${crop.position.x}px`,
                    top: `${crop.position.y + 80}px`,
                    transform: `scale(${0.8 + crop.stage * 0.3})`
                  }}
                >
                  {getCropEmoji(crop.type, crop.stage)}
                </div>
              ))}
              
              {/* Farm elements */}
              <div className="absolute bottom-4 right-4 text-3xl">🏠</div>
              <div className="absolute bottom-8 left-4 text-2xl">🚜</div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600 text-center">
            {t('farmProgressDescription')}
          </div>
        </div>
      )}

      {/* Achievements */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('achievements')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg border-2 ${farmProgress.level >= 2 ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 bg-gray-50'}`}>
            <div className="text-center">
              <div className="text-2xl mb-2">🌱</div>
              <h4 className="font-medium text-gray-900">{t('firstSprout')}</h4>
              <p className="text-sm text-gray-600">{t('reachLevel2')}</p>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg border-2 ${farmProgress.completedTasks >= 5 ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
            <div className="text-center">
              <div className="text-2xl mb-2">🌾</div>
              <h4 className="font-medium text-gray-900">{t('taskMaster')}</h4>
              <p className="text-sm text-gray-600">{t('complete5Tasks')}</p>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg border-2 ${farmProgress.crops.some(c => c.stage >= 4) ? 'border-purple-300 bg-purple-50' : 'border-gray-200 bg-gray-50'}`}>
            <div className="text-center">
              <div className="text-2xl mb-2">🏆</div>
              <h4 className="font-medium text-gray-900">{t('masterFarmer')}</h4>
              <p className="text-sm text-gray-600">{t('growFullyCrop')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmGame;