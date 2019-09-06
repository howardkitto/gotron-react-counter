import React, {useState, useEffect} from 'react'

export default () => {

    let[message, setMessage] = useState({})
    let[toggle, setToggle] = useState(true)

    let connectionString = "ws://localhost:" + global.backendPort + "/web/app/events"

    let ws = new WebSocket(connectionString);

    useEffect(()=>{
    
        ws.onmessage = (e) => {
            let obj = JSON.parse(e.data);                                    
            setMessage({event: obj.event, value: obj.value});
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

    
    return <div> 
        <div>Toggle {toggle?"true":"false"}</div>
        <div>{message.event}&nbsp;{message.value}</div>
        <div><button onClick={()=>setToggle(!toggle)}>Toggle Counter</button></div>
        

                
    </div>
}

