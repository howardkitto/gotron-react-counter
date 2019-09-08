import React, {useEffect} from 'react'
import {StateProvider, useGlobalState} from './GlobalState'

export default (props)=>{

    const connectionString = "ws://localhost:" + global.backendPort + "/web/app/events"

    let ws = new WebSocket(connectionString);

    const [{message}, gotMessage]= useGlobalState()

    ws.onmessage = (e) => {
        let obj = JSON.parse(e.data);                                    
        console.log(e.data)
        gotMessage({type:"gotMessage", message:{key:e.data.event, value:e.data.value}})          
      };

      return () => {
        ws.close()
      }
   

    return <span>{props.children}</span>
}