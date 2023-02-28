import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
import "./style/index.css"
import { BrowserRouter } from 'react-router-dom';


const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App client={client} />
    </ApolloProvider>,
  </BrowserRouter>
);