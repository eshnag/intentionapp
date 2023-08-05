import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchImages from './components/SearchImages'
import Home from './Home'
import Layout from './Layout'
import ProgressBar from './Progress';
import { useState, useEffect } from 'react';
import Goals from './Goals';
import Quote from './Quote'
import './index.css'
export default function Main() {


  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="quotes" element={<Quote />} />
          <Route path="images" element={<SearchImages />} />
          <Route path="goals" element={<Goals />} />

        </Route>
      </Routes>
    </BrowserRouter>


    </>
  );
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)