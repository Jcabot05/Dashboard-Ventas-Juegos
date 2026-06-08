import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../firebase/firebaseConfig';
import type { DashboardData, Juego } from '../types/DashboardTypes';

function calcularDashboard(juegos: Juego[]): DashboardData {
  const totalVentas = juegos.reduce((s, j) => s + (j.total_sales ?? 0), 0);
  const promedio = juegos.length > 0 ? totalVentas / juegos.length : 0;

  const porGenero: Record<string, number> = {};
  juegos.forEach((j) => {
    if (j.genero) {
      porGenero[j.genero] = (porGenero[j.genero] || 0) + j.total_sales;
    }
  });

  const ventasPorGenero = Object.entries(porGenero)
    .map(([genero, ventas]) => ({ genero, ventas: Math.round(ventas * 10) / 10 }))
    .sort((a, b) => b.ventas - a.ventas)
    .slice(0, 6);

  const generoLider = ventasPorGenero[0]?.genero ?? '-';

  const ventasPorRegion = [
    { region: 'NA',    ventas: Math.round(juegos.reduce((s, j) => s + (j.na_sales ?? 0), 0) * 10) / 10 },
    { region: 'PAL',   ventas: Math.round(juegos.reduce((s, j) => s + (j.pal_sales ?? 0), 0) * 10) / 10 },
    { region: 'Other', ventas: Math.round(juegos.reduce((s, j) => s + (j.other_sales ?? 0), 0) * 10) / 10 },
    { region: 'JP',    ventas: Math.round(juegos.reduce((s, j) => s + (j.jp_sales ?? 0), 0) * 10) / 10 },
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
  const [data, setData] = useState<DashboardData>({
    juegos: [],
    totalVentas: 0,
    promedio: 0,
    totalJuegos: 0,
    generoLider: '-',
    ventasPorGenero: [],
    ventasPorRegion: [],
  });

  useEffect(() => {
    const dbRef = ref(db, 'data');

    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        const raw = snapshot.val();
        console.debug('Firebase snapshot exists. Raw value:', raw);

        // Firebase devuelve un objeto con índices — lo convertimos a array
        const juegosArray: Juego[] = Object.values(raw).map((item: any) => ({
          rank:        item.rank ?? 0,
          titulo:      item.title ?? item.titulo ?? '',
          plataforma:  item.platform ?? item.plataforma ?? '',
          genero:      item.genre ?? item.genero ?? '',
          na_sales:    parseFloat(item.na_sales) || 0,
          jp_sales:    parseFloat(item.jp_sales) || 0,
          pal_sales:   parseFloat(item.pal_sales) || 0,
          other_sales: parseFloat(item.other_sales) || 0,
          total_sales: parseFloat(item.total_sales) || 0,
        }));

        const filtrados =
          selectedOption && selectedOption !== 'Todos'
            ? juegosArray.filter((j) => j.genero === selectedOption)
            : juegosArray;

        console.debug('Mapped juegosArray length:', juegosArray.length, 'sample:', juegosArray[0]);
        console.debug('After filter length:', filtrados.length);

        setData(calcularDashboard(filtrados));
      }
    }).catch((error) => {
      console.error('Error al obtener datos de Firebase:', error);
    });

  }, [selectedOption]);

  return data;
}