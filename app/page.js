'use client'; // Required for client-side hooks in the app directory

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the desired route
    router.push('/adminSpace/dashboard');
  }, []);

  return null; // Optional: Return null since the user is being redirected
}
