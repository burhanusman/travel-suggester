// Crowd Data Service - Realistic tourism crowd data with monthly variations
export interface CrowdDataPoint {
  month: number;
  monthName: string;
  crowdLevel: number; // 0-100 percentage
  factors: {
    weather: 'poor' | 'fair' | 'good' | 'excellent';
    schoolHolidays: boolean;
    publicHolidays: string[];
    localEvents: string[];
    cruiseShips: number;
    weatherDescription: string;
  };
  recommendation: string;
}

export interface DestinationCrowdData {
  destination: string;
  country: string;
  region: string;
  yearlyData: CrowdDataPoint[];
  peakMonths: number[];
  bestMonths: number[];
  averageCrowdLevel: number;
  lastUpdated: string;
}

// Realistic crowd data based on actual tourism patterns
const crowdDatabase: DestinationCrowdData[] = [
  {
    destination: "Azores",
    country: "Portugal",
    region: "Europe",
    peakMonths: [7, 8],
    bestMonths: [10, 11, 3, 4],
    averageCrowdLevel: 25,
    lastUpdated: "2024-01-15",
    yearlyData: [
      {
        month: 1, monthName: "January", crowdLevel: 15,
        factors: {
          weather: 'fair', schoolHolidays: false, publicHolidays: ['New Year'],
          localEvents: [], cruiseShips: 1, weatherDescription: 'Mild, rainy periods'
        },
        recommendation: "Perfect for whale watching. Very few tourists, authentic local experience."
      },
      {
        month: 2, monthName: "February", crowdLevel: 12,
        factors: {
          weather: 'fair', schoolHolidays: false, publicHolidays: [],
          localEvents: ['Carnival'], cruiseShips: 1, weatherDescription: 'Cool, occasional rain'
        },
        recommendation: "Lowest crowds of the year. Ideal for hiking and hot springs."
      },
      {
        month: 3, monthName: "March", crowdLevel: 18,
        factors: {
          weather: 'good', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 2, weatherDescription: 'Spring weather begins'
        },
        recommendation: "Great weather starts, still very uncrowded. Perfect timing."
      },
      {
        month: 4, monthName: "April", crowdLevel: 22,
        factors: {
          weather: 'good', schoolHolidays: true, publicHolidays: ['Easter'],
          localEvents: ['Easter festivals'], cruiseShips: 3, weatherDescription: 'Pleasant spring weather'
        },
        recommendation: "Beautiful weather, moderate crowds. Excellent for all activities."
      },
      {
        month: 5, monthName: "May", crowdLevel: 28,
        factors: {
          weather: 'excellent', schoolHolidays: false, publicHolidays: ['Labor Day'],
          localEvents: ['Espírito Santo festivals'], cruiseShips: 4, weatherDescription: 'Perfect weather'
        },
        recommendation: "Ideal weather begins but still reasonable crowds."
      },
      {
        month: 6, monthName: "June", crowdLevel: 35,
        factors: {
          weather: 'excellent', schoolHolidays: true, publicHolidays: [],
          localEvents: ['São João festivals'], cruiseShips: 6, weatherDescription: 'Dry, warm weather'
        },
        recommendation: "Great weather but crowds are building. Book early."
      },
      {
        month: 7, monthName: "July", crowdLevel: 45,
        factors: {
          weather: 'excellent', schoolHolidays: true, publicHolidays: [],
          localEvents: ['Summer festivals'], cruiseShips: 8, weatherDescription: 'Peak summer weather'
        },
        recommendation: "Peak season begins. Expect higher prices and more tourists."
      },
      {
        month: 8, monthName: "August", crowdLevel: 50,
        factors: {
          weather: 'excellent', schoolHolidays: true, publicHolidays: [],
          localEvents: ['São Bartolomeu'], cruiseShips: 9, weatherDescription: 'Warmest, driest month'
        },
        recommendation: "Peak tourist season. Book accommodations well in advance."
      },
      {
        month: 9, monthName: "September", crowdLevel: 35,
        factors: {
          weather: 'excellent', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 6, weatherDescription: 'Still warm, less rain'
        },
        recommendation: "Perfect balance of weather and manageable crowds."
      },
      {
        month: 10, monthName: "October", crowdLevel: 25,
        factors: {
          weather: 'good', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 4, weatherDescription: 'Mild weather, more rain'
        },
        recommendation: "Excellent time to visit. Good weather, fewer tourists."
      },
      {
        month: 11, monthName: "November", crowdLevel: 18,
        factors: {
          weather: 'fair', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 2, weatherDescription: 'Cooler, rainier'
        },
        recommendation: "Very peaceful, still good for hiking and whale watching."
      },
      {
        month: 12, monthName: "December", crowdLevel: 20,
        factors: {
          weather: 'fair', schoolHolidays: true, publicHolidays: ['Christmas', 'New Year'],
          localEvents: ['Christmas markets'], cruiseShips: 2, weatherDescription: 'Mild winter weather'
        },
        recommendation: "Quiet period with festive atmosphere. Good for cultural experiences."
      }
    ]
  },
  {
    destination: "Faroe Islands",
    country: "Denmark",
    region: "Europe",
    peakMonths: [6, 7, 8],
    bestMonths: [5, 9, 10],
    averageCrowdLevel: 15,
    lastUpdated: "2024-01-15",
    yearlyData: [
      {
        month: 1, monthName: "January", crowdLevel: 8,
        factors: {
          weather: 'poor', schoolHolidays: false, publicHolidays: ['New Year'],
          localEvents: [], cruiseShips: 0, weatherDescription: 'Dark, stormy, cold'
        },
        recommendation: "Very challenging weather but ultimate solitude. For hardy travelers only."
      },
      {
        month: 2, monthName: "February", crowdLevel: 6,
        factors: {
          weather: 'poor', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 0, weatherDescription: 'Cold, windy, limited daylight'
        },
        recommendation: "Lowest tourist numbers. Northern lights possible."
      },
      {
        month: 3, monthName: "March", crowdLevel: 10,
        factors: {
          weather: 'poor', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 0, weatherDescription: 'Still cold but daylight returning'
        },
        recommendation: "Weather improving slightly. Very few visitors."
      },
      {
        month: 4, monthName: "April", crowdLevel: 12,
        factors: {
          weather: 'fair', schoolHolidays: true, publicHolidays: ['Easter'],
          localEvents: [], cruiseShips: 1, weatherDescription: 'Spring begins, milder weather'
        },
        recommendation: "Weather becomes more pleasant. Good time for bird watching."
      },
      {
        month: 5, monthName: "May", crowdLevel: 18,
        factors: {
          weather: 'good', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 2, weatherDescription: 'Much better weather'
        },
        recommendation: "Excellent time - good weather, minimal crowds. Highly recommended."
      },
      {
        month: 6, monthName: "June", crowdLevel: 25,
        factors: {
          weather: 'good', schoolHolidays: true, publicHolidays: [],
          localEvents: ['Ólavsøka preparations'], cruiseShips: 4, weatherDescription: 'Long days, mild weather'
        },
        recommendation: "Peak hiking season begins. Still manageable tourist numbers."
      },
      {
        month: 7, monthName: "July", crowdLevel: 35,
        factors: {
          weather: 'excellent', schoolHolidays: true, publicHolidays: ['Ólavsøka'],
          localEvents: ['Ólavsøka festival'], cruiseShips: 6, weatherDescription: 'Best weather of the year'
        },
        recommendation: "Peak season with best weather. National festival period."
      },
      {
        month: 8, monthName: "August", crowdLevel: 30,
        factors: {
          weather: 'good', schoolHolidays: true, publicHolidays: [],
          localEvents: [], cruiseShips: 5, weatherDescription: 'Still good weather'
        },
        recommendation: "High season continues. Great for hiking and photography."
      },
      {
        month: 9, monthName: "September", crowdLevel: 20,
        factors: {
          weather: 'good', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 3, weatherDescription: 'Autumn begins, still pleasant'
        },
        recommendation: "Perfect balance - good weather, fewer tourists. Highly recommended."
      },
      {
        month: 10, monthName: "October", crowdLevel: 15,
        factors: {
          weather: 'fair', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 2, weatherDescription: 'Cooler, more unsettled'
        },
        recommendation: "Quieter period. Good for northern lights and storm watching."
      },
      {
        month: 11, monthName: "November", crowdLevel: 10,
        factors: {
          weather: 'poor', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 1, weatherDescription: 'Stormy, shorter days'
        },
        recommendation: "Very quiet. Dramatic weather and possible northern lights."
      },
      {
        month: 12, monthName: "December", crowdLevel: 8,
        factors: {
          weather: 'poor', schoolHolidays: true, publicHolidays: ['Christmas'],
          localEvents: ['Christmas traditions'], cruiseShips: 0, weatherDescription: 'Dark, cold winter'
        },
        recommendation: "Lowest tourist numbers. Experience authentic island winter life."
      }
    ]
  },
  {
    destination: "Saguenay Fjord",
    country: "Canada",
    region: "North America",
    peakMonths: [7, 8],
    bestMonths: [6, 9, 10],
    averageCrowdLevel: 30,
    lastUpdated: "2024-01-15",
    yearlyData: [
      {
        month: 1, monthName: "January", crowdLevel: 12,
        factors: {
          weather: 'poor', schoolHolidays: false, publicHolidays: ['New Year'],
          localEvents: [], cruiseShips: 0, weatherDescription: 'Very cold, snow activities'
        },
        recommendation: "Winter activities like ice fishing and snowshoeing. Very peaceful."
      },
      {
        month: 2, monthName: "February", crowdLevel: 10,
        factors: {
          weather: 'poor', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 0, weatherDescription: 'Cold winter conditions'
        },
        recommendation: "Lowest crowds. Perfect for winter wildlife observation."
      },
      {
        month: 3, monthName: "March", crowdLevel: 15,
        factors: {
          weather: 'poor', schoolHolidays: true, publicHolidays: [],
          localEvents: [], cruiseShips: 0, weatherDescription: 'Late winter, variable conditions'
        },
        recommendation: "Spring break period but still winter conditions. Very quiet."
      },
      {
        month: 4, monthName: "April", crowdLevel: 18,
        factors: {
          weather: 'fair', schoolHolidays: false, publicHolidays: ['Easter'],
          localEvents: [], cruiseShips: 1, weatherDescription: 'Spring thaw begins'
        },
        recommendation: "Nature awakening, few tourists. Great for hiking preparation."
      },
      {
        month: 5, monthName: "May", crowdLevel: 25,
        factors: {
          weather: 'good', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 2, weatherDescription: 'Pleasant spring weather'
        },
        recommendation: "Excellent time - good weather, minimal crowds. Wildlife active."
      },
      {
        month: 6, monthName: "June", crowdLevel: 35,
        factors: {
          weather: 'excellent', schoolHolidays: true, publicHolidays: [],
          localEvents: [], cruiseShips: 4, weatherDescription: 'Perfect weather begins'
        },
        recommendation: "Whale watching season starts. Great weather, moderate crowds."
      },
      {
        month: 7, monthName: "July", crowdLevel: 55,
        factors: {
          weather: 'excellent', schoolHolidays: true, publicHolidays: ['Canada Day'],
          localEvents: ['Summer festivals'], cruiseShips: 8, weatherDescription: 'Peak summer weather'
        },
        recommendation: "Peak whale watching season. Expect crowds but amazing wildlife."
      },
      {
        month: 8, monthName: "August", crowdLevel: 50,
        factors: {
          weather: 'excellent', schoolHolidays: true, publicHolidays: [],
          localEvents: [], cruiseShips: 7, weatherDescription: 'Warm summer weather'
        },
        recommendation: "High season continues. Best whale watching but book early."
      },
      {
        month: 9, monthName: "September", crowdLevel: 35,
        factors: {
          weather: 'good', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 4, weatherDescription: 'Beautiful autumn weather'
        },
        recommendation: "Perfect time - great weather, fewer crowds, stunning fall colors."
      },
      {
        month: 10, monthName: "October", crowdLevel: 25,
        factors: {
          weather: 'good', schoolHolidays: false, publicHolidays: ['Thanksgiving'],
          localEvents: [], cruiseShips: 2, weatherDescription: 'Cool, crisp autumn'
        },
        recommendation: "Stunning fall foliage, few tourists. Excellent for photography."
      },
      {
        month: 11, monthName: "November", crowdLevel: 15,
        factors: {
          weather: 'fair', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 1, weatherDescription: 'Cool, transitioning to winter'
        },
        recommendation: "Very quiet period. Good for winter preparation activities."
      },
      {
        month: 12, monthName: "December", crowdLevel: 12,
        factors: {
          weather: 'poor', schoolHolidays: true, publicHolidays: ['Christmas'],
          localEvents: ['Winter celebrations'], cruiseShips: 0, weatherDescription: 'Winter conditions return'
        },
        recommendation: "Peaceful winter setting. Perfect for cozy cabin experiences."
      }
    ]
  },
  {
    destination: "Raja Ampat",
    country: "Indonesia",
    region: "Asia",
    peakMonths: [7, 8, 9],
    bestMonths: [4, 5, 10, 11],
    averageCrowdLevel: 18,
    lastUpdated: "2024-01-15",
    yearlyData: [
      {
        month: 1, monthName: "January", crowdLevel: 25,
        factors: {
          weather: 'fair', schoolHolidays: true, publicHolidays: ['New Year'],
          localEvents: [], cruiseShips: 3, weatherDescription: 'Wet season, frequent rain'
        },
        recommendation: "Rainy season but good diving visibility. Fewer crowds than dry season."
      },
      {
        month: 2, monthName: "February", crowdLevel: 22,
        factors: {
          weather: 'fair', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 2, weatherDescription: 'Still wet season'
        },
        recommendation: "Good for diving, occasional rain. Quiet period for tourism."
      },
      {
        month: 3, monthName: "March", crowdLevel: 20,
        factors: {
          weather: 'good', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 2, weatherDescription: 'Transitioning to dry season'
        },
        recommendation: "Weather improving, very manageable crowds. Great diving conditions."
      },
      {
        month: 4, monthName: "April", crowdLevel: 15,
        factors: {
          weather: 'excellent', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 2, weatherDescription: 'Dry season begins'
        },
        recommendation: "Perfect conditions start. Excellent diving, minimal crowds."
      },
      {
        month: 5, monthName: "May", crowdLevel: 18,
        factors: {
          weather: 'excellent', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 3, weatherDescription: 'Ideal weather conditions'
        },
        recommendation: "Excellent time - perfect weather, low crowds. Highly recommended."
      },
      {
        month: 6, monthName: "June", crowdLevel: 22,
        factors: {
          weather: 'excellent', schoolHolidays: true, publicHolidays: [],
          localEvents: [], cruiseShips: 4, weatherDescription: 'Peak diving conditions'
        },
        recommendation: "Great conditions but crowds building for peak season."
      },
      {
        month: 7, monthName: "July", crowdLevel: 35,
        factors: {
          weather: 'excellent', schoolHolidays: true, publicHolidays: [],
          localEvents: [], cruiseShips: 6, weatherDescription: 'Perfect weather, calm seas'
        },
        recommendation: "Peak season begins. Best conditions but expect more divers."
      },
      {
        month: 8, monthName: "August", crowdLevel: 40,
        factors: {
          weather: 'excellent', schoolHolidays: true, publicHolidays: [],
          localEvents: [], cruiseShips: 7, weatherDescription: 'Ideal conditions continue'
        },
        recommendation: "Peak tourist season. Amazing diving but book well in advance."
      },
      {
        month: 9, monthName: "September", crowdLevel: 35,
        factors: {
          weather: 'excellent', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 6, weatherDescription: 'Still excellent conditions'
        },
        recommendation: "High season continues but slightly fewer crowds."
      },
      {
        month: 10, monthName: "October", crowdLevel: 25,
        factors: {
          weather: 'excellent', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 4, weatherDescription: 'Perfect conditions'
        },
        recommendation: "Excellent time - perfect weather, manageable crowds."
      },
      {
        month: 11, monthName: "November", crowdLevel: 20,
        factors: {
          weather: 'good', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 3, weatherDescription: 'Still good, transitioning'
        },
        recommendation: "Great balance of good conditions and fewer tourists."
      },
      {
        month: 12, monthName: "December", crowdLevel: 28,
        factors: {
          weather: 'fair', schoolHolidays: true, publicHolidays: ['Christmas'],
          localEvents: [], cruiseShips: 4, weatherDescription: 'Wet season approaching'
        },
        recommendation: "Holiday season brings more visitors. Weather still decent."
      }
    ]
  },
  {
    destination: "North Macedonia",
    country: "North Macedonia",
    region: "Europe",
    peakMonths: [7, 8],
    bestMonths: [5, 6, 9, 10],
    averageCrowdLevel: 35,
    lastUpdated: "2024-01-15",
    yearlyData: [
      {
        month: 1, monthName: "January", crowdLevel: 20,
        factors: {
          weather: 'poor', schoolHolidays: false, publicHolidays: ['New Year', 'Orthodox Christmas'],
          localEvents: [], cruiseShips: 0, weatherDescription: 'Cold winter weather'
        },
        recommendation: "Quiet winter period. Good for cultural sites and city exploration."
      },
      {
        month: 2, monthName: "February", crowdLevel: 18,
        factors: {
          weather: 'poor', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 0, weatherDescription: 'Cold, occasional snow'
        },
        recommendation: "Low season continues. Perfect for museums and indoor attractions."
      },
      {
        month: 3, monthName: "March", crowdLevel: 25,
        factors: {
          weather: 'fair', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 0, weatherDescription: 'Spring begins, milder'
        },
        recommendation: "Weather improving, still uncrowded. Good for city walks."
      },
      {
        month: 4, monthName: "April", crowdLevel: 30,
        factors: {
          weather: 'good', schoolHolidays: true, publicHolidays: ['Easter'],
          localEvents: ['Easter celebrations'], cruiseShips: 0, weatherDescription: 'Pleasant spring weather'
        },
        recommendation: "Beautiful spring weather begins. Moderate crowds, perfect timing."
      },
      {
        month: 5, monthName: "May", crowdLevel: 35,
        factors: {
          weather: 'excellent', schoolHolidays: false, publicHolidays: ['Labor Day'],
          localEvents: [], cruiseShips: 0, weatherDescription: 'Ideal weather conditions'
        },
        recommendation: "Perfect weather starts. Great for all outdoor activities."
      },
      {
        month: 6, monthName: "June", crowdLevel: 40,
        factors: {
          weather: 'excellent', schoolHolidays: true, publicHolidays: [],
          localEvents: ['Summer festivals begin'], cruiseShips: 0, weatherDescription: 'Warm, sunny weather'
        },
        recommendation: "Excellent conditions, moderate crowds. Festivals and events start."
      },
      {
        month: 7, monthName: "July", crowdLevel: 55,
        factors: {
          weather: 'excellent', schoolHolidays: true, publicHolidays: [],
          localEvents: ['Ohrid Summer Festival'], cruiseShips: 0, weatherDescription: 'Hot summer weather'
        },
        recommendation: "Peak season. Major festivals but expect higher crowds and prices."
      },
      {
        month: 8, monthName: "August", crowdLevel: 50,
        factors: {
          weather: 'excellent', schoolHolidays: true, publicHolidays: [],
          localEvents: ['Wine festivals'], cruiseShips: 0, weatherDescription: 'Very hot, dry weather'
        },
        recommendation: "High season continues. Hot weather, perfect for lakes and mountains."
      },
      {
        month: 9, monthName: "September", crowdLevel: 40,
        factors: {
          weather: 'excellent', schoolHolidays: false, publicHolidays: [],
          localEvents: ['Harvest festivals'], cruiseShips: 0, weatherDescription: 'Perfect autumn weather'
        },
        recommendation: "Ideal time - excellent weather, manageable crowds. Highly recommended."
      },
      {
        month: 10, monthName: "October", crowdLevel: 35,
        factors: {
          weather: 'good', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 0, weatherDescription: 'Pleasant fall weather'
        },
        recommendation: "Great weather continues, fewer tourists. Perfect for hiking."
      },
      {
        month: 11, monthName: "November", crowdLevel: 25,
        factors: {
          weather: 'fair', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 0, weatherDescription: 'Cooler, variable weather'
        },
        recommendation: "Quiet period, still decent weather. Good for cultural exploration."
      },
      {
        month: 12, monthName: "December", crowdLevel: 22,
        factors: {
          weather: 'poor', schoolHolidays: true, publicHolidays: ['Christmas'],
          localEvents: ['Christmas markets'], cruiseShips: 0, weatherDescription: 'Cold, winter conditions'
        },
        recommendation: "Festive atmosphere, winter activities. Christmas markets in Skopje."
      }
    ]
  },
  {
    destination: "Estonian Islands",
    country: "Estonia",
    region: "Europe",
    peakMonths: [6, 7, 8],
    bestMonths: [5, 9],
    averageCrowdLevel: 20,
    lastUpdated: "2024-01-15",
    yearlyData: [
      {
        month: 1, monthName: "January", crowdLevel: 8,
        factors: {
          weather: 'poor', schoolHolidays: false, publicHolidays: ['New Year'],
          localEvents: [], cruiseShips: 0, weatherDescription: 'Very cold, snow and ice'
        },
        recommendation: "Extremely quiet. Only for those seeking complete solitude."
      },
      {
        month: 2, monthName: "February", crowdLevel: 6,
        factors: {
          weather: 'poor', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 0, weatherDescription: 'Cold winter conditions'
        },
        recommendation: "Lowest tourist numbers. Authentic winter island experience."
      },
      {
        month: 3, monthName: "March", crowdLevel: 10,
        factors: {
          weather: 'poor', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 0, weatherDescription: 'Late winter, still cold'
        },
        recommendation: "Very quiet, weather still challenging. Perfect for photography."
      },
      {
        month: 4, monthName: "April", crowdLevel: 15,
        factors: {
          weather: 'fair', schoolHolidays: true, publicHolidays: ['Easter'],
          localEvents: [], cruiseShips: 1, weatherDescription: 'Spring begins, milder'
        },
        recommendation: "Nature awakening, few visitors. Great for bird watching."
      },
      {
        month: 5, monthName: "May", crowdLevel: 22,
        factors: {
          weather: 'good', schoolHolidays: false, publicHolidays: ['Labor Day'],
          localEvents: [], cruiseShips: 2, weatherDescription: 'Pleasant spring weather'
        },
        recommendation: "Perfect timing - good weather, minimal crowds. Highly recommended."
      },
      {
        month: 6, monthName: "June", crowdLevel: 35,
        factors: {
          weather: 'excellent', schoolHolidays: true, publicHolidays: ['Midsummer'],
          localEvents: ['Midsummer celebrations'], cruiseShips: 4, weatherDescription: 'White nights, warm weather'
        },
        recommendation: "Peak season begins. Midsummer festivities but manageable crowds."
      },
      {
        month: 7, monthName: "July", crowdLevel: 45,
        factors: {
          weather: 'excellent', schoolHolidays: true, publicHolidays: [],
          localEvents: ['Summer festivals'], cruiseShips: 6, weatherDescription: 'Warmest weather of year'
        },
        recommendation: "High season. Best weather but expect crowds at popular sites."
      },
      {
        month: 8, monthName: "August", crowdLevel: 40,
        factors: {
          weather: 'excellent', schoolHolidays: true, publicHolidays: [],
          localEvents: [], cruiseShips: 5, weatherDescription: 'Still warm and pleasant'
        },
        recommendation: "Peak season continues. Great weather, busiest time of year."
      },
      {
        month: 9, monthName: "September", crowdLevel: 25,
        factors: {
          weather: 'good', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 3, weatherDescription: 'Beautiful autumn weather'
        },
        recommendation: "Excellent time - good weather, fewer crowds. Perfect balance."
      },
      {
        month: 10, monthName: "October", crowdLevel: 18,
        factors: {
          weather: 'fair', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 2, weatherDescription: 'Cool autumn weather'
        },
        recommendation: "Quiet period, still decent weather. Good for hiking and exploration."
      },
      {
        month: 11, monthName: "November", crowdLevel: 12,
        factors: {
          weather: 'poor', schoolHolidays: false, publicHolidays: [],
          localEvents: [], cruiseShips: 1, weatherDescription: 'Cold, getting darker'
        },
        recommendation: "Very quiet, challenging weather. For serious travelers only."
      },
      {
        month: 12, monthName: "December", crowdLevel: 10,
        factors: {
          weather: 'poor', schoolHolidays: true, publicHolidays: ['Christmas'],
          localEvents: ['Christmas traditions'], cruiseShips: 0, weatherDescription: 'Cold winter, limited daylight'
        },
        recommendation: "Peaceful winter setting. Experience authentic island Christmas."
      }
    ]
  }
];

