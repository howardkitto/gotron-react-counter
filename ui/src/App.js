import React, {useState, useEffect} from 'react'

export default () => {

    let[message, setMessage] = useState({})

    let connectionString = "ws://localhost:" + global.backendPort + "/web/app/events"

    useEffect((()=>{

        let ws = new WebSocket(connectionString);

        ws.onmessage = (e) => {
            let obj = JSON.parse(e.data);
                        
            setMessage({event: obj.event, value: obj.value});
          };

          return () => {
            ws.close()
          }

    }),[])

    return <div> 
        {message.event}&nbsp;{message.value}
                
    </div>
}

