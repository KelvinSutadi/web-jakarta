import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../Hero';
import Content from '../Content';
import Gallery from '../Gallery';
import Review from '../Review';
import SearchInput from '../SearchInput';
import './Home.css';
import { API_URLS } from '../../config/api';
function Home() {
  const navigate = useNavigate()
  const token = localStorage.getItem("t")
  const [currentUser, setCurrentUser] = useState({})
  
  const handleLogout = () => {
    localStorage.removeItem("t")
    navigate("/")
  }

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(API_URLS + "/user/verify", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'access_token': token
        },
      })

      const dataJson = await response.json()
      setCurrentUser(dataJson)
      console.log(dataJson);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (token) { 
      fetchCurrentUser()
    }
  }, [])

  return (
    <>
      <div className="home-header">
        <SearchInput />
        <div className="auth-buttons">
          {token ? (
            <>
              <Link onClick={handleLogout} className="auth-button">Log Out</Link>
              <h1>{currentUser.name }</h1>
            </>

          ) : (
              <Link to="/auth" className="auth-button">Login</Link>
          )}
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

