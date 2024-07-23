import { useEffect, useState } from 'react';
import axios from 'axios';
import { Concert } from '@/types';

export const useConcertDetail = (concertId: string | null) => {
  const [concert, setConcert] = useState<Concert | null>(null);

  useEffect(() => {
    const fetchConcert = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}concerts/${concertId}`
        );
        console.log('Fetched concert:', response.data);
        setConcert(response.data);
      } catch (error) {
        console.error('Error fetching concert:', error);
      }
    };

    if (concertId) {
      fetchConcert();
    }
  }, [concertId]);

  return concert;
};
