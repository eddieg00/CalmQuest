import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
    const [isLogin,setIsLogin] = useState(false);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [addProfile, { error, data }] = useMutation(ADD_PROFILE);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addProfile({
        variables: { ...formState },
      });

      Auth.login(data.addProfile.token);
    } catch (e) {
      console.error(e);
    }
  };

  return(
    <div className="bg-blue-400 text-white rounded-2xl shadow-2xl  flex flex-col w-full  md:w-1/3 items-center max-w-4xl transition duration-1000 ease-in">
          <h2 className='p-3 text-3xl font-bold text-white'>CalmQuest</h2>
         <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
         <h3 className='text-xl font-semibold text-white pt-2'>Create Account!</h3>
         <div className='flex space-x-2 m-4 items-center justify-center'>
         </div>
         {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
        <form onSubmit={handleFormSubmit}>
            <div className=' text-black flex flex-col items-center justify-center mt-2'>
            <input 
                className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-emerald
                -400 focus:outline-none focus:ring-0' 
                placeholder='Name'
                name='name'
                type='text'
                value={formState.name}
                onChange={handleChange}>
                </input>
            <input 
                type='email' 
                className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-emerald
                -400 focus:outline-none focus:ring-0' 
                placeholder='Email'
                name='email'
                value={formState.email}
                onChange={handleChange}>
                </input>
            <input 
                type="password" 
                className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-emerald
                -400 focus:outline-none focus:ring-0' 
                placeholder='*******'
                name='password'
                value={formState.password}
                onChange={handleChange}>
                </input>
            <button 
                className='rounded-2xl m-4 text-blue-400 bg-white w-3/5 px-4 py-2 shadow-md hover:text-white hover:bg-blue-400 transition duration-200 ease-in'
                style={{cursor: 'pointer'}}
                type='submit'>
                Sign Up
            </button>
            </div>
            <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
            <p className='text-white mt-4 text-sm'>Already have an account?</p>
            <p 
                className='text-white mb-4 text-sm font-medium cursor-pointer' 
                onClick={() => setIsLogin(true)}>Sign In to your Account?</p>
        </form>
        )}
         {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
        )}
    </div>
 )
}

export default Signup;
