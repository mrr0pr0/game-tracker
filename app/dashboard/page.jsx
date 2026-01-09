'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GameGrid from '../../components/dashboard/GameGrid';
import  StatsOverview  from '../../components/dashboard/StatsOverview';
import FilterBar from '../../components/dashboard/FilterBar';
import LoadingSpinner from '../../components/feedback/LoadingSpinner';

export default function DashboardPage() {
  const router = useRouter();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: 'all', sort: 'recent' });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth');
        if (!response.ok) {
          router.push('/auth');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/auth');
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/games');
        if (!response.ok) throw new Error('Failed to fetch games');
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error('Failed to fetch games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <StatsOverview games={games} />
      <FilterBar filters={filters} onFiltersChange={setFilters} />
      <GameGrid games={games} filters={filters} />
    </div>
  );
}
