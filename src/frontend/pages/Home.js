import { useEffect, useState } from 'react';
import request from '../utils/requester';
import Post from '../components/Post';
import { useHistory, useParams } from 'react-router-dom';

const Home = () => {
  const [response, setResponse] = useState([]);
  const [openComments, setOpenComments] = useState(false);
  const history = useHistory();

  useEffect(() => {
    request('http://localhost:3001/', 'GET')
      .then(r => Array.from(r.posts))
      .then((postsArr) => {
        setResponse(postsArr);
      });
  }, []);

  function logout() {
    const users = JSON.parse(localStorage.getItem('users'));
    // взима последния потребител, който се е логнал
    console.log(users[users.length - 1]);
  }

  function clickPost(e) {
    history.push(`/home/${e.target.id}`);
    // setOpenComments(!openComments);
  }

  const test = [
    {
      title: 'Hello',
      comments: ['i\'m a comment', 'i\'m a comment2', 'i\'m a comment2', 'i\'m a comment2']
    },
    {
      title: 'Hello',
      comments: ['i\'m a comment 2']
    },
    {
      title: 'Hello',
      comments: ['i\'m a comment 3']
    },
    {
      title: 'Hello',
      comments: ['i\'m a comment 4']
    }
  ];
  return (
    <div>
      <div>
        HOME
        <button
          onClick={logout}>
          Logout
        </button>
      </div>
      <div>
        <Post posts={response} clickPost={clickPost} openComments={openComments}/>
      </div>
    </div>
  );
};

export default Home;
