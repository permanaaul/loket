'use client';

import { FaSearch, FaMapMarkerAlt, FaTags, FaPlus, FaStar, FaUser, FaQuoteLeft, FaNewspaper } from 'react-icons/fa';
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

  const topArtists = [
    { name: 'Martin Garrix', rating: 4.96 },
    { name: 'Avenged Sevenfold', rating: 4.93 },
    { name: 'Avicii', rating: 4.87 },
    { name: 'Bad Omens', rating: 4.82 },
    { name: 'Shawn Mendes', rating: 4.77 },
    { name: 'Khalid', rating: 4.69 },
  ];

  const testimonials = [
    { name: 'John Doe', rating: 5, comment: 'Amazing concert experience!' },
    { name: 'Jane Smith', rating: 4, comment: 'Great show, will attend again!' },
    { name: 'Alice Johnson', rating: 4.5, comment: 'Loved the performance and atmosphere.' },
  ];

  const featuredNews = [
    { title: 'New Concert Announcements for 2024', description: 'Exciting new concerts announced for the upcoming year.' },
    { title: 'Exclusive Interview with Avicii', description: 'A deep dive into the life and career of Avicii.' },
    { title: 'Avenged Sevenfold to Release New Album', description: 'The band Avenged Sevenfold has announced the release of their new album.' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      <aside className="lg:w-1/4 bg-white shadow-lg p-4 space-y-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center mb-2">
            <FaSearch className="mr-2" /> Search
          </h2>
          <input
            type="text"
            placeholder="Search concerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="relative">
          <h2 className="text-2xl font-bold flex items-center mb-2">
            <FaMapMarkerAlt className="mr-2" /> Locations
          </h2>
          <Menu as="div" className="relative inline-block w-full">
            <Menu.Button className="w-full bg-white border border-gray-300 p-2 rounded shadow-sm">
              {selectedLocation ? selectedLocation : 'All Locations'}
            </Menu.Button>
            <Menu.Items className="absolute w-full mt-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-10">
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
        <div className="relative">
          <h2 className="text-2xl font-bold flex items-center mb-2">
            <FaTags className="mr-2" /> Categories
          </h2>
          <Menu as="div" className="relative inline-block w-full">
            <Menu.Button className="w-full bg-white border border-gray-300 p-2 rounded shadow-sm">
              {selectedCategory ? selectedCategory : 'All Categories'}
            </Menu.Button>
            <Menu.Items className="absolute w-full mt-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-10">
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
        <div>
          <h2 className="text-2xl font-bold flex items-center mb-2">
            <FaUser className="mr-2" /> Top Artists
          </h2>
          <ul className="space-y-2">
            {topArtists.map((artist, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{artist.name}</span>
                <span className="flex items-center">
                  {artist.rating} <FaStar className="text-yellow-500 ml-1" />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold flex items-center mb-2">
            <FaQuoteLeft className="mr-2" /> Testimonials
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded shadow">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={`ml-1 ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                </p>
                <p>{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold flex items-center mb-2">
            <FaNewspaper className="mr-2" /> Featured News
          </h2>
          <ul className="space-y-2">
            {featuredNews.map((news, index) => (
              <li key={index} className="bg-gray-50 p-4 rounded shadow">
                <p className="font-semibold">{news.title}</p>
                <p>{news.description}</p>
              </li>
            ))}
          </ul>
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
      <main className="lg:w-3/4 px-4 py-6 bg-white shadow-lg">
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
