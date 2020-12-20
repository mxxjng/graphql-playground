const { GraphQLServer } = require("graphql-yoga");
const db = require("./config/db.js");
const util = require("util");

const query = util.promisify(db.query).bind(db);

const typeDefs = `
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    author: Author!
  }
  type Author {
    id: ID!
    name: String!
    age: Int!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
    Post: {
        author: async ({ id }) => {
            try {
                let sql = "SELECT * FROM author WHERE author.id = ?";
                const sqlQuery = await query(sql, [id]);
                return sqlQuery[0];
            } catch (error) {
                console.log(error);
            }
        },
    },
    Query: {
        getPosts: async () => {
            try {
                let sql = "SELECT * FROM post";
                const sqlQuery = await query(sql);
                return sqlQuery;
            } catch (error) {
                console.log(error);
            }
        },
    },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
