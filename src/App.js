import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import './index.css'
import axios from 'axios';


export default function App() {
  const [val,setVal] = useState('')
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>   
    <div style={{height:600,width:"100%"}}>   
      <MDEditor
        value={val}
        className="hello"
        preview="edit"
        
        onChange= {(c)=> setVal(c)}
        textareaProps={{
          placeholder: "Please enter Markdown text"
        }}
      /> 
    </div>
    <button onClick={()=>{axios.post('https://clipboard-uowm.onrender.com/post',{code:val})}} style={{width:100,height:50}}>Submit</button> 
    </div>
  ); 
}  
  