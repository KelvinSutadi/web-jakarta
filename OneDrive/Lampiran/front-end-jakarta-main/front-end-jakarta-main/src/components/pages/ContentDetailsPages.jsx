import { useParams, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import '../Carousel.css';
import { API_URLS } from '../../config/api';

const ContentDetailsPages = () => {
  const { id } = useParams();
  const initialSlideIndex = parseInt(id, 10) - 1 || 0;
  const [data, setData] = useState([]);
  const [slideIndex, setSlideIndex] = useState(initialSlideIndex);

  useEffect(() => {
    const fetchSightData = fetch(API_URLS + '/sight')
      .then((response) => response.json())
      .then((data) => data.map((item) => ({
        src: item.imageUrl,
        alt: item.name,
        description: item.description || item.category,
        location: item.location || 'No location provided',
        type: 'sight'
      })));

    const fetchCulinaryData = fetch(API_URLS + '/culinary')
      .then((response) => response.json())
      .then((data) => data.map((item) => ({
        src: item.imageUrl,
        alt: item.name,
        description: item.description,
        location: item.popularLocation || 'No location provided',
        type: 'culinary'
      })));

    Promise.all([fetchSightData, fetchCulinaryData])
      .then(([sightData, culinaryData]) => {
        setData([...sightData, ...culinaryData]);
      })
      .catch((error) => console.error('Failed to fetch data:', error));
  }, []);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="carousel">
      {data.map((item, idx) => (
        <div
          key={idx}
          className={slideIndex === idx ? 'slide slide-active' : 'slide slide-hidden'}
        >
          <img src={item.src} alt={item.alt} className="slide-image" />
          <div className="slide-description">
            <h3>{item.alt}</h3>
            <p>{item.description}</p>
            <p><strong>Location:</strong> {item.location}</p>
            {item.type === 'sight' && (
              <div className="culinary">
                <h4>Recommended Culinary</h4>
                <div className="culinary-content">
                  <img src={data.filter(d => d.type === 'culinary')[0].src} alt={data.filter(d => d.type === 'culinary')[0].alt} className="culinary-image" />
                  <div className="culinary-text">
                    <p><strong>{data.filter(d => d.type === 'culinary')[0].alt}</strong></p>
                    <p>{data.filter(d => d.type === 'culinary')[0].description}</p>
                    <p><strong>Popular Location:</strong> {data.filter(d => d.type === 'culinary')[0].location}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <BsArrowLeftCircleFill onClick={() => setSlideIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1))} className="arrow arrow-left" />
      <BsArrowRightCircleFill onClick={() => setSlideIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1))} className="arrow arrow-right" />
      <div className="indicators">
        {data.map((_, idx) => (
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

export default ContentDetailsPages;

