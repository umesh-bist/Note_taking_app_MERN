//@ts-nocheck
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearGlobalError } from '../reduxSaga/errorSlice';
import { Loader } from 'lucide-react'

const GlobalError = () => {

    const dispatch=useDispatch();
    const errorMessage=useSelector((state)=>state.error.message);
    // const loading=useSelector((state)=>state.notes.loading)
    // alert(loading);

    if(!errorMessage) return null
  return (

    <div>
       <div
      style={{
        position: "fixed",
        top: 10,
        right: 10,
        backgroundColor: "#f87171",
        color: "white",
        padding: "10px 20px",
        borderRadius: 6,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        zIndex: 9999,
        maxWidth: "300px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{errorMessage}</span>
        <button
          onClick={() => dispatch(clearGlobalError())}
          style={{
            marginLeft: 12,
            background: "transparent",
            border: "none",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          aria-label="Close error message"
        >
          ×
        </button>
      </div>
    </div>
    </div>
  )
}

export default GlobalError
