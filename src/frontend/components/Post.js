import PropTypes from 'prop-types';
import './post.scss';
import VotingBtns from './VotingBtns';

const Post = ({
  posts,
  clickPost,
  sendId
}) => {

  function onClick(post) {
    console.log(post.target.id);
    sendId({
      id: post.target.id,
      name: post.target.name
    });
  }

  // component that contains the post and it's attributes
  return (
    <div>
      {posts.length > 0 && posts.map((post, index) =>
        <div className="post" key={index}>
          <div>
            <p onClick={clickPost} id={index}>{post.title}</p>
            <p onClick={clickPost} id={index}>/ Autor: {post.autor}</p>
            <p onClick={clickPost} id={index}> / Upvotes: {post.upvotes}</p>
          </div>
          <VotingBtns id={post.id} downvote={onClick} upvote={onClick}/>
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
