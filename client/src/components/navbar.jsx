
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';
import Modal from './Modal/modal';


function Navbar() {
  const [user, setUser] = useState();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    try {
      localStorage.removeItem('token');
      navigate('/');
      setUser('');
      setShowLogoutModal(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div>
      <div className='navbar fixed w-full z-50 flex justify-between items-center bg-black text-white px-4 py-3'>
        <div className='links flex justify-center items-center'>
          <Link to="/" className='text-white pr-4 no-underline'>Shop</Link>
        </div>
        <h1 className='cursor-pointer'>Heirs</h1>
        <div className='flex justify-evenly gap-x-5 items-center'>
          <div className='w-1/2 h-full flex justify-center'>
            <Link to='/cart'><ShoppingCart className='' size={30} /></Link>
          </div>
          <div className='1/2'>
            {!user ? (
              <Link to='/login'>
                <button className='hover:bg-white px-2 py-1 hover:rounded-full hover:text-black'>Login</button>
              </Link>
            ) : (
              <button onClick={handleLogout} className='hover:bg-white px-2 py-1 hover:rounded-full hover:text-black'>Logout</button>
            )}
          </div>
        </div>
      </div>
      <div className='fknavbar w-full h-16'></div>

      <Modal isOpen={showLogoutModal} toggleModal={() => setShowLogoutModal(!showLogoutModal)}>
        <h1>Confirm Logout</h1>
        <p>Are you sure you want to log out?</p>
        <div className="flex justify-center mt-4">
          <button onClick={confirmLogout} className="mr-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Yes, Logout</button>
          <button onClick={cancelLogout} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
        </div>
      </Modal>
    </div>
  );
}

export default Navbar;
