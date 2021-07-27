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
  autor
}) => {
  return createNewPost({
    text,
    autor
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
