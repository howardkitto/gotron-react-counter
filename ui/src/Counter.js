import React, {useState, useEffect} from 'react'
import {useGlobalState} from './GlobalState'
import styled from 'styled-components'

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
        <h1>Counter</h1>
            <div>{m&&m.value}</div>
            <CounterButton onClick={()=>switchToggle(!toggle)}>Click to {toggle?"stop":"start"} the counter</CounterButton>             
        </div>
}

const CounterButton = styled.button`
height : 100px;
border-radius :25px;
`