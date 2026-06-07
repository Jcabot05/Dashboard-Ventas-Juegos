import {
  Box, Chip, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import { type Juego } from '../types/DashboardTypes';

interface Props {
  data: Juego[];
}

export default function TablaUI({ data }: Props) {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Top 10 juegos por ventas globales
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Juego</TableCell>
              <TableCell>Plataforma</TableCell>
              <TableCell>Género</TableCell>
              <TableCell align="right">Ventas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((j) => (
              <TableRow key={j.rank}>
                <TableCell>{j.rank}</TableCell>
                <TableCell>{j.titulo}</TableCell>
                <TableCell>{j.plataforma}</TableCell>
                <TableCell>
                  <Chip label={j.genero} size="small" variant="outlined" />
                </TableCell>
                <TableCell align="right"
                  sx={{ color: '#185FA5', fontWeight: 'bold' }}>
                  {j.total_sales}M
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}