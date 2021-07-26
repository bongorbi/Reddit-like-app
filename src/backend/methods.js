import { returnPosts, createNewPost, createNewComment } from './Posts';

export const getAllPosts = async () => {
  return {
    body: returnPosts(),
    status: 200
  };
};

export const postNewComment = async ({
  currentComment,
  idSearch
}) => {
  return {
    body: createNewComment({
      currentComment,
      idSearch
    }),
    status: 200
  };
};
export const postNewPost = async ({
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
