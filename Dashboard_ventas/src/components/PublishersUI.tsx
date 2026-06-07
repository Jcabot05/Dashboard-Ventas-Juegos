import { Box, Typography } from '@mui/material';
import { type DashboardData } from '../types/DashboardTypes';

interface Props {
  data: DashboardData['ventasPorRegion'];
}

export default function PublishersUI({ data }: Props) {
  const maxVentas = Math.max(...data.map((p) => p.ventas), 1);

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Ventas por región
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {data.map((p) => (
          <Box key={p.region} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption"
              sx={{ width: 72, textAlign: 'right', color: 'text.secondary' }}>
              {p.region}
            </Typography>
            <Box sx={{ flex: 1, bgcolor: 'grey.200', borderRadius: 1,
              height: 14, overflow: 'hidden' }}>
              <Box sx={{
                width: `${(p.ventas / maxVentas) * 100}%`,
                height: '100%',
                bgcolor: '#1F4E79',
                borderRadius: 1,
              }} />
            </Box>
            <Typography variant="caption" sx={{ width: 40, color: 'text.secondary' }}>
              {p.ventas.toFixed(1)}M
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}