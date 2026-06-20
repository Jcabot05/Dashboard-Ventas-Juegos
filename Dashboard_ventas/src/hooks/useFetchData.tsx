import { useEffect, useMemo, useState } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../firebase/firebaseConfig';
import { type DashboardData, type Juego } from '../types/DashboardTypes';

interface RawJuego {
  title?: string | null;
  console?: string | null;
  genre?: string | null;
  total_sales?: number | null;
  na_sales?: number | null;
  jp_sales?: number | null;
  pal_sales?: number | null;
  other_sales?: number | null;
  release_date?: string | null;
}

type JuegoCrudo = Omit<Juego, 'rank'> & { anio: string | null };

function tieneVentas(j: RawJuego): j is RawJuego & { total_sales: number } {
  return j.total_sales != null;
}

function extraerAnio(releaseDate: string | null | undefined): string | null {
  if (!releaseDate) return null;
  const match = releaseDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return null;
  return match[3];
}

function mapearJuego(raw: RawJuego & { total_sales: number }): JuegoCrudo {
  return {
    titulo: raw.title ?? 'Sin título',
    plataforma: raw.console ?? 'N/A',
    genero: raw.genre ?? 'Sin género',
    total_sales: raw.total_sales / 100,
    na_sales: (raw.na_sales ?? 0) / 100,
    jp_sales: (raw.jp_sales ?? 0) / 100,
    pal_sales: (raw.pal_sales ?? 0) / 100,
    other_sales: (raw.other_sales ?? 0) / 100,
    anio: extraerAnio(raw.release_date),
  };
}

function calcularDashboard(juegos: JuegoCrudo[]): Omit<DashboardData, 'loading' | 'error'> {
  const ordenados = [...juegos].sort((a, b) => b.total_sales - a.total_sales);

  const juegosConRank: Juego[] = ordenados.map((j, index) => ({
    rank: index + 1,
    titulo: j.titulo,
    plataforma: j.plataforma,
    genero: j.genero,
    na_sales: j.na_sales,
    jp_sales: j.jp_sales,
    pal_sales: j.pal_sales,
    other_sales: j.other_sales,
    total_sales: j.total_sales,
  }));

  const totalVentas = juegosConRank.reduce((s, j) => s + j.total_sales, 0);
  const promedio = juegosConRank.length > 0 ? totalVentas / juegosConRank.length : 0;

  const porGenero: Record<string, number> = {};
  juegosConRank.forEach((j) => {
    porGenero[j.genero] = (porGenero[j.genero] || 0) + j.total_sales;
  });

  const ventasPorGenero = Object.entries(porGenero)
    .map(([genero, ventas]) => ({ genero, ventas }))
    .sort((a, b) => b.ventas - a.ventas);

  const generoLider = ventasPorGenero[0]?.genero ?? '-';

  const ventasPorRegion = [
    { region: 'NA', ventas: juegosConRank.reduce((s, j) => s + j.na_sales, 0) },
    { region: 'PAL', ventas: juegosConRank.reduce((s, j) => s + j.pal_sales, 0) },
    { region: 'Other', ventas: juegosConRank.reduce((s, j) => s + j.other_sales, 0) },
    { region: 'JP', ventas: juegosConRank.reduce((s, j) => s + j.jp_sales, 0) },
  ];

  return {
    juegos: juegosConRank,
    totalVentas: Math.round(totalVentas * 10) / 10,
    promedio: Math.round(promedio * 100) / 100,
    totalJuegos: juegosConRank.length,
    generoLider,
    ventasPorGenero,
    ventasPorRegion,
  };
}

export default function useFetchData(
  selectedOption: string | null,
  selectedYear: string | null
): DashboardData {
  const [todosLosJuegos, setTodosLosJuegos] = useState<JuegoCrudo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;

    async function cargarDatos() {
      setLoading(true);
      setError(null);
      try {
        const snapshot = await get(ref(db, '/'));
        if (!snapshot.exists()) {
          throw new Error('No se encontraron datos en la base de datos.');
        }
        const valor = snapshot.val();
        const crudos: RawJuego[] = Array.isArray(valor) ? valor : Object.values(valor);

        const procesados = crudos.filter(tieneVentas).map(mapearJuego);

        if (!cancelado) setTodosLosJuegos(procesados);
      } catch (e) {
        if (!cancelado) {
          setError(e instanceof Error ? e.message : 'Error al cargar los datos.');
        }
      } finally {
        if (!cancelado) setLoading(false);
      }
    }

    cargarDatos();
    return () => {
      cancelado = true;
    };
  }, []);

  const dashboardFiltrado = useMemo(() => {
    const filtrados = todosLosJuegos.filter((j) => {
      const coincideGenero =
        !selectedOption || selectedOption === 'Todos' || j.genero === selectedOption;
      const coincideAnio =
        !selectedYear || selectedYear === 'Todos' || j.anio === selectedYear;
      return coincideGenero && coincideAnio;
    });
    return calcularDashboard(filtrados);
  }, [todosLosJuegos, selectedOption, selectedYear]);

  return { ...dashboardFiltrado, loading, error };
}