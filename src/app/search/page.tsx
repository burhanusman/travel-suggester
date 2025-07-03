'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, TrendingDown, Clock, DollarSign, BarChart3, Calendar } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import DestinationCard from '../../components/DestinationCard';
import SearchFilters from '../../components/SearchFilters';
import CrowdChart from '../../components/CrowdChart';
import { CrowdDataService, DestinationCrowdData } from '../../lib/crowdData';

// Enhanced destination interface with crowd analytics
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
  description: string;
  activities: string[];
  transportation: {
    airport: string;
    distance: string;
  };
  crowdData?: DestinationCrowdData;
  monthlyTrends?: number[];
  crowdRecommendation?: string;
}

interface SearchFilters {
  destination: string;
  maxCrowdLevel: number;
  maxBudget: number;
  travelMonth: string;
  duration: string;
  travelStyle: string[];
  activities: string[];
  accommodation: string;
}

// Extended mock data enhanced with crowd data
const createEnhancedDestinations = (): EnhancedDestination[] => {
  const baseDestinations = [
    {
      id: 1,
      name: "Azores, Portugal",
      country: "Portugal",
      image: "/placeholder-azores.jpg",
      priceRange: "$$",
      highlights: ["Volcanic landscapes", "Hot springs", "Hiking trails", "Crater lakes"],
      averageCost: 1200,
      description: "A stunning archipelago with volcanic landscapes, pristine nature, and minimal crowds year-round.",
      activities: ["Hiking", "Wildlife", "Beach", "Nature"],
      transportation: {
        airport: "João Paulo II Airport",
        distance: "2km"
      }
    },
    {
      id: 2,
      name: "Faroe Islands",
      country: "Denmark",
      image: "/placeholder-faroe.jpg",
      priceRange: "$$$",
      highlights: ["Dramatic cliffs", "Northern lights", "Grass-roof houses", "Pristine nature"],
      averageCost: 1800,
      description: "Remote Nordic islands offering dramatic landscapes and authentic cultural experiences.",
      activities: ["Hiking", "Photography", "Wildlife", "Cultural"],
      transportation: {
        airport: "Vágar Airport",
        distance: "45km"
      }
    },
    {
      id: 3,
      name: "Estonian Islands",
      country: "Estonia",
      image: "/placeholder-estonia.jpg",
      priceRange: "$",
      highlights: ["Medieval castles", "Pristine beaches", "Local culture", "Forests"],
      averageCost: 800,
      description: "Unspoiled Baltic islands with rich history, beautiful nature, and budget-friendly prices.",
      activities: ["Cultural", "Beach", "Museums", "Nature"],
      transportation: {
        airport: "Tallinn Airport",
        distance: "25km + ferry"
      }
    },
    {
      id: 4,
      name: "Saguenay Fjord",
      country: "Canada",
      image: "/placeholder-saguenay.jpg",
      priceRange: "$$",
      highlights: ["Whale watching", "Fjord landscapes", "Kayaking", "Indigenous culture"],
      averageCost: 1400,
      description: "One of the world's southernmost fjords with exceptional whale watching opportunities.",
      activities: ["Wildlife", "Water sports", "Nature", "Cultural"],
      transportation: {
        airport: "Bagotville Airport",
        distance: "30km"
      }
    },
    {
      id: 5,
      name: "Raja Ampat",
      country: "Indonesia",
      image: "/placeholder-raja-ampat.jpg",
      priceRange: "$$$",
      highlights: ["Marine biodiversity", "Diving", "Remote islands", "Pristine reefs"],
      averageCost: 2000,
      description: "The crown jewel of marine biodiversity with world-class diving and minimal tourism impact.",
      activities: ["Water sports", "Wildlife", "Nature", "Adventure"],
      transportation: {
        airport: "Domine Eduard Osok Airport",
        distance: "2 hours by boat"
      }
    },
    {
      id: 6,
      name: "North Macedonia",
      country: "North Macedonia",
      image: "/placeholder-macedonia.jpg",
      priceRange: "$",
      highlights: ["Ohrid Lake", "Orthodox monasteries", "Wine regions", "Mountain hiking"],
      averageCost: 700,
      description: "A hidden Balkan gem with stunning lakes, rich history, and authentic experiences.",
      activities: ["Cultural", "Hiking", "Food & Drink", "Museums"],
      transportation: {
        airport: "Skopje Airport",
        distance: "25km"
      }
    }
  ];

  return baseDestinations.map(dest => {
    const destName = dest.name.split(',')[0];
    const crowdData = CrowdDataService.getDestinationData(destName);
    const bestTimeData = CrowdDataService.getBestTimeToVisit(destName);
    
    // Get monthly trends (12 months)
    const monthlyTrends = crowdData?.yearlyData.map(d => d.crowdLevel) || [];
    
    return {
      ...dest,
      crowdLevel: crowdData?.averageCrowdLevel || 25,
      bestMonths: bestTimeData?.bestMonths.map(m => m.slice(0, 3)) || ["Apr", "May", "Sep"],
      crowdData: crowdData || undefined,
      monthlyTrends,
      crowdRecommendation: bestTimeData?.recommendation
    };
  });
};

