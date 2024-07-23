'use client';

import { FaSearch, FaMapMarkerAlt, FaTags, FaPlus } from 'react-icons/fa';
import { Menu } from '@headlessui/react';
import CategorySlider from '../../components/CategorySlider';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useExplore } from '@/hooks/useExplore';
import { Concert, Location, Category } from '../../types';

export default function Explore() {
  const {
    concerts,
    locations,
    categories,
    selectedLocation,
    setSelectedLocation,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useExplore();

  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  const mapToSlides = (concerts: Concert[]) => {
    return concerts.map((concert) => ({
      imageUrl: concert.imageUrl,
      alt: concert.name,
      name: concert.name,
      onClick: () => router.push(`/concertdetail/${concert.id}`),
    }));
  };

  const metalConcerts = mapToSlides(
    concerts.filter((concert) => concert.category.name === 'Metal')
  );
  const edmConcerts = mapToSlides(
    concerts.filter(
      (concert) => concert.category.name === 'Electric Dance Music'
    )
  );
  const popConcerts = mapToSlides(
    concerts.filter((concert) => concert.category.name === 'Pop')
  );

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
          <Menu as="div" className="relative inline-block w-full">
            <Menu.Button className="w-full bg-white border border-gray-300 p-2 rounded shadow-sm">
              {selectedLocation ? selectedLocation : 'All Locations'}
            </Menu.Button>
            <Menu.Items className="absolute w-full mt-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100' : 'text-gray-700'}`}
                  >
                    All Locations
                  </button>
                )}
              </Menu.Item>
              {locations.map((location) => (
                <Menu.Item key={location.id}>
                  {({ active }) => (
                    <button
                      onClick={() => setSelectedLocation(location.name)}
                      className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100' : 'text-gray-700'}`}
                    >
                      {location.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        </div>
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <FaTags className="mr-2" /> Categories
          </h2>
          <Menu as="div" className="relative inline-block w-full">
            <Menu.Button className="w-full bg-white border border-gray-300 p-2 rounded shadow-sm">
              {selectedCategory ? selectedCategory : 'All Categories'}
            </Menu.Button>
            <Menu.Items className="absolute w-full mt-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100' : 'text-gray-700'}`}
                  >
                    All Categories
                  </button>
                )}
              </Menu.Item>
              {categories.map((category) => (
                <Menu.Item key={category.id}>
                  {({ active }) => (
                    <button
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100' : 'text-gray-700'}`}
                    >
                      {category.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        </div>
        {user?.role === 'ADMIN' && (
          <div className="mt-4">
            <button
              onClick={() => router.push('/createconcert')}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center"
            >
              <FaPlus className="mr-2" /> Add Concert
            </button>
          </div>
        )}
      </aside>
      <main className="w-3/4 px-4 py-6 bg-white shadow-lg">
        <CategorySlider
          slides={metalConcerts}
          title="Upcoming Metal Concerts"
          titleColor="black"
        />
        <CategorySlider
          slides={edmConcerts}
          title="Upcoming EDM Concerts"
          titleColor="black"
        />
        <CategorySlider
          slides={popConcerts}
          title="Upcoming Pop Concerts"
          titleColor="black"
        />
      </main>
    </div>
  );
}
