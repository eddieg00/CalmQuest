import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  //createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { setContext } from "@apollo/client/link/context";

import Login from "./components/Login";
import { Home } from "./components/Home";
import Signup from "./components/signup";


const client = new ApolloClient({
  uri: "/graphql",

  cache: new InMemoryCache(),

  headers: {
    authorization: localStorage.getItem("id_token")
    ? `Bearer ${localStorage.getItem("id_token")}`
    : null,
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}
export default App;
