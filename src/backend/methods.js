import { returnPosts, createNewPost, createNewComment, commentVoting } from './Posts';

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
  return {
    body: createNewComment({
      currentComment,
      idSearch,
      text
    }),
    status: 200
  };
};
export const postNewPost = ({
  text,
  autor
}) => {
  return {
    body: createNewPost({
      text,
      autor
    }),
    status: 200
  };

};
export const vote = ({
  currentComment,
  idSearch,
  vote
}) => {
  return {
    response: commentVoting({
      currentComment,
      idSearch,
      vote
    })
  };
};
