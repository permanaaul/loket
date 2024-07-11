'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Slide {
  imageUrl: string;
  alt: string;
  name: string;
}

interface CategorySliderProps {
  slides: Slide[];
  title: string;
  titleColor?: string;
}

const CategorySlider: React.FC<CategorySliderProps> = ({ slides, title, titleColor = 'white' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesToShow = 4; // Number of slides visible at a time
  const totalSlides = slides.length;

  const nextSlide = () => {
    if (currentIndex + slidesToShow < totalSlides) {
      setCurrentIndex(currentIndex + slidesToShow);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex - slidesToShow >= 0) {
      setCurrentIndex(currentIndex - slidesToShow);
    } else {
      setCurrentIndex(Math.max(totalSlides - slidesToShow, 0));
    }
  };

  const getTransformValue = () => {
    return `translateX(-${(100 / slidesToShow) * currentIndex}%)`;
  };

  return (
    <div className="mt-8">
      <h2 className={`text-3xl font-bold mb-6 text-center`} style={{ color: titleColor }}>{title}</h2>
      <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: getTransformValue() }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-1/4 p-2"
              style={{ flexBasis: `${100 / slidesToShow}%` }}
            >
              <div className="bg-black p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col items-center text-white">
                <div className="relative w-full h-64 overflow-hidden mb-4">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.alt}
                    fill
                    className="rounded-md"
                    unoptimized
                    priority
                  />
                </div>
                <h3 className="text-xl font-bold text-center text-white">{slide.name}</h3>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-r"
        >
          &#8249;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-l"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default CategorySlider;
