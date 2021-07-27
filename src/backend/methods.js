import { commentVoting, createNewComment, createNewPost, returnPosts } from './Posts';

export const getAllPosts = () => {
  return {
    body: returnPosts(),
    status: 200
  };
};

export const postNewComment = ({
  currentComment,
  idSearch,
  text
}) => {
  return createNewComment({
    currentComment,
    idSearch,
    text
  });
};
export const postNewPost = ({
  text,
  autor
}) => {
  return createNewPost({
    text,
    autor
  });
};
export const vote = ({
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
