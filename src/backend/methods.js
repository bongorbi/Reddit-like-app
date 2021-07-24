import returnPosts from './Posts';

const getAllPosts = async () => {
  return {body: returnPosts(), status: 200};
};

export default getAllPosts
