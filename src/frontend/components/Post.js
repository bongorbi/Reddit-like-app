import { useEffect, useState } from 'react';

const Post = ({ posts }) => {
  // const [givenPosts, setGivenPosts] = useState([]);
  //
  // useEffect(() => {
  //   posts.forEach((post) => {
  //     setGivenPosts(givenPosts.push(post));
  //   });
  // }, []);

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <h1>{post.title}</h1>
          <div>{post.comments.map((comment, index) => (
            <div key={index}>{comment}</div>
          ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
