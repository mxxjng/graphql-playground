import { gql } from "apollo-server";

export const typeDefs = gql`
    type Mutation {
        addPost(body: String!, createdAt: String!, authorId: Int!): Post!
    }
    type Comment {
        id: Int
        commentBody: String
        createdAt: String
        commentAuthor: Author
        postId: Int
    }
    type Post {
        postId: ID!
        body: String!
        createdAt: String!
        author: Author!
        comments: [Comment]
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
