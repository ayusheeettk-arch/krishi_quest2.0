import React, { useState } from 'react';
import { Home, Calendar, Award, Users, ShoppingCart, Brain, Trophy, Network, Scan, User, Bell, Search } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [userPoints, setUserPoints] = useState(120);

  const tasks = [
    { id: 1, title: 'Field Plowing', description: 'Complete within 3 days', dueText: 'Due in 3 days', progress: 75, urgent: true },
    { id: 2, title: 'Seed Planting', description: 'Plant season crops', dueText: 'Due in 1 week', progress: 45 },
    { id: 3, title: 'Irrigation Check', description: 'Inspect irrigation system', dueText: 'Due tomorrow', progress: 90 },
    { id: 4, title: 'Pest Control', description: 'Apply organic pesticide', dueText: 'Due in 5 days', progress: 20 },
  ];

  const rewards = [
    { icon: '🚜', title: 'Equipment Discount (50% off)', type: 'discount' },
    { icon: '🌱', title: 'Fertilizer Coupon (₹500)', type: 'coupon' },
    { icon: '💰', title: 'Cash Withdrawal (₹2000)', type: 'cash' },
    { icon: '🔧', title: 'Premium Tools Access', type: 'premium' },
    { icon: '📚', title: 'Advanced Farming Guide', type: 'guide' },
  ];

  const communityHighlights = [
    {
      name: 'Rajesh Kumar',
      action: 'shared a tip',
      time: '2 hours ago',
      content: '"Using neem oil spray early morning works best for pest control"'
    },
    {
      name: 'Priya Sharma',
      action: 'earned "Master Planner" badge',
      time: '5 hours ago',
      content: 'Completed 50 planning tasks with 100% success rate'
    },
    {
      name: 'Amit',
      action: 'posted harvest photos',
      time: '1 day ago',
      content: '"Best wheat yield in 5 years! Thanks to the app\'s timing suggestions"'
    }
  ];

  const smartTips = [
    {
      type: 'planting',
      title: 'Planting Tip',
      description: 'Plant seeds 2cm deep in well-drained soil for optimal germination',
      color: 'border-l-yellow-500'
    },
    {
      type: 'weather',
      title: 'Weather Alert',
      description: 'Light rain expected tomorrow - perfect for recently planted crops',
      color: 'border-l-blue-500'
    },
    {
      type: 'market',
      title: 'Market Update',
      description: 'Tomato prices up 15% this week - good time to plan harvest',
      color: 'border-l-green-500'
    }
  ];

  const NavigationBar = () => (
    <nav className="bg-white shadow-sm border-b">
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
                { id: 'rewards', label: 'Rewards', icon: Award },
                { id: 'community', label: 'Community', icon: Users }
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
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Scan Your Field Button */}
          <div className="flex justify-center">
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center space-x-3 transition-colors shadow-lg">
              <Scan className="w-6 h-6" />
              <span className="text-lg">Scan Your Field</span>
            </button>
          </div>

          {/* Main Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              onClick={() => setCurrentPage('marketplace')}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <ShoppingCart className="w-12 h-12 text-gray-600" />
                <h3 className="text-xl font-semibold text-gray-900">MarketPlace</h3>
                <p className="text-gray-600">AI-powered crop recommendations based on soil analysis</p>
              </div>
            </div>
            <div 
              onClick={() => setCurrentPage('smart-planning')}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <Calendar className="w-12 h-12 text-gray-600" />
                <h3 className="text-xl font-semibold text-gray-900">Smart Planning</h3>
                <p className="text-gray-600">Perfect timing for plowing, planting, and harvesting</p>
              </div>
            </div>
            <div 
              onClick={() => setCurrentPage('reward-points')}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <Trophy className="w-12 h-12 text-gray-600" />
                <h3 className="text-xl font-semibold text-gray-900">Reward Points</h3>
                <p className="text-gray-600">Complete tasks and earn points for farm supplies</p>
              </div>
            </div>
            <div 
              onClick={() => setCurrentPage('farmer-network')}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <Network className="w-12 h-12 text-gray-600" />
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
              {communityHighlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="font-medium text-gray-900">{highlight.name}</span>
                      <span className="text-gray-600">{highlight.action}</span>
                      <span className="text-gray-400">{highlight.time}</span>
                    </div>
                    <p className="text-gray-700 mt-1">{highlight.content}</p>
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
                <div key={index} className={`border-l-4 ${tip.color} bg-gray-50 p-4 rounded-r-lg`}>
                  <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                    <span>{tip.type === 'planting' ? '🌱' : tip.type === 'weather' ? '🌧️' : '📊'}</span>
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
              {tasks.map((task) => (
                <div key={task.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    {task.urgent && (
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">Level Up!</span>
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
              {rewards.map((reward, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <span className="text-2xl">{reward.icon}</span>
                  <span className="text-sm text-gray-700">{reward.title}</span>
                </div>
              ))}
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
        <p className="text-gray-600">AI-powered crop recommendations based on soil analysis</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recommended Crops</h2>
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search crops..."
                  className="border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Tomatoes', season: 'Summer', price: '₹45/kg', demand: 'High', compatibility: 95 },
                { name: 'Wheat', season: 'Winter', price: '₹22/kg', demand: 'Medium', compatibility: 88 },
                { name: 'Rice', season: 'Monsoon', price: '₹35/kg', demand: 'High', compatibility: 92 },
                { name: 'Sugarcane', season: 'Year-round', price: '₹280/quintal', demand: 'Stable', compatibility: 78 }
              ].map((crop, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{crop.name}</h3>
                    <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded">
                      {crop.compatibility}% Match
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Season: {crop.season}</p>
                    <p>Market Price: {crop.price}</p>
                    <p>Demand: {crop.demand}</p>
                  </div>
                  <button className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
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
              {[
                { item: 'Tomatoes', change: '+15%', trend: 'up' },
                { item: 'Onions', change: '-8%', trend: 'down' },
                { item: 'Wheat', change: '+3%', trend: 'up' },
                { item: 'Rice', change: '+7%', trend: 'up' }
              ].map((trend, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{trend.item}</span>
                  <span className={`text-sm font-medium ${trend.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {trend.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SmartPlanningPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Smart Planning</h1>
        <p className="text-gray-600">Perfect timing for plowing, planting, and harvesting</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Crop Calendar</h2>
          <div className="space-y-4">
            {[
              { activity: 'Field Preparation', crop: 'Wheat', date: 'Nov 15-30', status: 'upcoming' },
              { activity: 'Sowing', crop: 'Tomato', date: 'Oct 20-25', status: 'current' },
              { activity: 'Irrigation', crop: 'Rice', date: 'Oct 18', status: 'completed' },
              { activity: 'Harvesting', crop: 'Corn', date: 'Nov 5-10', status: 'upcoming' }
            ].map((item, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                item.status === 'current' ? 'border-l-green-500 bg-green-50' :
                item.status === 'upcoming' ? 'border-l-blue-500 bg-blue-50' :
                'border-l-gray-500 bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.activity}</h3>
                    <p className="text-sm text-gray-600">Crop: {item.crop}</p>
                    <p className="text-sm text-gray-500">Date: {item.date}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.status === 'current' ? 'bg-green-100 text-green-600' :
                    item.status === 'upcoming' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Weather Insights</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900">7-Day Forecast</h3>
              <p className="text-sm text-blue-700 mt-1">Light rain expected in 2 days - ideal for recent plantings</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-medium text-yellow-900">Temperature Alert</h3>
              <p className="text-sm text-yellow-700 mt-1">Temperatures dropping next week - protect sensitive crops</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900">Optimal Conditions</h3>
              <p className="text-sm text-green-700 mt-1">Perfect weather for field preparation activities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const RewardPointsPage = () => (
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
              {rewards.map((reward, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-3xl">{reward.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{reward.title}</h3>
                      <p className="text-sm text-gray-600">
                        {reward.type === 'discount' ? '50 points' :
                         reward.type === 'coupon' ? '80 points' :
                         reward.type === 'cash' ? '200 points' :
                         reward.type === 'premium' ? '150 points' : '100 points'}
                      </p>
                    </div>
                  </div>
                  <button 
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                    disabled={userPoints < (reward.type === 'cash' ? 200 : 80)}
                  >
                    {userPoints >= (reward.type === 'cash' ? 200 : 80) ? 'Redeem' : 'Need More Points'}
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Earn Points</h2>
            <div className="space-y-4">
              {[
                { task: 'Complete daily field scan', points: 10, status: 'available' },
                { task: 'Share farming tip', points: 15, status: 'completed' },
                { task: 'Update crop progress', points: 8, status: 'available' },
                { task: 'Help community member', points: 20, status: 'available' }
              ].map((task, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{task.task}</h3>
                    <p className="text-sm text-green-600">+{task.points} points</p>
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
              <p className="text-gray-600">Total Points</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: 'Field scan completed', points: '+10', time: '2 hours ago' },
                { action: 'Task completed', points: '+15', time: '1 day ago' },
                { action: 'Community help', points: '+20', time: '2 days ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-gray-900">{activity.action}</p>
                    <p className="text-gray-500">{activity.time}</p>
                  </div>
                  <span className="text-green-600 font-medium">{activity.points}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FarmerNetworkPage = () => (
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
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                Share Update
              </button>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  name: 'Rajesh Kumar',
                  time: '2 hours ago',
                  type: 'tip',
                  content: 'Using neem oil spray early morning works best for pest control. I\'ve been using this method for 3 years with great results.',
                  likes: 24,
                  comments: 8
                },
                {
                  name: 'Priya Sharma',
                  time: '5 hours ago',
                  type: 'achievement',
                  content: 'Just earned the "Master Planner" badge! Completed 50 planning tasks with 100% success rate. Thanks to this amazing community for all the support!',
                  likes: 42,
                  comments: 15
                },
                {
                  name: 'Amit Singh',
                  time: '1 day ago',
                  type: 'success',
                  content: 'Best wheat yield in 5 years! Thanks to the app\'s timing suggestions and the advice from fellow farmers. Sharing some photos from the harvest.',
                  likes: 67,
                  comments: 23
                }
              ].map((post, index) => (
                <div key={index} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-gray-900">{post.name}</span>
                        <span className="text-gray-500 text-sm">{post.time}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          post.type === 'tip' ? 'bg-blue-100 text-blue-600' :
                          post.type === 'achievement' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {post.type}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{post.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-gray-700">
                          <span>👍</span>
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-gray-700">
                          <span>💬</span>
                          <span>{post.comments}</span>
                        </button>
                        <button className="hover:text-gray-700">Share</button>
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
                { name: 'Rajesh Kumar', posts: 45, badge: '🏆' },
                { name: 'Priya Sharma', posts: 38, badge: '🥈' },
                { name: 'Amit Singh', posts: 32, badge: '🥉' },
                { name: 'Sunita Devi', posts: 28, badge: '⭐' }
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{user.badge}</span>
                    <span className="text-sm font-medium text-gray-900">{user.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{user.posts} posts</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Topics</h3>
            <div className="space-y-2">
              {[
                '#PestControl',
                '#WheatHarvest',
                '#OrganicFarming',
                '#IrrigationTips',
                '#SoilHealth'
              ].map((topic, index) => (
                <div key={index} className="inline-block">
                  <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2 inline-block hover:bg-gray-200 cursor-pointer">
                    {topic}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'marketplace': return <MarketplacePage />;
      case 'smart-planning': return <SmartPlanningPage />;
      case 'reward-points': return <RewardPointsPage />;
      case 'farmer-network': return <FarmerNetworkPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      {renderPage()}
    </div>
  );
}

export default App;