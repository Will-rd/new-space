import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const ADD_USER = gql`
mutation AddUser($email: String!, $username: String!, $password: String!) {
  addUser(email: $email, username: $username, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const ADD_POST = gql`
mutation AddPost($postText: String!) {
  addPost(postText: $postText) {
    _id
    postText
    postAuthor
    createdAt
    comments {
      _id
      commentText
    }
  }
}
`;

export const ADD_COMMENT = gql`
mutation AddComment($postId: ID!, $commentText: String!) {
  addComment(postId: $postId, commentText: $commentText) {
    _id
    postText
    postAuthor
    createdAt
    comments {
      _id
      commentText
      createdAt
    }
  }
}
`;

export const REMOVE_USER = gql`
mutation RemoveUser($userId: ID!) {
    removeUser(userId: $userId) {
      _id
      email
      username
      password
      posts {
        _id
        comments {
          _id
        }
      }
    }
  }
`;

export const REMOVE_POST = gql`
mutation RemovePost($postId: ID!) {
    removePost(postId: $postId) {
      _id
      comments {
        _id
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
mutation RemoveComment($postId: ID!) {
    removeComment(postId: $postId) {
      comments {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
mutation UpdateUser($userId: ID!, $email: String, $username: String, $password: String) {
    updateUser(userId: $userId, email: $email, username: $username, password: $password) {
      password
      username
      email
    }
  }
`;

export const UPDATE_POST = gql`
mutation UpdatePost($postId: ID!, $postText: String) {
    updatePost(postId: $postId, postText: $postText) {
      postText
    }
  }
`;

export const UPDATE_COMMENT = gql`
mutation UpdateComment($commentId: ID!, $commentText: String) {
    updateComment(commentId: $commentId, commentText: $commentText) {
      commentText
    }
  }
`;