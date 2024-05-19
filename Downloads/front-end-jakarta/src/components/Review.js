import React, { useEffect, useState } from "react";
import "./Review.css";
import { API_URLS } from "../config/api";

const Review = () => {
  const token = localStorage.getItem("t")
  const [reviews, setReviews] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      rating: value,
    }));
  };

  const submitReview = (e) => {
    e.preventDefault();
    const newReview = {
      ...formData,
      imgSrc: "https://via.placeholder.com/50",
    };
    fetch(API_URLS + "/reviews", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'access_token': token
      },
      body: JSON.stringify({ contentId: 1203030, messages: newReview.review }),
    })
      .then((response) => response.json())
      .then((data) => {
        setReviews([...reviews, data]);
        setFormData({
          name: '',
          review: '',
          rating: 0,
        });
      }).then(() => {
        fetchReview()
      })
      .catch((error) => console.error("Error:", error));
  };
  
  
  const fetchReview = async () => {
    try {
      const response = await fetch(API_URLS + "/reviews", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'access_token': token
        },
      })
      const dataJson = await  response.json()
      setReviews(dataJson.data)
      console.log(dataJson);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchReview()
  }, [])
  
  return (
    <section className="reviews">
      <div className="container">
        <h2>Apa Kata Mereka</h2>
        <p>Baca apa yang dikatakan oleh pengunjung kami yang bahagia</p>
        <div className="reviews-grid">
          {reviews?.length > 0 ? (

reviews?.map((review, index) => (
  <div key={index} className="review-card">
              <div className="review-header">
                <img src="https://via.placeholder.com/50" alt={review?.name} />
                <div>
                  <h3>{review?.user?.name}</h3>
                </div>
              </div>
              <div className="review-body">
                <p>{review?.comments}</p>
              </div>
            </div>
          ))
        ): (<h1> reviews currently empty</h1>)}
          </div>
        {token ? (

          <form onSubmit={submitReview}>
          <h3>Kumpulkan Masukan Anda</h3>
          <textarea
            name="review"
            placeholder="Your Review"
            value={formData.review}
            onChange={handleChange}
            required
            />
          <button type="submit">Submit</button>
        </form>
        ) : (<h1>
            u must login first
          </h1>)}
      </div>
    </section>
  );
};

export default Review;
