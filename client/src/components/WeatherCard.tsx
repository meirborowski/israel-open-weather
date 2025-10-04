'use client';

import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import {
  Thermostat,
  WaterDrop,
  Air,
  Compress,
} from '@mui/icons-material';
import { WeatherData } from '@/types/weather';
import { format } from 'date-fns';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <Card
      sx={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: 3,
        color: 'white',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {weather.city}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              {format(weather.timestamp, 'MMM dd, HH:mm')}
            </Typography>
          </Box>
          <Chip
            label={weather.description}
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontWeight: 'medium',
            }}
          />
        </Box>

        <Box display="flex" alignItems="center" mb={3}>
          <Typography variant="h2" fontWeight="bold" mr={1}>
            {Math.round(weather.temperature)}°
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.7 }}>
            Feels like {Math.round(weather.feelsLike)}°
          </Typography>
        </Box>

        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <WaterDrop sx={{ opacity: 0.8 }} />
            <Box>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                Humidity
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {Math.round(weather.humidity)}%
              </Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Air sx={{ opacity: 0.8 }} />
            <Box>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                Wind
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {Math.round(weather.windSpeed)} km/h
              </Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Compress sx={{ opacity: 0.8 }} />
            <Box>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                Pressure
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {Math.round(weather.pressure)} hPa
              </Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Thermostat sx={{ opacity: 0.8 }} />
            <Box>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                Direction
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {Math.round(weather.windDirection)}°
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
