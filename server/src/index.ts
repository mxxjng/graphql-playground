import { GraphQLServer } from "graphql-yoga";
import { resolvers } from "./resolvers/resolvers";
import { typeDefs } from "./types/types";

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
