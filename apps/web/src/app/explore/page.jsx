import { FaSearch, FaMapMarkerAlt, FaTags } from 'react-icons/fa';
import CategorySlider from '../../components/CategorySlider';

const metalConcerts = [
  { src: '/images/a7x.jpg', alt: 'Avenged Sevenfold', name: 'Avenged Sevenfold' },
  { src: '/images/amity.jpg', alt: 'The Amity Affliction', name: 'The Amity Affliction' },
  { src: '/images/babymetal.jpg', alt: 'Babymetal', name: 'Babymetal' },
  { src: '/images/badomens.jpg', alt: 'Bad Omens', name: 'Bad Omens' },
  { src: '/images/bmth.jpg', alt: 'Bring Me The Horizon', name: 'Bring Me The Horizon' },
  { src: '/images/linkinpark.jpg', alt: 'Linkin Park', name: 'Linkin Park' },
  { src: '/images/mcr.jpg', alt: 'My Chemical Romance', name: 'My Chemical Romance' },
  { src: '/images/skillet.jpg', alt: 'Skillet', name: 'Skillet' },
  { src: '/images/sleepToken.jpg', alt: 'Sleep Token', name: 'Sleep Token' },
  { src: '/images/slipknot.jpg', alt: 'Slipknot', name: 'Slipknot' },
];

const edmConcerts = [
  { src: '/images/avicii.jpg', alt: 'Avicii', name: 'Avicii' },
  { src: '/images/skrillex.jpg', alt: 'Skrillex', name: 'Skrillex' },
  { src: '/images/kygo.jpg', alt: 'Kygo', name: 'Kygo' },
  { src: '/images/davidguetta.jpg', alt: 'David Guetta', name: 'David Guetta' },
  { src: '/images/martingarrix.jpg', alt: 'Martin Garrix', name: 'Martin Garrix' },
  { src: '/images/rehab.jpg', alt: 'R3HAB', name: 'R3HAB' },
  { src: '/images/marshmello.jpg', alt: 'Marshmello', name: 'Marshmello' },
  { src: '/images/alanwalker.jpg', alt: 'Alan Walker', name: 'Alan Walker' },
  { src: '/images/yellowclaw.jpg', alt: 'Yellow Claw', name: 'Yellow Claw' },
  { src: '/images/djsnake.jpg', alt: 'Dj Snake', name: 'Dj Snake' }
  // Add more EDM concert data here
];

const popConcerts = [
  { src: '/images/maroon5.jpg', alt: 'Maroon 5', name: 'Maroon 5' },
  { src: '/images/khalid.jpg', alt: 'Khalid', name: 'Khalid' },
  { src: '/images/shawnmendes.jpg', alt: 'Shawn Mendes', name: 'Shawn Mendes' },
  { src: '/images/charlieputh.jpg', alt: 'Charlie Puth', name: 'Charlie Puth' },
  { src: '/images/deanlewis.jpg', alt: 'Dean Lewis', name: 'Dean Lewis' },
  { src: '/images/brunomars.jpg', alt: 'Bruno Mars', name: 'Bruno Mars' },
  { src: '/images/lsd.jpg', alt: 'LSD', name: 'LSD' },
  { src: '/images/jamesarthur.jpg', alt: 'James Arthur', name: 'James Arthur' },
  { src: '/images/jasonderulo.jpg', alt: 'Jason Derulo', name: 'Jason Derulo' },
  { src: '/images/imaginedragons.jpg', alt: 'Imagine Dragons', name: 'Imagine Dragons' }
  // Add more pop concert data here
];

const locations = [
  { name: 'Jakarta' },
  { name: 'Bandung' },
  { name: 'Surabaya' },
  { name: 'Yogyakarta' },
  { name: 'Bali' },
  { name: 'Padang' },
  { name: 'Medan' },
  { name: 'Bali' },
  { name: 'Surabaya' },
  // Add more locations here
];

const categories = [
  { name: 'Metal' },
  { name: 'Electric Dance Music' },
  { name: 'Pop' }
  // Add more categories here
];

export default function Explore() {
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
