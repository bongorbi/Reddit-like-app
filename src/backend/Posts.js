const posts = [
  {
    title: 'Hello',
    upvotes: 0,
    autor: 'Vasil',
    children: ['i\'m a comment', 'i\'m a comment2', 'i\'m a comment2', 'i\'m a comment2']
  },
  {
    title: 'Post2',
    upvotes: 2,
    autor: 'Joro',
    children: ['i\'m a comment', 'i\'m a comment2']
  },
  {
    title: 'Hello',
    upvotes: 0,
    autor: 'Dimitar',
    children: ['i\'m a comment 3']
  },
  {
    title: 'Hello',
    upvotes: 0,
    autor: 'Dimitar',
    children: ['i\'m a comment 4']
  }];

const returnPosts = () => {
  return posts;
};

export default returnPosts;
