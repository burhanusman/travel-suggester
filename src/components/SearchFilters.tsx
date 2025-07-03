'use client';

import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';

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

interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
  isSearching?: boolean;
}

const travelStyles = [
  'Adventure',
  'Relaxation',
  'Cultural',
  'Nature',
  'Photography',
  'Food & Drink',
  'Nightlife',
  'Family-friendly',
  'Solo travel',
  'Romantic'
];

const activities = [
  'Hiking',
  'Beach',
  'Museums',
  'Architecture',
  'Local markets',
  'Wildlife',
  'Water sports',
  'Mountain climbing',
  'City tours',
  'Festivals'
];

const accommodationTypes = [
  'Any',
  'Hotels',
  'Hostels',
  'Vacation rentals',
  'Boutique hotels',
  'Resorts'
];

export default function SearchFilters({ 
  filters, 
  onFiltersChange, 
  onSearch, 
  isSearching = false 
}: SearchFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: 'travelStyle' | 'activities', value: string) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  const clearFilters = () => {
    onFiltersChange({
      destination: '',
      maxCrowdLevel: 60,
      maxBudget: 3000,
      travelMonth: '',
      duration: '',
      travelStyle: [],
      activities: [],
      accommodation: 'Any'
    });
  };

  const activeFiltersCount = Object.entries(filters).reduce((count, [key, value]) => {
    if (key === 'destination' && value) return count + 1;
    if (key === 'maxCrowdLevel' && value < 60) return count + 1;
    if (key === 'maxBudget' && value < 3000) return count + 1;
    if (key === 'travelMonth' && value) return count + 1;
    if (key === 'duration' && value) return count + 1;
    if (Array.isArray(value) && value.length > 0) return count + 1;
    if (key === 'accommodation' && value !== 'Any') return count + 1;
    return count;
  }, 0);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-900">Search Filters</h2>
          {activeFiltersCount > 0 && (
            <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full text-sm font-medium">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700 text-sm flex items-center"
          >
            <X className="w-4 h-4 mr-1" />
            Clear all
          </button>
        )}
      </div>

      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
             onChange={(e) => updateFilter('destination', e.target.value)}
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
            onChange={(e) => updateFilter('maxCrowdLevel', parseInt(e.target.value))}
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
            onChange={(e) => updateFilter('maxBudget', parseInt(e.target.value))}
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
             onChange={(e) => updateFilter('travelMonth', e.target.value)}
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

      {/* Advanced Filters Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-4"
      >
        <span>Advanced Filters</span>
        <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
      </button>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="space-y-6 border-t pt-6">
          {/* Duration and Accommodation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trip Duration
              </label>
                             <select
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                 value={filters.duration}
                 onChange={(e) => updateFilter('duration', e.target.value)}
               >
                <option value="">Any duration</option>
                <option value="weekend">Weekend (2-3 days)</option>
                <option value="week">1 week</option>
                <option value="twoweeks">2 weeks</option>
                <option value="month">1 month+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Accommodation
              </label>
                             <select
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                 value={filters.accommodation}
                 onChange={(e) => updateFilter('accommodation', e.target.value)}
               >
                {accommodationTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Travel Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Travel Style
            </label>
            <div className="flex flex-wrap gap-2">
              {travelStyles.map((style) => (
                <button
                  key={style}
                  onClick={() => toggleArrayFilter('travelStyle', style)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filters.travelStyle.includes(style)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Preferred Activities
            </label>
            <div className="flex flex-wrap gap-2">
              {activities.map((activity) => (
                <button
                  key={activity}
                  onClick={() => toggleArrayFilter('activities', activity)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filters.activities.includes(activity)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={onSearch}
          disabled={isSearching}
          className="bg-indigo-600 text-white px-12 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        >
          {isSearching ? 'Searching...' : 'Find Perfect Destinations'}
        </button>
      </div>
    </div>
  );
} 