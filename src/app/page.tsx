'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CrowdDataService, DestinationCrowdData } from '../lib/crowdData';
import LiveCrowdDashboard from '../components/LiveCrowdDashboard';

// Enhanced destination interface with crowd data integration
interface EnhancedDestination {
  id: number;
  name: string;
  country: string;
  image: string;
  crowdLevel: number;
  priceRange: string;
  highlights: string[];
  bestMonths: string[];
  averageCost: number;
  crowdData?: DestinationCrowdData;
  currentMonthCrowd?: number;
  crowdTrend?: 'increasing' | 'decreasing' | 'stable';
}

interface SearchFilters {
  destination: string;
  maxCrowdLevel: number;
  maxBudget: number;
  travelMonth: string;
}

export default function Home() {
  const [filters, setFilters] = useState<SearchFilters>({
    destination: '',
    maxCrowdLevel: 60,
    maxBudget: 3000,
    travelMonth: '',
  });

  const [isSearching, setIsSearching] = useState(false);
  const [featuredDestinations, setFeaturedDestinations] = useState<EnhancedDestination[]>([]);
  const [currentMonth] = useState(new Date().getMonth() + 1);

  // Initialize destinations with real crowd data
  useEffect(() => {
    const initializeDestinations = () => {
      const baseDestinations = [
        {
          id: 1,
          name: "Azores, Portugal",
          country: "Portugal",
          image: "/placeholder-azores.jpg",
          priceRange: "$$",
          highlights: ["Volcanic landscapes", "Hot springs", "Hiking trails"],
          averageCost: 1200,
        },
        {
          id: 2,
          name: "Faroe Islands",
          country: "Denmark",
          image: "/placeholder-faroe.jpg",
          priceRange: "$$$",
          highlights: ["Dramatic cliffs", "Northern lights", "Grass-roof houses"],
          averageCost: 1800,
        },
        {
          id: 3,
          name: "Estonian Islands",
          country: "Estonia",
          image: "/placeholder-estonia.jpg",
          priceRange: "$",
          highlights: ["Medieval castles", "Pristine beaches", "Local culture"],
          averageCost: 800,
        },
        {
          id: 4,
          name: "Saguenay Fjord",
          country: "Canada",
          image: "/placeholder-saguenay.jpg",
          priceRange: "$$",
          highlights: ["Whale watching", "Fjord landscapes", "Wildlife"],
          averageCost: 1500,
        },
        {
          id: 5,
          name: "Raja Ampat",
          country: "Indonesia",
          image: "/placeholder-raja-ampat.jpg",
          priceRange: "$$$",
          highlights: ["Marine biodiversity", "Diving", "Pristine coral reefs"],
          averageCost: 2000,
        },
        {
          id: 6,
          name: "North Macedonia",
          country: "North Macedonia",
          image: "/placeholder-macedonia.jpg",
          priceRange: "$",
          highlights: ["Lake Ohrid", "Ancient culture", "Mountain landscapes"],
          averageCost: 700,
        }
      ];

      const enhancedDestinations: EnhancedDestination[] = baseDestinations.map(dest => {
        // Extract destination name for crowd data lookup
        const destName = dest.name.split(',')[0];
        const crowdData = CrowdDataService.getDestinationData(destName);
        const currentMonthData = CrowdDataService.getMonthlyData(destName, currentMonth);
        
        // Calculate crowd trend
        let crowdTrend: 'increasing' | 'decreasing' | 'stable' = 'stable';
        if (crowdData) {
          const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
          const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
          const prevMonthData = CrowdDataService.getMonthlyData(destName, prevMonth);
          const nextMonthData = CrowdDataService.getMonthlyData(destName, nextMonth);
          
          if (prevMonthData && nextMonthData && currentMonthData) {
            const avgPrevNext = (prevMonthData.crowdLevel + nextMonthData.crowdLevel) / 2;
            if (currentMonthData.crowdLevel > avgPrevNext + 5) {
              crowdTrend = 'increasing';
            } else if (currentMonthData.crowdLevel < avgPrevNext - 5) {
              crowdTrend = 'decreasing';
            }
          }
        }

        const bestTimeData = CrowdDataService.getBestTimeToVisit(destName);
        
        return {
          ...dest,
          crowdLevel: currentMonthData?.crowdLevel || crowdData?.averageCrowdLevel || 25,
          bestMonths: bestTimeData?.bestMonths.map(m => m.slice(0, 3)) || ["Apr", "May", "Sep"],
          crowdData: crowdData || undefined,
          currentMonthCrowd: currentMonthData?.crowdLevel,
          crowdTrend
        };
      });

      setFeaturedDestinations(enhancedDestinations);
    };

    initializeDestinations();
  }, [currentMonth]);

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSearching(false);
    
    // Navigate to search results with filters
    const params = new URLSearchParams();
    if (filters.destination) params.append('destination', filters.destination);
    params.append('crowdLevel', filters.maxCrowdLevel.toString());
    params.append('budget', filters.maxBudget.toString());
    if (filters.travelMonth) params.append('month', filters.travelMonth);
    
    window.location.href = `/search?${params.toString()}`;
  };

  const getCrowdLevelColor = (level: number) => {
    if (level <= 30) return 'text-green-600 bg-green-100';
    if (level <= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getCrowdLevelText = (level: number) => {
    if (level <= 30) return 'Low crowds';
    if (level <= 60) return 'Moderate crowds';
    return 'High crowds';
  };

  const getTrendIcon = (trend?: 'increasing' | 'decreasing' | 'stable') => {
    switch (trend) {
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      default: return '📊';
    }
  };

  const getTrendColor = (trend?: 'increasing' | 'decreasing' | 'stable') => {
    switch (trend) {
      case 'increasing': return 'text-red-500';
      case 'decreasing': return 'text-green-500';
      default: return 'text-blue-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold text-gray-900">TravelSmart</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">Destinations</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Planning</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Insights</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Amazing Places
            <br />
            <span className="text-indigo-600">Without the Crowds</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find your perfect destination with real-time crowd insights, optimal timing, and budget-friendly recommendations.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Destination Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Where to?
              </label>
              <input
                type="text"
                placeholder="City, country, or region"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                value={filters.destination}
                onChange={(e) => setFilters({...filters, destination: e.target.value})}
              />
            </div>

            {/* Crowd Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Crowd Level: {filters.maxCrowdLevel}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="10"
                className="w-full"
                value={filters.maxCrowdLevel}
                onChange={(e) => setFilters({...filters, maxCrowdLevel: parseInt(e.target.value)})}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Peaceful</span>
                <span>Busy</span>
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget: ${filters.maxBudget}
              </label>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                className="w-full"
                value={filters.maxBudget}
                onChange={(e) => setFilters({...filters, maxBudget: parseInt(e.target.value)})}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$500</span>
                <span>$5000+</span>
              </div>
            </div>

            {/* Travel Month */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                When?
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                value={filters.travelMonth}
                onChange={(e) => setFilters({...filters, travelMonth: e.target.value})}
              >
                <option value="">Any month</option>
                <option value="Jan">January</option>
                <option value="Feb">February</option>
                <option value="Mar">March</option>
                <option value="Apr">April</option>
                <option value="May">May</option>
                <option value="Jun">June</option>
                <option value="Jul">July</option>
                <option value="Aug">August</option>
                <option value="Sep">September</option>
                <option value="Oct">October</option>
                <option value="Nov">November</option>
                <option value="Dec">December</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? 'Searching...' : 'Find My Perfect Destination'}
            </button>
          </div>
        </div>

        {/* Live Crowd Intelligence Dashboard with Foursquare Data */}
        <LiveCrowdDashboard />

        {/* Featured Destinations */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Uncrowded Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <div key={destination.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCrowdLevelColor(destination.crowdLevel)}`}>
                      {destination.crowdLevel}% crowds
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`text-2xl ${getTrendColor(destination.crowdTrend)}`}>
                      {getTrendIcon(destination.crowdTrend)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                  <p className="text-gray-600 mb-4">{destination.country}</p>
                  
                  {/* Crowd Analytics */}
                  {destination.crowdData && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">
                        <strong>Best months:</strong> {destination.bestMonths.join(', ')}
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Annual average:</strong> {destination.crowdData.averageCrowdLevel}% crowds
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2 mb-4">
                    {destination.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                        {highlight}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">${destination.averageCost}</span>
                      <span className="text-gray-600">/week</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-600">{destination.priceRange}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Uncrowded Travel */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Uncrowded Travel?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Authentic Experiences</h3>
              <p className="text-gray-600">Connect with local culture and enjoy genuine interactions without tourist crowds.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Better Value</h3>
              <p className="text-gray-600">Lower prices, better service, and more availability when you avoid peak seasons.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Perfect Photos</h3>
              <p className="text-gray-600">Capture stunning shots without crowds in the background or long waits for the perfect angle.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
