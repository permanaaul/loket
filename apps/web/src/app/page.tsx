'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slider = dynamic(() => import('react-slick'), { ssr: false });
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function Home() {
  const banners = [
    { src: '/images/bannera7x.jpg', alt: 'Avenged Sevenfold' },
    { src: '/images/bannerbabymetal.jpg', alt: 'Babymetal' },
    { src: '/images/banneravicii.jpg', alt: 'Avicii' },
    { src: '/images/bannerdavidguetta.jpg', alt: 'David Guetta' },
    { src: '/images/bannerskrillex.jpg', alt: 'Skrillex' },
    { src: '/images/bannerloket.jpg', alt: 'Loket Music Festival' },
    { src: '/images/bannerloket2.jpg', alt: 'Loket Music Event' },
    { src: '/images/bannerpop.jpg', alt: 'Pop Concert' },
    { src: '/images/bannershawnmendes.jpg', alt: 'Shawn Mendes' }
  ];

  const popularConcerts = [
    { src: '/images/bannermartingarrix.jpg', alt: 'Martin Garrix', name: 'Martin Garrix', rank: 1 },
    { src: '/images/bannera7x2.jpg', alt: 'Avenged Sevenfold', name: 'Avenged Sevenfold', rank: 2 },
    { src: '/images/bannershawnmendes.jpg', alt: 'Shawn Mendes', name: 'Shawn Mendes', rank: 3 }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="w-full bg-cover bg-center flex flex-col items-center justify-center p-10">
      <Slider {...settings} className="w-full max-w-7xl">
        {banners.map((banner, index) => (
          <div key={index} className="w-full h-[500px] relative">
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              className="rounded-md"
            />
          </div>
        ))}
      </Slider>
      <h1 className="text-5xl font-bold text-black mt-8 mb-4">Welcome to Loket Musik</h1>
      <p className="text-xl text-black mb-6">Your gateway to the best concerts</p>

      <div className="w-screen bg-black py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Paling Laku Keras!</h2>
          <div className="flex justify-around items-center">
            {popularConcerts.map((concert, index) => (
              <div key={index} className="relative text-center mx-4 flex flex-col items-center">
                <div className="text-7xl font-bold text-white absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  {concert.rank}
                </div>
                <Link href="/explore" className="relative w-72 h-40 mb-2 ml-12">
                  <Image
                    src={concert.src}
                    alt={concert.alt}
                    fill
                    className="rounded-md"
                  />
                </Link>
                <p className="text-white font-bold mt-2">{concert.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">Highlight Concert</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="relative w-full h-0 pb-[56.25%] mb-4">
                <ReactPlayer
                  url="https://youtu.be/Lpjcm1F8tY8?start=202"
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0"
                />
              </div>
              <p className="text-xl font-bold text-black">Martin Garrix</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-full h-0 pb-[56.25%] mb-4">
                <ReactPlayer
                  url="https://youtu.be/zSwqLsuJRY0?start=4104"
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0"
                  config={{
                    youtube: {
                      playerVars: { end: 4152 }
                    }
                  }}
                />
              </div>
              <p className="text-xl font-bold text-black">Bring Me The Horizon</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-full h-0 pb-[56.25%] mb-4">
                <ReactPlayer
                  url="https://youtu.be/39OlTrhpt38?start=113"
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0"
                  config={{
                    youtube: {
                      playerVars: { end: 141 }
                    }
                  }}
                />
              </div>
              <p className="text-xl font-bold text-black">Shawn Mendes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
