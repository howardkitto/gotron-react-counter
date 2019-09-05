import React, {useState} from 'react'

export default () => {

    let[message, setMessage] = useState()

    let connectionString = "ws://localhost:" + global.backendPort + "/web/app/events"

    let ws = new WebSocket(connectionString);

    ws.onmessage = (message) => {
        let obj = JSON.parse(message.data);
        
        // event name
        console.log(obj.event);
    
        // event data
        console.log(obj.AtrNameInFrontend);

        // setMessage(obj.event)

        ws.close
    }
    return <div>Hello You
        <p>
            {message}
        </p>
        
    </div>
}

