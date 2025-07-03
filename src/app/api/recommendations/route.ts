import { NextRequest, NextResponse } from 'next/server';
import { CrowdDataService } from '../../../lib/crowdData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get('destination');
  const maxCrowdLevel = searchParams.get('maxCrowdLevel');
  const month = searchParams.get('month');

  try {
    if (!destination) {
      return NextResponse.json(
        { success: false, error: 'Destination parameter is required' },
        { status: 400 }
      );
    }

    // Get best time to visit
    const bestTimeData = CrowdDataService.getBestTimeToVisit(destination);
    if (!bestTimeData) {
      return NextResponse.json(
        { success: false, error: 'Destination not found' },
        { status: 404 }
      );
    }

    // Get crowd comparison data
    const crowdComparison = CrowdDataService.getCrowdComparison();
    const destinationInComparison = crowdComparison.find(d => 
      d.destination.toLowerCase().includes(destination.toLowerCase())
    );

    // Apply crowd level filter if specified
    let filteredRecommendations = bestTimeData;
    if (maxCrowdLevel) {
      const maxLevel = parseInt(maxCrowdLevel);
      if (!isNaN(maxLevel)) {
        const destinationData = CrowdDataService.getDestinationData(destination);
        if (destinationData) {
          const suitableMonths = destinationData.yearlyData
            .filter(monthData => monthData.crowdLevel <= maxLevel)
            .map(monthData => monthData.monthName);
          
          if (suitableMonths.length > 0) {
            filteredRecommendations = {
              ...bestTimeData,
              bestMonths: suitableMonths,
              recommendation: `Based on your crowd preference (≤${maxLevel}%), visit during ${suitableMonths.join(', ')}`
            };
          }
        }
      }
    }

    // Get current month recommendation
    let currentMonthRecommendation = null;
    if (month) {
      const monthNum = parseInt(month);
      if (!isNaN(monthNum) && monthNum >= 1 && monthNum <= 12) {
        const monthlyData = CrowdDataService.getMonthlyData(destination, monthNum);
        if (monthlyData) {
          currentMonthRecommendation = {
            month: monthlyData.monthName,
            crowdLevel: monthlyData.crowdLevel,
            recommendation: monthlyData.recommendation,
            factors: monthlyData.factors
          };
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        destination,
        bestTimeToVisit: filteredRecommendations,
        currentMonthRecommendation,
        crowdRanking: destinationInComparison ? {
          rank: crowdComparison.indexOf(destinationInComparison) + 1,
          totalDestinations: crowdComparison.length,
          percentile: Math.round((1 - (crowdComparison.indexOf(destinationInComparison) / crowdComparison.length)) * 100)
        } : null
      }
    });

  } catch (error) {
    console.error('Recommendations API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { preferences } = body;

    if (!preferences) {
      return NextResponse.json(
        { success: false, error: 'Preferences object is required' },
        { status: 400 }
      );
    }

    const { maxCrowdLevel, months, budget, activities } = preferences;

    // Get all destinations and filter based on preferences
    const allDestinations = CrowdDataService.getAllDestinationsData();
    
    const recommendations = allDestinations
      .filter(dest => {
        // Filter by crowd level
        if (maxCrowdLevel && dest.averageCrowdLevel > maxCrowdLevel) {
          return false;
        }

        // Filter by months if specified
        if (months && months.length > 0) {
          const hasMatchingMonth = months.some((month: string) => 
            dest.bestMonths.some(bestMonth => 
              bestMonth.toLowerCase().includes(month.toLowerCase())
            )
          );
          if (!hasMatchingMonth) return false;
        }

        return true;
      })
      .map(dest => {
        const bestTime = CrowdDataService.getBestTimeToVisit(dest.destination);
        return {
          destination: dest.destination,
          country: dest.country,
          averageCrowdLevel: dest.averageCrowdLevel,
          bestMonths: dest.bestMonths,
          recommendation: bestTime?.recommendation || 'No specific recommendation available',
          score: calculateRecommendationScore(dest, preferences)
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Top 10 recommendations

    return NextResponse.json({
      success: true,
      data: {
        recommendations,
        criteria: preferences,
        totalMatches: recommendations.length
      }
    });

  } catch (error) {
    console.error('Personalized recommendations API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to calculate recommendation score
function calculateRecommendationScore(destination: any, preferences: any): number {
  let score = 100;

  // Crowd level preference (higher weight)
  if (preferences.maxCrowdLevel) {
    const crowdDiff = Math.max(0, destination.averageCrowdLevel - preferences.maxCrowdLevel);
    score -= crowdDiff * 2; // Penalty for exceeding crowd preference
  }

  // Boost score for very low crowd destinations
  if (destination.averageCrowdLevel <= 25) {
    score += 20;
  } else if (destination.averageCrowdLevel <= 40) {
    score += 10;
  }

  // Month preference
  if (preferences.months && preferences.months.length > 0) {
    const monthMatch = preferences.months.some((month: string) => 
      destination.bestMonths.some((bestMonth: string) => 
        bestMonth.toLowerCase().includes(month.toLowerCase())
      )
    );
    if (monthMatch) score += 15;
  }

  return Math.max(0, score);
} 