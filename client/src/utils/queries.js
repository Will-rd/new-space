import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
uery Query($username: String!) {
    viewUser(username: $username) {
      _id
      email
      username
      posts {
        _id
        postText
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
      createdAt
      postAuthor
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
query ViewPost($postId: ID!) {
    viewPost(postId: $postId) {
      _id
      postText
      createdAt
      postAuthor
      comments {
        _id
        commentText
        createdAt
        commentAuthor
      }
    }
  }
`;

export const QUERY_ME = gql`
query Me {
    me {
      _id
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