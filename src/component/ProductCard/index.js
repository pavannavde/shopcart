import React from 'react'
import './style.css';
import { toast } from 'react-toastify';
const ProductCard = ({product,isCart}) => {

  //adding product to cart
  function handleClick(){
    if(localStorage.getItem('cart'))
    {
      let cart = JSON.parse(localStorage.getItem('cart'));
      if(cart.includes(product.id))
      {
        toast('Product already in cart');
        return;
      }
      cart.push(product.id);
      localStorage.setItem('cart',JSON.stringify(cart));
      toast('Product added to cart');
    }
    else
    {
      let cart = [];
      cart.push(product.id);
      localStorage.setItem('cart', JSON.stringify(cart));
      toast('Product added to cart');
    }
    }
  //remove product from cart
  function handleRemove(e){
    let cart = JSON.parse(localStorage.getItem('cart'));
    let newCart = cart.filter(item => item !== product.id);
    localStorage.setItem('cart', JSON.stringify(newCart));
    toast('Product removed from cart');
    window.location.reload();
  }

  return (
    <div key={product.id} className='productCard'>
      <img src={product.thumbnail} alt={product.title} />
      <div>
        <h4>Product Name : {product.title}</h4>
        <p style={{display:'flex',justifyContent:'space-between'}}>Price : {product.price}$   <span style={{color:'lightgreen'}}>{product.discountPercentage}%</span></p>
        <p>Rating : {product.rating}</p>
        {
          isCart ? <button onClick={handleRemove}>Remove from Cart</button>
        :<button onClick={handleClick}>Add to Cart</button>
        }
        
      </div>
    </div>
  )
}

export default ProductCard
