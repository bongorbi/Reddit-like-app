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
  const [postId, setPostId] = useState();
  const [currentUser, setCurrentUser] = useState();
  const history = useHistory();

  function getAllPosts() {
    request(basicURL, 'GET')
      .then(r => Array.from(r.posts))
      .then((postsArr) => {
        setResponse(postsArr);
      });
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    getLastUser();
  }, []);

  useEffect(() => {
    if (!openComments) {
      history.push(`/posts`);
    }
  }, [openComments]);

  function getLastUser() {
    const users = JSON.parse(localStorage.getItem('users'));
    // взима последния потребител, който се е логнал
    setCurrentUser(users[users.length - 1]);
  }

  function logout() {
    let users = JSON.parse(localStorage.getItem('users'));
    users = users.filter(user => user.username !== currentUser.username);
    localStorage.removeItem(currentUser.username);
    localStorage.setItem('users', JSON.stringify(users));
    history.push('/login');
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

  async function newComment(e) {
    try {
      await request(`${basicURL}new_post`, 'POST', {
        autor: currentUser.username,
        text: e
      });
      getAllPosts();
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  async function votingRequest(e) {
    try {
      let updatedComments = await request(`${basicURL}vote`, 'POST', {
        currentComment: Number(e.id),
        idSearch: Number(e.id),
        vote: e.name
      });
      getAllPosts()
      // console.log(updatedComments.response);
      // setResponse(Array.from(updatedComments.response));
    } catch (e) {
      console.log(e);
    }
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
          <p>Create new post:</p>
          <TextareaWithButton sendText={newComment}>New Post</TextareaWithButton>
        </>
        }
        {openComments &&
        <Route path="/posts/comments/:id">
          <PostWithComments id={postId} posts={response} openComments={openComments}/>
        </Route>
        }
      </div>
    </div>
  );
};

export default Posts;
