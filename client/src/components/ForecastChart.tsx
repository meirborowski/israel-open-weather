'use client';

import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { ForecastDay } from '@/types/weather';
import { format } from 'date-fns';

interface ForecastChartProps {
  forecast: ForecastDay[];
}

const ForecastChart: React.FC<ForecastChartProps> = ({ forecast }) => {
  const chartData = forecast.map((day) => ({
    date: format(day.date, 'MMM dd'),
    max: Math.round(day.tempMax),
    min: Math.round(day.tempMin),
    precipitation: day.precipitation,
    humidity: day.humidity,
  }));

  return (
    <Card
      sx={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: 3,
        color: 'white',
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          7-Day Temperature Forecast
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
            <YAxis stroke="rgba(255,255,255,0.7)" />
            <Tooltip
              contentStyle={{
                background: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: 'white',
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="max"
              stroke="#f59e0b"
              fillOpacity={1}
              fill="url(#colorMax)"
              name="Max Temp (°C)"
            />
            <Area
              type="monotone"
              dataKey="min"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorMin)"
              name="Min Temp (°C)"
            />
          </AreaChart>
        </ResponsiveContainer>

        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
          Precipitation & Humidity
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
            <YAxis stroke="rgba(255,255,255,0.7)" />
            <Tooltip
              contentStyle={{
                background: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: 'white',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="precipitation"
              stroke="#60a5fa"
              strokeWidth={2}
              name="Precipitation (mm)"
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#34d399"
              strokeWidth={2}
              name="Humidity (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ForecastChart;
