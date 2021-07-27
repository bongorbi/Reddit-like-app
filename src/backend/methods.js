import { postVoting, createNewComment, createNewPost, returnPosts, commentVoting } from './Posts';

export const getAllPosts = () => {
  return {
    body: returnPosts(),
    status: 200
  };
};

export const postNewComment = ({
  currentComment,
  idSearch,
  text,
  autor
}) => {
  return createNewComment({
    currentComment,
    idSearch,
    text,
    autor
  });
};
export const postNewPost = ({
  text,
  autor,
  title
}) => {
  return createNewPost({
    text,
    autor,
    title
  });
};
export const vote = ({
  currentPost,
  vote
}) => {
  return postVoting({
    currentPost,
    vote
  });
};
export const commentVote = ({
  currentComment,
  idSearch,
  vote
}) => {
  return commentVoting({
    currentComment,
    idSearch,
    vote
  });
};
