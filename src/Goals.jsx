import React from "react";
import ProgressBar from "./Progress";
import styled from "styled-components";
import { render } from 'react-dom';
import { useState, useEffect } from 'react';
import { ReactDOM } from "react";
import { useTimer } from 'react-timer-hook';


function Goals(){
  const [currTime, setTime] = useState(0);
  const [suggest, setSuggest] = useState(currTime>=1 ? true : false);
  // const [timeDeadline, setDeadline]=useState(0);
  const [action, setAction]=useState('')
    const completed=0;
    const [goal, setGoal] = useState("");
    const [items, setItems] = useState([]);


    const handleAddGoal = () => {
      //console.log(currTime)
     // console.log(items)
      if(!items.find((item) => item.goal===goal)){
  
        setItems([...items,{"goal": goal, "size": document.getElementById('goal-size').value, "completed": 0}])
        localStorage.setItem(items[items.length-1].size, items[items.length-1].goal)


      }
      else{
        localStorage.setItem(items[items.length-1].size, items[items.length-1].goal)
      }
      
      //retreiving
    if(localStorage.getItem('goals')){
        let retString = localStorage.getItem("goals")
        let retArray = JSON.parse(retString)
         retArray.push(items[items.length-1]);
         let string = JSON.stringify(retArray)

        localStorage.setItem("goals", string)

      }
      else{
        
        let string = JSON.stringify(items)
        localStorage.setItem("goals", string)
      }
      let retString = localStorage.getItem("goals")
      let retArray = JSON.parse(retString)
      //console.log("final"+JSON.stringify(retArray))

  };


  const pbars = items.map((item,pos)=>{
    if(localStorage.length!=0 && localStorage.getItem("goals")){
    let retString = localStorage.getItem("goals")
    let retArray = JSON.parse(retString)
    for(var i=0; i<retArray.length; i++){
      //console.log(item)

      if(retArray[i].goal==(item.goal)){
        //console.log("eee")
        retArray[i].completed=item.completed
      }
    }
    let string = JSON.stringify(retArray)
    localStorage.setItem('goals',string)
   
  }
    return(
      <div>
      <p>{item.goal}</p>
      <ProgressBar bgcolor={"#6a1b9a"} completed={item.completed}/>
      </div>
    )

  
  })

    const handleSubmit = (evt) =>{
      return false;
    }
   
    const clearGoals = () =>{
      //localStorage.setItem('goals',null);
      localStorage.removeItem('goals')
      //document.getElementById('displayArea').innerText="";
      //document.getElementById("list-goals").options.length=0;
      
      setItems([])

    }

    const updateSeed = () =>{
      console.log(action)
      if(action===''||action===null){
        alert('must enter an action')
        return
      }
      
      if(localStorage.length!=0){
        let retString = localStorage.getItem("goals")
        let retArray = JSON.parse(retString)
      
        if(retArray!=null){
          
          const show = retArray.map((item)=>{
         //   console.log("item: "+(item.completed))
         //   console.log("items: "+JSON.stringify(items))
            let count=0;
           for(var i=0; i<items.length; i++){
            if(items[i].goal!=item.goal){
              count++
            }
           }
           if(count==items.length){
            items.push(item)
           }
           
         
                
           
          })
        }
      
    }
      setItems([...items])
      //console.log(items)

      var chosen = document.getElementById('list-goals').value;

      var chosen_q;
      for(var i=0; i<items.length; i++){
        if(items[i].goal==chosen){

          //console.log("yay")
          chosen_q = items[i];
          
        }
     }
      if(chosen_q.size=='Large'){
        chosen_q.completed=(chosen_q.completed+.01)%100
        //setCompleted((chosen_q.completed+.01)%100)

      }
      else if(chosen_q.size=='Med'){
        //setCompleted((chosen_q.completed+1)%100)
        chosen_q.completed=(chosen_q.completed+1)%100


      }
      else{
        //setCompleted((chosen_q.completed+5)%100)
        chosen_q.completed=(chosen_q.completed+5)%100
       

      }
      
      // const time = new Date();
      // time.setHours(time.getHours());
      // //console.log(time)
      // setTime(time.getHours())
      // //console.log(currTime)
      // setDeadline(24)
      return pbars;


    }

      const displayCurrSeeds = items.map((item)=>{
        return(
          <option value={item.goal}>{item.goal}</option>
        )
      })
    
    
      const initDisplay = () =>{

        if(localStorage.length==0||!(localStorage.getItem('goals'))){
          return;
        }

        let retString = localStorage.getItem("goals")
        if(retString==null){
          return
        }
        let retArray = JSON.parse(retString)
       //const show = retArray.map((item) =>  console.log(item.goal));
        const localSeeds = retArray.map((item) =>  <option value={item.goal}>{item.goal}</option>);

        return(
          localSeeds
        )
      }
      const initProgress = () =>{
        if(localStorage.length==0||!(localStorage.getItem('goals'))){
          //document.getElementById('displayArea').innerText="";
         //document.getElementById("list-goals").options.length=0;
          return;
        }
       // console.log('here')
        let retString = localStorage.getItem("goals")
        if(retString==null){
       //   console.log('here')
          return;
        }
        let retArray = JSON.parse(retString)
       // console.log('initProgress'+retString)
       // const show = retArray.map((item) =>  console.log(item.completed));
        const localProgress = retArray.map((item) => <ProgressBar bgcolor={"#6a1b9a"} completed={item.completed}/>
        );
        return(
          localProgress
        )
      }

      const analyze = () =>{
       //use this to notify if time passed is too long
      //  if(currTime >24){
      //   alert('')
      //  }
        if(currTime == 24){
          alert('Update one of your plants before they die! Track your progress now.')
        }
        


      }

    












      //RETURN STATEMENT
    return (
      <div className="App">
      <div 
      id="Plant Seed" 
      style={{background:"rgb(143, 184, 147)", padding:"10px", "margin":"2em",
      "borderRadius":"0.6em"}}>
       <h1>Plant a Seed</h1>
       <label for="quote">Enter Goal:</label>
       <input type="text" id="goal" value={goal} onChange={(event) =>setGoal(event.target.value)}></input>
        <br></br>
        <label for="goal-size">How big will this plant be:</label>

        <select name="goal-sizes" id="goal-size">
        <option value="Small">Herb (Small)</option>
        <option value="Med">Flower (Medium)</option>
        <option value="Large">Tree (Large)</option>
        </select>

        <button style={{'backgroundColor': '#3e0313', "margin":"0.4em", "padding":".5em"}} type="submit" id="add_goal" onClick={()=>handleAddGoal()}>Plant Seed</button>
        <br></br>
  
      
      </div>
      <div id='analysis'>
      {analyze()}
      
      {/* {MyTimer()} */}
      {/* <p>{currTime}</p> */}
    <br></br>
      </div>

      <div style={{background:"rgb(143, 179, 184)", "margin":"0.4em", "padding":".5em", "borderRadius":"0.6em"}}id='updateTasks'>
        <h1>Water A Seed</h1>
        <h4>Update A Task</h4>
        <label for="pick-task">Which goal did you work towards:</label>

        <select name="list-goals" id="list-goals">
        {initDisplay()}
        </select>
        <input style={{"margin":".5em"}} id='action' placeholder='action' onChange={(evt)=>setAction(evt.target.value)}></input>
        <br></br>
        <button style={{'backgroundColor': '#3e0313', "margin":"0.4em", "padding":".5em"}} type="submit" onClick={()=>updateSeed()}>Update a Seed</button>

        <div id="displayArea">
        {pbars}
        </div>

      </div>


        <br></br>
      <button style={{'backgroundColor': '#3e0313', "margin":"0.4em", "padding":".5em"}} type="submit" onClick={()=>clearGoals()}>Remove All Seeds</button>


      </div>

    );

}

export default Goals;

const styledList = styled.li`
  list-style-type: none;
`
