// explore/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaTags } from 'react-icons/fa';
import CategorySlider from '../../components/CategorySlider';
import axios from 'axios';

export default function Explore() {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}concerts`);
        console.log('Fetched concerts:', response.data); // Log data
        setConcerts(response.data);
      } catch (error) {
        console.error('Error fetching concerts:', error);
      }
    };

    fetchConcerts();
  }, []);

  const metalConcerts = concerts.filter(concert => concert.category.name === 'Metal');
  const edmConcerts = concerts.filter(concert => concert.category.name === 'Electric Dance Music');
  const popConcerts = concerts.filter(concert => concert.category.name === 'Pop');

  console.log('Metal concerts:', metalConcerts); // Log data
  console.log('EDM concerts:', edmConcerts); // Log data
  console.log('Pop concerts:', popConcerts); // Log data

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-1/4 bg-white shadow-lg p-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold flex items-center">
            <FaSearch className="mr-2" /> Search
          </h2>
          <input
            type="text"
            placeholder="Search concerts..."
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold flex items-center">
            <FaMapMarkerAlt className="mr-2" /> Locations
          </h2>
          <ul className="space-y-2 mt-2">
            {locations.map((location, index) => (
              <li key={index} className="hover:text-blue-600 cursor-pointer transition duration-300">
                {location.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <FaTags className="mr-2" /> Categories
          </h2>
          <ul className="space-y-2 mt-2">
            {categories.map((category, index) => (
              <li key={index} className="hover:text-blue-600 cursor-pointer transition duration-300">
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <main className="w-3/4 px-4 py-6 bg-white shadow-lg">
        <CategorySlider slides={metalConcerts} title="Upcoming Metal Concerts" titleColor="black" />
        <CategorySlider slides={edmConcerts} title="Upcoming EDM Concerts" titleColor="black" />
        <CategorySlider slides={popConcerts} title="Upcoming Pop Concerts" titleColor="black" />
      </main>
    </div>
  );
}

const locations = [
  { name: 'Jakarta' },
  { name: 'Bandung' },
  { name: 'Surabaya' },
  { name: 'Yogyakarta' },
  { name: 'Bali' },
  { name: 'Padang' },
  { name: 'Medan' },
  { name: 'Lampung' },
  { name: 'Malang' },
  { name: 'Makassar' },
  { name: 'Manado' },
];

const categories = [
  { name: 'Metal' },
  { name: 'Electric Dance Music' },
  { name: 'Pop' },
];
