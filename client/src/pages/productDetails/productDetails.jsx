import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

function ProductDetails() {

  const [product,setProduct]=useState('')

  const { id } = useParams();
  
  const fetchData = async ()=>{

    try {
      const res= await api.get(`/getProduct/${id}`)
      if(res?.data?.success){
       setProduct(res?.data?.product)
      }
      
    } catch (error) {
      console.log(error)
    }
}
  useEffect(()=>{
  fetchData()
},[])


  const addToCart = async (productId) => {

    try {
      if(!productId){
      return toast.error('product ID missing')
      }

      const token = localStorage.getItem('token');
      if (token) {
        const res = await api.post(`/add-to-cart/${productId}`);
        if (res.data.success) {
          toast.success(res.data.message);
        }
      } else {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        const existProductIndex = cartItems.findIndex(item => item.productId === productId);
        if (existProductIndex !== -1) {
          cartItems[existProductIndex].quantity += 1;
        } else {
          cartItems.push({ productId, title:product.title,stock:product.stock, quantity: 1,image:product.images,price:product.price});
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        toast.success('Product added to cart. Log in to save.');
      }
      
    } catch (error) {
      console.log(error)
    }

    console.log(product)
  };
  

  return (
    <div className="w-full flex justify-between mt-20">
    <div className="w-1/2 flex justify-around border-r-4 ">
      <div className="flex flex-col items-center justify-center">
        <img src={product.images} alt="1" className="w-12 p-1" sizes={10} />
        <img src={product.images} alt="2" className="w-12 p-1" sizes={10} />
        <img src={product.images} alt="3" className="w-12 p-1" sizes={10} />
        <img src={product.images} alt="4" className="w-12 p-1" sizes={10} />
      </div>
      <img src={product?.images} sizes={32} className="w-1/2" alt="" />
    </div>
    <div className="w-1/2">
      <div className="prd">
        <h2 className='text-2xl font-bold items-center p-4'>{product?.title}</h2>
        <p className='text-lg px-4'>{product?.description}</p>
        <p className='font-extrabold text-2xl p-4'>₹ {product?.price}</p>
      </div>
      <button className="addToCart border-0 mx-4 bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded" onClick={() => addToCart(product._id)}>
        Add To Cart
      </button>
    </div>
 </div>
  )
}

export default ProductDetails
