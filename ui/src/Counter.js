import React, {useState, useEffect} from 'react'
import {useGlobalState} from './GlobalState'

export default () => {

    const [{message}, sendMessage ]= useGlobalState()
    const [m, setM]=useState({})
    const [toggle, switchToggle]=useState(true)

    useEffect(()=>{ setM(message)},[message])
    useEffect(()=>{sendMessage({
        type:"sendMessage",
        message:{
            event: "toggle",
            value: toggle
        }
    })},[toggle])

    return<div>
            <div>{m&&m.value}</div>
            <button onClick={()=>switchToggle(!toggle)}>Click to send {toggle?"false":"true"}</button>             
        </div>
}