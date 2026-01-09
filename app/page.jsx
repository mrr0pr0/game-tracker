import { redirect } from 'next/navigation';

export default function Home() {
  // TODO: Check if user is authenticated
  // If not authenticated, redirect to /auth
  // If authenticated, redirect to /dashboard

  redirect('/dashboard');
}