const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
     _id: ID
     email: String
     username: String
     password: String
     posts: [Post]!
  }

  type Post {
    _id: ID
    postText: String
    postAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
    
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Query {
    viewUsers: [User]
    viewUser(username: String!): User
    viewPosts(username: String): [Post]
    viewPost(postId: ID!): Post
    me: User
  }


  type Mutation {
    addUser(email: String!, username: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(postText: String!): Post
    addComment(postId: ID!, commentText: String!): Post
    removeUser(userId: ID!): User
    removePost(postId: ID!): Post
    removeComment(postId: ID!): Post
    updateUser(userId: ID!, email: String, username: String, password: String): User
    updatePost(postId: ID!, postText: String): Post
    updateComment(commentId: ID!, commentText: String): Comment
  }
`;

module.exports = typeDefs;