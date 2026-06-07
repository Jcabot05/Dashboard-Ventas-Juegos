import { useState } from 'react';
import { Box, AppBar, Toolbar, Button, Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicadoresUI from './components/IndicadoresUI';
import GraficoUI from './components/GraficoUI';
import TablaUI from './components/TablaUI';
import PublishersUI from './components/PublishersUI';
import useFetchData from './hooks/useFetchData';

function App() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const dataFetcherOutput = useFetchData(selectedOption);

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: '#1F4E79' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <HeaderUI />
          <Box sx={{ display: 'flex', gap: 1 }}>
            {['Género', 'Plataforma', 'Región'].map((f) => (
              <Button key={f} size="small" variant="outlined"
                sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)', fontSize: 11 }}>
                {f}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2} sx={{ padding: 2 }}>

        {/* Alertas */}
        <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <AlertUI
            description={`Género líder: ${dataFetcherOutput.generoLider}`}
            severity="info"
            variant="outlined"
          />
        </Grid>

        {/* Selector */}
        <Grid size={{ xs: 12, md: 3 }}>
          <SelectorUI onOptionSelect={setSelectedOption} />
        </Grid>

        {/* Indicadores */}
        <Grid container size={{ xs: 12, md: 9 }}>
          <IndicadoresUI data={dataFetcherOutput} />
        </Grid>

        {/* Histograma */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <GraficoUI data={dataFetcherOutput.ventasPorGenero} />
        </Grid>

        {/* Barras por género */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <TablaUI data={dataFetcherOutput.juegos} />
        </Grid>

        {/* Pie región */}
        <Grid size={{ xs: 12 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <PublishersUI data={dataFetcherOutput.ventasPorRegion} />
        </Grid>

      </Grid>
    </Box>
  );
}

export default App;