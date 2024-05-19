import React from 'react';
import { BrowserRouter as Router, Routes, Route, RouterProvider } from 'react-router-dom';

import './styles.css';
import { router } from './routes';

function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;

