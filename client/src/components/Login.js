import React, { useState } from "react";
//import { link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    //console.log(formState)
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      //console.log(formState)
      Auth.login(data.login.token);
      //console.log(data)
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex md:justify-end justify-center items-center h-screen bg-white">
      <div className="hidden md:block w-1/2 text-center">
        <h2 className="p-3 text-3xl md:text-8xl font-bold text-emerald-400">CalmQuest</h2>
      </div>
      <div className="bg-white md:rounded-2xl md:shadow-2xl shadow-none flex flex-col w-full md:w-1/3 md:mr-40 items-center max-w-4xl transition duration-1000 ease-out">
        <h2 className="p-3 text-3xl md:text-4.5xl font-bold text-emerald-400">CalmQuest</h2>
        <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
        <h3 className="text-xl md:text-2xl font-semibold text-blue-400 pt-2">Welcome back!</h3>
        <div className="flex space-x-2 m-4 items-center justify-center"></div>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col items-center justify-center">
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-emerald
               -400 focus:outline-none focus:ring-0 text-base md:text-lg"
              placeholder="Email"
            ></input>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-emerald
               -400 focus:outline-none focus:ring-0 text-base md:text-lg"
              placeholder="Password"
            ></input>
            <button className="rounded-2xl m-2 text-white bg-blue-400 w-2/5 px-2 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in text-base md:text-lg">
              Sign In
            </button>
          </div>
          <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
          <p className="text-blue-400 mb-4 text-sm md:text-base font-medium cursor-pointer">
            <a href="/signup">Create a New Account?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
