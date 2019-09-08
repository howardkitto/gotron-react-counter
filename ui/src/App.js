import React, {useEffect} from 'react'
import {StateProvider, useGlobalState} from './GlobalState'
import reducer from "./reducer"

import styled, {createGlobalStyle} from 'styled-components'


import Counter from './Counter'

const AppWrapper = (props)=>{

    const [{message},gotMessage]=useGlobalState()
    const [{sendMessage}, dispatchMessage]=useGlobalState({})

    useEffect(()=>{
    
        window.ws.onmessage = (e) => {
            let obj = JSON.parse(e.data);                                                
            gotMessage({    type:"gotMessage", 
                            message:
                                {   event:obj.event, 
                                    value:obj.value}})
                        };
          return () => {
            window.ws.close()
          }

    },[])

    useEffect(()=>{
        
        if (sendMessage !== undefined){
            // console.log("sending")
            // console.log(sendMessage)
            window.ws.send(JSON.stringify(sendMessage))           
        }        
    }, [sendMessage])
  
    return <span>{props.children}</span>
}



export default ()=>{
    
    return(
        
            <StateProvider initialState={{}} reducer={reducer}>   
             <GlobalStyle/>
                <AppWrapper>
                    <Counter/>
                </AppWrapper>                                             
        </StateProvider>
    
        
        )}
        const GlobalStyle = createGlobalStyle `
        html {
      
            background-color: darkblue;
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
        }
      
        body{
            font-family: Arial;
            color: white;
        }
      `

