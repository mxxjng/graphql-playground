export const typeDefs = `
    type Mutation {
        addPost(body: String! createdAt: String! authorId: Int!): Post!
    }
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
    getSinglePost(id: Int!): Post!
  }
`;