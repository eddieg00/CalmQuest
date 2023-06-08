import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

const LoginForm = () => {

  const [isLogin,setIsLogin] = useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState();


  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('api/login', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if(response.ok) {
      setIsLogin(true);
    }
  }

    if(isLogin) {
      return <Redirect to="/home" />
    }


  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }


  const handleSubmit = async (values) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
      } else {
        const data = await response.json();
        localStorage.setItem('token', data.token)
        history.pushState('/home');
      }
    }
    catch (error) {
      console.error(error);
    }
  }




  
  const LoginForm = () => {
    return(
       <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-out">
             <h2 className='p-3 text-3xl font-bold text-emerald-400'>CalmQuest</h2>
             <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
             <h3 className='text-xl font-semibold text-blue-400 pt-2'>Welcome back!</h3>
             <div className='flex space-x-2 m-4 items-center justify-center'>
             </div>
             {/* Inputs */}

              <form onSubmit={handleLogin}>
               <div className='flex flex-col items-center justify-center'>
                <input onChange={handleEmailChange} type='email' className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-emerald
                -400 focus:outline-none focus:ring-0' placeholder='Email'></input>
                <input onChange={handlePasswordChange} type="password" className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-emerald
                -400 focus:outline-none focus:ring-0' placeholder='Password'></input>
                <button className='rounded-2xl m-2  text-white bg-blue-400 w-2/5 px-2 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'>
                  Sign In
                </button>
               </div>
               <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
               <p className='text-blue-400 mt-4 text-sm'>Don't have an account?</p>
               <p className='text-blue-400 mb-4 text-sm font-medium cursor-pointer' onClick={() => setIsLogin(false)}>Create a New Account?</p>
              </form>
          </div>
    )
  }
  
  const  SignUpForm = () => {
     return(
        <div className="bg-blue-400 text-white rounded-2xl shadow-2xl  flex flex-col w-full  md:w-1/3 items-center max-w-4xl transition duration-1000 ease-in">
              <h2 className='p-3 text-3xl font-bold text-white'>CalmQuest</h2>
             <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
             <h3 className='text-xl font-semibold text-white pt-2'>Create Account!</h3>
             <div className='flex space-x-2 m-4 items-center justify-center'>
             </div>
             {/* Inputs */}
             <div className='flex flex-col items-center justify-center mt-2'>
             <input className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-emerald
             -400 focus:outline-none focus:ring-0' placeholder='Name'></input>
               <input type='email' className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-emerald
              -400 focus:outline-none focus:ring-0' placeholder='Email'></input>
              <input type="password" className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-emerald
              -400 focus:outline-none focus:ring-0' placeholder='Password'></input>
              <button className='rounded-2xl m-4 text-blue-400 bg-white w-3/5 px-4 py-2 shadow-md hover:text-white hover:bg-blue-400 transition duration-200 ease-in'>
                Sign Up
              </button>
             </div>
             <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
             <p className='text-white mt-4 text-sm'>Already have an account?</p>
             <p className='text-white mb-4 text-sm font-medium cursor-pointer' onClick={() => setIsLogin(true)}>Sign In to your Account?</p>
          </div>
     )
  }

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen md:py-2">
    <main className="flex items-center w-full px-2 md:px-20">
      <div className="hidden md:inline-flex flex-col flex-1 space-y-1">
        <p className='text-6xl text-blue-500 font-bold'>CalmQuest</p>
        <p className='font-medium text-lg leading-1 text-emerald-400'>CalmQuest your life today!</p>
      </div>
      {
        isLogin? (
         <LoginForm/>
        ):(
         <SignUpForm/>
        )
      }
    </main>
    </div>
  )
}

export default LoginForm