import { useEffect, useState } from 'react';
import request from '../utils/requester';
import Post from '../components/Post';
import { Route, useHistory } from 'react-router-dom';
import PostWithComments from '../components/PostWithComments';
import TextareaWithButton from '../components/TextareaWithButton';
import './Posts.scss';
import { basicURL } from '../utils/commonconstants';

const Posts = () => {
    const [response, setResponse] = useState([]);
    const [openComments, setOpenComments] = useState(false);
    const [showCommentTxtBox, setShowCommentTxtBox] = useState(false);
    const [postId, setPostId] = useState();
    const [currentUser, setCurrentUser] = useState();
    const history = useHistory();

    function getAllPosts() {
      request(basicURL, 'GET')
        .then(r => Array.from(r))
        .then((postsArr) => {
          setResponse(postsArr);
        });
    }

    useEffect(() => {
      getAllPosts();
    }, []);

    useEffect(() => {
      getLastUser(setCurrentUser);
    }, []);

    useEffect(() => {
      if (!openComments) {
        history.push(`/posts`);
      }
    }, [openComments]);


    function logout() {
      let users = JSON.parse(localStorage.getItem('users'));
      users = users.filter(user => user.username !== currentUser.username);
      localStorage.removeItem(currentUser.username);
      localStorage.setItem('users', JSON.stringify(users));
      history.push('/');
    }

    function clickPost(e) {
      setPostId(e.target.id);
      setOpenComments(!openComments);
      history.push(`/posts/comments/${e.target.id}`);
    }

    function goBack() {
      getAllPosts();
      setOpenComments(!openComments);
    }

    async function newPost(e) {
      console.log(e);
      try {
        const updatedPosts = await request(`${basicURL}new_post`, 'POST', {
          autor: currentUser.username,
          title: e.titleTxt,
          text: e.commentTxt
        });
        setResponse(updatedPosts);
      } catch (e) {
        console.log(e);
      }
    }

    async function votingRequest(e) {
      try {
        let updatedComments = await request(`${basicURL}vote`, 'POST', {
          currentPost: Number(e.id),
          vote: e.name
        });
        let updatedCommentsArr = [];
        updatedComments.forEach(post => updatedCommentsArr.push(post));
        setResponse(updatedCommentsArr);
      } catch (e) {
        console.log(e);
      }
    }

    function getLastUser(setter) {
      const users = JSON.parse(localStorage.getItem('users'));
      // взима последния потребител, който се е логнал
      setter(users[users.length - 1]);
    }

    async function vote(e) {
      switch (true) {
        case e.name === 'upvote':
          await votingRequest(e);
          break;
        case e.name === 'downvote':
          await votingRequest(e);
          break;
      }
    }

    function openOrCloseCommentBox() {
      setShowCommentTxtBox(!showCommentTxtBox);
    }

    return (
      <div className="wrapper">
        <div className="header">
          <button
            onClick={logout}>
            Logout {currentUser?.username}
          </button>
          {openComments && <button
            onClick={goBack}>
            Back
          </button>
          }
        </div>
        <div>
          {!openComments &&
          <>
            <h1 className="topic">Topics</h1>
            <Post posts={response} sendId={vote} clickPost={clickPost}/>
            <div onClick={openOrCloseCommentBox}><p className="mousePointer">Create new post:</p></div>
            {showCommentTxtBox &&
            <TextareaWithButton sendText={newPost} showTitleField={true}>New Post</TextareaWithButton>
            }</>
          }
          {openComments &&
          <Route path="/posts/comments/:id">
            <PostWithComments currentUser={currentUser} id={postId} posts={response} openComments={openComments}/>
          </Route>
          }
        </div>
      </div>
    );
  }
;

export default Posts;
