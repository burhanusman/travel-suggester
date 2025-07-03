import { NextRequest, NextResponse } from 'next/server';
import { CrowdDataService } from '../../../lib/crowdData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get('destination');
  const month = searchParams.get('month');

  try {
    // Get all destinations if no specific destination requested
    if (!destination) {
      const allDestinations = CrowdDataService.getAllDestinations();
      return NextResponse.json({
        success: true,
        data: allDestinations,
        count: allDestinations.length
      });
    }

    // Get specific destination data
    const destinationData = CrowdDataService.getDestinationData(destination);
    if (!destinationData) {
      return NextResponse.json(
        { success: false, error: 'Destination not found' },
        { status: 404 }
      );
    }

    // If month is specified, return monthly data
    if (month) {
      const monthNum = parseInt(month);
      if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        return NextResponse.json(
          { success: false, error: 'Invalid month. Must be 1-12' },
          { status: 400 }
        );
      }

      const monthlyData = CrowdDataService.getMonthlyData(destination, monthNum);
      if (!monthlyData) {
        return NextResponse.json(
          { success: false, error: 'Monthly data not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: monthlyData,
        destination: destinationData.destination
      });
    }

    // Return full destination data
    return NextResponse.json({
      success: true,
      data: destinationData
    });

  } catch (error) {
    console.error('Crowd data API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { destinations } = body;

    if (!destinations || !Array.isArray(destinations)) {
      return NextResponse.json(
        { success: false, error: 'Invalid request. Expected array of destinations' },
        { status: 400 }
      );
    }

    // Get crowd data for multiple destinations
    const results = destinations.map(dest => {
      const data = CrowdDataService.getDestinationData(dest);
      return {
        destination: dest,
        found: !!data,
        data: data || null
      };
    });

    return NextResponse.json({
      success: true,
      data: results,
      count: results.length
    });

  } catch (error) {
    console.error('Crowd data bulk API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 