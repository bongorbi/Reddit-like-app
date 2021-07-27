import { postVoting, createNewComment, createNewPost, returnPosts } from './Posts';

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
