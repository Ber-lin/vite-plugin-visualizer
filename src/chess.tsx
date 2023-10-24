import React, { useEffect, useState } from 'react'

export default function Chess() {
  const [text,setText]=useState('')
  const [list,setList]=useState<string[]|number[]>([])
  useEffect(()=>{
    setList([])
  },[])
  return (
    <div>
      <input type="text" value={text} onChange={({target:{value}})=>setText(value)}/>
      <button onClick={()=>{
        setList([...list,text])        
      }}>+1</button>
      {
        list.map(item=><p key={Math.random()}>{item}</p>)
      }
      </div>
  )
}
