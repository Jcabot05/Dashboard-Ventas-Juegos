import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

// 1. Definimos la interfaz correcta para las Opciones/Filtros
interface SelectorUIProps {
  onOptionSelect: (option: string | null) => void;
}

export default function SelectorUI({ onOptionSelect }: SelectorUIProps) {
  const [option, setOption] = useState('Todos');

  // Aquí pones las opciones que maneja tu dashboard (ajústalas si usas otras)
  const options = ['Todos', 'Género', 'Plataforma', 'Región'];

  const handleChange = (e: SelectChangeEvent) => {
    const v = e.target.value;
    setOption(v);
    
    // Si elige 'Todos', pasamos null para limpiar el filtro; si no, pasamos el valor
    onOptionSelect(v === 'Todos' ? null : v);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Filtro Principal</Typography>
      <FormControl fullWidth>
        <InputLabel id="selector-label">Filtrar por</InputLabel>
        <Select labelId="selector-label" value={option} label="Filtrar por" onChange={handleChange}>
          {options.map((opt) => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}