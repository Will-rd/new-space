import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query ViewUser($username: String!) {
  viewUser(username: $username) {
    _id
    email
    username
    posts {
      postText
      _id
      createdAt
    }
  }
}
`;

export const QUERY_POSTS = gql`
query ViewPosts {
  viewPosts {
    _id
    postText
    postAuthor
    createdAt
  }
}
`;

export const QUERY_SINGLE_POST = gql`
query Query($postId: ID!) {
  viewPost(postId: $postId) {
    _id
    postText
    postAuthor
    createdAt
    comments {
      _id
      commentText
      commentAuthor
      createdAt
    }
  }
}
`;

export const QUERY_ME = gql`
 query me {
  me {
    _id
    username
    email
    posts {
      _id
      postText
      postAuthor
      createdAt
    }
  }
 }
`;