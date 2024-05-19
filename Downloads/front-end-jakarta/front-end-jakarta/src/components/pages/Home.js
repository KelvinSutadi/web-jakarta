import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../Hero';
import Content from '../Content';
import Gallery from '../Gallery';
import Review from '../Review';
import SearchInput from '../SearchInput';
import './Home.css';

function Home() {
  return (
    <>
      <div className="home-header">
        <SearchInput />
        <div className="auth-buttons">
          <Link to="/auth" className="auth-button">Login</Link>
        </div>
      </div>
      <Hero />
      <Content />
      <Gallery />
      <Review />
    </>
  );
}

export default Home;

