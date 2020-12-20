import fetch from "cross-fetch"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

export const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
})
