import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';

function Navbar() {
  const [user, setUser] = useState();
  const navigate=useNavigate()
  const location = useLocation();

  useEffect(()=>{
    const token=localStorage.getItem("token")
    if(token){
      setUser(true)
    }else{
      setUser(false)
    }

  },[])

  const handleLogout=()=>{
    try {
      localStorage.removeItem('token')
      navigate('/')
      setUser('')
    } catch (error) {
      
    }
  }

  return (
    <div>
      <div className='navbar fixed w-full flex justify-between items-center bg-black text-white px-4 py-3'>
        <div className='links flex justify-center items-center'>
          <Link to="/" className='text-white pr-4 no-underline'>Shop</Link>
        </div>
            <h1>Heirs</h1>
          <div className='flex justify-evenly gap-x-5 items-center'>
          <div className='w-1/2 h-full flex justify-center'>
            <Link to='/cart'><ShoppingCart className='' size={30} /></Link>
          </div>
          <div className='1/2'>
            {!user ? (<Link to='/login'><button className='hover:bg-white px-2 py-1  hover:rounded-full hover:text-black'>Login</button></Link>):(<button onClick={handleLogout} className= ' hover:bg-white px-2 py-1 hover:rounded-full hover:text-black'>Logout</button>)}
          </div>
        </div>
      </div>
      <div className='fknavbar w-full h-16'></div>
    </div>
  );
}

export default Navbar;
