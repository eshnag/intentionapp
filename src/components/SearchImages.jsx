
import useAxios from "../hooks/useAxios";
import Jumbotron from "./jumbotron";
import SearchField from "./searchField";
import Images from "./images";
import {useState, useEffect, createContext} from 'react'
import React from "react";
export const ImageContext = createContext();
import './About.css'
const About = () => {
  const [searchImg, setSearchImg]= useState('')
  const REACT_APP_ACCESS_KEY = 'UBodofjQnIuI4cixGifai_UlbM6SpO33AMdjmJY2A1o'
  const {response, isLoading, error, fetchData} = useAxios(`search/photos?page=1&query=cats&client_id=${REACT_APP_ACCESS_KEY}`);
  //console.log(response);  
  const value = {
  response,
    isLoading, 
    error,
    fetchData,
    searchImg,
    setSearchImg
  }
  return (
    <div>
      
    <h1 style={{paddingTop:"30px"}}>Find Images For Inspiration</h1>
    <ImageContext.Provider value={value}>
    <Jumbotron>
      <SearchField/>
    </Jumbotron>
    <Images/>
    </ImageContext.Provider>
    </div>
    );

  };
  
  export default About;