import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const  Header = () => {
  return (
    <div className='header'>
      <h1 className='logo'>Shop<span>Cart.</span></h1>
      <div>
      <Link to='/home'>Home</Link>
      <Link to='/cart'>Cart</Link>
      <Link to='/'>Login</Link>
      </div>
    </div>
  )
}

export default  Header
