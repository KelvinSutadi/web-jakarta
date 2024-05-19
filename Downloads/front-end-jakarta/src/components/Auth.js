import React, { useEffect, useState } from 'react';
import './Auth.css';
import { API_URLS } from '../config/api';
import { useNavigate} from 'react-router-dom';




const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URLS +'/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email,
          password
        }).toString(),
      });
      const data = await response.json();
      console.log('Login Response:', data);
      if (response.ok) {
        console.log(data);
        setNotification({ message: `You have successfully logged in`, type: 'success' });
        localStorage.setItem("t", data.token)
        setEmail('');
        setPassword('');
        navigate("/")
      } else if (!response.ok){ // not respond.ok
        setNotification({ message: data.message || 'Login failed', type: 'error' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      setNotification({ message: 'An error occurred. Please try again.', type: 'error' });
    }
  };

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, "2000")
    }

  } , [])

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URLS + '/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          fullname: name,
          email,
          password
        }).toString(),
      });
      const data = await response.json();
      console.log('Register Response:', data);
      if (response.ok) {
        setNotification({ message: 'Registration successful!', type: 'success' });
        setName('');
        setEmail('');
        setPassword('');
      } else if (response.status === 409) {
        setNotification({ message: 'This email is already registered', type: 'error' });
      } else {
        setNotification({ message: data.message || 'Registration failed', type: 'error' });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setNotification({ message: 'An error occurred. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="auth-body">
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <div className="auth-section">
        <div className="auth-container">
          <div className="auth-row auth-full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="auth-section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span 
                    className={`auth-toggle ${isLogin ? "active" : ""}`}
                    onClick={() => setIsLogin(true)}
                  >
                    Log In
                  </span>
                  <span 
                    className={`auth-toggle ${!isLogin ? "active" : ""}`}
                    onClick={() => setIsLogin(false)}
                  >
                    Sign Up
                  </span>
                </h6>
                <input 
                  className="auth-checkbox" 
                  type="checkbox" 
                  id="reg-log" 
                  name="reg-log" 
                  checked={!isLogin} 
                  onChange={() => setIsLogin(!isLogin)} 
                />
                <label htmlFor="reg-log" className="auth-label"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    {isLogin ? (
                      <div className="card-front">
                        <div className="center-wrap">
                          <div className="auth-section text-center">
                            <h4 className="mb-4 pb-3">Log In</h4>
                            <form onSubmit={handleLogin}>
                              <div className="form-group">
                                <input
                                  type="email"
                                  name="logemail"
                                  className="form-style"
                                  placeholder="Your Email"
                                  id="logemail"
                                  autoComplete="off"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                                <i className="input-icon uil uil-at"></i>
                              </div>
                              <div className="form-group mt-2">
                                <input
                                  type="password"
                                  name="logpass"
                                  className="form-style"
                                  placeholder="Your Password"
                                  id="logpass"
                                  autoComplete="off"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                                <i className="input-icon uil uil-lock-alt"></i>
                              </div>
                              <button type="submit" className="btn mt-4">Submit</button>
                            </form>
                            <p className="mb-0 mt-4 text-center">
                              <a href="#0" className="link">Forgot your password?</a>
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="card-back">
                        <div className="center-wrap">
                          <div className="auth-section text-center">
                            <h4 className="mb-4 pb-3">Sign Up</h4>
                            <form onSubmit={handleRegister}>
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="logname"
                                  className="form-style"
                                  placeholder="Your Full Name"
                                  id="logname"
                                  autoComplete="off"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                                <i className="input-icon uil uil-user"></i>
                              </div>
                              <div className="form-group mt-2">
                                <input
                                  type="email"
                                  name="logemail"
                                  className="form-style"
                                  placeholder="Your Email"
                                  id="logemail"
                                  autoComplete="off"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                                <i className="input-icon uil uil-at"></i>
                              </div>
                              <div className="form-group mt-2">
                                <input
                                  type="password"
                                  name="logpass"
                                  className="form-style"
                                  placeholder="Your Password"
                                  id="logpass"
                                  autoComplete="off"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                                <i className="input-icon uil uil-lock-alt"></i>
                              </div>
                              <button type="submit" className="btn mt-4">Submit</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;














  