'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
} from '@mui/material';
import { Satellite, ThermostatAuto, WaterDrop, Air } from '@mui/icons-material';
import { ModelMap } from '@/types/weather';
import { format } from 'date-fns';

interface ModelMapsViewerProps {
  maps: ModelMap[];
}

const ModelMapsViewer: React.FC<ModelMapsViewerProps> = ({ maps }) => {
  const [selectedModel, setSelectedModel] = useState<string>('GFS');
  const [selectedParameter, setSelectedParameter] = useState<string>('Temperature');
  const [selectedForecastHour, setSelectedForecastHour] = useState<number>(0);

  const modelTypes = ['GFS', 'ECMWF', 'WRF', 'NAM'];
  const parameters = ['Temperature', 'Precipitation', 'Wind', 'Pressure'];
  
  // Get unique forecast hours from available maps
  const forecastHours = maps.length > 0 
    ? Array.from(new Set(maps.map((map) => map.forecastHour))).sort((a, b) => a - b)
    : [0, 6, 12, 24, 48, 72];

  const filteredMaps = maps.filter(
    (map) =>
      map.type === selectedModel &&
      map.parameter === selectedParameter &&
      map.forecastHour === selectedForecastHour
  );

  const getParameterIcon = (param: string) => {
    switch (param) {
      case 'Temperature':
        return <ThermostatAuto />;
      case 'Precipitation':
        return <WaterDrop />;
      case 'Wind':
        return <Air />;
      default:
        return <Satellite />;
    }
  };

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
          Forecast Model Maps
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mb: 2 }}>
          Showing {filteredMaps.length} of {maps.length} available maps
        </Typography>

        <Box mb={3}>
          <Typography variant="subtitle2" gutterBottom sx={{ opacity: 0.8 }}>
            Model
          </Typography>
          <ToggleButtonGroup
            value={selectedModel}
            exclusive
            onChange={(e, value) => value && setSelectedModel(value)}
            sx={{ mb: 2, flexWrap: 'wrap' }}
          >
            {modelTypes.map((model) => (
              <ToggleButton
                key={model}
                value={model}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.3)',
                  '&.Mui-selected': {
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                  },
                }}
              >
                {model}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Typography variant="subtitle2" gutterBottom sx={{ opacity: 0.8, mt: 2 }}>
            Parameter
          </Typography>
          <ToggleButtonGroup
            value={selectedParameter}
            exclusive
            onChange={(e, value) => value && setSelectedParameter(value)}
            sx={{ flexWrap: 'wrap' }}
          >
            {parameters.map((param) => (
              <ToggleButton
                key={param}
                value={param}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.3)',
                  '&.Mui-selected': {
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                  },
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  {getParameterIcon(param)}
                  {param}
                </Box>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Typography variant="subtitle2" gutterBottom sx={{ opacity: 0.8, mt: 2 }}>
            Forecast Hour
          </Typography>
          <ToggleButtonGroup
            value={selectedForecastHour}
            exclusive
            onChange={(e, value) => value !== null && setSelectedForecastHour(value)}
            sx={{ flexWrap: 'wrap' }}
          >
            {forecastHours.map((hour) => (
              <ToggleButton
                key={hour}
                value={hour}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.3)',
                  '&.Mui-selected': {
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                  },
                }}
              >
                +{hour}h
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
            },
            gap: 2,
          }}
        >
          {filteredMaps.length > 0 ? (
            filteredMaps.map((map) => (
              <Card
                key={map.id}
                sx={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 2,
                }}
              >
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6" fontWeight="bold" color="white">
                        {map.name}
                      </Typography>
                      <Chip
                        label={`+${map.forecastHour}h`}
                        size="small"
                        sx={{
                          background: 'rgba(59, 130, 246, 0.3)',
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      />
                    </Box>
                    <Typography variant="caption" color="white" sx={{ opacity: 0.7 }} display="block" mb={2}>
                      {format(map.timestamp, 'MMM dd, yyyy HH:mm')} UTC
                    </Typography>
                    <Box
                      component="img"
                      src={map.imageUrl}
                      alt={map.name}
                      onError={(e) => {
                        console.error('Failed to load image:', map.imageUrl);
                        // Set a fallback background color
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.style.background = 'rgba(59, 130, 246, 0.2)';
                        (e.target as HTMLImageElement).parentElement!.style.minHeight = '300px';
                      }}
                      sx={{
                        width: '100%',
                        height: 300,
                        objectFit: 'cover',
                        borderRadius: 1,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        background: 'rgba(0, 0, 0, 0.2)',
                      }}
                    />
                    <Typography variant="caption" color="white" sx={{ opacity: 0.6, mt: 1 }} display="block">
                      Model: {map.type} | Parameter: {map.parameter}
                    </Typography>
                  </CardContent>
              </Card>
            ))
          ) : (
            <Box sx={{ gridColumn: '1 / -1', textAlign: 'center', py: 4 }}>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                No maps available for the selected filters
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ModelMapsViewer;