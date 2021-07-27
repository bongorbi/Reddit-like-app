import { postVoting, createNewComment, createNewPost, returnPosts, commentVoting, deletingPost } from './Posts';

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
  author
}) => {
  return createNewComment({
    currentComment,
    idSearch,
    text,
    author
  });
};
export const postNewPost = ({
  text,
  author,
  title
}) => {
  return createNewPost({
    text,
    author,
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
export const deletePost = ({
  idSearch
}) => {
  return deletingPost({
    idSearch
  });
};
