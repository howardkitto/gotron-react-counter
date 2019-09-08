import React, {useState, useEffect} from 'react'
import {useGlobalState} from './GlobalState'

export default () => {

    const [{message}, sendMessage ]= useGlobalState()
    const [m, setM]=useState({})
    const [toggle, switchToggle]=useState(true)

    useEffect(()=>{ setM(message)},[message])

    return<div>
            <div>{m&&m.value}</div>
            <button onClick={()=>sendMessage({
                type:"sendMessage",
                message:{
                    event: "toggle",
                    value: true
                }
            })}>Click to send </button>             
        </div>
}