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
        <div className={'post'} key={index}>
          <p>{index}</p>
          <h1 id={index} onClick={clickPost}>{post.title}</h1>
          <h2> - {post.autor}</h2>
          <h2>Upvotes: {post.upvotes}</h2>
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
