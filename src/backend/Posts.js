/*const posts = [
  {
    id: 0,
    title: 'Hello',
    text: 'asd',
    upvotes: 0,
    autor: 'Vasil',
    children: [
      {
        //add ids
        id: 1,
        text: 'i\'m a comment1',
        upvotes: 0,
        autor: 'Pesho',
        children: [
          {
            id: 4,
            text: 'i\'m a innner comment2',
            upvotes: 0,
            autor: 'Todor',
            children: [
              {
                id: 6,
                text: 'i\'m a innner comment3',
                upvotes: 0,
                autor: 'Mitko',
                children: []
              }
            ]
          }
        ]
      }, {
        id: 2,
        text: 'i\'m a comment2',
        upvotes: 0,
        autor: 'Bobi',
        children: [],
      }, {
        id: 3,
        text: 'i\'m a comment231',
        upvotes: 0,
        autor: 'Joro',
        children: [],
      }, {
        id: 5,
        text: 'i\'m a comment3',
        upvotes: 0,
        autor: 'Denis',
        children: [],
      }]
  },
  {
    id: 7,
    title: 'Post2',
    upvotes: 2,
    autor: 'Joro',
    children: [
      {
        id: 8,
        text: 'i\'m a comment1',
        upvotes: 0,
        autor: 'Vasil',
        children: [],
      }, {
        id: 9,
        text: 'i\'m a comment2',
        upvotes: 0,
        autor: 'Vasil',
        children: [],
      }, {
        id: 10,
        text: 'i\'m a comment231',
        upvotes: 0,
        autor: 'Joro',
        children: [],
      }, {
        id: 11,
        text: 'i\'m a comment3',
        upvotes: 0,
        autor: 'Denis',
        children: [],
      }]
  }];*/
const posts = [
  {
    id: 0,
    title: 'TITLE FOR POST',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
      ' Nullam auctor nibh sapien, a dapibus quam hendrerit nec. ' +
      'Nunc metus lacus, finibus vel mi id, porttitor consequat diam.',
    upvotes: 0,
    autor: 'Vasil',
    children: [
      {
        id: 1,
        text: 'Curabitur tristique metus vitae ipsum molestie, et gravida enim gravida.' +
          ' Maecenas sit amet placerat orci, eu porttitor mauris.' +
          ' Praesent fringilla metus sit amet lorem finibus mollis.' +
          ' Morbi venenatis diam quis turpis pulvinar, nec vestibulum lorem egestas. ' +
          'Morbi ac posuere dui. ',
        upvotes: 0,
        autor: 'Pesho',
        children: []
      }
    ]
  },
  {
    id: 2,
    title: 'THIS IS TITLE 2',
    text: 'Vestibulum pharetra ante eget elit vulputate pretium.' +
      ' Phasellus at justo eget ipsum blandit rutrum. Fusce nec iaculis felis.' +
      ' Etiam ligula metus, auctor sed dapibus ac, ullamcorper eu risus.' +
      ' Vivamus nec eros felis. Donec massa odio, efficitur nec orci ac, commodo laoreet dui. ' +
      'Nullam sit amet lobortis turpis, eget hendrerit odio.' +
      ' Etiam lacinia justo elementum tortor efficitur, euismod ultricies lectus facilisis.',
    upvotes: 0,
    autor: 'Vasil',
    children: [
      {
        id: 3,
        text: 'i\'m a comment1',
        upvotes: 0,
        autor: 'Pesho',
        children: []
      }
    ]
  }
];

// latest ID of a comment (represents a db count)
let id = 3;

export const returnPosts = () => {
  return posts;
};
const idSetter = () => {
  return ++id;
};
export const createNewPost = ({
  title,
  text,
  autor
}) => {
  posts.push({
    id: idSetter(),
    autor,
    title,
    text,
    upvotes: 0,
    children: []
  });
  return posts;
};

const findComment = ({
  currentComment,
  idSearch
}) => {
  if (currentComment.id === idSearch) {
    return currentComment;
  } else {
    let comment;
    currentComment.children.forEach(child => {
      const result = findComment({
        currentComment: child,
        idSearch
      });
      if (!!result) {
        comment = result;
      }
    });
    console.log(comment);
    return comment;
  }
};
export const createNewComment = ({
  currentComment,
  idSearch,
  text,
  autor
}) => {
  const currentPost = posts.filter(post => post.id === currentComment);
  const comment = findComment({
    currentComment: currentPost[0],
    idSearch
  });
  const newComment = {
    id: idSetter(),
    text,
    upvotes: 0,
    autor: autor,
    children: []
  };
  comment.children.push(newComment);
  return currentPost[0];
};

export const postVoting = ({
  currentPost,
  vote
}) => {
  const comment = posts.find(post => post.id === currentPost);
  switch (true) {
    case vote === 'downvote':
      comment.upvotes--;
      break;
    case vote === 'upvote':
      comment.upvotes++;
      break;
  }

  return posts;
};
export const commentVoting = ({
  currentComment,
  idSearch,
  vote
}) => {
  const currentPost = posts.filter(post => post.id === currentComment);
  const comment = findComment({
    currentComment: currentPost[0],
    idSearch
  });
  switch (true) {
    case vote === 'downvote':
      comment.upvotes--;
      break;
    case vote === 'upvote':
      comment.upvotes++;
      break;
  }
  return currentPost[0];
};


