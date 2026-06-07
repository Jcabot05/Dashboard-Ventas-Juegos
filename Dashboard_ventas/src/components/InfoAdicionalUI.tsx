import { Alert, Box, Typography } from '@mui/material';

const ventasActionM = 1786;
const UMBRAL_VENTAS = 1500;

export default function InfoAdicionalUI() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {ventasActionM > UMBRAL_VENTAS && (
        <Alert severity="warning" variant="filled">
          ⚠️ Nintendo supera las {UMBRAL_VENTAS}M de unidades vendidas acumuladas.
          Es el publisher dominante del mercado global.
        </Alert>
      )}
      <Typography variant="body2" color="text.secondary" align="center">
        Datos: Video Game Sales 2024 · Kaggle / VGChartz · Dashboard de Videojuegos · UEES
      </Typography>
    </Box>
  );
}