export default function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState<SearchFilters>({
    destination: searchParams.get('destination') || '',
    maxCrowdLevel: parseInt(searchParams.get('crowdLevel') || '60'),
    maxBudget: parseInt(searchParams.get('budget') || '3000'),
    travelMonth: searchParams.get('month') || '',
    duration: '',
    travelStyle: [],
    activities: [],
    accommodation: 'Any'
  });
  
  const [destinations] = useState<EnhancedDestination[]>(createEnhancedDestinations());
  const [isSearching, setIsSearching] = useState(false);
  const [sortBy, setSortBy] = useState<'crowdLevel' | 'price' | 'name'>('crowdLevel');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);

  const filteredDestinations = destinations
    .filter(dest => {
      if (filters.destination && !dest.name.toLowerCase().includes(filters.destination.toLowerCase()) 
          && !dest.country.toLowerCase().includes(filters.destination.toLowerCase())) {
        return false;
      }
      if (dest.crowdLevel > filters.maxCrowdLevel) return false;
      if (dest.averageCost > filters.maxBudget) return false;
      if (filters.travelMonth && !dest.bestMonths.includes(filters.travelMonth)) return false;
      if (filters.activities.length > 0 && !filters.activities.some(activity => dest.activities?.includes(activity))) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'crowdLevel':
          return a.crowdLevel - b.crowdLevel;
        case 'price':
          return a.averageCost - b.averageCost;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSearching(false);
  };

  const getCrowdLevelColor = (level: number) => {
    if (level <= 30) return 'text-green-600 bg-green-100';
    if (level <= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getMonthName = (month: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1];
  };

  // Calculate crowd analytics
  const crowdAnalytics = {
    totalDestinations: filteredDestinations.length,
    averageCrowdLevel: Math.round(filteredDestinations.reduce((sum, d) => sum + d.crowdLevel, 0) / filteredDestinations.length),
    lowCrowdDestinations: filteredDestinations.filter(d => d.crowdLevel <= 30).length,
    peakSeasonSavings: 35 // Average percentage savings during off-peak
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-xl font-bold text-gray-900">TravelSmart</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Results Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {filteredDestinations.length} Uncrowded Destinations Found
          </h1>
          <p className="text-gray-600">
            Perfectly curated destinations matching your crowd and budget preferences
          </p>
        </div>

        {/* Crowd Analytics Dashboard */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Crowd Analytics
            </h2>
            <div className="flex items-center space-x-4">
              <label className="text-sm text-gray-600">Analyze month:</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {getMonthName(i + 1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{crowdAnalytics.totalDestinations}</div>
              <div className="text-sm text-gray-600">Total Destinations</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{crowdAnalytics.averageCrowdLevel}%</div>
              <div className="text-sm text-gray-600">Average Crowd Level</div>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <div className="text-3xl font-bold text-indigo-600">{crowdAnalytics.lowCrowdDestinations}</div>
              <div className="text-sm text-gray-600">Low Crowd Options</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">{crowdAnalytics.peakSeasonSavings}%</div>
              <div className="text-sm text-gray-600">Peak Season Savings</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with Filters */}
          <div className="lg:col-span-1">
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              onSearch={handleSearch}
              isSearching={isSearching}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'crowdLevel' | 'price' | 'name')}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                >
                  <option value="crowdLevel">Crowd Level</option>
                  <option value="price">Price</option>
                  <option value="name">Name</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <div className="w-4 h-4 flex flex-col space-y-1">
                    <div className="bg-current h-0.5 rounded"></div>
                    <div className="bg-current h-0.5 rounded"></div>
                    <div className="bg-current h-0.5 rounded"></div>
                  </div>
                </button>
              </div>
            </div>

            {/* Results */}
            {filteredDestinations.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No destinations found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
                {filteredDestinations.map((destination) => (
                  <div key={destination.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {/* Enhanced Destination Card with Crowd Data */}
                    <div className="relative">
                      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCrowdLevelColor(destination.crowdLevel)}`}>
                          {destination.crowdLevel}% crowds
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                      <p className="text-gray-600 mb-4">{destination.description}</p>
                      
                                             {/* Monthly Crowd Trends */}
                       {destination.monthlyTrends && destination.monthlyTrends.length > 0 && (
                         <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                           <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                             <Calendar className="w-4 h-4 mr-1" />
                             Monthly Crowd Trends
                           </h4>
                           <CrowdChart 
                             monthlyData={destination.monthlyTrends}
                             selectedMonth={selectedMonth}
                             height={64}
                           />
                         </div>
                       )}
                      
                      {/* Crowd Recommendation */}
                      {destination.crowdRecommendation && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>Best Time:</strong> {destination.crowdRecommendation}
                          </p>
                        </div>
                      )}
                      
                      {/* Highlights */}
                      <div className="space-y-2 mb-4">
                        {destination.highlights.slice(0, 3).map((highlight, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                            {highlight}
                          </div>
                        ))}
                      </div>
                      
                      {/* Price and Transportation */}
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">${destination.averageCost}</span>
                          <span className="text-gray-600">/week</span>
                        </div>
                        <span className="text-lg font-semibold text-gray-600">{destination.priceRange}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <MapPin className="w-4 h-4 mr-1" />
                        {destination.transportation.airport} ({destination.transportation.distance})
                      </div>
                      
                      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 