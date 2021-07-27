import { useEffect, useState } from 'react';
import request from '../utils/requester';
import Post from '../components/Post';
import { Route, useHistory } from 'react-router-dom';
import PostWithComments from '../components/PostWithComments';
import TextareaWithButton from '../components/TextareaWithButton';
import './Posts.scss';
import { basicURL } from '../utils/commonconstants';
import { updateVote } from '../utils/votingFunctions';

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

    // searching the current user and removing him from the local storage
    function logout() {
      let users = JSON.parse(localStorage.getItem('users'));
      users = users.filter(user => user.username !== currentUser.username);
      localStorage.removeItem(currentUser.username);
      localStorage.setItem('users', JSON.stringify(users));
      history.push('/');
    }

    async function deletePost(id) {
      try {
        const updatedPosts = await request(`${basicURL}delete_post`, 'DELETE', {
          idSearch: Number(id)
        });
        setResponse(updatedPosts)
      } catch (e) {
        console.log(e);
      }
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
      try {
        const updatedPosts = await request(`${basicURL}new_post`, 'POST', {
          author: currentUser.username,
          title: e.titleTxt,
          text: e.commentTxt
        });
        setResponse(updatedPosts);
      } catch (e) {
        console.log(e);
      }
    }

    // POST request for updating the vote
    async function vote(e) {
      try {
        const updatedComments = await updateVote(e, 'post_vote', {
          currentPost: Number(e.id),
          vote: e.name
        });
        setResponse(updatedComments);
      } catch (e) {
        console.log(e);
      }
    }

    function getLastUser(setter) {
      const users = JSON.parse(localStorage.getItem('users'));
      setter(users[users.length - 1]);
    }

    function openOrCloseCommentBox() {
      setShowCommentTxtBox(!showCommentTxtBox);
    }

    // rendering the header buttons and the posts
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
            <Post posts={response} sendId={vote} clickPost={clickPost} deletePostById={deletePost}
                  currentUser={currentUser?.username}/>
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
