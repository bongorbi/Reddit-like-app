const posts = new Map();

posts.set('post1', [
  {
    title: 'Hello1',
    comments: ['i\'m a comment', 'i\'m a comment2', 'i\'m a comment2', 'i\'m a comment2']
  }]
);
posts.set('post2', [
  {
    title: 'Hello2',
    comments: ['i\'m a comment 2']
  }]);
const returnPosts = () => {
  let a = [];
  posts.forEach((value, key) => {
    a.push({
      title: key,
      comments: value
    });
  });
  console.log(a);
  return a;
};

export default returnPosts;
