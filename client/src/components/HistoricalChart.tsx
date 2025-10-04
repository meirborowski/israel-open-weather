'use client';

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { HistoricalData } from '@/types/weather';
import { format } from 'date-fns';

interface HistoricalChartProps {
  data: HistoricalData[];
  title?: string;
}

const HistoricalChart: React.FC<HistoricalChartProps> = ({ data, title = 'Historical Weather Data' }) => {
  const chartData = data.map((item) => ({
    date: format(item.date, 'MMM dd'),
    temperature: Math.round(item.temperature * 10) / 10,
    humidity: Math.round(item.humidity),
    precipitation: Math.round(item.precipitation * 10) / 10,
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
          {title}
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
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
              dataKey="temperature"
              stroke="#f59e0b"
              strokeWidth={2}
              name="Temperature (°C)"
              dot={{ fill: '#f59e0b' }}
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#34d399"
              strokeWidth={2}
              name="Humidity (%)"
              dot={{ fill: '#34d399' }}
            />
            <Line
              type="monotone"
              dataKey="precipitation"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Precipitation (mm)"
              dot={{ fill: '#3b82f6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default HistoricalChart;
