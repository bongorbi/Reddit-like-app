import PropTypes from 'prop-types';
import TextareaWithButton from './TextareaWithButton';
import request from '../utils/requester';
import './postWithComments.scss';
import { basicURL } from '../utils/commonconstants';
import { useState } from 'react';
import VotingBtns from './VotingBtns';
import { updateVote } from '../utils/votingFunctions';

const PostWithComments = ({
  posts,
  currentUser,
  id
}) => {
  const [currentPost, setCurrentPost] = useState(posts[id]);
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

    // POST request for updating the vote
    async function vote(e) {
      try {
        const updatedComments = await updateVote(e, 'comment_vote', {
          currentComment: currentPost.id,
          idSearch: Number(e.target.id),
          vote: e.target.name
        });
        setCurrentPost(updatedComments);
      } catch (e) {
        console.log(e);
      }
    }


    // comment component that goes right if it is a child comment; including details for commment and controlls for the user
    return (
      <div className="comment" style={{ marginLeft: margin }}>
        <div>
          <div className="commentInfo">
            <div className="text">{comment.text}</div>
            <div className="details">
              Author: {comment.author} Upvotes: {comment.upvotes}<VotingBtns id={comment.id} downvote={vote}
                                                                           upvote={vote}/></div>
          </div>
        </div>
        <TextareaWithButton id={comment.id}
                            OnBlur={commentText}
                            sendText={sendTextAndIdFromTxtbox}/>
      </div>
    );
  };

  const sendComment = async (e) => {
    const res = await request(`${basicURL}new_comment`, 'POST', {
      currentComment: currentPost.id,
      idSearch: Number(e.id),
      text: e.text.commentTxt,
      author: currentUser.username
    });
    setCurrentPost(res);
  };

  const marginSetter = (ident) => {
    return `${ident * 50}px`;
  };

  // recursively rendering child comments, with details and controls per comment
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
  // the main component that is rendreding for the comments
  return (
    <div className="wrapper">
      {currentPost &&
      <div className="allCommentsContainer">
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
