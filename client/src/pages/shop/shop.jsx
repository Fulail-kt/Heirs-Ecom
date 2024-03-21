import React, { useEffect, useState } from 'react';
import './shop.css';
import Product from './product';
import api from '../../services/api';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../../components/navbar';

function Shop() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchProduct = async () => {
    try {
      const res = await api.get('/allProducts');
      setProducts(res?.data?.products);
    } catch (error) {
      console.error(error);
    }
  };

 

  const token = localStorage.getItem('token');
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  useEffect(() => {
    if (token && cartItems.length > 0 && !cart.length) {
      setCart(cartItems);
      addProduct()
    }
  }, [token, cartItems, cart]); 

  const addProduct = async () => {
    try {
      const res = await api.post(`/addCart`,{cart});

      if(res.data.success){
        localStorage.removeItem('cartItems')
        toast.success(res.data.message)
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []); 



  return (
    <>
      <Toaster />
      <Navbar />
      <div className='shop'>
        <div className='bg-gradient-to-br from-gray-400 to-gray-800 h-40 m-4 rounded-md'></div>
        <div className='products grid grid-cols-1 md:grid-cols-3'>
          {products?.map((product, index) => (
            <Product key={index} data={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Shop;
