import React, { useEffect, useState } from 'react';
import './cart.css';
import api from '../../services/api';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../../components/navbar';
import toast, { Toaster } from 'react-hot-toast';
import { TrashSimple } from 'phosphor-react';
import { Link } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      if (token) {

        const decode = jwtDecode(token);
        const res = await api.get(`/getUser/${decode.id}`);
        if (res.data.success) {
          setCartItems(res?.data?.user?.cart);
        }
      } else {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        setCartItems(cartItems)
      }
    } catch (error) {
      console.log(error);
    }finally{
setLoading(false)
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
          console.log(action, item.quantity, item.stock)
          if (item.id == productId) {
            const updatedQuantity = action == 'increment' ? item.quantity < item.stock ? item.quantity + 1 : item.quantity : Math.max(1, item.quantity - 1);
            console.log(updateQuantity)
            return { ...item, quantity: updatedQuantity };
          }
          return item;
        });
        let LocalcartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existProductIndex = LocalcartItems.findIndex(item => item.id === productId);
        if (existProductIndex !== -1) {
          const quantity = LocalcartItems[existProductIndex].quantity
          const stock = LocalcartItems[existProductIndex].stock

          console.log(quantity, stock)
          if (action == "increment" && stock >= quantity) {

            LocalcartItems[existProductIndex].quantity += 1;
          } else {
            LocalcartItems[existProductIndex].quantity -= 1;

          }
        }
        localStorage.setItem('cartItems', JSON.stringify(LocalcartItems));
        setCartItems(updatedCartItems);

      } else {
        const updatedCartItems = cartItems.map(item => {
          if (item.product._id == productId) {
            const updatedQuantity = action == 'decrement' ? item.quantity < item.product.stock ? Math.max(1, item.quantity - 1) : item.quantity : Math.max(1, item.quantity + 1);
            return { ...item, quantity: updatedQuantity };
          }
          return item;
        });

        api.patch(`/updateCart/${productId}`, { action });
        setCartItems(updatedCartItems);

      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      if (token) {
        const res = await api.delete(`/delete-from-cart/${productId}`);
        if (res.data.success) {
          const updatedCartItems = cartItems.filter(item => item.product._id !== productId);
          setCartItems(updatedCartItems);
          toast.success('Item deleted successfully');
        } else {
          toast.error('Failed to delete item. Please try again.');
        }
      } else {
        let localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existProductIndex = localCartItems.findIndex(item => item.id === productId);
        if (existProductIndex !== -1) {
          localCartItems.splice(existProductIndex, 1);
          localStorage.setItem('cartItems', JSON.stringify(localCartItems));
          setCartItems(localCartItems);
          toast.success('Item deleted successfully');
        } else {
          toast.error('Item not found');
        }
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('An error occurred while deleting the item. Please try again.');
    }
  };

  const calculateTotalAmount = () => {
    if (token) {
      return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    } else {
      let localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      return localCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  };

  const totalAmount = calculateTotalAmount();
  

  return (
    <>
      <Toaster />
      <Navbar />
      <div className='w-100 h-100vh d-flex justify-content-center align-items-center' style={{ minHeight: '60vh' }}>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {loading?(<PuffLoader color="#000" size={50} />):(<table className='w-75 text-center'>
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
                  <tr key={product._id + index}>
                    <td>{index + 1}</td>
                    {token ? (<><td className='flex justify-center'>
                      <img src={product.product.images[0]} width={90} alt="" />
                    </td>
                      <td>{product.product.title}</td>
                      <td>
                        <button className='btn btn-dark p-1' onClick={() => updateQuantity(product.product._id, 'decrement')}>-</button>
                        <span className='p-1'>{product.quantity}</span>
                        <button className='btn btn-dark p-1' onClick={() => updateQuantity(product.product._id, 'increment')}>+</button>
                      </td>
                      <td>₹ {product.price * product.quantity}</td>
                      <td><button onClick={() => handleDelete(product.product._id)}><TrashSimple size={24} color="red" /></button></td>
                    </>
                    ) : (<>
                      <td className='flex justify-center'>
                        <img src={product.image} width={90} alt="" />
                      </td>
                      <td>{product.title}</td>
                      <td>
                        <button className='btn btn-dark p-1' onClick={() => updateQuantity(product.id, 'decrement')}>-</button>
                        <span className='p-1'>{product.quantity}</span>
                        <button className='btn btn-dark p-1' onClick={() => updateQuantity(product.id, 'increment')}>+</button>
                      </td>
                      <td>₹ {product.price * product.quantity}</td>
                      <td><button onClick={() => handleDelete(product.id)}><TrashSimple size={24} color="red" /></button></td>
                    </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>)}
          </>
        )}
      </div>
      <div className='container border-t-4 pt-4 w-100 flex flex-col justify-center items-end' >
      <div>
        <p className='text-danger fs-2'>Total: ₹ {totalAmount}</p>
      <div className='text-center p-4 '><Link to='/checkout' ><button className='bg-gray-600  p-2 px-4 rounded-full text-white font-bold'>Proced to Checkout</button></Link></div>
      </div>
      </div>
    </>
  );
}

export default Cart;
