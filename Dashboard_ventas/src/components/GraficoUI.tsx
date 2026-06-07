import { Box, Typography } from '@mui/material';
import { type DashboardData } from '../types/DashboardTypes';

interface Props {
  data: DashboardData['ventasPorGenero'];
}

export default function GraficoUI({ data }: Props) {
  const maxVentas = Math.max(...data.map((d) => d.ventas), 1);

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Ventas promedio por género
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {data.map((d) => (
          <Box key={d.genero} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption"
              sx={{ width: 60, textAlign: 'right', color: 'text.secondary' }}>
              {d.genero}
            </Typography>
            <Box sx={{ flex: 1, bgcolor: 'grey.200', borderRadius: 1,
              height: 22, overflow: 'hidden' }}>
              <Box sx={{
                width: `${(d.ventas / maxVentas) * 100}%`,
                height: '100%',
                bgcolor: '#185FA5',
                borderRadius: 1,
              }} />
            </Box>
            <Typography variant="caption" sx={{ width: 36, color: 'text.secondary' }}>
              {d.ventas.toFixed(1)}M
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}