import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

interface YearSelectorProps {
  onYearSelect: (year: string) => void;
}

function generateYears(startYear = 1977, endYear = 2020) {
  const years: string[] = ['Todos'];
  for (let y = endYear; y >= startYear; y--) {
    years.push(`${y}`);
  }
  return years;
}

export default function YearSelectorUI({ onYearSelect }: YearSelectorProps) {
  const years = generateYears(1977, 2020);
  const [year, setYear] = useState('Todos');

  const handleChange = (e: SelectChangeEvent) => {
    const v = e.target.value;
    setYear(v);
    onYearSelect(v);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Año</Typography>
      <FormControl fullWidth>
        <InputLabel id="anio-label">Año</InputLabel>
        <Select labelId="anio-label" value={year} label="Año" onChange={handleChange}>
          {years.map((y) => (
            <MenuItem key={y} value={y}>{y}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}