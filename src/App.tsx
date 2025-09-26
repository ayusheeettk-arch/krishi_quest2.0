import React, { useState, useRef } from 'react';
import { 
  Home, Calendar, Award, Users, ShoppingCart, Brain, Trophy, Network, 
  Scan, User, Bell, Search, Upload, Camera, X, Settings, LogOut,
  Star, MessageCircle, ThumbsUp, Share2, Plus, Filter, MapPin,
  TrendingUp, TrendingDown, Clock, CheckCircle, AlertCircle,
  Mail, Phone, Edit, Save, Cancel, Eye, Download, Heart
} from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [userPoints, setUserPoints] = useState(1250);
  const [showScanModal, setShowScanModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [scanResults, setScanResults] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef(null);

  // User Profile Data
  const [userProfile, setUserProfile] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    location: 'Punjab, India',
    farmSize: '25 acres',
    experience: '15 years',
    crops: ['Wheat', 'Rice', 'Sugarcane'],
    avatar: null,
    joinDate: 'March 2023',
    totalTasks: 156,
    completedTasks: 142,
    badges: ['Master Planner', 'Community Helper', 'Early Adopter']
  });

  // Enhanced Tasks Data
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: 'Field Plowing', 
      description: 'Complete plowing for wheat season preparation', 
      dueText: 'Due in 3 days', 
      progress: 75, 
      urgent: true,
      points: 25,
      category: 'Field Work',
      estimatedTime: '2 days',
      difficulty: 'Medium'
    },
    { 
      id: 2, 
      title: 'Seed Planting', 
      description: 'Plant wheat seeds in prepared field', 
      dueText: 'Due in 1 week', 
      progress: 45,
      points: 30,
      category: 'Planting',
      estimatedTime: '3 days',
      difficulty: 'Easy'
    },
    { 
      id: 3, 
      title: 'Irrigation Check', 
      description: 'Inspect and maintain irrigation system', 
      dueText: 'Due tomorrow', 
      progress: 90,
      points: 15,
      category: 'Maintenance',
      estimatedTime: '4 hours',
      difficulty: 'Easy'
    },
    { 
      id: 4, 
      title: 'Pest Control', 
      description: 'Apply organic pesticide to tomato crops', 
      dueText: 'Due in 5 days', 
      progress: 20,
      points: 35,
      category: 'Crop Care',
      estimatedTime: '1 day',
      difficulty: 'Hard'
    },
    { 
      id: 5, 
      title: 'Soil Testing', 
      description: 'Collect soil samples for nutrient analysis', 
      dueText: 'Due in 2 weeks', 
      progress: 0,
      points: 20,
      category: 'Analysis',
      estimatedTime: '1 day',
      difficulty: 'Medium'
    }
  ]);

  // Enhanced Rewards Data
  const rewards = [
    { 
      id: 1,
      icon: '🚜', 
      title: 'Equipment Discount (50% off)', 
      type: 'discount',
      points: 500,
      description: 'Get 50% off on farming equipment rental',
      validUntil: '31 Dec 2024',
      category: 'Equipment'
    },
    { 
      id: 2,
      icon: '🌱', 
      title: 'Fertilizer Coupon (₹500)', 
      type: 'coupon',
      points: 300,
      description: 'Premium organic fertilizer voucher',
      validUntil: '15 Jan 2025',
      category: 'Supplies'
    },
    { 
      id: 3,
      icon: '💰', 
      title: 'Cash Withdrawal (₹2000)', 
      type: 'cash',
      points: 1000,
      description: 'Direct cash transfer to your account',
      validUntil: 'No expiry',
      category: 'Cash'
    },
    { 
      id: 4,
      icon: '🔧', 
      title: 'Premium Tools Access', 
      type: 'premium',
      points: 750,
      description: 'Access to advanced farming tools and analytics',
      validUntil: '6 months',
      category: 'Premium'
    },
    { 
      id: 5,
      icon: '📚', 
      title: 'Advanced Farming Guide', 
      type: 'guide',
      points: 200,
      description: 'Comprehensive digital farming handbook',
      validUntil: 'Lifetime access',
      category: 'Education'
    },
    { 
      id: 6,
      icon: '🌾', 
      title: 'Seed Variety Pack', 
      type: 'seeds',
      points: 400,
      description: 'Premium hybrid seeds collection',
      validUntil: '30 Nov 2024',
      category: 'Seeds'
    }
  ];

  // Enhanced Community Data
  const communityPosts = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      avatar: '👨‍🌾',
      action: 'shared a tip',
      time: '2 hours ago',
      content: '"Using neem oil spray early morning works best for pest control. I\'ve been using this method for 3 years with 95% success rate."',
      likes: 24,
      comments: 8,
      shares: 3,
      type: 'tip',
      location: 'Punjab'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      avatar: '👩‍🌾',
      action: 'earned "Master Planner" badge',
      time: '5 hours ago',
      content: 'Completed 50 planning tasks with 100% success rate! Thanks to this amazing community for all the support and guidance.',
      likes: 42,
      comments: 15,
      shares: 7,
      type: 'achievement',
      location: 'Haryana'
    },
    {
      id: 3,
      name: 'Amit Singh',
      avatar: '👨‍🌾',
      action: 'posted harvest photos',
      time: '1 day ago',
      content: '"Best wheat yield in 5 years! Thanks to the app\'s timing suggestions and weather alerts. Harvested 45 quintals per acre this season."',
      likes: 67,
      comments: 23,
      shares: 12,
      type: 'success',
      location: 'Uttar Pradesh'
    },
    {
      id: 4,
      name: 'Sunita Devi',
      avatar: '👩‍🌾',
      action: 'asked for help',
      time: '2 days ago',
      content: 'My tomato plants are showing yellow leaves. Has anyone faced this issue? Looking for organic solutions.',
      likes: 18,
      comments: 31,
      shares: 5,
      type: 'question',
      location: 'Bihar'
    }
  ];

  // Market Data
  const marketData = [
    {
      crop: 'Wheat',
      currentPrice: '₹2,250/quintal',
      change: '+5.2%',
      trend: 'up',
      demand: 'High',
      season: 'Rabi',
      bestRegions: ['Punjab', 'Haryana', 'UP']
    },
    {
      crop: 'Rice',
      currentPrice: '₹3,500/quintal',
      change: '+2.8%',
      trend: 'up',
      demand: 'Stable',
      season: 'Kharif',
      bestRegions: ['West Bengal', 'Punjab', 'Andhra Pradesh']
    },
    {
      crop: 'Tomato',
      currentPrice: '₹45/kg',
      change: '+15.3%',
      trend: 'up',
      demand: 'Very High',
      season: 'Year-round',
      bestRegions: ['Karnataka', 'Andhra Pradesh', 'Maharashtra']
    },
    {
      crop: 'Onion',
      currentPrice: '₹28/kg',
      change: '-8.1%',
      trend: 'down',
      demand: 'Medium',
      season: 'Rabi',
      bestRegions: ['Maharashtra', 'Karnataka', 'Gujarat']
    },
    {
      crop: 'Sugarcane',
      currentPrice: '₹280/quintal',
      change: '+1.5%',
      trend: 'up',
      demand: 'Stable',
      season: 'Year-round',
      bestRegions: ['Uttar Pradesh', 'Maharashtra', 'Karnataka']
    }
  ];

  // Notifications Data
  const notifications = [
    {
      id: 1,
      type: 'weather',
      title: 'Weather Alert',
      message: 'Heavy rain expected tomorrow. Protect your crops.',
      time: '1 hour ago',
      read: false
    },
    {
      id: 2,
      type: 'task',
      title: 'Task Reminder',
      message: 'Irrigation Check is due tomorrow',
      time: '3 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'community',
      title: 'New Comment',
      message: 'Priya Sharma commented on your post',
      time: '5 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'reward',
      title: 'Points Earned',
      message: 'You earned 25 points for completing Field Plowing',
      time: '1 day ago',
      read: true
    }
  ];

  // Smart Tips Data
  const smartTips = [
    {
      type: 'planting',
      title: 'Planting Tip',
      description: 'Plant seeds 2cm deep in well-drained soil for optimal germination. Morning planting gives better results.',
      color: 'border-l-yellow-500',
      icon: '🌱'
    },
    {
      type: 'weather',
      title: 'Weather Alert',
      description: 'Light rain expected tomorrow - perfect for recently planted crops. Avoid heavy machinery use.',
      color: 'border-l-blue-500',
      icon: '🌧️'
    },
    {
      type: 'market',
      title: 'Market Update',
      description: 'Tomato prices up 15% this week - good time to plan harvest and direct sales to local markets.',
      color: 'border-l-green-500',
      icon: '📊'
    },
    {
      type: 'pest',
      title: 'Pest Control',
      description: 'Early morning neem oil application is most effective. Avoid spraying during flowering stage.',
      color: 'border-l-red-500',
      icon: '🐛'
    }
  ];

  // Handle file upload for field scanning
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Simulate field scanning analysis
  const handleScanField = () => {
    if (!selectedImage) return;
    
    setIsScanning(true);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      setScanResults({
        soilHealth: 85,
        moistureLevel: 72,
        nutrientStatus: {
          nitrogen: 78,
          phosphorus: 65,
          potassium: 82
        },
        pestRisk: 'Low',
        diseaseRisk: 'Medium',
        recommendations: [
          'Increase phosphorus levels with organic fertilizer',
          'Monitor for early blight symptoms in tomatoes',
          'Irrigation recommended in 2-3 days',
          'Consider companion planting with marigolds'
        ],
        cropSuggestions: ['Wheat', 'Barley', 'Mustard'],
        confidence: 92
      });
      setIsScanning(false);
    }, 3000);
  };

  // Complete task function
  const completeTask = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        setUserPoints(prev => prev + task.points);
        return { ...task, progress: 100 };
      }
      return task;
    }));
  };

  // Redeem reward function
  const redeemReward = (rewardId, requiredPoints) => {
    if (userPoints >= requiredPoints) {
      setUserPoints(prev => prev - requiredPoints);
      alert('Reward redeemed successfully!');
    }
  };

  const NavigationBar = () => (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="text-xl font-bold text-gray-900">KrishiQuest</span>
            </div>
            <div className="flex space-x-6">
              {[
                { id: 'home', label: 'Home', icon: Home },
                { id: 'tasks', label: 'Tasks', icon: Calendar },
                { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
                { id: 'rewards', label: 'Rewards', icon: Award },
                { id: 'community', label: 'Community', icon: Users },
                { id: 'about', label: 'About', icon: Brain }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setCurrentPage(id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === id 
                      ? 'text-green-600 bg-green-50' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600">
              Points: <span className="text-green-600 font-bold">{userPoints}</span>
            </span>
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(notification => (
                      <div key={notification.id} className={`p-4 border-b hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${!notification.read ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{notification.title}</h4>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button 
              onClick={() => setShowProfileModal(true)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const ScanModal = () => (
    showScanModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Scan Your Field</h2>
            <button 
              onClick={() => {
                setShowScanModal(false);
                setSelectedImage(null);
                setScanResults(null);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6">
            {!selectedImage ? (
              <div className="text-center">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Field Photo</h3>
                  <p className="text-gray-600 mb-6">Take a photo of your field or upload from gallery</p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                    >
                      <Upload className="w-5 h-5" />
                      <span>Upload Photo</span>
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                    >
                      <Camera className="w-5 h-5" />
                      <span>Take Photo</span>
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <img 
                    src={selectedImage} 
                    alt="Field scan" 
                    className="max-w-full h-64 object-cover rounded-lg mx-auto"
                  />
                </div>
                
                {!scanResults && !isScanning && (
                  <div className="text-center">
                    <button
                      onClick={handleScanField}
                      className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2 mx-auto"
                    >
                      <Scan className="w-5 h-5" />
                      <span>Analyze Field</span>
                    </button>
                  </div>
                )}
                
                {isScanning && (
                  <div className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">Analyzing your field... This may take a few moments.</p>
                  </div>
                )}
                
                {scanResults && (
                  <div className="space-y-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-green-900 mb-2">Analysis Complete!</h3>
                      <p className="text-green-700">Confidence: {scanResults.confidence}%</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Soil Health</h4>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${scanResults.soilHealth}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{scanResults.soilHealth}% - Good</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Moisture Level</h4>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${scanResults.moistureLevel}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{scanResults.moistureLevel}% - Adequate</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Nutrient Levels</h4>
                      <div className="space-y-2">
                        {Object.entries(scanResults.nutrientStatus).map(([nutrient, level]) => (
                          <div key={nutrient} className="flex items-center justify-between">
                            <span className="text-sm text-gray-700 capitalize">{nutrient}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-yellow-500 h-2 rounded-full"
                                  style={{ width: `${level}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600">{level}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
                      <ul className="space-y-2">
                        {scanResults.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Suggested Crops</h4>
                      <div className="flex flex-wrap gap-2">
                        {scanResults.cropSuggestions.map((crop, index) => (
                          <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {crop}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );

  const ProfileModal = () => (
    showProfileModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
            <button 
              onClick={() => setShowProfileModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{userProfile.name}</h3>
              <p className="text-gray-600">{userProfile.location}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{userProfile.email}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{userProfile.phone}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farm Size</label>
                  <span className="text-gray-900">{userProfile.farmSize}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <span className="text-gray-900">{userProfile.experience}</span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                  <span className="text-gray-900">{userProfile.joinDate}</span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Primary Crops</label>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.crops.map((crop, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{userProfile.totalTasks}</div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{userProfile.completedTasks}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{userPoints}</div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Badges Earned</h4>
              <div className="flex flex-wrap gap-2">
                {userProfile.badges.map((badge, index) => (
                  <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                    <Trophy className="w-3 h-3" />
                    <span>{badge}</span>
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  const HomePage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Scan Your Field Button */}
          <div className="flex justify-center">
            <button 
              onClick={() => setShowScanModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center space-x-3 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Scan className="w-6 h-6" />
              <span className="text-lg">Scan Your Field</span>
            </button>
          </div>

          {/* Main Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              onClick={() => setCurrentPage('marketplace')}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all cursor-pointer hover:scale-105"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <ShoppingCart className="w-12 h-12 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">MarketPlace</h3>
                <p className="text-gray-600">AI-powered crop recommendations and market prices</p>
              </div>
            </div>
            <div 
              onClick={() => setCurrentPage('smart-planning')}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all cursor-pointer hover:scale-105"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <Calendar className="w-12 h-12 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Smart Planning</h3>
                <p className="text-gray-600">Perfect timing for plowing, planting, and harvesting</p>
              </div>
            </div>
            <div 
              onClick={() => setCurrentPage('rewards')}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all cursor-pointer hover:scale-105"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <Trophy className="w-12 h-12 text-yellow-600" />
                <h3 className="text-xl font-semibold text-gray-900">Reward Points</h3>
                <p className="text-gray-600">Complete tasks and earn points for farm supplies</p>
              </div>
            </div>
            <div 
              onClick={() => setCurrentPage('community')}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all cursor-pointer hover:scale-105"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <Network className="w-12 h-12 text-purple-600" />
                <h3 className="text-xl font-semibold text-gray-900">Farmer Network</h3>
                <p className="text-gray-600">Share experiences and learn from other farmers</p>
              </div>
            </div>
          </div>

          {/* Community Highlights */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Users className="w-3 h-3 text-white" />
              </div>
              <span>Community Highlights</span>
            </h3>
            <div className="space-y-4">
              {communityPosts.slice(0, 3).map((highlight, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="text-2xl">{highlight.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="font-medium text-gray-900">{highlight.name}</span>
                      <span className="text-gray-600">{highlight.action}</span>
                      <span className="text-gray-400">{highlight.time}</span>
                    </div>
                    <p className="text-gray-700 mt-1 text-sm">{highlight.content}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{highlight.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{highlight.comments}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Smart Tips */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <span>💡</span>
              <span>Today's Smart Tips</span>
            </h3>
            <div className="space-y-4">
              {smartTips.map((tip, index) => (
                <div key={index} className={`border-l-4 ${tip.color} bg-gray-50 p-4 rounded-r-lg hover:shadow-sm transition-shadow`}>
                  <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                    <span>{tip.icon}</span>
                    <span>{tip.title}</span>
                  </h4>
                  <p className="text-gray-600 mt-1">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Live Tasks */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <span>Live Tasks</span>
            </h3>
            <div className="space-y-4">
              {tasks.slice(0, 4).map((task) => (
                <div key={task.id} className="space-y-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    {task.urgent && (
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">Urgent</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <p className="text-xs text-gray-500">{task.dueText}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  {task.progress < 100 && (
                    <button
                      onClick={() => completeTask(task.id)}
                      className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                    >
                      Complete (+{task.points} pts)
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Available Rewards */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Award className="w-5 h-5 text-orange-500" />
              <span>Available Rewards</span>
            </h3>
            <div className="space-y-3">
              {rewards.slice(0, 5).map((reward, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{reward.icon}</span>
                    <div>
                      <span className="text-sm text-gray-700 block">{reward.title}</span>
                      <span className="text-xs text-gray-500">{reward.points} points</span>
                    </div>
                  </div>
                  <button
                    onClick={() => redeemReward(reward.id, reward.points)}
                    disabled={userPoints < reward.points}
                    className={`text-xs px-2 py-1 rounded ${
                      userPoints >= reward.points
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {userPoints >= reward.points ? 'Redeem' : 'Need More'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TasksPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Tasks Management</h1>
        <p className="text-gray-600">Manage your farming tasks and track progress</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">All Tasks</h2>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Task</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.difficulty === 'Easy' ? 'bg-green-100 text-green-600' :
                          task.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {task.difficulty}
                        </span>
                        {task.urgent && (
                          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">Urgent</span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{task.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{task.estimatedTime}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Award className="w-4 h-4" />
                          <span>{task.points} points</span>
                        </span>
                        <span>{task.dueText}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 mb-1">{task.progress}%</div>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Category: {task.category}</span>
                    {task.progress < 100 ? (
                      <button
                        onClick={() => completeTask(task.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                      >
                        Mark Complete
                      </button>
                    ) : (
                      <span className="text-green-600 flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Completed</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Tasks</span>
                <span className="font-semibold text-gray-900">{tasks.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Completed</span>
                <span className="font-semibold text-green-600">{tasks.filter(t => t.progress === 100).length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">In Progress</span>
                <span className="font-semibold text-blue-600">{tasks.filter(t => t.progress > 0 && t.progress < 100).length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Pending</span>
                <span className="font-semibold text-orange-600">{tasks.filter(t => t.progress === 0).length}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4 text-green-600" />
                <span>Add New Task</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Filter className="w-4 h-4 text-blue-600" />
                <span>Filter Tasks</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4 text-purple-600" />
                <span>Export Tasks</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MarketplacePage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">MarketPlace</h1>
        <p className="text-gray-600">Real-time market prices and crop recommendations</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Market Prices</h2>
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search crops..."
                  className="border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Crop</th>
                    <th className="text-left py-3 px-4">Current Price</th>
                    <th className="text-left py-3 px-4">Change</th>
                    <th className="text-left py-3 px-4">Demand</th>
                    <th className="text-left py-3 px-4">Season</th>
                  </tr>
                </thead>
                <tbody>
                  {marketData.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{item.crop}</td>
                      <td className="py-3 px-4 text-gray-700">{item.currentPrice}</td>
                      <td className="py-3 px-4">
                        <span className={`flex items-center space-x-1 ${
                          item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span>{item.change}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.demand === 'Very High' ? 'bg-red-100 text-red-600' :
                          item.demand === 'High' ? 'bg-orange-100 text-orange-600' :
                          item.demand === 'Stable' ? 'bg-green-100 text-green-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {item.demand}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{item.season}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recommended Crops</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {marketData.slice(0, 4).map((crop, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{crop.crop}</h3>
                    <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded">
                      Recommended
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600 mb-3">
                    <p>Price: {crop.currentPrice}</p>
                    <p>Demand: {crop.demand}</p>
                    <p>Season: {crop.season}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-1">Best Regions:</p>
                    <div className="flex flex-wrap gap-1">
                      {crop.bestRegions.map((region, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                          {region}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Trends</h3>
            <div className="space-y-3">
              {marketData.map((trend, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{trend.crop}</span>
                  <span className={`text-sm font-medium flex items-center space-x-1 ${
                    trend.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {trend.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>{trend.change}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <span>View Price History</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Bell className="w-4 h-4 text-orange-600" />
                <span>Set Price Alerts</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4 text-green-600" />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const RewardsPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Reward Points</h1>
        <p className="text-gray-600">Complete tasks and earn points for farm supplies</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Rewards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rewards.map((reward) => (
                <div key={reward.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-3xl">{reward.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{reward.title}</h3>
                      <p className="text-sm text-gray-600">{reward.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-medium text-green-600">{reward.points} points</span>
                        <span className="text-xs text-gray-500">{reward.validUntil}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => redeemReward(reward.id, reward.points)}
                    disabled={userPoints < reward.points}
                    className={`w-full py-2 rounded-lg transition-colors ${
                      userPoints >= reward.points
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {userPoints >= reward.points ? 'Redeem Now' : `Need ${reward.points - userPoints} more points`}
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Earn More Points</h2>
            <div className="space-y-4">
              {[
                { task: 'Complete daily field scan', points: 10, status: 'available', description: 'Use our AI scanner daily' },
                { task: 'Share farming tip with community', points: 15, status: 'available', description: 'Help other farmers learn' },
                { task: 'Complete weekly task challenge', points: 50, status: 'available', description: 'Finish all weekly tasks' },
                { task: 'Refer a new farmer', points: 100, status: 'available', description: 'Invite friends to join' },
                { task: 'Write crop review', points: 20, status: 'available', description: 'Share your harvest experience' },
                { task: 'Update profile information', points: 5, status: 'completed', description: 'Keep your profile current' }
              ].map((task, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{task.task}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className="text-sm text-green-600 font-medium">+{task.points} points</p>
                  </div>
                  <button 
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      task.status === 'completed' 
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                    disabled={task.status === 'completed'}
                  >
                    {task.status === 'completed' ? 'Completed' : 'Start Task'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Points</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{userPoints}</div>
              <p className="text-gray-600 mb-4">Total Points</p>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-700">You're in the top 15% of farmers!</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Points History</h3>
            <div className="space-y-3">
              {[
                { action: 'Field scan completed', points: '+10', time: '2 hours ago', type: 'earned' },
                { action: 'Fertilizer coupon redeemed', points: '-300', time: '1 day ago', type: 'spent' },
                { action: 'Task completed', points: '+25', time: '1 day ago', type: 'earned' },
                { action: 'Community help', points: '+15', time: '2 days ago', type: 'earned' },
                { action: 'Weekly challenge bonus', points: '+50', time: '3 days ago', type: 'earned' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-gray-900">{activity.action}</p>
                    <p className="text-gray-500">{activity.time}</p>
                  </div>
                  <span className={`font-medium ${
                    activity.type === 'earned' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {activity.points}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
            <div className="space-y-2">
              {userProfile.badges.map((badge, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-yellow-50 rounded-lg">
                  <Trophy className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm text-yellow-800">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CommunityPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Farmer Network</h1>
        <p className="text-gray-600">Share experiences and learn from other farmers</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Community Feed</h2>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Share Update</span>
              </button>
            </div>
            
            <div className="space-y-6">
              {communityPosts.map((post) => (
                <div key={post.id} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-start space-x-3">
                    <div className="text-3xl">{post.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-gray-900">{post.name}</span>
                        <span className="text-gray-500 text-sm">{post.action}</span>
                        <span className="text-gray-400 text-sm">{post.time}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          post.type === 'tip' ? 'bg-blue-100 text-blue-600' :
                          post.type === 'achievement' ? 'bg-yellow-100 text-yellow-600' :
                          post.type === 'success' ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {post.type}
                        </span>
                        <div className="flex items-center space-x-1 text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span className="text-xs">{post.location}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{post.content}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-green-600 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-purple-600 transition-colors">
                          <Share2 className="w-4 h-4" />
                          <span>{post.shares}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-red-600 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Contributors</h3>
            <div className="space-y-3">
              {[
                { name: 'Rajesh Kumar', posts: 45, badge: '🏆', points: 2340 },
                { name: 'Priya Sharma', posts: 38, badge: '🥈', points: 1890 },
                { name: 'Amit Singh', posts: 32, badge: '🥉', points: 1650 },
                { name: 'Sunita Devi', posts: 28, badge: '⭐', points: 1420 },
                { name: 'Ravi Patel', posts: 24, badge: '⭐', points: 1200 }
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{user.badge}</span>
                    <div>
                      <span className="text-sm font-medium text-gray-900">{user.name}</span>
                      <p className="text-xs text-gray-500">{user.posts} posts • {user.points} points</p>
                    </div>
                  </div>
                  <button className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200 transition-colors">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Topics</h3>
            <div className="space-y-2">
              {[
                { tag: '#PestControl', posts: 156 },
                { tag: '#WheatHarvest', posts: 89 },
                { tag: '#OrganicFarming', posts: 67 },
                { tag: '#IrrigationTips', posts: 45 },
                { tag: '#SoilHealth', posts: 34 },
                { tag: '#WeatherAlert', posts: 28 }
              ].map((topic, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 cursor-pointer transition-colors">
                    {topic.tag}
                  </span>
                  <span className="text-xs text-gray-500">{topic.posts}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4 text-green-600" />
                <span>Create Post</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Search className="w-4 h-4 text-blue-600" />
                <span>Find Farmers</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span>Join Groups</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-white font-bold text-2xl">K</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About KrishiQuest</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Empowering farmers with AI-driven insights, community support, and smart farming solutions
        </p>
      </div>

      <div className="space-y-12">
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            KrishiQuest is dedicated to revolutionizing agriculture through technology. We believe that every farmer, 
            regardless of their location or resources, deserves access to the best farming practices, market insights, 
            and community support.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our platform combines artificial intelligence, real-time data, and the collective wisdom of farming 
            communities to help farmers make informed decisions, increase yields, and build sustainable farming practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Insights</h3>
            <p className="text-gray-600">
              Our advanced AI analyzes soil conditions, weather patterns, and crop data to provide personalized 
              recommendations for optimal farming outcomes.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Driven</h3>
            <p className="text-gray-600">
              Connect with thousands of farmers, share experiences, learn from experts, and build a supportive 
              network that grows together.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Reward System</h3>
            <p className="text-gray-600">
              Earn points for completing tasks, sharing knowledge, and helping the community. Redeem rewards 
              for farming supplies and equipment.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <ShoppingCart className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Market Intelligence</h3>
            <p className="text-gray-600">
              Stay updated with real-time market prices, demand trends, and crop recommendations to maximize 
              your farming profits.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Field Scanning</h4>
                  <p className="text-sm text-gray-600">AI-powered crop and soil analysis</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Smart Planning</h4>
                  <p className="text-sm text-gray-600">Optimal timing for farming activities</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Weather Alerts</h4>
                  <p className="text-sm text-gray-600">Real-time weather notifications</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Task Management</h4>
                  <p className="text-sm text-gray-600">Organize and track farming activities</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Community Support</h4>
                  <p className="text-sm text-gray-600">Connect with fellow farmers</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Market Insights</h4>
                  <p className="text-sm text-gray-600">Live pricing and demand data</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Join Our Growing Community</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Over 50,000 farmers across India trust KrishiQuest for their farming needs. Join us today and 
            transform your farming experience with cutting-edge technology and community support.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-green-600">50K+</div>
              <div className="text-gray-600">Active Farmers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">1M+</div>
              <div className="text-gray-600">Tasks Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">25K+</div>
              <div className="text-gray-600">Acres Scanned</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Get in Touch</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">support@krishiquest.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">+91 1800-123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">New Delhi, India</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Support Hours</h3>
              <div className="space-y-2 text-gray-700">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
                <p className="text-sm text-gray-500 mt-3">
                  Emergency support available 24/7 for critical farming alerts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'tasks': return <TasksPage />;
      case 'marketplace': return <MarketplacePage />;
      case 'rewards': return <RewardsPage />;
      case 'community': return <CommunityPage />;
      case 'about': return <AboutPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      {renderPage()}
      <ScanModal />
      <ProfileModal />
    </div>
  );
}

export default App;