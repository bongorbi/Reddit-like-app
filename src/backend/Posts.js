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
    title: 'Hello',
    text: 'asd',
    upvotes: 0,
    autor: 'Vasil',
    children: [
      {
        id: 1,
        text: 'i\'m a comment1',
        upvotes: 0,
        autor: 'Pesho',
        children: []
      }
    ]
  }
];

// latest ID of a comment (represents a db count)
let id = 1;

export const returnPosts = () => {
  return posts;
};
const idSetter = () => {
  return ++id;
};
export const createNewPost = ({
  text,
  autor
}) => {
  posts.push({
    id: idSetter(),
    autor: autor,
    title: text,
    upvotes: 0,
    children: []
  });
  return posts
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
    return comment;
  }
};
export const createNewComment = ({
  currentComment,
  idSearch,
  text
}) => {
  const comment = findComment({
    currentComment: posts[currentComment],
    idSearch,
    text
  });
  const newComment = {
    id: idSetter(),
    autor: comment.autor,
    text,
    title: comment.text,
    upvotes: 0,
    children: []
  };
  comment.children.push(newComment);
  return posts[currentComment];
};

export const commentVoting = ({
  currentComment,
  idSearch,
  vote
}) => {
  const comment = findComment({
    currentComment: posts[currentComment],
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

  return posts;
};


