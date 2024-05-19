import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Navbar from '../components/Navigation';
import Home from '../components/pages/Home';
import AboutUs from '../components/AboutUs';
import Carousel from '../components/Carousel';
import Auth from '../components/Auth';
import Contact from '../components/Contact';
import FavouritePlaces from '../components/FavouritePlaces';
import { BaseLayouts } from '../components/BaseLayouts';
import Content from '../components/Content';
import { ContentDetailsPages } from '../components/pages/ContentDetailsPages';
const token = localStorage.getItem("t")

export const router = createBrowserRouter([{
  path: "/",
  element: <BaseLayouts />,
  children: [
    {
      path:"",
      element: < Home />,
      name: "home"
    },
    {
      path:"about-us",
      element: < AboutUs />,
      name: "AboutUs"
    },
    {
      path:"wisata",
      element: < Carousel />,
      name: "Carousel"
    },
    {
      path:"auth",
      element: < Auth />,
      name: "Auth"
    },
    {
      path:"contact",
      element: < Contact />,
      name: "Contact"
    },
    {
      path:"favourites",
      element: < FavouritePlaces />,
      name: "FavouritePlaces"
    },
    {
      path:"content/:id",
      element: < ContentDetailsPages />,
      name: "ContentId"
    },
  ]
},
])