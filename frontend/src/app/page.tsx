// frontend/src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface ApiResponse {
  message: string;
}

export default function Home() {
  const [message, setMessage] = useState<string>('Loading...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/hello/`)
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((err) => {
        setError('Failed to fetch data');
        console.error(err);
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">Welcome to Deploy Test</h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-lg text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}