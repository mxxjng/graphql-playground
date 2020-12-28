import { gql } from "apollo-server";

export const typeDefs = gql`
    type Mutation {
        addPost(body: String!, createdAt: String!, authorId: Int!): Post!
    }
    type Comment {
        id: ID!
        commentBody: String!
        createdAt: String!
        commentAuthor: Author!
        post: Int!
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
        getSinglePost(id: ID!): Post!
    }
    type Subscription {
        postCreated: [Post]
    }
`;
