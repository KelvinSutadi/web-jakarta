import React from 'react'
import Navbar from './Navigation'
import { Outlet } from 'react-router-dom'
import { FooterComp } from './FooterComp'
import { UseAuth } from '../hooks/UseAuth.jsx'

export const BaseLayouts = () => {
  return (
    <UseAuth>
      <Navbar />
      <Outlet />
      <FooterComp/>
    </UseAuth>
  )
}
