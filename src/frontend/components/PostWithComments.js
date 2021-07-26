import PropTypes from 'prop-types';
import TextareaWithButton from './TextareaWithButton';
import request from '../utils/requester';
import './postWithComments.scss';

const PostWithComments = ({
  posts,
  clickPost,
  id
}) => {
  const currentPost = posts[id];

  const commentText = (e) => e.target.value;

  const DetailsForComment = ({
    comment,
    sendTxt
  }) => {
    function sendTextFromTxtbox(e) {
      sendTxt(e);
    }

    return (
      <div><h2>{comment.text} - {comment.autor} {comment.upvotes}</h2>
        <TextareaWithButton id={id}
                            OnBlur={commentText}
                            sendText={sendTextFromTxtbox}/>
      </div>
    );
  };

  const ChildComments = ({
    comment,
    indent,
  }) => {
    const sendComment = async () => {
      const res = await request('http://localhost:3001/test', 'POST', {
        currentPost,
        id:0
      });
      console.log(res);
      // sendTxt(e)
    };
    return (
      <>
        <DetailsForComment key={id++} comment={comment} sendTxt={sendComment}/>
        {comment.children?.map(child => {
          return (
            <>
              {'==='.repeat(indent)}
              <ChildComments comment={child} key={id++} indent={indent + 1}/>
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
