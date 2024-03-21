import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import api from '../../services/api';
import Navbar from '../navbar';
import { PuffLoader } from 'react-spinners';

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (value) => {
        try {
            setLoading(true);
            const res = await api.post('/login', value);
            if(!res?.data?.success){
                toast.error(res?.data?.message)
            }
            const token=res?.data?.token;
            localStorage.setItem('token',token)
            toast.success("Logined Successfully");
            navigate('/',{replace:true, state: { user: true }})
        } catch (error) {
            const errorMessage =error?.response?.data.message ||'An error occurred. Please try again after some time';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
       const token= localStorage.getItem('token')
       if(token){
        navigate('/')
       }
    },[])

    return (
        <>
            <Toaster />
            <>
  <Navbar/>

            {loading ? (<PuffLoader color="#000" size={50}/>) : (
                <div className="login_bg justify-center h-screen py-6 flex flex-col w-full sm:py-12">
                    <div className="relative py-3 sm:max-w-xl w-[20%] sm:mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-900 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-14">
                            <div className="max-w-md mx-auto">
                                <div className='flex w-full justify-center'>
                                    <h1 className='font-serif text-lg font-semibold'>LOGIN</h1>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="divide-y divide-gray-200">
                                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                            <div className="relative">
                                                <input
                                                    {...register('email', {
                                                        required: 'Email is required',
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                            message: 'Invalid email address',
                                                        },
                                                    })}
                                                    autoComplete="off"
                                                    id="email"
                                                    type="text"
                                                    className={`peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${errors?.email ? 'border-red-500' : ''
                                                        }`}
                                                    placeholder="Email address"
                                                />
                                                <label
                                                    htmlFor="email"
                                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                                >
                                                    Email Address
                                                </label>
                                                {errors?.email && (
                                                    <span className="text-red-500 text-sm">{errors.email.message}</span>
                                                )}
                                            </div>
                                            <div className="relative">
                                                <input
                                                    {...register('password', {
                                                        required: 'Password is required',
                                                        minLength: {
                                                            value: 6,
                                                            message: 'Password must be at least 6 characters',
                                                        },
                                                    })}
                                                    autoComplete="off"
                                                    id="password"
                                                    type="password"
                                                    className={`peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${errors?.password ? 'border-red-500' : ''
                                                        }`}
                                                    placeholder="Password"
                                                />
                                                <label
                                                    htmlFor="password"
                                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                                >
                                                    Password
                                                </label>
                                                {errors?.password && (
                                                    <span className="text-red-500 text-sm">{errors.password.message}</span>
                                                )}
                                            </div>
                                            <div className="relative">
                                                <button
                                                    type="submit"
                                                    className="bg-gray-700 text-white rounded-md px-2 py-1"
                                                >
                                                    Submit
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <p>Dont have Account?</p> <Link to='/signup'><span className='text-blue-500'>SignUp</span></Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </>

        </>
    );
};

export default Login;