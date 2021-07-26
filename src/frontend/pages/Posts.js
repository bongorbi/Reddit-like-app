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
    const users = JSON.parse(localStorage.getItem('users'));
    users.pop();
    localStorage.clear();
    localStorage.setItem('users', JSON.stringify(users));
    history.push('/login');
  }

  function clickPost(e) {
    setPostId(e.target.id);
    setOpenComments(!openComments);
    history.push(`/posts/comments/${e.target.id}`);
  }

  function goBack() {
    getAllPosts()
    setOpenComments(!openComments);
  }

  async function newComment(e) {
    try {
      console.log(e);
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

  return (
    <div className="wrapper">
      <div className="header">
        <button
          onClick={logout}>
          Logout
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
          <h1 className='topic'>Topics</h1>
          <Post posts={response} clickPost={clickPost}/>
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
