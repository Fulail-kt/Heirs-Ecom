import React, { useEffect, useState } from 'react';
import './cart.css';
import api from '../../services/api';
import { jwtDecode } from 'jwt-decode';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const token = localStorage.getItem('token');
  const fetchData = async () => {
    try {
      const decode = jwtDecode(token);
      const res = await api.get(`/getUser/${decode.id}`);
      if (res.data.success) {
        setCartItems(res?.data?.user?.cart);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
 
      fetchData();
    } else {
      const items = localStorage.getItem('cartItems');
      setCartItems(items ? JSON.parse(items) : []);
    }
  }, []);

  const updateQuantity = async (productId, action) => {
    try {

      if (!token) {
        const updatedCartItems = cartItems.map(item => {
          if (item.id === productId) {
            const updatedQuantity = action === 'increment' ? item.quantity<item.stock? item.quantity + 1 :item.quantity: Math.max(1, item.quantity - 1);
            return { ...item, quantity: updatedQuantity };
          }
          return item;
        });
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        return;
      }

      const updatedCartItems = cartItems.map(item => {

        if (item.id === productId) {

          const updatedQuantity = action === 'increment' ? item.quantity< item.stock ? item.quantity + 1 : item.quantity : item.quantity - 1;

          updatedQuantity = Math.max(1, updatedQuantity);

          api.post(`/updateCart/${productId}`,action);

          return { ...item, };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='w-100 h-100vh d-flex justify-content-center align-items-center' style={{ minHeight: '60vh' }}>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <table className='w-75 text-center'>
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Image</th>
                  <th scope="col">Product</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={product.image} width={90} alt="" />
                    </td>
                    <td>{product.title}</td>
                    <td>
                      <button className='btn btn-dark p-1' onClick={() => updateQuantity(product.id, 'decrement')}>
                        -
                      </button>
                      <span className='p-1'>{product.quantity}</span>

                      <button className='btn btn-dark p-1' onClick={() => updateQuantity(product.id, 'increment')}>
                        +
                      </button>
                    </td>
                    <td>₹ {product.price * product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      <hr />
      <div className='container w-100 d-flex justify-content-end align-items-center' >
        {/* <p className='text-danger fs-2'>Total: ₹ {getTotalPrice()}</p> */}
      </div>
    </>
  );
}

export default Cart;
