import PropTypes from 'prop-types';
import './post.scss';
import ManipulatingButton from './ManipulatingButton';

const Post = ({
  posts,
  clickPost,
  sendId,
  currentUser,
  deletePostById
}) => {

  function onClick(post) {
    sendId({
      id: post.target.id,
      name: post.target.name
    });
  }
  function deletePost(e){
    deletePostById(e.target.id)
  }
  // component that contains the post and it's attributes
  return (
    <div>
      {posts.length > 0 && posts.map((post, index) =>
        <div className="post" key={index}>
          <div>
            <p onClick={clickPost} id={index}>{post.title}</p>
            <p onClick={clickPost} id={index}>/ Author: {post.author}</p>
            <p onClick={clickPost} id={index}> / Upvotes: {post.upvotes}</p>
          </div>
          <ManipulatingButton id={post.id} downvote={onClick} upvote={onClick}/>
          {post.author === currentUser &&
          <button id={post.id} onClick={deletePost}>✗</button>
          }
        </div>
      )}
    </div>
  );
};
Post.defaultProps = {
  posts: []
};
Post.propTypes = {
  posts: PropTypes.array,
  clickPost: PropTypes.func
};

export default Post;
