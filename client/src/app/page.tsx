'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
  Button,
  Paper,
} from '@mui/material';
import {
  WbSunny,
  Timeline,
  History,
  Map,
  Refresh,
} from '@mui/icons-material';
import WeatherCard from '@/components/WeatherCard';
import ForecastChart from '@/components/ForecastChart';
import ForecastList from '@/components/ForecastList';
import HistoricalChart from '@/components/HistoricalChart';
import ModelMapsViewer from '@/components/ModelMapsViewer';
import CitySelector from '@/components/CitySelector';
import { weatherApi } from '@/services/api';
import { WeatherData, ForecastDay, HistoricalData, ModelMap } from '@/types/weather';
import { subDays } from 'date-fns';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCities, setSelectedCities] = useState<string[]>(['tel-aviv']);
  const [weatherData, setWeatherData] = useState<Record<string, WeatherData>>({});
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [modelMaps, setModelMaps] = useState<ModelMap[]>([]);
  const [loading, setLoading] = useState(false);

  const loadWeatherData = async () => {
    setLoading(true);
    try {
      const weatherPromises = selectedCities.map((cityId) =>
        weatherApi.getCurrentWeather(cityId).then((data) => ({ cityId, data }))
      );
      const results = await Promise.all(weatherPromises);
      const newWeatherData: Record<string, WeatherData> = {};
      results.forEach(({ cityId, data }) => {
        newWeatherData[cityId] = data;
      });
      setWeatherData(newWeatherData);
    } catch (error) {
      console.error('Error loading weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadForecast = async () => {
    if (selectedCities.length === 0) return;
    setLoading(true);
    try {
      const data = await weatherApi.getForecast(selectedCities[0], 7);
      setForecast(data);
    } catch (error) {
      console.error('Error loading forecast:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadHistoricalData = async () => {
    if (selectedCities.length === 0) return;
    setLoading(true);
    try {
      const endDate = new Date();
      const startDate = subDays(endDate, 30);
      const data = await weatherApi.getHistoricalData(selectedCities[0], startDate, endDate);
      setHistoricalData(data);
    } catch (error) {
      console.error('Error loading historical data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadModelMaps = async () => {
    setLoading(true);
    try {
      const data = await weatherApi.getModelMaps();
      setModelMaps(data);
    } catch (error) {
      console.error('Error loading model maps:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
  }, [selectedCities]);

  useEffect(() => {
    if (activeTab === 1) loadForecast();
    if (activeTab === 2) loadHistoricalData();
    if (activeTab === 3) loadModelMaps();
  }, [activeTab, selectedCities]);

  const handleRefresh = () => {
    if (activeTab === 0) loadWeatherData();
    if (activeTab === 1) loadForecast();
    if (activeTab === 2) loadHistoricalData();
    if (activeTab === 3) loadModelMaps();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 50%, #1e3a8a 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Compact Header */}
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={3}
          flexWrap="wrap"
          gap={2}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <WbSunny sx={{ fontSize: 36, color: 'white' }} />
            <Box>
              <Typography variant="h5" fontWeight="bold" color="white">
                Israel Open Weather
              </Typography>
              <Typography variant="caption" color="rgba(255, 255, 255, 0.8)">
                Weather Data & Forecasts
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            disabled={loading}
            sx={{
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#3b82f6',
              '&:hover': {
                background: 'white',
              },
            }}
          >
            Refresh
          </Button>
        </Box>

        {/* City Selector */}
        <Paper
          sx={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 3,
            p: 3,
            mb: 3,
          }}
        >
          <CitySelector
            selectedCities={selectedCities}
            onChange={setSelectedCities}
            multiple={activeTab === 0}
          />
        </Paper>

        {/* Tabs */}
        <Paper
          sx={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 3,
            mb: 3,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '.MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 'bold',
                '&.Mui-selected': {
                  color: 'white',
                },
              },
              '.MuiTabs-indicator': {
                backgroundColor: 'white',
                height: 3,
              },
            }}
          >
            <Tab icon={<WbSunny />} label="Current Weather" iconPosition="start" />
            <Tab icon={<Timeline />} label="7-Day Forecast" iconPosition="start" />
            <Tab icon={<History />} label="Historical Data" iconPosition="start" />
            <Tab icon={<Map />} label="Model Maps" iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Loading Indicator */}
        {loading && (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress sx={{ color: 'white' }} />
          </Box>
        )}

        {/* Tab Panels */}
        <TabPanel value={activeTab} index={0}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
              gap: 3,
            }}
          >
            {selectedCities.map((cityId) => (
              <Box key={cityId}>
                {weatherData[cityId] && <WeatherCard weather={weatherData[cityId]} />}
              </Box>
            ))}
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Box mb={3}>
            <ForecastList forecast={forecast} />
          </Box>
          {forecast.length > 0 && <ForecastChart forecast={forecast} />}
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          {historicalData.length > 0 && (
            <HistoricalChart
              data={historicalData}
              title={`Historical Weather Data - Last 30 Days`}
            />
          )}
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <ModelMapsViewer maps={modelMaps} />
        </TabPanel>

        {/* Footer */}
        <Paper
          sx={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 3,
            p: 3,
            mt: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
            Israel Open Weather - Open Source Weather Platform for Weather Enthusiasts
          </Typography>
          <Typography variant="caption" color="white" sx={{ opacity: 0.6 }}>
            Data includes live weather, forecasts, historical data, and GFS/ECMWF model maps
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
