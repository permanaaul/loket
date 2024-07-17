'use client';

import { useEffect, useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaTags } from 'react-icons/fa';
import CategorySlider from '../../components/CategorySlider';
import api from '../../utils/api';
import { useRouter } from 'next/navigation';

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
}

export default function Explore() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await api.get('api/concerts'); // Memanggil endpoint yang benar
        console.log('Fetched concerts:', response.data); // Log data
        setConcerts(response.data);
      } catch (error) {
        console.error('Error fetching concerts:', error);
      }
    };

    fetchConcerts();
  }, []);

  const filteredConcerts = concerts.filter(concert => {
    const matchesLocation = selectedLocation ? concert.location.name === selectedLocation : true;
    const matchesCategory = selectedCategory ? concert.category.name === selectedCategory : true;
    const matchesSearchQuery = concert.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLocation && matchesCategory && matchesSearchQuery;
  });

  const mapToSlides = (concerts: Concert[]) => {
    return concerts.map(concert => ({
      imageUrl: concert.imageUrl,
      alt: concert.name,
      name: concert.name,
      onClick: () => router.push(`/concertdetail?id=${concert.id}`), // Redirect to concert detail
    }));
  };

  const metalConcerts = mapToSlides(filteredConcerts.filter(concert => concert.category.name === 'Metal'));
  const edmConcerts = mapToSlides(filteredConcerts.filter(concert => concert.category.name === 'Electric Dance Music'));
  const popConcerts = mapToSlides(filteredConcerts.filter(concert => concert.category.name === 'Pop'));

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold flex items-center">
            <FaMapMarkerAlt className="mr-2" /> Locations
          </h2>
          <ul className="space-y-2 mt-2">
            {locations.map((location, index) => (
              <li
                key={index}
                onClick={() => setSelectedLocation(location.name)}
                className={`cursor-pointer transition duration-300 ${selectedLocation === location.name ? 'text-blue-600' : ''}`}
              >
                {location.name}
              </li>
            ))}
            <li
              onClick={() => setSelectedLocation(null)}
              className={`cursor-pointer transition duration-300 ${selectedLocation === null ? 'text-blue-600' : ''}`}
            >
              All Locations
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <FaTags className="mr-2" /> Categories
          </h2>
          <ul className="space-y-2 mt-2">
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={() => setSelectedCategory(category.name)}
                className={`cursor-pointer transition duration-300 ${selectedCategory === category.name ? 'text-blue-600' : ''}`}
              >
                {category.name}
              </li>
            ))}
            <li
              onClick={() => setSelectedCategory(null)}
              className={`cursor-pointer transition duration-300 ${selectedCategory === null ? 'text-blue-600' : ''}`}
            >
              All Categories
            </li>
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
];

const categories = [
  { name: 'Metal' },
  { name: 'Electric Dance Music' },
  { name: 'Pop' },
];
