# Israel Open Weather - Client

Modern weather application for weather enthusiasts in Israel, featuring:

- **Current Weather**: Live weather data for multiple Israeli cities
- **7-Day Forecast**: Detailed forecasts with temperature, precipitation, and wind data
- **Historical Data**: 30-day historical weather trends with interactive charts
- **Model Maps**: GFS, ECMWF, WRF, and NAM forecast model visualizations

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **UI Library**: Material-UI (MUI)
- **Charts**: Recharts
- **Styling**: Tailwind CSS + Emotion (for MUI)
- **TypeScript**: Full type safety
- **API Client**: Axios
- **Date Utilities**: date-fns

## Getting Started

First, install the dependencies:

```bash
npm install
```

Create environment file:

```bash
cp .env.local.example .env.local
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

### Current Weather
- Multiple city selection and comparison
- Real-time temperature, humidity, wind speed, and pressure
- Beautiful Material-UI cards with glassmorphism design

### Forecasts
- 7-day detailed forecasts
- Interactive charts with Recharts
- Temperature trends, precipitation, and humidity visualization

### Historical Data
- 30-day historical weather analysis
- Line charts showing temperature, humidity, and precipitation trends

### Model Maps
- Support for GFS, ECMWF, WRF, and NAM models
- Filter by model type and parameter

## Available Cities

22 major Israeli cities including Tel Aviv, Jerusalem, Haifa, Be'er Sheva, Eilat, and more.

## Development

- Edit pages in the `src/app` directory
- The app auto-updates as you edit files
- Uses Next.js App Router for routing

