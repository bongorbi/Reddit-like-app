import PropTypes from 'prop-types';
import TextareaWithButton from './TextareaWithButton';
import request from '../utils/requester';
import './postWithComments.scss';
import { basicURL } from '../utils/commonconstants';
import { useState } from 'react';
import VotingBtns from './VotingBtns';

const PostWithComments = ({
  posts,
  currentUser,
  id
}) => {

  const [currentPost, setCurrentPost] = useState(posts[id]);
  // const [showCommentTxtBox, setShowCommentTxtBox] = useState(false);

  const commentText = (e) => e.target.value;

  const DetailsForComment = ({
    comment,
    sendTxt,
    margin,
  }) => {
    function sendTextAndIdFromTxtbox(e) {
      sendTxt({
        text: e,
        id: comment.id
      });
    }

    async function votingRequest(e) {
      try {
        let updatedComments = await request(`${basicURL}comment_vote`, 'POST', {
          currentComment: currentPost.id,
          idSearch: Number(e.target.id),
          vote: e.target.name
        });
        setCurrentPost(updatedComments);
      } catch (e) {
        console.log(e);
      }
    }

    // function openOrCloseCommentBox(e) {
    //   console.log(e.target.id);
    //   setShowCommentTxtBox(!showCommentTxtBox);
    // }

    async function vote(e) {
      switch (true) {
        case e.target.name === 'upvote':
          await votingRequest(e);
          break;
        case e.target.name === 'downvote':
          await votingRequest(e);
          break;
      }
    }

    return (
      <div className="comment" style={{ marginLeft: margin }}>
        <div>
          <div className="commentInfo">
            <div className="text">{comment.text}</div>
            <div className="details">
              Autor: {comment.autor} Upvotes: {comment.upvotes}<VotingBtns id={comment.id} downvote={vote}
                                                                           upvote={vote}/></div>
          </div>
        </div>
        {/*<p*/}
        {/*  className='mousePointer'*/}
        {/*  id={comment.id}*/}
        {/*  onClick={openOrCloseCommentBox}> Reply*/}
        {/*</p>*/}
        {/*{*/}
        {/*  showCommentTxtBox &&*/}
        {/*  <>*/}
            <TextareaWithButton id={comment.id}
                                OnBlur={commentText}
                                sendText={sendTextAndIdFromTxtbox}/>
      {/*</>*/}
      {/*  }*/}
      </div>
    );
  };

  const sendComment = async (e) => {
    console.log(e);
    const res = await request(`${basicURL}new_comment`, 'POST', {
      currentComment: currentPost.id,
      idSearch: Number(e.id),
      text: e.text.commentTxt,
      autor: currentUser.username
    });
    setCurrentPost(res);
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
