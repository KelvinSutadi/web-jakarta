import React, { useState, useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './FavouritePlaces.css';
import { API_URLS } from '../config/api';

const FavouritePlaces = () => {
  const [favourites, setFavourites] = useState([]);
  const token = localStorage.getItem("t");

  const fetchFavourites = () => {
    fetch(API_URLS + '/favourite', {
      headers: {
        'Content-Type': 'application/json',
        'access_token': token
      },
    })
      .then(response => response.json())
      .then(data => {
        setFavourites(data.favourites);
      })
      .catch(error => {
        console.error('Error fetching favourites:', error);
      });
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  const toggleFavourite = (place) => {
    const isFavourite = favourites.some(fav => fav.content._id === place.content._id);

    if (isFavourite) {
      // hapus dari favorite
      fetch(API_URLS + `/favourite/${place.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'access_token': token
        },
      })
        .then(() => {
          setFavourites(favourites.filter(fav => fav.content._id !== place.content._id));
        })
        .catch(error => {
          console.error('Error removing favourite:', error);
        });
    } else {
      // nambahin ke favorite
      fetch(API_URLS + '/favourite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access_token': token
        },
        body: JSON.stringify(place),
      })
        .then(response => response.json())
        .then(data => {
          setFavourites([...favourites, data]);
        })
        .catch(error => {
          console.error('Error adding favourite:', error);
        });
    }
  };

  return (
    <div className="favourite-places">
      <h2>Favorite Places</h2>
      <ul>
        {favourites.length > 0 ? (
          favourites.map(place => (
            <li key={place.content._id}>
              <span>{place.content.name}</span>
              <img src={place.content.imageUrl} alt={place.content.name} />
              <button onClick={() => toggleFavourite(place)} className="favourite-button">
                <i className={`fa ${favourites.some(fav => fav.content._id === place.content._id) ? 'fa-heart' : 'fa-heart-o'}`} />
              </button>
            </li>
          ))
        ) : (
          <h1>Empty List</h1>
        )}
      </ul>
    </div>
  );
};

export default FavouritePlaces;




