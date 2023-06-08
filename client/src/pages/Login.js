import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
//import Signup from './pages/Signup';

import Auth from '../utils/auth';


const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);
    const [isLogin,setIsLogin] = useState(false);

  
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
        const { data } = await login({
          variables: { ...formState },
        });
  
        Auth.login(data.login.token);
      } catch (e) {
        console.error(e);
      }
  
      // clear form values
      setFormState({
        email: '',
        password: '',
      });
    };
    return(
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-out">
              <h2 className='p-3 text-3xl font-bold text-emerald-400'>CalmQuest</h2>
              <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
              <h3 className='text-xl font-semibold text-blue-400 pt-2'>Welcome back!</h3>
              <div className='flex space-x-2 m-4 items-center justify-center'>
              </div>
              {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
               <form onSubmit={handleFormSubmit}>
                <div className='flex flex-col items-center justify-center'>
                 <input 
                    onChange={handleChange}
                    type='email' 
                    className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-emerald
                    -400 focus:outline-none focus:ring-0' 
                    placeholder='Email'
                    name='email'
                    value={formState.email}>
                    </input>
                 <input 
                    onChange={handleChange} 
                    type="password" 
                    className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-emerald
                     -400 focus:outline-none focus:ring-0' 
                    placeholder='******'
                    name='password' 
                    value={formState.password}>
                     </input>
                 <button 
                    className='rounded-2xl m-2  text-white bg-blue-400 w-2/5 px-2 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'
                    style={{cursor: 'pointer'}}
                    type='submit'>
                   Sign In
                 </button>
                </div>
                <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
                <p className='text-blue-400 mt-4 text-sm'>Don't have an account?</p>
                <p className='text-blue-400 mb-4 text-sm font-medium cursor-pointer' onClick={() => setIsLogin(false)}>Create a New Account?</p>
               </form>
                )}

                  {error && (
                    <div className="my-3 p-3 bg-danger text-white">
                      {error.message}
                    </div>
                  )}
                 <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen md:py-2">
                <main className="flex items-center w-full px-2 md:px-20">
                <div className="hidden md:inline-flex flex-col flex-1 space-y-1">
                    <p className='text-6xl text-blue-500 font-bold'>CalmQuest</p>
                    <p className='font-medium text-lg leading-1 text-emerald-400'>CalmQuest your life today!</p>
                </div>
                {/* {
                    isLogin? (
                    <Login/>
                    ):(
                    <Signup/>
                    )
                } */}
                </main>
            </div>
         </div>    
    ) 
}

export default Login;
