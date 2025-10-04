'use client';

import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  SelectChangeEvent,
} from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import { City, ISRAEL_CITIES } from '@/types/weather';

interface CitySelectorProps {
  selectedCities: string[];
  onChange: (cityIds: string[]) => void;
  multiple?: boolean;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  selectedCities,
  onChange,
  multiple = false,
}) => {
  const handleChange = (event: SelectChangeEvent<string | string[]>) => {
    const value = event.target.value;
    onChange(typeof value === 'string' ? [value] : value);
  };

  const groupedCities = ISRAEL_CITIES.reduce((acc, city) => {
    if (!acc[city.region]) {
      acc[city.region] = [];
    }
    acc[city.region].push(city);
    return acc;
  }, {} as Record<string, City[]>);

  return (
    <FormControl fullWidth>
      <InputLabel
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          '&.Mui-focused': { color: 'white' },
        }}
      >
        Select {multiple ? 'Cities' : 'City'}
      </InputLabel>
      <Select
        multiple={multiple}
        value={multiple ? selectedCities : selectedCities[0] || ''}
        onChange={handleChange}
        renderValue={(selected) => {
          if (multiple && Array.isArray(selected)) {
            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((cityId) => {
                  const city = ISRAEL_CITIES.find((c) => c.id === cityId);
                  return (
                    <Chip
                      key={cityId}
                      label={city?.name}
                      size="small"
                      icon={<LocationOn />}
                      sx={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                      }}
                    />
                  );
                })}
              </Box>
            );
          }
          const city = ISRAEL_CITIES.find((c) => c.id === selected);
          return city?.name || '';
        }}
        sx={{
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.3)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '.MuiSvgIcon-root': {
            color: 'white',
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              background: 'rgba(30, 41, 59, 0.95)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              maxHeight: 400,
            },
          },
        }}
      >
        {Object.entries(groupedCities).map(([region, cities]) => [
          <MenuItem key={region} disabled sx={{ opacity: 0.5, fontWeight: 'bold' }}>
            {region}
          </MenuItem>,
          ...cities.map((city) => (
            <MenuItem
              key={city.id}
              value={city.id}
              sx={{
                '&:hover': { background: 'rgba(59, 130, 246, 0.2)' },
                '&.Mui-selected': {
                  background: 'rgba(59, 130, 246, 0.3)',
                  '&:hover': { background: 'rgba(59, 130, 246, 0.4)' },
                },
                pl: 4,
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <LocationOn fontSize="small" />
                <span>{city.name}</span>
                <span style={{ opacity: 0.6, fontSize: '0.875rem' }}>({city.nameHebrew})</span>
              </Box>
            </MenuItem>
          )),
        ])}
      </Select>
    </FormControl>
  );
};

export default CitySelector;
