import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

interface SelectorProps {
  onOptionSelect: (option: string) => void;
}

const generos = [
  'Todos',
  'Action',
  'Sports',
  'Shooter',
  'RPG',
  'Racing',
  'Platform',
  'Simulation',
  'Puzzle',
];

export default function SelectorUI({ onOptionSelect }: SelectorProps) {
  const [genero, setGenero] = useState('Todos');

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    setGenero(selectedValue);
    onOptionSelect(selectedValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Filtros
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="genero-label">Género</InputLabel>
        <Select
          labelId="genero-label"
          value={genero}
          label="Género"
          onChange={handleChange}
        >
          {generos.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="body2" color="text.secondary">
        Dataset: Video Game Sales 2024 <br />
        Fuente: Kaggle / VGChartz <br />
        Registros: 64,016 juegos
      </Typography>
    </Box>
  );
}
