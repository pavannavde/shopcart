import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginCard = () => {
 
//state 
const[user,setUser] =useState({username:'',password:''});
const[err, setErr] =useState('');
const navigate = useNavigate();

//set the value of username and password
function handleChange(e){
    const {name,value} =e.target;
  setUser({...user,[name]:value});
}

//login user
 async function handleSubmit(e){
    e.preventDefault();
    console.log(user);
    try{
        const res = await axios.post('https://dummyjson.com/auth/login',user);
       console.log(res.data);

       //storing token at local storage 
       localStorage.setItem('token', res.data.token);
        toast('Login Successful');

       //navigate to home page
       navigate('/home')
    }
    catch(err){
        toast('Invalid Credentials');
        setErr(err.response.data.message);
    }

}

  return (
    <div className='L-card'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input type='text' placeholder='Enter your username'  onChange={handleChange} name='username'/>
        <input type='password' placeholder='Enter your password' onChange={handleChange} name='password'/>
        <button type='submit'>Login</button>
      </form>
      {
        err && <p>{err}!</p>
      }
    </div>
  )
}

export default LoginCard;
