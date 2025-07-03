import { NextRequest, NextResponse } from 'next/server';
import { FoursquareService } from '../../../lib/foursquare';

export async function GET(request: NextRequest) {
  try {
    // Get comprehensive analytics from Foursquare data
    const analytics = await FoursquareService.getCrowdAnalytics();
    const citiesData = await FoursquareService.getAllCitiesData();

    // Calculate additional metrics
    const lowCrowdCities = citiesData.filter(city => city.crowdCategory === 'low').length;
    const moderateCrowdCities = citiesData.filter(city => city.crowdCategory === 'moderate').length;
    const highCrowdCities = citiesData.filter(city => city.crowdCategory === 'high').length;

    // Find best and worst cities for crowds
    const sortedByCrowd = citiesData.sort((a, b) => a.crowdLevel - b.crowdLevel);
    const bestCity = sortedByCrowd[0];
    const worstCity = sortedByCrowd[sortedByCrowd.length - 1];

    // Calculate venue insights
    const totalVenuesAnalyzed = citiesData.reduce((sum, city) => sum + city.totalVenues, 0);
    const avgRating = citiesData.reduce((sum, city) => sum + city.avgRating, 0) / citiesData.length;

    // Top categories across all cities
    const allCategories: { [key: string]: number } = {};
    citiesData.forEach(city => {
      city.topCategories.forEach(category => {
        allCategories[category] = (allCategories[category] || 0) + 1;
      });
    });
    
    const topGlobalCategories = Object.entries(allCategories)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }));

    const enhancedAnalytics = {
      ...analytics,
      distribution: {
        low: lowCrowdCities,
        moderate: moderateCrowdCities,
        high: highCrowdCities
      },
      insights: {
        bestCity: bestCity ? {
          name: `${bestCity.city}, ${bestCity.country}`,
          crowdLevel: bestCity.crowdLevel,
          venues: bestCity.totalVenues
        } : null,
        worstCity: worstCity ? {
          name: `${worstCity.city}, ${worstCity.country}`,
          crowdLevel: worstCity.crowdLevel,
          venues: worstCity.totalVenues
        } : null,
        totalVenuesAnalyzed,
        avgRating: Math.round(avgRating * 100) / 100
      },
      topCategories: topGlobalCategories,
      cities: citiesData.map(city => ({
        name: `${city.city}, ${city.country}`,
        crowdLevel: city.crowdLevel,
        category: city.crowdCategory,
        venues: city.totalVenues,
        rating: city.avgRating
      }))
    };

    return NextResponse.json({
      success: true,
      data: enhancedAnalytics,
      source: 'foursquare_live'
    });

  } catch (error) {
    console.error('Live analytics API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch live analytics',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { timeRange, cities } = body;

    // For now, we'll return current analytics
    // In a real app, you could filter by time range and specific cities
    const analytics = await FoursquareService.getCrowdAnalytics();
    
    let filteredData = await FoursquareService.getAllCitiesData();
    
    if (cities && Array.isArray(cities) && cities.length > 0) {
      filteredData = filteredData.filter(city => 
        cities.some(filterCity => 
          city.city.toLowerCase().includes(filterCity.toLowerCase())
        )
      );
    }

    const customAnalytics = {
      ...analytics,
      citiesAnalyzed: filteredData.length,
      avgCrowdLevel: Math.round(
        filteredData.reduce((sum, city) => sum + city.crowdLevel, 0) / filteredData.length
      ),
      totalVenues: filteredData.reduce((sum, city) => sum + city.totalVenues, 0),
      customFilter: {
        timeRange: timeRange || 'current',
        cities: cities || 'all',
        appliedAt: new Date().toISOString()
      }
    };

    return NextResponse.json({
      success: true,
      data: customAnalytics,
      source: 'foursquare_live'
    });

  } catch (error) {
    console.error('Custom analytics API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 