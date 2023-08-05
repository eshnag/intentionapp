import React from "react";
import {ImageContext} from "./SearchImages";
import Image from "./image";
import { useContext } from "react";
import Skeleton from "./Skeleton";
import {createContext, useState} from 'react';
import {boardContext} from './image'

/*
need to save moodboard to local storage and show it when each goal is picked
*/ 

function Images(){
    const [select, setSelect]=useState(false);
    const boardLinks = useContext(boardContext);
    var count=0;
    const arr2=[]

    var [size, setSize]=useState(false)
    const {response, isLoading, searchImg} = useContext(ImageContext);
    const [tempLinkSize, setTempLinkSize]=useState(0)
    if(localStorage.getItem('moodboardSize')!=null && size===false){
        setTempLinkSize(parseInt(localStorage.getItem('moodboardSize')))
        setSize(true)
    }

    const pushInit = ()=>{
     
        if(tempLinkSize!=0){
            for(var i=1; i<= tempLinkSize; i++){
                if(localStorage.getItem(i))
               // console.log(JSON.parse(localStorage.getItem(i)).urls)

                 arr2.push(JSON.parse(localStorage.getItem(i)))
            }
        }
        boardLinks.map((link)=>{
            arr2.push(link)
        })
    }
    const handleSave = (evt)=>{
        
        if(document.getElementById('save').innerHTML==='Save to Mood Board'){
        
        setSelect(true);
        document.getElementById('save').innerText='Done Selecting';
            
       } 
       else if(document.getElementById('save').innerHTML==='Done Selecting'){
        setSelect(false);
        document.getElementById('save').innerText='Save to Mood Board';

        
       }       
           
       
    }


   

        return(
            <>
                <h1 className="text-center mt-6 underline text-2xl">Results for {searchImg || 'Cats'}</h1>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grind-cols-4 gap-4 my-10 max-w-7xl mx-auto px-4'>
                    {isLoading ? <Skeleton item={10}/> : 
                    response.map((data,key)=>{
                        return(
                        <Image key={key} data={data}/>
                        
                        )
                    })}
                    
                    
                </div>


                <div id='moodboard' className='grid md:grid-cols-2 lg:grid-cols-3 xl:grind-cols-4 gap-4 my-10 max-w-7xl mx-auto px-4'>

                <button 
                    className="bg-orange-200 px-6 py-2.5 text-black rounded-tr rounded-br focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
                    id='save' 
                    onClick={handleSave}>Save to Mood Board</button>
                 
                <h1 className="text-center mt-6 underline text-2xl">Mood Board</h1>
                {pushInit()}
                  
               
                    {
                        
                        arr2.map((data,key)=>{
                            count++;
                           
                            // if(count>parseInt(localStorage.getItem('moodboardSize'))){
                            //     return
                            // }
                            if(localStorage.getItem('moodboardSize')!=null){
                                localStorage.setItem('moodboardSize',tempLinkSize+boardLinks.length)

                            }
                            else{
                                localStorage.setItem('moodboardSize',boardLinks.length)

                            }
                            
                            if(localStorage.getItem(count)===null){
                                console.log("count: "+count)
                                localStorage.setItem(count,JSON.stringify(data))
                            }
                           
                            
                
                        })

                    }
                    
                    {
                        arr2.map((data,key)=>{
                            return(
                                    
                                <Image key={key} data={data}/>
                         
                        )
                        })
                    }
              
                </div>
            </>
        );
    }
    

    
            
export default Images;