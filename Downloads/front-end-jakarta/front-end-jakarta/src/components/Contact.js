import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      'michael01',
      'michael01',
      formData,
      '2-i1m6kNqLtYnIopW'
    )
    .then((result) => {
      console.log(result.text);
      toast.success('Message sent successfully!');
    }, (error) => {
      console.log(error.text);
      toast.error('Failed to send message, please try again later.');
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <div className="contact-background">
      <ToastContainer />
      <div className="contact-container">
        <div className="contact-screen">
          <div className="contact-screen-header">
            <div className="contact-screen-header-left">
              <div className="contact-screen-header-button close"></div>
              <div className="contact-screen-header-button maximize"></div>
              <div className="contact-screen-header-button minimize"></div>
            </div>
            <div className="contact-screen-header-right">
              <div className="contact-screen-header-ellipsis"></div>
              <div className="contact-screen-header-ellipsis"></div>
              <div className="contact-screen-header-ellipsis"></div>
            </div>
          </div>
          <div className="contact-screen-body">
            <div className="contact-screen-body-item left">
              <div className="app-title">
                <span>Contact</span>
                <span>us</span>
              </div>
              <div className="app-contact">CONTACT INFO : lisdahwati0@gmail.com</div>
            </div>
            <div className="contact-screen-body-item">
              <div className="app-form">
                <form onSubmit={handleSubmit}>
                  <div className="app-form-group">
                    <input
                      className="app-form-control"
                      placeholder="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="app-form-group">
                    <input
                      className="app-form-control"
                      placeholder="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="app-form-group">
                    <input
                      className="app-form-control"
                      placeholder="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="app-form-group message">
                    <input
                      className="app-form-control"
                      placeholder="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="app-form-group buttons">
                    <button type="button" className="app-form-button" onClick={() => setFormData({ name: '', email: '', phone: '', message: '' })}>
                      Cancel
                    </button>
                    <button type="submit" className="app-form-button">Send</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

