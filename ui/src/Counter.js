import React, {useState, useEffect} from 'react'
import {useGlobalState} from './GlobalState'

export default () => {

    const [{message}, sendMessage ]= useGlobalState()
    const [m, setM]=useState({})

    useEffect(()=>{ setM(message)},[message])

    return<div>
            <div>{m&&m.value}</div>
            <button onClick={()=>sendMessage({
                type:"sendMessage",
                message:{
                    event: "toggle",
                    value: "value " + m.value
                }
            })}>Click to send</button>
        </div>
}