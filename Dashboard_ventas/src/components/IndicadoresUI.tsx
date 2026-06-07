import { Card, CardContent, Grid, Typography } from '@mui/material';
import { type DashboardData } from '../types/DashboardTypes';

interface Props {
  data: DashboardData;
}

export default function IndicadoresUI({ data }: Props) {
  const indicadores = [
    { label: 'Total ventas globales', valor: `${data.totalVentas}M`, unidad: 'unidades acumuladas' },
    { label: 'Promedio por juego', valor: `${data.promedio}M`, unidad: 'ventas promedio' },
    { label: 'Total de juegos', valor: `${data.totalJuegos}`, unidad: 'registros en el dataset' },
    { label: 'Género líder', valor: data.generoLider, unidad: 'mayor volumen de ventas' },
  ];

  return (
    <Grid container spacing={2}>
      {indicadores.map((ind) => (
        <Grid size={{ xs: 6, md: 3 }} key={ind.label}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {ind.label}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
                {ind.valor}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {ind.unidad}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}