import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Navbar from '../../components/navbar';

function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      if (token) {
        const decode = jwtDecode(token);
        const res = await api.get(`/getUser/${decode.id}`);
        if (res.data.success) {
          setCartItems(res?.data?.user?.cart);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (token) {
      fetchData()
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          <div className="md:flex flex-col gap-x-20 md:flex-row grid">
            <div className="md:w-1/2">
              <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2">Full Name</label>
                  <input type="text" id="fullName" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address</label>
                  <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black" />
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">Address</label>
                  <textarea id="address" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black" rows="4"></textarea>
                </div>
                <button type="submit" className="bg-black text-white py-2 px-6 rounded-md font-semibold hover:bg-gray-900 transition duration-300">Place Order</button>
              </form>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="bg-gray-100 p-4 rounded-md">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between mb-2">
                    <span><img src={item?.product?.images[0]} width={80} />{ }</span>
                    <span>{item.product.title}</span>
                    <span>${item.price}</span>
                  </div>
                ))}
                <hr className="my-2" />
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${cartItems.reduce((total, item) => total + item.price, 0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
