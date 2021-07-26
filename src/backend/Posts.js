const posts = [
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
        autor: 'Bobi'
      }, {
        id: 3,
        text: 'i\'m a comment231',
        upvotes: 0,
        autor: 'Joro'
      }, {
        id: 5,
        text: 'i\'m a comment3',
        upvotes: 0,
        autor: 'Denis'
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
        autor: 'Vasil'
      }, {
        id: 9,
        text: 'i\'m a comment2',
        upvotes: 0,
        autor: 'Vasil'
      }, {
        id: 10,
        text: 'i\'m a comment231',
        upvotes: 0,
        autor: 'Joro'
      }, {
        id: 11,
        text: 'i\'m a comment3',
        upvotes: 0,
        autor: 'Denis'
      }]
  }];
let id = 12;

export const returnPosts = () => {
  return posts;
};
const idSetter = () => {
  return id += 1;
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
  return {
    id,
    autor: autor,
    title: text,
    upvotes: 0,
    children: []
  };
};

const findComment = async ({
  currentComment,
  idSearch
}) => {
  console.log(currentComment, idSearch);
  if (currentComment.id === idSearch) {
    console.log(currentComment, 'first if');
    return currentComment;
  } else {
    currentComment.children.forEach(child => {
      const result = findComment({
        child,
        idSearch
      });
      console.log(result, 'else');
      if (!!result) {
        console.log(child, 'else -> if');
        return child;
      }
    });
    // const results = currentComment.children.map(child => findComment(child, idSearch));
    // return results.filter(res => !!res);
  }
};
export const createNewComment = async ({
  currentComment,
  idSearch
}) => {
  const newComment = await findComment({
    currentComment,
    idSearch
  });
  posts.push({
    id: idSetter(),
    autor: newComment.autor,
    title: newComment.text,
    upvotes: 0,
    children: []
  });
  return {
    id,
    autor: newComment.autor,
    title: newComment.text,
    upvotes: 0,
    children: []
  };
};


