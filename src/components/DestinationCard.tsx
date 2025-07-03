import { Heart, MapPin, Calendar, DollarSign } from 'lucide-react';
import { useState } from 'react';

interface Destination {
  id: number;
  name: string;
  country: string;
  image: string;
  crowdLevel: number;
  priceRange: string;
  highlights: string[];
  bestMonths: string[];
  averageCost: number;
  description?: string;
  activities?: string[];
  transportation?: {
    airport: string;
    distance: string;
  };
}

interface DestinationCardProps {
  destination: Destination;
  onViewDetails?: (destination: Destination) => void;
  showFullDetails?: boolean;
}

export default function DestinationCard({ 
  destination, 
  onViewDetails, 
  showFullDetails = false 
}: DestinationCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

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

  const getPriceColor = (range: string) => {
    switch (range) {
      case '$': return 'text-green-600';
      case '$$': return 'text-yellow-600';
      case '$$$': return 'text-orange-600';
      case '$$$$': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image with overlay */}
      <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        {/* Crowd level badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCrowdLevelColor(destination.crowdLevel)}`}>
            {getCrowdLevelText(destination.crowdLevel)}
          </span>
        </div>

        {/* Favorite button */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className={`absolute top-4 left-4 p-2 rounded-full transition-colors ${
            isFavorited 
              ? 'bg-red-500 text-white' 
              : 'bg-white bg-opacity-80 text-gray-600 hover:bg-opacity-100'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Location pin */}
        <div className="absolute bottom-4 left-4 flex items-center text-white">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">{destination.country}</span>
        </div>
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
            <p className="text-gray-600 text-sm">{destination.country}</p>
          </div>
          <div className="text-right">
            <span className={`text-2xl font-bold ${getPriceColor(destination.priceRange)}`}>
              {destination.priceRange}
            </span>
            <p className="text-sm text-gray-500">per week</p>
          </div>
        </div>

        {/* Description (if showFullDetails) */}
        {showFullDetails && destination.description && (
          <p className="text-gray-600 text-sm mb-4">{destination.description}</p>
        )}

        {/* Highlights */}
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Highlights</h4>
            <div className="flex flex-wrap gap-1">
              {destination.highlights.slice(0, showFullDetails ? undefined : 2).map((highlight, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {highlight}
                </span>
              ))}
              {!showFullDetails && destination.highlights.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  +{destination.highlights.length - 2} more
                </span>
              )}
            </div>
          </div>

          {/* Activities (if showFullDetails) */}
          {showFullDetails && destination.activities && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Popular Activities</h4>
              <div className="flex flex-wrap gap-1">
                {destination.activities.map((activity, index) => (
                  <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Best time to visit */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-600">Best: </span>
              <span className="text-sm font-medium">{destination.bestMonths.join(', ')}</span>
            </div>
          </div>

          {/* Transportation (if showFullDetails) */}
          {showFullDetails && destination.transportation && (
            <div className="border-t pt-3 mt-3">
              <h4 className="text-sm font-medium text-gray-700 mb-1">Getting There</h4>
              <p className="text-sm text-gray-600">
                {destination.transportation.airport} ({destination.transportation.distance} from city center)
              </p>
            </div>
          )}

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 text-gray-500 mr-1" />
              <span className="text-lg font-bold text-gray-900">${destination.averageCost}</span>
              <span className="text-sm text-gray-500 ml-1">avg/week</span>
            </div>
            
            <div className="flex space-x-2">
              {!showFullDetails && (
                <button
                  onClick={() => onViewDetails?.(destination)}
                  className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors text-sm"
                >
                  Details
                </button>
              )}
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm">
                {showFullDetails ? 'Book Now' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 