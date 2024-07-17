'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Concert {
  id: number;
  name: string;
  imageUrl: string;
  date: string;
  location: {
    name: string;
  };
  category: {
    name: string;
  };
  concertTickets: Array<{
    ticketType: {
      name: string;
      price: number;
    };
    availableSeats: number;
  }>;
}

export default function ConcertDetail() {
  const [concert, setConcert] = useState<Concert | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchConcert = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}concerts/${id}`);
        console.log('Fetched concert:', response.data); // Log data
        setConcert(response.data);
      } catch (error) {
        console.error('Error fetching concert:', error);
      }
    };

    if (id) {
      fetchConcert();
    }
  }, [id]);

  if (!concert) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-1/4 bg-white shadow-lg p-4 border border-gray-300 rounded-md">
        <div className="relative w-full h-auto mb-4">
          <img
            src={concert.imageUrl}
            alt={concert.name}
            className="rounded-md w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-bold text-center">{concert.name}</h2>
      </aside>
      <main className="w-3/4 px-4 py-6 bg-white shadow-lg border border-gray-300 rounded-md ml-4">
        <h1 className="text-3xl font-bold mb-4">{concert.name}</h1>
        <p className="text-xl mb-4">{concert.date}</p>
        <p className="text-xl mb-4">{concert.location.name}</p>
        <h2 className="text-2xl font-bold mt-6 mb-4">Ticket Types</h2>
        <ul className="space-y-2">
          {concert.concertTickets && concert.concertTickets.map((ticket, index) => (
            <li key={index} className="flex justify-between border-b py-2">
              <span>{ticket.ticketType.name}</span>
              <span>IDR {ticket.ticketType.price.toLocaleString()}</span>
              <span>{ticket.availableSeats} seats available</span>
            </li>
          ))}
        </ul>
        <div className="border-t mt-6 pt-6">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Buy Ticket
          </button>
        </div>
      </main>
    </div>
  );
}
