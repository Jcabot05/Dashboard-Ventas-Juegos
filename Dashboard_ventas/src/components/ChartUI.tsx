import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { type DashboardData } from '../types/DashboardTypes';

interface ChartUIProps {
  data: DashboardData['ventasPorGenero'];
}

export default function ChartUI({ data }: ChartUIProps) {
  const labels = data.map((item) => item.genero);
  const values = data.map((item) => item.ventas);

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Ventas por género
      </Typography>
      <BarChart
        xAxis={[{ scaleType: 'band', data: labels }]}
        series={[{ data: values, label: 'Ventas (M)' }]}
        height={360}
        margin={{ left: 56, right: 24, top: 24, bottom: 40 }}
      />
    </Box>
  );
}