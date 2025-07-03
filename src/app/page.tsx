'use client';

import { useState } from 'react';
import Image from 'next/image';

// Mock data for destinations
const featuredDestinations = [
  {
    id: 1,
    name: "Azores, Portugal",
    country: "Portugal",
    image: "/placeholder-azores.jpg",
    crowdLevel: 25, // percentage of capacity
    priceRange: "$$",
    highlights: ["Volcanic landscapes", "Hot springs", "Hiking trails"],
    bestMonths: ["Apr", "May", "Sep", "Oct"],
    averageCost: 1200,
  },
  {
    id: 2,
    name: "Faroe Islands",
    country: "Denmark",
    image: "/placeholder-faroe.jpg",
    crowdLevel: 15,
    priceRange: "$$$",
    highlights: ["Dramatic cliffs", "Northern lights", "Grass-roof houses"],
    bestMonths: ["Jun", "Jul", "Aug"],
    averageCost: 1800,
  },
  {
    id: 3,
    name: "Estonian Islands",
    country: "Estonia",
    image: "/placeholder-estonia.jpg",
    crowdLevel: 20,
    priceRange: "$",
    highlights: ["Medieval castles", "Pristine beaches", "Local culture"],
    bestMonths: ["May", "Jun", "Sep"],
    averageCost: 800,
  },
];

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

          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="w-full md:w-auto mt-6 bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {isSearching ? 'Searching...' : 'Find Destinations'}
          </button>
        </div>

        {/* Featured Destinations */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Uncrowded Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <div key={destination.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCrowdLevelColor(destination.crowdLevel)}`}>
                      {getCrowdLevelText(destination.crowdLevel)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                      <p className="text-gray-600">{destination.country}</p>
                    </div>
                    <span className="text-lg font-bold text-indigo-600">{destination.priceRange}</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Highlights</h4>
                      <div className="flex flex-wrap gap-1">
                        {destination.highlights.slice(0, 2).map((highlight, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {highlight}
                          </span>
                        ))}
                        {destination.highlights.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            +{destination.highlights.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-600">Best months: </span>
                        <span className="text-sm font-medium">{destination.bestMonths.join(', ')}</span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">${destination.averageCost}</span>
                    </div>
                  </div>

                  <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Value Proposition */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose TravelSmart?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Crowd Data</h3>
              <p className="text-gray-600">Get live updates on crowd levels at popular destinations to avoid the masses.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Budget Optimization</h3>
              <p className="text-gray-600">Find amazing destinations that fit your budget without compromising on experience.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Planning</h3>
              <p className="text-gray-600">Plan your perfect trip in under 10 minutes with our smart recommendations.</p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
