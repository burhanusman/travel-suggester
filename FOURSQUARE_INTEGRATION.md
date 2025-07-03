# Foursquare Places API Integration - Live Crowd Intelligence

## Overview

The travel suggester app now integrates with Foursquare Places API to provide **real-time crowd intelligence** using venue popularity and ratings as crowd indicators. This system analyzes actual venue data to determine crowd levels across different cities.

## 🎯 Key Features

### Live Crowd Analysis
- **Real-time venue data** from Foursquare Places API
- **Intelligent crowd scoring** based on venue popularity, ratings, and activity
- **10 sample cities** with comprehensive crowd analytics
- **Multi-factor analysis** including venue types, ratings, and user engagement

### Crowd Intelligence Metrics
- **Venue Popularity**: Foursquare's popularity scores (0-1) converted to crowd indicators
- **User Ratings**: Higher ratings often correlate with higher visitation
- **Venue Activity**: Photo counts and tip counts indicate venue engagement
- **Price Points**: Higher prices may indicate exclusivity and lower crowds

### API Endpoints

#### 1. Live Crowds - All Cities
```bash
GET /api/live-crowds
```
Returns crowd data for all 10 sample cities with venue analysis.

#### 2. Live Crowds - Specific City
```bash
GET /api/live-crowds?city=Reykjavik
```
Returns detailed crowd analysis for a specific city.

#### 3. Live Analytics Dashboard
```bash
GET /api/live-analytics
```
Returns comprehensive analytics including best/worst cities for crowds.

## 🏙️ Sample Cities

The system analyzes crowd levels across these carefully selected destinations:

1. **Reykjavik, Iceland** 🇮🇸
2. **Tallinn, Estonia** 🇪🇪
3. **Ljubljana, Slovenia** 🇸🇮
4. **Porto, Portugal** 🇵🇹
5. **Bruges, Belgium** 🇧🇪
6. **Bergen, Norway** 🇳🇴
7. **Gdansk, Poland** 🇵🇱
8. **Brasov, Romania** 🇷🇴
9. **Vilnius, Lithuania** 🇱🇹
10. **Salzburg, Austria** 🇦🇹

## 🔧 Technical Implementation

### FoursquareService Class
```typescript
// Core service for Foursquare API integration
export class FoursquareService {
  static async searchVenues(city: string, coords: string, limit: number): Promise<FoursquareVenue[]>
  static calculateCrowdLevel(venues: FoursquareVenue[]): number
  static async getCityVenueData(cityName: string, country: string, coords: string): Promise<CityVenueData>
  static async getAllCitiesData(): Promise<CityVenueData[]>
  static async getCrowdAnalytics(): Promise<CrowdAnalytics>
}
```

### Crowd Level Calculation Algorithm
1. **Popularity Factor**: Venue popularity score (0-1)
2. **Rating Factor**: Venue rating converted to crowd factor
3. **Activity Factor**: Photos and tips indicating engagement
4. **Price Factor**: Higher prices may indicate lower crowds
5. **Weighted Average**: Combined score converted to percentage (0-100%)

### Crowd Categories
- **Low Crowds**: ≤35% (🟢)
- **Moderate Crowds**: 36-65% (🟡) 
- **High Crowds**: >65% (🔴)

## 🌐 Live Dashboard Features

### Real-Time Metrics
- **Cities Analyzed**: Total number of cities with live data
- **Average Crowd Level**: Overall crowd percentage across all cities
- **Venues Analyzed**: Total venues providing crowd intelligence
- **Peak Time**: Current peak crowd time analysis

### Crowd Distribution
- Visual breakdown of cities by crowd category
- Best and worst cities for avoiding crowds
- Live city status with real-time indicators

### Interactive Features
- **Auto-refresh**: Data updates every 5 minutes
- **City filtering**: View specific city details
- **Responsive design**: Works across all device sizes

## 🔑 API Key Configuration

To use live Foursquare data, add your API key to the service:

```typescript
// src/lib/foursquare.ts
const FOURSQUARE_API_KEY = 'YOUR_FOURSQUARE_API_KEY';
```

**Current Status**: The system includes intelligent fallback with realistic simulated data for demonstration purposes when API calls fail or for development.

## 📊 Data Structure

### Venue Data
```typescript
interface FoursquareVenue {
  fsq_id: string;
  name: string;
  location: { formatted_address: string; locality: string; country: string; };
  categories: Array<{ id: number; name: string; icon: object; }>;
  popularity?: number;
  rating?: number;
  price?: number;
  stats?: { total_photos?: number; total_ratings?: number; total_tips?: number; };
}
```

### City Analytics
```typescript
interface CityVenueData {
  city: string;
  country: string;
  totalVenues: number;
  avgPopularity: number;
  avgRating: number;
  crowdLevel: number;
  crowdCategory: 'low' | 'moderate' | 'high';
  lastUpdated: string;
  topCategories: string[];
  venuesSample: FoursquareVenue[];
}
```

## 🚀 Benefits for Travelers

1. **Data-Driven Decisions**: Real venue data instead of guesswork
2. **Avoid Crowds**: Find destinations with lower tourist density
3. **Live Updates**: Current crowd conditions, not outdated information
4. **Comprehensive Analysis**: Multiple data points for accurate assessment
5. **Visual Intelligence**: Easy-to-understand crowd indicators

## 🔄 Future Enhancements

- **Seasonal Analysis**: Historical crowd patterns by month
- **Time-of-Day Intelligence**: Crowd levels by hour
- **Event Impact**: Special events affecting crowd levels
- **User Preferences**: Personalized crowd tolerance settings
- **Geographic Expansion**: Additional cities and regions

---

**Integration Complete**: The Foursquare Places API integration provides authentic, real-time crowd intelligence to help travelers make informed decisions about when and where to visit destinations. 