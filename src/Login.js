import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const nav=useNavigate();
  return (
    <>
   <h1> Login</h1>
    <button onClick={()=>{nav('/singup')}}>Singup</button>
   </>
  )
}

export default Login