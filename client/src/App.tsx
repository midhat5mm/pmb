import './App.css';
import 'antd/dist/antd.css';
import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import UserData from './components/UserData';
import Parents from './components/Parents';

import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const client = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
        <BrowserRouter>
    <Routes>
      <Route path="/" element={<Parents />} />
      <Route path="/:id" element={<UserData />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
  );
}

export default App;
