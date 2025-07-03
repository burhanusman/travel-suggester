# TravelSmart - Uncrowded Destination Finder

A mobile-first travel application that recommends vacation destinations optimized to avoid overcrowding, using real-time and historical crowd density data, travel capacity information, and pricing feeds.

## 🎯 Project Overview

TravelSmart addresses the core problem of travelers wasting time and money on overcrowded destinations. Unlike traditional travel apps that focus primarily on price and attractions, our app incorporates **crowd density forecasting as a first-class signal** in decision-making.

### Key Goals (From PRD)

| Goal ID | Objective | Success Metric | Status |
|---------|-----------|----------------|--------|
| G1 | Minimize tourist crowd exposure | ≥ 70% of trips show < 60% capacity at major POIs | ✅ Implemented filtering |
| G2 | Provide cost-effective choices | ≥ 85% of itineraries are ≤ user's budget | ✅ Budget filtering |
| G3 | Reduce trip planning time | Average planning session < 10 min | ✅ Streamlined UI |
| G4 | Achieve high user satisfaction | App Store rating ≥ 4.5 after 3k reviews | 🚧 Post-launch |

## 🚀 Features

### Core Functionality
- **Smart Search with Crowd Filtering**: Filter destinations by maximum crowd level (10-100%)
- **Budget Optimization**: Set budget constraints and get matching recommendations
- **Seasonal Planning**: Find optimal travel months based on crowd patterns
- **Real-time Insights**: Mock crowd density data with color-coded indicators
- **Mobile-First Design**: Responsive layout optimized for mobile devices

### Search & Filtering
- Destination search by name, city, or country
- Crowd level slider (peaceful to busy)
- Budget range selector ($500 - $5000+)
- Travel month selection
- Advanced filters:
  - Trip duration
  - Travel style (Adventure, Cultural, Nature, etc.)
  - Preferred activities (Hiking, Beach, Museums, etc.)
  - Accommodation type

### Destination Display
- **Crowd Level Indicators**: Color-coded badges (Green: Low, Yellow: Moderate, Red: High)
- **Cost Information**: Price range indicators and exact weekly costs
- **Seasonal Guidance**: Best months to visit for optimal crowd levels
- **Activity Matching**: Highlight destinations based on preferred activities
- **Transportation Details**: Airport information and distances

## 🏗️ Technical Architecture

### Technology Stack
- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Responsive Design**: Mobile-first approach

### Project Structure
```
src/
├── app/
│   ├── layout.tsx          # App layout and metadata
│   ├── page.tsx            # Homepage with hero and search
│   └── search/
│       └── page.tsx        # Search results page
├── components/
│   ├── DestinationCard.tsx # Reusable destination display
│   └── SearchFilters.tsx   # Advanced filtering component
└── globals.css             # Global styles
```

### Data Structure
```typescript
interface Destination {
  id: number;
  name: string;
  country: string;
  crowdLevel: number;        // 0-100% capacity
  priceRange: string;        // $, $$, $$$, $$$$
  highlights: string[];
  bestMonths: string[];
  averageCost: number;       // Weekly cost in USD
  activities: string[];
  transportation: {
    airport: string;
    distance: string;
  };
}
```

## 🎨 Design System

### Color Scheme
- **Primary**: Indigo (brand, CTAs)
- **Crowd Levels**: 
  - Green: ≤30% (Low crowds)
  - Yellow: 31-60% (Moderate crowds)
  - Red: >60% (High crowds)
- **Background**: Gradient from blue to indigo
- **Cards**: Clean white with subtle shadows

### Typography
- **Primary Font**: Geist Sans
- **Monospace**: Geist Mono for technical details

## 📱 User Experience

### Homepage Flow
1. **Hero Section**: Clear value proposition and search interface
2. **Quick Search**: Basic filters for immediate searching
3. **Featured Destinations**: Curated low-crowd destinations
4. **Value Proposition**: Why choose TravelSmart

### Search Results Flow
1. **Advanced Filtering**: Comprehensive filter options
2. **Results Overview**: Metrics and sorting options
3. **Destination Cards**: Rich information display
4. **Grid/List Views**: Flexible viewing options

### Key UX Principles
- **Crowd-First**: Crowd level is the primary filter
- **Quick Decisions**: Essential info visible at a glance
- **Progressive Disclosure**: Advanced filters on demand
- **Mobile Optimization**: Touch-friendly interactions

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd travel-suggester

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔮 Future Enhancements

### MVP Extensions
- **Real API Integration**: Connect to live crowd density APIs
- **User Accounts**: Save favorites and travel history
- **Booking Integration**: Connect with travel booking platforms
- **Push Notifications**: Alert users when crowd levels change

### Advanced Features
- **Machine Learning**: Predictive crowd modeling
- **Weather Integration**: Factor weather into crowd predictions
- **Local Events**: Account for festivals and events affecting crowds
- **Carbon Footprint**: Environmental impact considerations

### B2B Features (Out of Scope for MVP)
- Analytics dashboard for destinations
- Crowd management tools for tourism boards
- Business intelligence reports

## 📊 Mock Data

The app currently uses mock destinations representing various crowd levels and price points:

- **Azores, Portugal** (25% crowds, $$)
- **Faroe Islands** (15% crowds, $$$)
- **Estonian Islands** (20% crowds, $)
- **Saguenay Fjord, Canada** (30% crowds, $$)
- **Raja Ampat, Indonesia** (18% crowds, $$$)
- **North Macedonia** (35% crowds, $)

## 🎯 Success Metrics

### Core KPIs
- **Crowd Avoidance**: % of recommended destinations under user's crowd threshold
- **Budget Adherence**: % of recommendations within user's budget
- **Planning Time**: Average time from search to decision
- **User Satisfaction**: App store ratings and reviews

### Analytics to Track
- Search query patterns
- Filter usage frequency
- Destination click-through rates
- Booking conversion rates (future)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for travelers who value authentic, uncrowded experiences.**
