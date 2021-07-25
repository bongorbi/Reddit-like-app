const posts = [
  {
    title: 'Hello',
    text: 'asd',
    upvotes: 0,
    autor: 'Vasil',
    children: [
      {
        text: 'i\'m a comment1',
        upvotes: 0,
        autor: 'Pesho',
        children: [
          {
            text: 'i\'m a innner comment2',
            upvotes: 0,
            autor: 'Todor',
            children: [
              {
                text: 'i\'m a innner comment3',
                upvotes: 0,
                autor: 'Mitko',
                children: []
              }
            ]
          }
        ]
      }, {
        text: 'i\'m a comment2',
        upvotes: 0,
        autor: 'Bobi'
      }, {
        text: 'i\'m a comment231',
        upvotes: 0,
        autor: 'Joro'
      }, {
        text: 'i\'m a comment3',
        upvotes: 0,
        autor: 'Denis'
      }]
  },
  {
    title: 'Post2',
    upvotes: 2,
    autor: 'Joro',
    children: [
      {
        text: 'i\'m a comment1',
        upvotes: 0,
        autor: 'Vasil'
      }, {
        text: 'i\'m a comment2',
        upvotes: 0,
        autor: 'Vasil'
      }, {
        text: 'i\'m a comment231',
        upvotes: 0,
        autor: 'Joro'
      }, {
        text: 'i\'m a comment3',
        upvotes: 0,
        autor: 'Denis'
      }]
  }];

export const returnPosts = () => {
  return posts;
};
export const sendComment = (comment, id) => {
};

export const createNewPost = ({
  text,
  autor
}) => {
  posts.push({
    autor: autor,
    title: text,
    upvotes: 0,
    children: []
  });
  return {
    autor: autor,
    title: text,
    upvotes: 0,
    children: []
  };
};


