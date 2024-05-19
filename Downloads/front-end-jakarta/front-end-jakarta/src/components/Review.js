import React, { useState } from "react";
import "./Review.css";

const Review = () => {
  const [reviews, setReviews] = useState([
    {
      name: "Brandon Yung",
      review:
        "Websitenya sangat informatif dan berguna untuk orang yang mau bertamasya.",
      rating: 5,
      imgSrc: "https://via.placeholder.com/50",
    },
    {
      name: "Windah Limitandy",
      review:
        "Website sangat berguna dalam membantu saya memilih tempat wisata.",
      rating: 5,
      imgSrc: "https://via.placeholder.com/50",
    },
    {
      name: "Windah Limitandy",
      review:
        "Website sangat berguna dalam membantu saya memilih tempat wisata.",
      rating: 5,
      imgSrc: "https://via.placeholder.com/50",
    },
  ]);

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
    fetch("https://api.example.com/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((response) => response.json())
      .then((data) => {
        setReviews([...reviews, data]);
        setFormData({
          name: '',
          review: '',
          rating: 0,
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <section className="reviews">
      <div className="container">
        <h2>Apa Kata Mereka</h2>
        <p>Baca apa yang dikatakan oleh pengunjung kami yang bahagia</p>
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-header">
                <img src={review.imgSrc} alt={review.name} />
                <div>
                  <h3>{review.name}</h3>
                </div>
              </div>
              <div className="review-body">
                <div className="rating">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
                <p>{review.review}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={submitReview}>
          <h3>Kumpulkan Masukan Anda</h3>
          <textarea
            name="review"
            placeholder="Your Review"
            value={formData.review}
            onChange={handleChange}
            required
          />
          <div className="star-rating">
            {[5, 4, 3, 2, 1].map((star) => (
              <React.Fragment key={star}>
                <input
                  type="radio"
                  id={`star${star}`}
                  name="rating"
                  value={star}
                  checked={formData.rating === star}
                  onChange={() => handleRatingChange(star)}
                />
                <label htmlFor={`star${star}`} title={`${star} stars`}>
                  &#9733;
                </label>
              </React.Fragment>
            ))}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Review;
