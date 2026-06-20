import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { type Juego } from '../types/DashboardTypes';

interface TableUIProps {
  data: Juego[];
}

const columns: GridColDef[] = [
  { field: 'rank', headerName: '#', width: 90 },
  {
    field: 'titulo',
    headerName: 'Juego',
    flex: 1,
    minWidth: 180,
  },
  {
    field: 'plataforma',
    headerName: 'Plataforma',
    width: 140,
  },
  {
    field: 'genero',
    headerName: 'Género',
    width: 140,
  },
  {
    field: 'total_sales',
    headerName: 'Ventas globales',
    width: 150,
    type: 'number',
    valueFormatter: (value) => `${value}M`,
  },
];

export default function TableUI({ data }: TableUIProps) {
  const rows = data.slice(0, 10).map((juego) => ({
    ...juego,
    id: juego.rank,
  }));

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Top 10 juegos por ventas globales
      </Typography>
      <Box sx={{ height: 460, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
        />
      </Box>
    </Box>
  );
}