export class CrowdDataService {
  static getDestinationData(destination: string): DestinationCrowdData | null {
    return crowdDatabase.find(d => 
      d.destination.toLowerCase() === destination.toLowerCase()
    ) || null;
  }

  static getMonthlyData(destination: string, month: number): CrowdDataPoint | null {
    const destData = this.getDestinationData(destination);
    if (!destData) return null;
    
    return destData.yearlyData.find(d => d.month === month) || null;
  }

  static getAllDestinations(): string[] {
    return crowdDatabase.map(d => d.destination);
  }

  static getAllDestinationsData(): DestinationCrowdData[] {
    return crowdDatabase;
  }

  static getCrowdComparison(): { destination: string; country: string; averageCrowdLevel: number }[] {
    return crowdDatabase
      .map(d => ({
        destination: d.destination,
        country: d.country,
        averageCrowdLevel: d.averageCrowdLevel
      }))
      .sort((a, b) => a.averageCrowdLevel - b.averageCrowdLevel);
  }

  static getDestinationsByRegion(region: string): DestinationCrowdData[] {
    return crowdDatabase.filter(d => 
      d.region.toLowerCase() === region.toLowerCase()
    );
  }

  static getDestinationsByCrowdLevel(maxCrowdLevel: number): DestinationCrowdData[] {
    return crowdDatabase.filter(d => d.averageCrowdLevel <= maxCrowdLevel);
  }

