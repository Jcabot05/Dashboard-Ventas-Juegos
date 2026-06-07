export interface Juego {
  rank: number;
  titulo: string;
  plataforma: string;
  genero: string;
  na_sales: number;
  jp_sales: number;
  pal_sales: number;
  other_sales: number;
  total_sales: number;
}

export interface DashboardData {
  juegos: Juego[];
  totalVentas: number;
  promedio: number;
  totalJuegos: number;
  generoLider: string;
  ventasPorGenero: { genero: string; ventas: number }[];
  ventasPorRegion: { region: string; ventas: number }[];
}