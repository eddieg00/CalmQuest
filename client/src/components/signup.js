import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [addUser] = useMutation(ADD_USER);

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
        //
        // use addUser mutation to register user
      const { data } = await addUser({
        variables: { ...formState },
      });

      // Log in user by storing the JWT token?
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen md:py-2">
      <main className="flex items-center w-full px-2 md:px-20">
        <div className="hidden md:inline-flex flex-col flex-1 space-y-1">
          <p className="text-6xl text-blue-500 font-bold">CalmQuest</p>
          <p className="font-medium text-lg leading-1 text-emerald-400">
            CalmQuest your life today!
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="text-3xl font-bold">Create Account!</h2>
          <form onSubmit={handleFormSubmit}>
            <input
              type="name"
              value={formState.name}
              onChange={handleChange}
              className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-emerald -400 focus:outline-none focus:ring-0"
              placeholder="Name"
            />
            <input
              type="email"
              value={formState.email}
              onChange={handleChange}
              className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-emerald -400 focus:outline-none focus:ring-0"
              placeholder="Email"
            />
            <input
              type="password"
              value={formState.password}
              onChange={handleChange}
              className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-emerald -400 focus:outline-none focus:ring-0"
              placeholder="Password"
            />
            <button className="rounded-2xl m-4 text-blue-400 bg-white w-3/5 px-4 py-2 shadow-md hover:text-white hover:bg-blue-400 transition duration-200 ease-in">
              Sign Up
            </button>
          </form>
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 font-medium">
              Sign In to your Account?
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Signup;
