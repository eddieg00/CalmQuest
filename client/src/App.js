import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {Home} from './components/Home'

import Signup from './pages/Signup';
import Login from './pages/Login';

const httpLink = createHttpLink({
    uri: '/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div>
                    <Routes>
                    <Route 
                            path="/" 
                            element={<Login />}
                        />
                        <Route 
                            path="/signup" 
                            element={<Signup />}
                        />
                        <Route 
                            path="/home" 
                            element={<Home />}
                        />
                  
                    </Routes>
                </div>
        </Router>
    </ApolloProvider>
    )
}
export default App;
