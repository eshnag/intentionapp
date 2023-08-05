import './Home.css';
import { useState } from 'react';
import styled from "styled-components";
import { render } from 'react-dom';
import { useEffect } from 'react';
import Image from './components/image';
import {useContext} from 'react'
import {boardContext} from './components/image'
import Images from './components/images'

const Home = () => {

  const arr = localStorage.getItem('moodboard')
  const [fetchedData, setData] = useState('');
  const boardLinks = useContext(boardContext);
  const images=[]

  const getStorage = ()=>{
    

  }

  const fetchData = async() =>{

    const url = "https://api.api-ninjas.com/v1/quotes";
    fetch(url, {
      method: "GET",
      withCredentials: true,
      headers: {
        "X-Api-Key": "Ly/sE7cGs4agJwnzQEbd1w==OqPYf0TzcaxvrCRV",
      }
    })
    .then(resp => resp.json())
    .then(function(data) {
      document.getElementById('random_q').innerText=data[0].category + ": "+data[0].quote + "- "+data[0].author     
      setData(data);

      })
    .catch(function(error) {
      console.log(error);
    });

  }

  useEffect(() =>fetchData,[])
  if(fetchedData){
    //console.log(fetchedData)
    
  }

    const show = ()=>{
      if(localStorage.getItem('moodboardSize')==0){
        return;
      }
      for(var i=1; i<=localStorage.getItem('moodboardSize'); i++){
        if(localStorage.getItem(i)){
         // console.log('here')
          images.push(JSON.parse(localStorage.getItem(i)))

        }
      }
      return(
        
        images.map((img)=>{
          if(img){
            i++
            return(
              <Image key={i} data={img}/>
              
            )
          }
          
            
          
        })
  
        )
      
  }
 
  var i=0;

  const clear = () =>{
    if(localStorage.getItem('moodboardSize')==0){
      
      return;
    }
    for(var i=1; i<=localStorage.getItem('moodboardSize')+1; i++){
      if(localStorage.getItem(i)){
        console.log('here')

       localStorage.removeItem(i)

      }
    }
    localStorage.setItem('moodboardSize',0);
    window.location.reload()

  }

  return(
    <div>
    <h1>Home</h1>

    <p style={{"margin":"2em",
      "backgroundColor":"rgb(120, 52, 94)",
      "borderRadius":"0.6em",
      "padding":"2em",
      
    }} id="random_q"></p>
    <button style={{'backgroundColor': '#3e0313', "margin":"0.4em", "padding":".5em"}} type='submit' onClick={fetchData}>New Quote</button>

    <h1 className="text-center mt-6 underline text-2xl">Mood Board</h1>

    <div id='moodboard' className='grid md:grid-cols-2 lg:grid-cols-3 xl:grind-cols-4 gap-4 my-10 max-w-7xl mx-auto px-4'>

      
      
      {show()}

      </div>
      
      
      <button 
      className="bg-orange-200 px-6 py-2.5 text-black rounded-tr rounded-br focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"

      id='clear' onClick={(e)=>clear()}>Clear Moodboard</button>
     

      
    </div>
  );
};

export default Home;