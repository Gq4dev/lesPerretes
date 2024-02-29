// lib/apolloClient.ts

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create an HTTP link
const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql', // Your GraphQL endpoint
});

// Middleware to set the Authorization header
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  // Return the headers to the context so httpLink can read them

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyNjQ0YmRkLTY0OTQtNDM1Ni05NmM4LTlmZTI2MjY4MDhkMyIsImlhdCI6MTcwOTIyOTcyNiwiZXhwIjoxNzA5MjQ0MTI2fQ.wBz5W1OEgLzPRrmBZF5NvSNbC0wRv8qAZPP6Z77svGo"

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Set the token in the Authorization header
    },
  };
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Concatenate the authLink with the httpLink
  cache: new InMemoryCache(),
});

export default client;
