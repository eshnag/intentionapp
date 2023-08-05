import { useState } from 'react'

import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import styled from 'styled-components'

const API_KEY = "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"

function Chat(){
    const [typing, isTyping]=useState(false)
    const [messages, setMessages]=useState([
        {
            message:"Hello, I'm ChatGPT",
            sender:"ChatGPT"
        }
    ])
    const handleSend = async(message)=>{
        //add message to the 'messages' state array^
        const newMessage = {
            message:message,
            sender: "user",
            direction:"outgoing"
        }
        const newMessages = [...messages, newMessage]
        //update messages state
        setMessages(newMessages);
        //set typing indicator
        isTyping(true);
        //process message to chatgpt (send it)
        await processMessageToChatGPT(newMessages);
    }

    async function processMessageToChatGPT(chatMessages){
    
        //chat completions allows us to use the api (endpoint)
        //chatMessages{sender:"user" or "chatGPT", message:"content"}
        //apiMessages {role: "", content:""} -->(array), formats data for api request
        let apiMessages = chatMessages.map((messageObject)=>{
            let role = "";
            if(messageObject.sender === "ChatGPT"){
                role="assistant"
            }
            else{
                role="user"
            }
            return {role:role, content:messageObject.message}
        });
       
        /*roles:
        user-> from user
        assistant->response from chatgpt 
        system->1 init message defining HOW chatgpt will talk!
        */
       const systemMessage = {
        role:'system',
        content: 'Suggest an action to take to get closer to the goal provided.'
       }
       const apiRequestBody = {
        "model": "gpt-3.5-turbo",
        "messages":[systemMessage,...apiMessages]//array of messages
        }
        await fetch("https://api.openai.com/v1/chat/completions",{
            method:"POST", 
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer " + API_KEY
                
            },
            body:JSON.stringify(apiRequestBody)
        }).then((data)=>{
            return data.json();
        }).then((data)=>{
            console.log(data);
            console.log(data.choices[0].message.content);

        })
    }

    return(
        <div>
        <div style={{position:"relative", height:"800px", width:"700px"}}>
            <MainContainer>
                <ChatContainer>
                    <MessageList typingIndicator={typing? <TypingIndicator content="ChatGPT is typing"/> : null}>
                        {messages.map((message,i)=>{ //i is index in array
                            return <Message key={i} model={message}/>
                        })}
                    </MessageList>
                    <MessageInput placeholder="Type here" onSend={handleSend}/>
                </ChatContainer>
            </MainContainer>

        </div>

    </div>
    );
    


}
export default Chat;