import { useEffect, useState } from 'react';
import request from '../utils/requester';
import Post from '../components/Post';

const Home = () => {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    request('http://localhost:3001/', 'GET')
      .then(r => {
        r.forEach(row=>{
          setResponse(response.push(row))
        })
      });
  }, []);

  function logout() {
    const users = JSON.parse(localStorage.getItem('users'));
    // взима последния потребител, който се е логнал
    console.log(users[users.length - 1]);
  }

  const test = [
    { title: 'Hello', comments: ['i\'m a comment', 'i\'m a comment2', 'i\'m a comment2', 'i\'m a comment2'] },
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
        <Post posts={test}/>
      </div>
    </div>
  );
};

export default Home;
