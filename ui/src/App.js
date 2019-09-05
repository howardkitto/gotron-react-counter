import React, {useState} from 'react'
import useSocket from 'use-socket.io-client';

export default () => {

    let[message, setMessage] = useState()
    let connectionString = "ws://localhost:" + global.backendPort + "/web/app/events"
    const [socket] = useSocket(connectionString);

    socket.connect();
    console.log(socket);    

    // ws.onmessage = (message) => {
    //     let obj = JSON.parse(message.data);
        
    //     // event name
    //     console.log(obj.event);
    
    //     // event data
    //     console.log(obj.AtrNameInFrontend);

    //     // setMessage(obj.event)

    //     ws.close
    // }
    return <div>Hello You
        <p>
            {message}
        </p>
        
    </div>
}

