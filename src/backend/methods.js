import { returnPosts, createNewPost, createNewComment } from './Posts';

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
