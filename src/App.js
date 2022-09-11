import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import styled from "styled-components";
import "./index.css";
import axios from "axios";

const StyledInput = styled.input`
  display: block;
  margin: 20px 0px;
  border: 1px solid lightblue;
`;
// Creating a custom hook
function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  function onChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange,
  };
}

export default function App() {
  const [val, setVal] = useState("");
  const [code, setcode] = useState("");
  const inputProps = useInput();
  const [retrieve, setRetrieve] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div style={{ height: 600, width: "100%" }}>
        <MDEditor
          value={val} 
          className="hello"
          preview={retrieve ? "preview" : "edit"}
          onChange={(c) => setVal(c)}
          textareaProps={{
            placeholder: "Enter your code",
          }}
        />
      </div>
      <StyledInput
        value={code.value}
        onChange={(c) => setcode(c.target.value)}
        placeholder="Enter code name" 
      />
      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
      >
        <button
          onClick={async() => {
            setRetrieve(true);
            const res= await axios.get("https://clpboard.onrender.com/?name="+code)
            setVal(res.data)
          }}
        > 
          Retrieve
        </button>
        <button
          onClick={async() => {
            const res= await axios.post("https://clpboard.onrender.com/post", {
              code: val,
              name:code,
            });
            
          }}
        >
          Submit 
        </button>
      </div>
    </div> 
  );
}
