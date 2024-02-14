import React, { useEffect, useState } from 'react';
import Header from '../component/Header'
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../component/ProductCard';

const Cart = () => {
  const token = localStorage.getItem('token');
  const [isLogin,setIsLogin]=useState(false);
  const[err,setErr] =useState('');
  const[products,setProducts] = useState([]);
  const[cartItem,setCartItem]= useState(JSON.parse(localStorage.getItem('cart'))||[]);

  //user authentication
  async function authUser(){
    try{
      const res = await axios.get('https://dummyjson.com/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`, 
      }, 
      })
      console.log(res.data)
      setIsLogin(true);
    }
    catch(err){
      setErr(err.response.data.message);
      console.log(err.response.data.message)
      setIsLogin(false);
    }
  }
  
  //get data 
   async function getData(){
    try{
        const res = await axios.get('https://dummyjson.com/products')
        console.log(res.data.products);
        setProducts(res.data.products);
    }
    catch(err){
      console.log(err)
    }
   }

 //get the cart product
  const filterProducts = products.filter(product => cartItem.includes(product.id));
 
 
  useEffect(() => {
    authUser()
    getData()
  },[token])

  return (
    <div>
      <Header/>
      {
        isLogin === true 
        ?(<div>
          <h1 style={{textAlign:'center',color:'black',marginTop:'10px'}}>CART</h1>
          <p style={{textAlign:'right', padding:'20px',fontSize:'20px',fontWeight:'700'}}> Item Count:{cartItem.length}</p>
          <div className='productContainer'>
          {
           filterProducts.length === 0 ? <h2 style={{color:'red'}}>No product found !</h2> 
           : filterProducts.map((product,index)=>{
              return(
               <ProductCard product={product} isCart={true}/>
              )
            })
            
          }
          </div>
        </div> )
        :( <div className='token-expire-msg'>
              <p style={{color:'red'}}>{err}</p>
              {
              err && 
              <p>Please login again  ,<Link to='/'>Login</Link></p>    
              }
          </div>)
      }
    </div>
  )

}

export default Cart
