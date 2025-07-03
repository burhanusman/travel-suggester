'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, TrendingDown, Clock, DollarSign } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import DestinationCard from '../../components/DestinationCard';
import SearchFilters from '../../components/SearchFilters';

// Extended mock data for search results
const mockDestinations = [
  {
    id: 1,
    name: "Azores, Portugal",
    country: "Portugal",
    image: "/placeholder-azores.jpg",
    crowdLevel: 25,
    priceRange: "$$",
    highlights: ["Volcanic landscapes", "Hot springs", "Hiking trails", "Crater lakes"],
    bestMonths: ["Apr", "May", "Sep", "Oct"],
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
    crowdLevel: 15,
    priceRange: "$$$",
    highlights: ["Dramatic cliffs", "Northern lights", "Grass-roof houses", "Pristine nature"],
    bestMonths: ["Jun", "Jul", "Aug"],
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
    crowdLevel: 20,
    priceRange: "$",
    highlights: ["Medieval castles", "Pristine beaches", "Local culture", "Forests"],
    bestMonths: ["May", "Jun", "Sep"],
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
    name: "Saguenay Fjord, Canada",
    country: "Canada",
    image: "/placeholder-saguenay.jpg",
    crowdLevel: 30,
    priceRange: "$$",
    highlights: ["Whale watching", "Fjord landscapes", "Kayaking", "Indigenous culture"],
    bestMonths: ["Jun", "Jul", "Aug", "Sep"],
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
    name: "Raja Ampat, Indonesia",
    country: "Indonesia",
    image: "/placeholder-raja-ampat.jpg",
    crowdLevel: 18,
    priceRange: "$$$",
    highlights: ["Marine biodiversity", "Diving", "Remote islands", "Pristine reefs"],
    bestMonths: ["Oct", "Nov", "Dec", "Mar"],
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
    crowdLevel: 35,
    priceRange: "$",
    highlights: ["Ohrid Lake", "Orthodox monasteries", "Wine regions", "Mountain hiking"],
    bestMonths: ["Apr", "May", "Sep", "Oct"],
    averageCost: 700,
    description: "A hidden Balkan gem with stunning lakes, rich history, and authentic experiences.",
    activities: ["Cultural", "Hiking", "Food & Drink", "Museums"],
    transportation: {
      airport: "Skopje Airport",
      distance: "25km"
    }
  }
];

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
  
  const [isSearching, setIsSearching] = useState(false);
  const [sortBy, setSortBy] = useState<'crowdLevel' | 'price' | 'name'>('crowdLevel');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredDestinations = mockDestinations
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

  const handleDestinationDetails = (destination: any) => {
    // In a real app, this would navigate to a destination detail page
    console.log('View details for:', destination.name);
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
        {/* Search Filters */}
        <div className="mb-8">
          <SearchFilters
            filters={filters}
            onFiltersChange={setFilters}
            onSearch={handleSearch}
            isSearching={isSearching}
          />
        </div>

        {/* Results Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {filteredDestinations.length} Uncrowded Destinations Found
            </h1>
            <p className="text-gray-600">
              Showing destinations with ≤{filters.maxCrowdLevel}% crowd level, under ${filters.maxBudget} budget
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* Sort by */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
                             <select
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value as any)}
                 className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-gray-900"
               >
                <option value="crowdLevel">Crowd Level</option>
                <option value="price">Price</option>
                <option value="name">Name</option>
              </select>
            </div>

            {/* View mode toggle */}
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <TrendingDown className="w-5 h-5 text-green-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Avg Crowd Level</p>
                <p className="text-lg font-bold text-green-600">
                  {Math.round(filteredDestinations.reduce((sum, dest) => sum + dest.crowdLevel, 0) / filteredDestinations.length || 0)}%
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Avg Cost</p>
                <p className="text-lg font-bold text-blue-600">
                  ${Math.round(filteredDestinations.reduce((sum, dest) => sum + dest.averageCost, 0) / filteredDestinations.length || 0)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-purple-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Countries</p>
                <p className="text-lg font-bold text-purple-600">
                  {new Set(filteredDestinations.map(dest => dest.country)).size}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-orange-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Perfect for</p>
                <p className="text-lg font-bold text-orange-600">
                  {filters.travelMonth || 'All seasons'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏝️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No destinations found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters to see more results. Consider increasing your crowd tolerance or budget.
            </p>
            <button
              onClick={() => setFilters({ ...filters, maxCrowdLevel: 80, maxBudget: 5000 })}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Expand Search Criteria
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
            : "space-y-6"
          }>
            {filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onViewDetails={handleDestinationDetails}
                showFullDetails={viewMode === 'list'}
              />
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredDestinations.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Load More Destinations
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 