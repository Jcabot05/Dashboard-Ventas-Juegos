import { useEffect, useState } from 'react';
import { type DashboardData, type Juego } from '../types/DashboardTypes';

const TODOS_LOS_JUEGOS: Juego[] = [
  { rank: 1, titulo: 'Wii Sports', plataforma: 'Wii', genero: 'Sports', na_sales: 41.4, jp_sales: 3.8, pal_sales: 29.0, other_sales: 8.5, total_sales: 82.7 },
  { rank: 2, titulo: 'GTA V', plataforma: 'Multi', genero: 'Action', na_sales: 21.4, jp_sales: 1.1, pal_sales: 24.0, other_sales: 9.4, total_sales: 55.9 },
  { rank: 3, titulo: 'Super Mario Bros.', plataforma: 'NES', genero: 'Platform', na_sales: 29.1, jp_sales: 6.8, pal_sales: 3.6, other_sales: 0.8, total_sales: 40.2 },
  { rank: 4, titulo: 'Tetris', plataforma: 'GB', genero: 'Puzzle', na_sales: 23.2, jp_sales: 4.2, pal_sales: 2.3, other_sales: 0.6, total_sales: 35.8 },
  { rank: 5, titulo: 'Mario Kart 8 Deluxe', plataforma: 'Switch', genero: 'Racing', na_sales: 13.4, jp_sales: 4.5, pal_sales: 10.2, other_sales: 4.0, total_sales: 32.1 },
  { rank: 6, titulo: 'Pokémon R/B/Y', plataforma: 'GB', genero: 'RPG', na_sales: 15.1, jp_sales: 8.9, pal_sales: 5.2, other_sales: 2.2, total_sales: 31.4 },
  { rank: 7, titulo: 'FIFA 22', plataforma: 'Multi', genero: 'Sports', na_sales: 4.2, jp_sales: 0.3, pal_sales: 19.4, other_sales: 5.0, total_sales: 28.9 },
  { rank: 8, titulo: 'Call of Duty: MW', plataforma: 'Multi', genero: 'Shooter', na_sales: 15.0, jp_sales: 0.4, pal_sales: 8.0, other_sales: 3.1, total_sales: 26.5 },
  { rank: 9, titulo: 'Red Dead Redemption 2', plataforma: 'Multi', genero: 'Action', na_sales: 10.5, jp_sales: 0.5, pal_sales: 9.2, other_sales: 4.0, total_sales: 24.2 },
  { rank: 10, titulo: 'Animal Crossing: NH', plataforma: 'Switch', genero: 'Simulation', na_sales: 9.0, jp_sales: 5.0, pal_sales: 5.8, other_sales: 2.6, total_sales: 22.4 },
  { rank: 11, titulo: 'Mario Kart 8', plataforma: 'WiiU', genero: 'Racing', na_sales: 5.1, jp_sales: 2.3, pal_sales: 5.2, other_sales: 1.0, total_sales: 13.6 },
  { rank: 12, titulo: 'Zelda: BOTW', plataforma: 'Switch', genero: 'Action', na_sales: 6.7, jp_sales: 1.8, pal_sales: 4.5, other_sales: 1.2, total_sales: 14.2 },
  { rank: 13, titulo: 'FIFA 21', plataforma: 'Multi', genero: 'Sports', na_sales: 3.8, jp_sales: 0.2, pal_sales: 16.0, other_sales: 3.5, total_sales: 23.5 },
  { rank: 14, titulo: 'Dark Souls III', plataforma: 'Multi', genero: 'RPG', na_sales: 3.5, jp_sales: 1.2, pal_sales: 5.0, other_sales: 1.0, total_sales: 10.7 },
  { rank: 15, titulo: 'Need for Speed', plataforma: 'Multi', genero: 'Racing', na_sales: 4.5, jp_sales: 0.3, pal_sales: 3.8, other_sales: 1.1, total_sales: 9.7 },
];

function calcularDashboard(juegos: Juego[]): DashboardData {
  const totalVentas = juegos.reduce((s, j) => s + j.total_sales, 0);
  const promedio = juegos.length > 0 ? totalVentas / juegos.length : 0;

  const porGenero: Record<string, number> = {};
  juegos.forEach((j) => {
    porGenero[j.genero] = (porGenero[j.genero] || 0) + j.total_sales;
  });

  const ventasPorGenero = Object.entries(porGenero)
    .map(([genero, ventas]) => ({ genero, ventas }))
    .sort((a, b) => b.ventas - a.ventas);

  const generoLider = ventasPorGenero[0]?.genero ?? '-';

  const ventasPorRegion = [
    { region: 'NA', ventas: juegos.reduce((s, j) => s + j.na_sales, 0) },
    { region: 'PAL', ventas: juegos.reduce((s, j) => s + j.pal_sales, 0) },
    { region: 'Other', ventas: juegos.reduce((s, j) => s + j.other_sales, 0) },
    { region: 'JP', ventas: juegos.reduce((s, j) => s + j.jp_sales, 0) },
  ];

  return {
    juegos,
    totalVentas: Math.round(totalVentas * 10) / 10,
    promedio: Math.round(promedio * 100) / 100,
    totalJuegos: juegos.length,
    generoLider,
    ventasPorGenero,
    ventasPorRegion,
  };
}

export default function useFetchData(selectedOption: string | null): DashboardData {
  const [data, setData] = useState<DashboardData>(calcularDashboard(TODOS_LOS_JUEGOS));

  useEffect(() => {
    const filtrados =
      selectedOption && selectedOption !== 'Todos'
        ? TODOS_LOS_JUEGOS.filter((j) => j.genero === selectedOption)
        : TODOS_LOS_JUEGOS;

    setData(calcularDashboard(filtrados));
  }, [selectedOption]);

  return data;
}