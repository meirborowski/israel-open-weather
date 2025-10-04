'use client';

import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { WbSunny, Cloud, Grain, WaterDrop, Air } from '@mui/icons-material';
import { ForecastDay } from '@/types/weather';
import { format } from 'date-fns';

interface ForecastListProps {
  forecast: ForecastDay[];
}

const ForecastList: React.FC<ForecastListProps> = ({ forecast }) => {
  const getWeatherIcon = (icon: string) => {
    if (icon.includes('01')) return <WbSunny sx={{ fontSize: 40, color: '#fbbf24' }} />;
    if (icon.includes('02') || icon.includes('03')) return <Cloud sx={{ fontSize: 40, color: '#9ca3af' }} />;
    if (icon.includes('10') || icon.includes('09')) return <Grain sx={{ fontSize: 40, color: '#3b82f6' }} />;
    return <Cloud sx={{ fontSize: 40, color: '#9ca3af' }} />;
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: 2,
      }}
    >
      {forecast.map((day, index) => (
        <Card
          key={index}
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
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {format(day.date, 'EEEE')}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }} display="block" gutterBottom>
                {format(day.date, 'MMM dd')}
              </Typography>

              <Box display="flex" justifyContent="center" my={2}>
                {getWeatherIcon(day.icon)}
              </Box>

              <Typography variant="body2" textAlign="center" sx={{ mb: 2, opacity: 0.9 }}>
                {day.description}
              </Typography>

              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    High
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {Math.round(day.tempMax)}°
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    Low
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {Math.round(day.tempMin)}°
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" gap={2} justifyContent="space-around" pt={2} borderTop="1px solid rgba(255,255,255,0.2)">
                <Box display="flex" alignItems="center" gap={0.5}>
                  <WaterDrop sx={{ fontSize: 16, opacity: 0.7 }} />
                  <Typography variant="caption">{Math.round(day.precipitation)}mm</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Air sx={{ fontSize: 16, opacity: 0.7 }} />
                  <Typography variant="caption">{Math.round(day.windSpeed)} km/h</Typography>
                </Box>
              </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ForecastList;