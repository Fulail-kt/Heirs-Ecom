import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../../components/navbar';
import { PuffLoader } from "react-spinners";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const fetchData = async () => {
    try {
      const res = await api.get(`/getProduct/${id}`);
      if (res?.data?.success) {
        setProduct(res?.data?.product);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addToCart = async (id) => {
    try {
      if (!id) {
        return toast.error('Product ID missing');
      }

      const token = localStorage.getItem('token');
      if (token) {
        const res = await api.post(`/add-to-cart`, { id });
        if (res.data.success) {
          toast.success(res.data.message);
        }
      } else {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        const existProductIndex = cartItems.findIndex(item => item.id === id);

        if (existProductIndex !== -1) {
          cartItems[existProductIndex].quantity += 1;
        } else {
          cartItems.push({ id, title: product.title, stock: product.stock, quantity: 1, image: product.images, price: product.price });
        }
        toast.success('Product added to cart. Log in to save.');

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }

    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PuffLoader color="#000" size={50} />
      </div>
    );
  }

  return (
    <>
    <Toaster/>
    <Navbar/>
    <div className="w-full flex justify-between mt-20">
    <div className="w-1/2 flex  flex-col-reverse md:flex-row justify-around items-center border-r-4 ">
      <div className="flex md:flex-col items-center justify-center">
        <img src={product.images} alt="1" className="w-12 p-1" sizes={10} />
        <img src={product.images} alt="2" className="w-12 p-1" sizes={10} />
        <img src={product.images} alt="3" className="w-12 p-1" sizes={10} />
        <img src={product.images} alt="4" className="w-12 p-1" sizes={10} />
      </div>
      <div className='md:w-1/2 w-[50%] '><img src={product?.images} sizes={32} className="w-full h-full" alt="" /></div>
    </div>
    <div className="w-1/2">
      <div className="prd">
        <h2 className='text-2xl font-bold items-center p-4'>{product?.title}</h2>
        <div>
          <p className='text-lg px-4'>{product?.description}</p>
          <p className='font-thin px-4 py-2'>{product?.stock} Stocks left </p>

        </div>
        <p className='font-extrabold text-2xl p-4 py-3'>₹ {product?.price}</p>
      </div>
      <button className="addToCart border-0 mx-4 my-2 bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded" onClick={() => addToCart(product._id)}>
        Add To Cart
      </button>
    </div>
 </div>
 </>
  )
}

export default ProductDetails
