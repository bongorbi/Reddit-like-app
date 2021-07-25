import PropTypes from 'prop-types';
import TextareaWithButton from './TextareaWithButton';
import request from '../utils/requester';
import './postWithComments.scss';

const PostWithComments = ({
  posts,
  clickPost,
  openComments,
  id
}) => {
  const currentPost = posts[id];
  const commentText = (e) => e.target.value;
  const sendText = () => {
    // request('http://localhost:3001/', 'POST',)
  };

  const DetailsForComment = ({ comment }) => {
    return (
      <div><h2>{comment.text}- {comment.autor} {comment.upvotes}</h2>
        <TextareaWithButton id={id}
                            OnBlur={commentText}
                            sendText={sendText}/>
      </div>
    );
  };

  const ChildComments = ({
    comment,
    indent
  }) => {
    return (
      <>
        <DetailsForComment comment={comment}/>
        {comment.children?.map(child => {
          return (
            <>
              {"===".repeat(indent)}
              <ChildComments comment={child} indent={indent + 1}/>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div className="wrapper">
      {currentPost &&
      <div>
        <h1 onClick={clickPost}>Title: {currentPost.title}</h1>
        {ChildComments({
          comment: currentPost,
          indent: 0
        })}
      </div>}
    </div>
  );
};
PostWithComments.defaultProps = {
  posts: [],
  openComments: false,
  id: undefined
};
PostWithComments.propTypes = {
  posts: PropTypes.array,
  clickPost: PropTypes.func,
  openComments: PropTypes.bool,
  id: PropTypes.string
};

export default PostWithComments;
