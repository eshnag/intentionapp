import React from "react";
import {useContext, createContext} from 'react'  
import {useState} from 'react'
import { Parser } from "html-to-react";


const saved = []
export  const boardContext = createContext(saved);

const Image = ({data})=>{
    const [links, setLinks]=useState([])
    

    const saveToBoard = (source) =>{
        saved.push(source)
    
    }



    return(
        
        <div>
        <a href={data.urls.regular} target="_blank" onClick={(evt)=>saveToBoard(data)}>
            <img className = "h-72 w-full object-cover rounded-lg shadow-md"  src={data.urls.small} alt={data.alt_description}/>
        </a>
        </div>
    );
}
export default Image;