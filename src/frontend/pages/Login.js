import './Login.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const history = useHistory();

  // storing the users in the local storage
  function login() {
    let arr = [];
    arr = JSON.parse(localStorage.getItem('users')) || [];
    arr.push({
      'username': username,
      'password': pass
    });
    localStorage.setItem('users', JSON.stringify(arr));
    history.push('/posts');
  }

  function loginOnEnter(e) {
    if (e.key === 'Enter') {
      login();
    }
  }
// login component with 2 inputs - username and password and 1 button for login
  return (
    <div className={'page-wrapper'}>
      <div className={'content'}>
        <h1 className={'heading'}>Login</h1>
        <label>Username:
          <input
            value={username}
            type="text"
            onChange={event => setUsername(event.target.value)}
            className="input"/>
        </label>
        <label>Password:
          <input
            value={pass}
            type="password"
            className="input"
            onChange={event => setPass(event.target.value)}
            onKeyPress={loginOnEnter}
          />
        </label>
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
};
export default Login;