  static getBestTimeToVisit(destination: string): {
    bestMonths: string[];
    worstMonths: string[];
    recommendation: string;
  } | null {
    const destData = this.getDestinationData(destination);
    if (!destData) return null;

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const bestMonthNames = destData.bestMonths.map(m => monthNames[m - 1]);
    const worstMonthNames = destData.peakMonths.map(m => monthNames[m - 1]);

    const bestMonthData = destData.yearlyData.filter(d => 
      destData.bestMonths.includes(d.month)
    );
    
    const avgCrowdInBestMonths = bestMonthData.reduce((sum, d) => 
      sum + d.crowdLevel, 0) / bestMonthData.length;

    return {
      bestMonths: bestMonthNames,
      worstMonths: worstMonthNames,
      recommendation: `Visit during ${bestMonthNames.join(' or ')} for the best experience with only ${Math.round(avgCrowdInBestMonths)}% crowd levels. Avoid ${worstMonthNames.join(' and ')} when crowds reach peak levels.`
    };
  }

  static getCrowdForecast(destination: string, months: number[]): {
    months: string[];
    crowdLevels: number[];
    averageCrowd: number;
    recommendation: string;
  } | null {
    const destData = this.getDestinationData(destination);
    if (!destData) return null;

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthData = months.map(m => {
      const data = destData.yearlyData.find(d => d.month === m);
      return {
        name: monthNames[m - 1],
        level: data?.crowdLevel || 0
      };
    });

    const averageCrowd = monthData.reduce((sum, d) => sum + d.level, 0) / monthData.length;
    
    let recommendation = '';
    if (averageCrowd <= 25) {
      recommendation = 'Excellent time to visit - very low crowds and authentic experiences.';
    } else if (averageCrowd <= 40) {
      recommendation = 'Good time to visit - manageable crowds with good weather.';
    } else {
      recommendation = 'Peak season - expect crowds but best weather and activities.';
    }

    return {
      months: monthData.map(d => d.name),
      crowdLevels: monthData.map(d => d.level),
      averageCrowd: Math.round(averageCrowd),
      recommendation
    };
  }
} 