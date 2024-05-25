import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import './Carousel.css';
import { API_URLS } from '../config/api';

export const Carousel = () => {
  const location = useLocation();
  const { state } = location;
  const initialSlideIndex = state?.slideIndex ?? 0;

  const [slides, setSlides] = useState([]);
  const [culinaries, setCulinaries] = useState([]);
  const [slideIndex, setSlideIndex] = useState(initialSlideIndex);

  useEffect(() => {
    const fetchSightData = async () => {
      try {
        const response = await fetch(API_URLS + '/sight');
        if (!response.ok) {
          throw new Error(`Failed to fetch sight data: ${response.statusText}`);
        }
        const data = await response.json();
        setSlides(data.map((item, index) => ({
          id: `sight-${index}`, // unique key objek wisata
          src: item.imageUrl,
          alt: item.name,
          description: item.description || item.category,
          location: item.location || 'No location provided',
          index: index
        })));
      } catch (error) {
        console.error('Failed to fetch carousel data:', error);
      }
    };

    const fetchCulinaryData = async () => {
      try {
        const response = await fetch(API_URLS + '/culinary');
        if (!response.ok) {
          throw new Error(`Failed to fetch culinary data: ${response.statusText}`);
        }
        const data = await response.json();
        setCulinaries(data.map((item, index) => ({
          id: `culinary-${index}`, // unique key kuliner
          name: item.name,
          imageUrl: item.imageUrl,
          description: item.description,
          popularLocation: item.popularLocation || 'No location provided',
          index: index
        })));
      } catch (error) {
        console.error('Failed to fetch culinary data:', error);
      }
    };


    fetchSightData();
    fetchCulinaryData();
  }, []);

  const nextSlide = () => {
    setSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="carousel">
      <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
      {slides.map((slide, idx) => (
        <div
          key={slide.id} // pake unique key
          className={slideIndex === idx ? 'slide slide-active' : 'slide slide-hidden'}
        >
          <img src={slide.src} alt={slide.alt} className="slide-image" />
          <div className="slide-description">
            <h3>{slide.alt}</h3>
            <p>{slide.description}</p>
            <p><strong>Location:</strong> {slide.location}</p>
            {culinaries[idx] ? (
              <div className="culinary">
                <h4>Rekomendasi Kuliner</h4>
                <div className="culinary-content">
                  <img src={culinaries[idx].imageUrl} alt={culinaries[idx].name} className="culinary-image" />
                  <div className="culinary-text">
                    <p><strong>{culinaries[idx].name}</strong></p>
                    <p>{culinaries[idx].description}</p>
                    <p><strong>Lokasi Populer:</strong> {culinaries[idx].popularLocation}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p>Tidak ada rekomendasi kuliner yang tersedia..</p>
            )}
          </div>
        </div>
      ))}
      <BsArrowRightCircleFill onClick={nextSlide} className="arrow arrow-right" />
      <div className="indicators">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={slideIndex === idx ? 'indicator' : 'indicator indicator-inactive'}
            onClick={() => setSlideIndex(idx)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;













