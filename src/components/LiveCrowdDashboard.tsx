import React, { useState, useEffect } from 'react';
import { Activity, MapPin, Users, TrendingUp, Star, Clock, Globe } from 'lucide-react';

interface CityData {
  city: string;
  country: string;
  crowdLevel: number;
  crowdCategory: 'low' | 'moderate' | 'high';
  totalVenues: number;
  avgRating: number;
  avgPopularity: number;
  topCategories: string[];
  lastUpdated: string;
}

interface LiveAnalytics {
  timestamp: string;
  totalVenues: number;
  avgCrowdLevel: number;
  citiesAnalyzed: number;
  peakCrowdTime: string;
  distribution: {
    low: number;
    moderate: number;
    high: number;
  };
  insights: {
    bestCity: { name: string; crowdLevel: number; venues: number } | null;
    worstCity: { name: string; crowdLevel: number; venues: number } | null;
    totalVenuesAnalyzed: number;
    avgRating: number;
  };
  cities: Array<{
    name: string;
    crowdLevel: number;
    category: string;
    venues: number;
    rating: number;
  }>;
}

const LiveCrowdDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<LiveAnalytics | null>(null);
  const [citiesData, setCitiesData] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [error, setError] = useState<string>('');

  const fetchLiveData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch analytics and cities data in parallel
      const [analyticsResponse, citiesResponse] = await Promise.all([
        fetch('/api/live-analytics'),
        fetch('/api/live-crowds')
      ]);

      if (!analyticsResponse.ok || !citiesResponse.ok) {
        throw new Error('Failed to fetch live crowd data');
      }

      const analyticsData = await analyticsResponse.json();
      const citiesData = await citiesResponse.json();

      if (analyticsData.success) {
        setAnalytics(analyticsData.data);
      }

      if (citiesData.success) {
        setCitiesData(citiesData.data);
        setLastUpdated(citiesData.lastUpdated || new Date().toISOString());
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load live data');
      console.error('Error fetching live crowd data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchLiveData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getCrowdColor = (level: number) => {
    if (level <= 35) return 'text-green-600 bg-green-100';
    if (level <= 65) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getCrowdIcon = (category: string) => {
    switch (category) {
      case 'low': return '🟢';
      case 'moderate': return '🟡';
      case 'high': return '🔴';
      default: return '⚪';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading && !analytics) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Live Data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchLiveData}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Activity className="w-6 h-6 mr-2 text-indigo-600" />
          Live Crowd Intelligence
          <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
            LIVE
          </span>
        </h2>
        <div className="text-right">
          <div className="text-xs text-gray-500">Last updated</div>
          <div className="text-sm font-medium text-gray-900">
            {formatTime(lastUpdated)}
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <Globe className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <strong>Real-Time Venue Intelligence:</strong> Using venue popularity, ratings, and activity data 
            to provide intelligent crowd indicators across {analytics?.citiesAnalyzed || 10} sample cities. 
            Data includes restaurants, cafés, museums, bars, and cultural attractions to determine crowd levels.
          </div>
        </div>
      </div>

      {/* Main Analytics */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">
              {analytics.citiesAnalyzed}
            </div>
            <div className="text-sm text-gray-600 flex items-center justify-center mt-1">
              <Globe className="w-4 h-4 mr-1" />
              Cities Analyzed
            </div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">
              {analytics.avgCrowdLevel}%
            </div>
            <div className="text-sm text-gray-600 flex items-center justify-center mt-1">
              <Users className="w-4 h-4 mr-1" />
              Avg Crowd Level
            </div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">
              {analytics.insights.totalVenuesAnalyzed}
            </div>
            <div className="text-sm text-gray-600 flex items-center justify-center mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              Venues Analyzed
            </div>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-3xl font-bold text-orange-600">
              {analytics.peakCrowdTime}
            </div>
            <div className="text-sm text-gray-600 flex items-center justify-center mt-1">
              <Clock className="w-4 h-4 mr-1" />
              Peak Time
            </div>
          </div>
        </div>
      )}

      {/* Crowd Distribution */}
      {analytics && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Crowd Distribution</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {analytics.distribution.low}
              </div>
              <div className="text-sm text-gray-600">Low Crowds</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {analytics.distribution.moderate}
              </div>
              <div className="text-sm text-gray-600">Moderate Crowds</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {analytics.distribution.high}
              </div>
              <div className="text-sm text-gray-600">High Crowds</div>
            </div>
          </div>
        </div>
      )}

      {/* Best & Worst Cities */}
      {analytics?.insights.bestCity && analytics?.insights.worstCity && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Crowd Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-semibold text-green-800">Best for Avoiding Crowds</span>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {analytics.insights.bestCity.name}
              </div>
              <div className="text-sm text-gray-600">
                {analytics.insights.bestCity.crowdLevel}% crowds • {analytics.insights.bestCity.venues} venues
              </div>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center mb-2">
                <Users className="w-5 h-5 text-red-600 mr-2" />
                <span className="font-semibold text-red-800">Busiest Right Now</span>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {analytics.insights.worstCity.name}
              </div>
              <div className="text-sm text-gray-600">
                {analytics.insights.worstCity.crowdLevel}% crowds • {analytics.insights.worstCity.venues} venues
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Cities Grid */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Live City Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {citiesData.map((city) => (
            <div key={`${city.city}-${city.country}`} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">
                  {city.city}
                </h4>
                <span className="text-xl">
                  {getCrowdIcon(city.crowdCategory)}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-2">
                {city.country}
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCrowdColor(city.crowdLevel)}`}>
                  {city.crowdLevel}% crowds
                </span>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="w-3 h-3 mr-1 text-yellow-500" />
                  {city.avgRating.toFixed(1)}
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                {city.totalVenues} venues • Updated {formatTime(city.lastUpdated)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Refresh Button */}
      <div className="mt-6 text-center">
        <button
          onClick={fetchLiveData}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {loading ? 'Refreshing...' : 'Refresh Live Data'}
        </button>
        <div className="text-xs text-gray-500 mt-2">
          Data refreshes automatically every 5 minutes
        </div>
      </div>
    </div>
  );
};

export default LiveCrowdDashboard; 