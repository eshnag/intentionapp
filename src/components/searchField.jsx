import React from "react";
import { useState,useContext } from "react";
import {ImageContext} from './SearchImages'
function SearchField() {
    const REACT_APP_ACCESS_KEY = 'UBodofjQnIuI4cixGifai_UlbM6SpO33AMdjmJY2A1o'

    const [searchValue, setSearchValue] = useState("")
    const {fetchData, setSearchImg} = useContext(ImageContext)

    const handleInputChange = (e) =>{
        setSearchValue(e.target.value)
    }
    const handleButtonSearch = ()=>{
        fetchData(`search/photos?page=1&query=${searchValue}&client_id=${REACT_APP_ACCESS_KEY}`)
        setSearchValue("");
        setSearchImg(searchValue);   


    }

    const handleEnterSearch = e=>{
         if(e.key==='Enter'){
            fetchData(`search/photos?page=1&query=${searchValue}&client_id=${REACT_APP_ACCESS_KEY}`)
             setSearchValue(""); 
             setSearchImg(searchValue);   
         }
         else{

         }
    }
    
    return(
        <div className='flex'>

            <input style={{color:"black"}}className="bg-gray-50 border-gray-300 text-sm w-full indent-2 p-2.5 outline-none focus:border-blue-500 focus:ring-2 rounded-tl rounded-bl" 
            type="search"
            placeholder='Search Images...'
            onChange={handleInputChange}
            onKeyDown = {handleEnterSearch}

            />
            <button
            onClick={handleButtonSearch}
            disabled={!searchValue}
            className="bg-orange-200 px-6 py-2.5 text-black rounded-tr rounded-br focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
            >Search</button>

            
        </div>
    );

}
export default SearchField;