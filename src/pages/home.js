import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../component/Header'
import { Link } from 'react-router-dom';
import ProductCard from '../component/ProductCard';
import SearchBar from '../component/SearchBar';

const Home = () => {
  const token = localStorage.getItem('token');
  const [isLogin,setIsLogin]=useState(false);
  const[err,setErr] =useState('');
  const[user, setUser]=useState({});
  const[products,setProducts] = useState([]);
  const[search,setSearch] = useState('');
  const[price,setPrice] = useState('2000');
  //user authentication
  async function authUser(){
    try{
      const res = await axios.get('https://dummyjson.com/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`, 
      }, 
      })
      console.log(res.data)
      setUser(res.data)
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

 // set search value
 function handleChange(e){
  const{name,value} = e.target;
  if(name === 'search'){
   setSearch(value)
  }
  else{
    setPrice(Number(value))
    console.log(value)
 }
}
 //filter product by search value
 const filterProducts = products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
 //filter product by price
 const filterItem = filterProducts.filter(product => product.price <= price)

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
          <h1 style={{textAlign:"center",margin:'10px'}}>Welcome <span style={{color:'rgb(248,113,33)'}}> {user.firstName}!</span></h1>
          <SearchBar handleChange={handleChange}/>
          <div className='productContainer'>
          {
           filterItem.length === 0 ? <h2 style={{color:'red',marginTop:'50px'}}>No product found !</h2> 
           : filterItem.map((product,index)=>{
              return(
               <ProductCard product={product} isCart={false}/>
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

export default Home
