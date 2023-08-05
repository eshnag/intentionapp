import { useState } from 'react';
import styled from "styled-components";
import { render } from 'react-dom';
import { useEffect } from 'react';
import './index.css'

function App() {
  const [quote, setQuote] = useState("");
  const [items, setItems] = useState([]);
  const displayed= new Set()
  
  const handleAddQuote = () => {
    if(!items.find((item) => item===quote)){
      setItems([...items,{quote:quote, category:document.getElementById('quote-types').value}])
      localStorage.setItem(items[items.length-1].category, items[items.length-1].quote)
    }
   
  };

  const handleSubmit = (evt) =>{
    return false;
  }
  const displayQuotes = () =>{
    
  
    const categories=['Motivation', 'Funny', 'Affirmations', 'Personal'];
    if(localStorage.length==0){
      return;
    }
    
    for(var i=0; i<categories.length; i++){
      //console.log(categories[i])
      if((localStorage.getItem(categories[i])!=null) && !(displayed.has(localStorage.getItem(categories[i])))){
        document.getElementById('displayArea').innerText+= localStorage.getItem(categories[i])+'\n';
        displayed.add(localStorage.getItem(categories[i]))
     //   console.log(displayed)

      }
    }
   

  }
  const clearQuotes = () =>{
    localStorage.clear();
    document.getElementById('displayArea').innerText="";

  }

  
  return (
    
    <div style={{"padding":"2em"}} className="App">
     <h1 style={{"margin":"1em",
     "color":"#3e0313",
     'textDecoration':"underline",
     'fontSize':"1.5em"
    }}>Add My Quotes</h1>
     <label for="quote">Enter Quote:</label>
     <input type="text" id="quote" value={quote} onChange={(event) =>setQuote(event.target.value)}></input>
      <br></br>
      <label for="quote-types">Choose a category:</label>

      <select name="quote-types" id="quote-types">
        <option value="Motivation">Motivation</option>
        <option value="Funny">Funny</option>
        <option value="Affirmations">Affirmations</option>
        <option value="Personal">Personal</option>
      </select>
      <button style={{'backgroundColor': '#3e0313', "margin":"0.4em", "padding":".5em"}} className='.bg-red-800' type="submit" onClick={()=>handleAddQuote()}>Add Quote</button>
      <br></br>
      <button style={{'backgroundColor': '#3e0313', "margin":"0.4em", "padding":".5em"}} type="submit" onClick={()=>displayQuotes()}>Display My Quotes</button>
   
      <div id="displayArea">
      </div>
      <button style={{'backgroundColor': '#3e0313', "margin":"0.4em", "padding":".5em"}} type="submit" onClick={()=>clearQuotes()}>Clear Quotes</button>
    </div>
    
  );

}

const styledList = styled.li`
  list-style-type: none;
`

export default App;
