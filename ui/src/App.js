import React, {useState, useEffect} from 'react'
import {StateProvider} from './GlobalState'
import reducer from './reducer'

import Counter from './Counter'

const WebSocketHandler = () => {
    return <div></div>
}

export default () => {
    const[message, setMessage] = useState({})
    const[toggle, setToggle] = useState(true)    

    const initialState = { }
    const connectionString = "ws://localhost:" + global.backendPort + "/web/app/events"

    let ws = new WebSocket(connectionString);

    useEffect(()=>{
    
        ws.onmessage = (e) => {
            let obj = JSON.parse(e.data);                                    
            setMessage({event: obj.event, value: obj.value})           
          };

          return () => {
            ws.close()
          }

    },[])

    useEffect(()=>{
        console.log("using effect")
        ws.send(JSON.stringify({
            "event": "toggle",
            "value": toggle,
        }))
    },[toggle])

    
    return  <StateProvider initialState={initialState} reducer={reducer}>
        <WebSocketHandler/>
        <div>Toggle {toggle?"true":"false"}</div>
        <div>{message.event}&nbsp;{message.value}</div>        
        <div><button onClick={()=>setToggle(!toggle)}>Toggle Counter</button></div>        
        <Counter/>        
        
        </StateProvider>
                        
}

