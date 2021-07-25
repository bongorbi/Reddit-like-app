import { useEffect, useState } from 'react';
import request from '../utils/requester';
import Post from '../components/Post';
import { Route, useHistory } from 'react-router-dom';
import PostWithComments from '../components/PostWithComments';
import TextareaWithButton from '../components/TextareaWithButton';

const Posts = () => {
  const [response, setResponse] = useState([]);
  const [openComments, setOpenComments] = useState(false);
  const [postId, setPostId] = useState();
  const [currentUser, setCurrentUser] = useState();
  const history = useHistory();
  const basicUrl = 'http://localhost:3001/';

  function getAllPosts() {
    request(basicUrl, 'GET')
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
    const users = JSON.parse(localStorage.getItem('users'));
    users.pop();
    localStorage.clear();
    localStorage.setItem('users', JSON.stringify(users));
    history.push('/login');
  }

  function clickPost(e) {
    setPostId(e.target.id);
    showOrHideComments();
    history.push(`/posts/comments/${e.target.id}`);
  }

  function showOrHideComments() {
    setOpenComments(!openComments);
  }

  async function newComment(e) {
    try {
      console.log(e);
      await request(`${basicUrl}new_post`, 'POST', {
        autor: currentUser.username,
        text: e,
      });
      getAllPosts();
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <div>
        HOME
        <button
          onClick={logout}>
          Logout
        </button>
        {openComments && <button
          onClick={showOrHideComments}>
          Back
        </button>
        }
      </div>
      <div>
        {!openComments &&
        <>
          <Post posts={response} clickPost={clickPost}/>
          <h3>Create new post</h3>
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
