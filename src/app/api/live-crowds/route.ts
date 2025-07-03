import { NextRequest, NextResponse } from 'next/server';
import { FoursquareService } from '../../../lib/foursquare';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  try {
    if (city) {
      // Get specific city data
      const sampleCities = FoursquareService.getSampleCities();
      const cityInfo = sampleCities.find(c => 
        c.name.toLowerCase() === city.toLowerCase()
      );

      if (!cityInfo) {
        return NextResponse.json(
          { success: false, error: 'City not found in sample cities' },
          { status: 404 }
        );
      }

      const cityData = await FoursquareService.getCityVenueData(
        cityInfo.name, 
        cityInfo.country, 
        cityInfo.coords
      );

      return NextResponse.json({
        success: true,
        data: cityData,
        source: 'foursquare_live'
      });
    }

    // Get all cities data
    const allCitiesData = await FoursquareService.getAllCitiesData();
    
    return NextResponse.json({
      success: true,
      data: allCitiesData,
      count: allCitiesData.length,
      source: 'foursquare_live',
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Live crowds API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch live crowd data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cities } = body;

    if (!cities || !Array.isArray(cities)) {
      return NextResponse.json(
        { success: false, error: 'Invalid request. Expected array of city names' },
        { status: 400 }
      );
    }

    const sampleCities = FoursquareService.getSampleCities();
    const results = [];

    for (const cityName of cities) {
      const cityInfo = sampleCities.find(c => 
        c.name.toLowerCase() === cityName.toLowerCase()
      );

      if (cityInfo) {
        try {
          const cityData = await FoursquareService.getCityVenueData(
            cityInfo.name, 
            cityInfo.country, 
            cityInfo.coords
          );
          results.push({
            city: cityName,
            found: true,
            data: cityData
          });
        } catch (error) {
          results.push({
            city: cityName,
            found: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      } else {
        results.push({
          city: cityName,
          found: false,
          error: 'City not found in sample cities'
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: results,
      count: results.length
    });

  } catch (error) {
    console.error('Live crowds bulk API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 