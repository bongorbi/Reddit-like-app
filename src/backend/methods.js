import { returnPosts,createNewPost } from './Posts';

export const getAllPosts = async () => {
  return {
    body: returnPosts(),
    status: 200
  };
};
export const sendComment = async () => {
  return {
    body: returnPosts(),
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
