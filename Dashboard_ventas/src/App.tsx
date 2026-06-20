import { useState } from 'react';
import { AppBar, Box, Button, Grid, Toolbar } from '@mui/material';
import AlertUI from './components/AlertUI';
import ChartUI from './components/ChartUI';
import HeaderUI from './components/HeaderUI';
import IndicadoresUI from './components/IndicadoresUI';
import YearSelectorUI from './components/YearSelectorUI';
import PublishersUI from './components/PublishersUI';
import SelectorUI from './components/SelectorUI';
import TableUI from './components/TableUI';
import useFetchData from './hooks/useFetchData';

function App() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const dataFetcherOutput = useFetchData(selectedOption, selectedYear);

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: '#1F4E79' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <HeaderUI />
          <Box sx={{ display: 'flex', gap: 1 }}>
            {['Género', 'Plataforma', 'Región'].map((filterLabel) => (
              <Button
                key={filterLabel}
                size="small"
                variant="outlined"
                sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)', fontSize: 11 }}
              >
                {filterLabel}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2} sx={{ padding: 2 }}>
        {dataFetcherOutput.error && (
          <Grid size={{ xs: 12 }}>
            <AlertUI
              description={`Error al cargar los datos: ${dataFetcherOutput.error}`}
              severity="error"
            />
          </Grid>
        )}

        {dataFetcherOutput.loading && (
          <Grid size={{ xs: 12 }}>
            <AlertUI
              description="Cargando datos de ventas de videojuegos…"
              severity="info"
            />
          </Grid>
        )}

        <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <AlertUI
            description={`Género líder: ${dataFetcherOutput.generoLider}`}
            severity="info"
            variant="outlined"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <SelectorUI onOptionSelect={setSelectedOption} />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <YearSelectorUI onYearSelect={setSelectedYear} />
        </Grid>

        <Grid container size={{ xs: 12, md: 9 }}>
          <IndicadoresUI data={dataFetcherOutput} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <ChartUI data={dataFetcherOutput.ventasPorGenero} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <TableUI data={dataFetcherOutput.juegos} />
        </Grid>

        <Grid size={{ xs: 12 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <PublishersUI data={dataFetcherOutput.ventasPorRegion} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;