import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import toast, { Toaster } from 'react-hot-toast';
import api from '../../services/api';
import axios from 'axios';
import Navbar from '../navbar';



const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }, getValues
    } = useForm();

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (value) => {
        try {
            setLoading(true)
            const res = await api.post('/create', value)
            if(res.data.success){
                toast.success("successfully account created");
                navigate('/login')
            }
            toast.success(res.data.message)
        }
        catch (error) {
            const errorMessage = error?.response?.data.message ||'An error occurred. Please try again after some time';
            toast.error(errorMessage);
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
            <Navbar/>
            {loading ? (<p>loading</p>) : (
                <div className="login_bg justify-center h-screen py-6 flex flex-col w-full sm:py-12">
                    <div className="relative py-3 sm:max-w-xl w-[30%] sm:mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-900 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-14">
                            <div className="max-w-md mx-auto">
                                <div className='flex w-full justify-center'>
                                    {/* <img src='' width={140} alt="sample logo" /> */}
                                    <h1 className='font-serif text-lg font-semibold'>SIGNUP</h1>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="divide-y divide-gray-200">
                                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                            <div className="relative">
                                                <input
                                                    autoComplete="off"
                                                    id="name"
                                                    {...register('name', {
                                                        required: { value: true, message: 'name is required' },
                                                        minLength: { value: 4, message: 'name should have at least 4 characters' },
                                                        maxLength: { value: 30, message: 'name should have at most 30 characters' },
                                                        validate: (value) => value.trim() === value || 'Insert valid data',
                                                    })}
                                                    type="text"
                                                    className="peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                                    placeholder="name"
                                                />
                                                <label
                                                    htmlFor="name"
                                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                                >
                                                    Name
                                                </label>
                                                <div>
                                                    <p className="text-xs text-red-600">{errors.name?.message}</p>
                                                </div>
                                            </div>

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
                                                <div>
                                                    <input
                                                        autoComplete="off"
                                                        id="confirm"
                                                        {...register('confirm', {
                                                            required: { value: true, message: 'Confirm password is required' },
                                                            validate: (value) => value === getValues('password') || 'Passwords do not match',
                                                        })}
                                                        type="password"
                                                        className="peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                                        placeholder="confirm"
                                                    />
                                                    <label
                                                        htmlFor="confirm"
                                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                                    >
                                                        Confirm Password
                                                    </label>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-red-600">{errors.confirm?.message}</p>
                                                </div>
                                            </div>


                                            <div className="relative ">
                                                <div className="w-1/2">
                                                    <input
                                                        autoComplete="off"
                                                        id="phone"
                                                        {...register('phone', {
                                                            required: { value: true, message: 'Phone is required' },
                                                            pattern: {
                                                                value: /^[0-9]{10}$/,
                                                                message: 'Invalid phone number',
                                                            },
                                                        })}
                                                        type="tel"
                                                        className="peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                                        placeholder="Phone"
                                                    />
                                                    <label
                                                        htmlFor="phone"
                                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                                    >
                                                        Phone
                                                    </label>
                                                    <div>
                                                        <p className="text-xs text-red-600">{errors.phone?.message}</p>
                                                    </div>
                                                </div>
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
                                        <p>Already have Account?</p> <Link to='/login'><span className='text-blue-500'>SignIn</span></Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default
    Signup;