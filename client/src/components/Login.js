import React, { useState } from "react";
//import { link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = (mid) => {
  
  // state to manage the form input
  const [formState, setFormState] = useState({ email: "", password: "" });
  
  // handle login mutation
  const [login] = useMutation(LOGIN_USER);

  // handles input chanes and updates form
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      
      // perform login mutation with formstate values
      const { data } = await login({
        variables: { ...formState },
      });
      
      // logs in user by receiving toke from localstorage
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }

    // clear form input 
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-200 text-center">
      <h1 className="text-6xl font-bold text-emerald-400 w-full md:w-1/2">CalmQuest</h1>
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-11/12 md:w-2/5 lg:w-2/5 xl:w-2/5 2xl:w-2/5 h-full md:h-3/5 items-center mx-auto md:mx-0 md:ml-auto transition duration-1000 ease-out">
        <h2 className="p-3 text-3xl font-bold text-emerald-400">CalmQuest</h2>
        <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
        <h3 className="text-xl font-semibold text-blue-400 pt-2">
          Welcome back!
        </h3>
        <div className="flex space-x-2 m-4 items-center justify-center"></div>
        {/* Inputs */}

        <form action={handleFormSubmit}>
          <div className="flex flex-col items-center justify-center">
            <input
              type="email"
              value={formState.email}
              onChange={handleChange}
              className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-emerald
               -400 focus:outline-none focus:ring-0"
              placeholder="Email"
            ></input>
            <input
              type="password"
              value={formState.password}
              onChange={handleChange}
              className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-emerald
               -400 focus:outline-none focus:ring-0"
              placeholder="Password"
            ></input>
            <button className="rounded-2xl m-2  text-white bg-blue-400 w-2/5 px-2 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in">
              Sign In
            </button>
          </div>
          <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
          <p className="text-blue-400 mt-4 text-sm">Don't have an account?</p>
          {/*  <p className='text-blue-400 mb-4 text-sm font-medium cursor-pointer' onClick={() => setIsLogin(false)}>Create a New Account?</p> */}
        </form>
      </div>
    </div>
  );
};

export default Login;