import PropTypes from 'prop-types';
import './post.scss';

const Post = ({
  posts,
  clickPost,
  upvote,
  downvote
}) => {

  return (
    <div>
      {posts.length > 0 && posts.map((post, index) =>
        <div className="post" key={index}>
          <div>
            <p onClick={clickPost} id={index}>{post.title}</p>
            <p onClick={clickPost} id={index}>/ Autor: {post.autor}</p>
            <p onClick={clickPost} id={index}> / Upvotes: {post.upvotes}</p>
          </div>
          <button onClick={upvote}>Upvote</button>
          <button onClick={downvote}>Downvote</button>
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
