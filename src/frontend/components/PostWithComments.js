import PropTypes from 'prop-types';
const PostWithComments = ({
  posts,
  clickPost,
  openComments
}) => {
  return (
    <div>
      {posts.length > 0 && posts.map((post, index) =>
        <div key={index} >
          <h1 onClick={clickPost}>{post.title}</h1>
          <div>{openComments && post.children.map((comment, index) => (
            <div key={index}>{comment}</div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};
PostWithComments.defaultProps = {
  posts: [],
  openComments: false
};
PostWithComments.propTypes = {
  posts: PropTypes.array,
  clickPost: PropTypes.func,
  openComments: PropTypes.bool
};

export default PostWithComments;
