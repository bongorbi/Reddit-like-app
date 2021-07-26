import PropTypes from 'prop-types';
import TextareaWithButton from './TextareaWithButton';
import request from '../utils/requester';
import './postWithComments.scss';
import { basicURL } from '../utils/commonconstants';
import { useState } from 'react';

const PostWithComments = ({
  posts,
  clickPost,
  id
}) => {

  const [currentPost, setCurrentPost] = useState(posts[id])

  const commentText = (e) => e.target.value;

  const DetailsForComment = ({
    comment,
    sendTxt,
    margin
  }) => {
    function sendTextAndIdFromTxtbox(e) {
      sendTxt({
        text: e,
        id: comment.id
      });
    }

    return (
      <div className="comment" style={{ marginLeft: margin }}>
        <div className='commentInfo'>
          <div>{comment.text}</div><div>Autor: {comment.autor} / Upvotes: {comment.upvotes}</div>
          <button>⬆</button>
          <button>⬇</button>
        </div>
        <TextareaWithButton id={id}
                            OnBlur={commentText}
                            sendText={sendTextAndIdFromTxtbox}/>
      </div>
    );
  };

  const sendComment = async (e) => {
    const res = await request(`${basicURL}new_comment`, 'POST', {
      currentComment: currentPost.id,
      idSearch: Number(e.id),
      text: e.text
    });
    setCurrentPost(res.body);
  };
  const marginSetter = (ident) => {
    return `${ident * 50}px`;
  };

  const ChildComments = ({
    comment,
    indent
  }) => {
    return (
      <>
        <DetailsForComment margin={marginSetter(indent)} comment={comment} sendTxt={sendComment}/>
        {comment.children?.map((child, index) => {
          return (
            <>
              <ChildComments key={`${child.id}-${index}`} comment={child} indent={indent + 1}/>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div className="wrapper">
      {currentPost &&
      <div className="allCommentsContainer">
        <p onClick={clickPost}>Title: {currentPost.title} / Autor: <span>{currentPost.autor}</span></p>
        <ChildComments key={`${currentPost.id}-0`} comment={currentPost} indent={0}/>
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
