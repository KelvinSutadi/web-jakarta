import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'



export const UseAuth = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const token = localStorage.getItem("t")
  console.log(location);
  if (location.pathname === "/favourites" && !token) {
    navigate("/auth")
  }
  
  if (location.pathname === "/auth" && token) {
    navigate("/")
  }
  return children
  
}
