const { ApolloServer, PubSub } = require("apollo-server");
import { resolvers } from "./resolvers/resolvers";
import { typeDefs } from "./types/types";

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }: any) => ({ req, res, pubsub }),
});

server.listen().then(({ url }: any) => console.log(`server started at ${url}`));
