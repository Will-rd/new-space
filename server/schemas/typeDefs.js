const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
     _id: ID
     email: String!
     username: String!
     password: String!
     posts: [Post]
     comments: [Comment]
  }

  type Post {
    _id: ID
    postText: String
    postAuthor: [User]!
    createdAt: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
    postedOn: [Post]!
    commentAuthor: [User]!
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    posts: [Post]!
    post(postId: ID!): Post
    comments: [Comment]!
    comment(commentId: ID!): Comment
  }


  type Mutation {
    addUser(email: String!, username: String!, password: String!): User
    addPost(postAuthor: ID!, postText: String!): Post
    addComment(postedOn: ID!, commentAuthor: ID!, commentText: String!): Comment
    removeUser(userId: ID!): User
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
    updateUser(userId: ID!, email: String, username: String, password: String): User
    updatePost(postId: ID!, postText: String): Post
    updateComment(commentId: ID!, commentText: String): Comment
  }
`;

module.exports = typeDefs;