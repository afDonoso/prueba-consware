import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AUTHED_USER_KEY } from './shared/constants/keys';

function App() {
  const [username, setUsername] = useState("")

  useEffect(() => {
    setUsername(localStorage.getItem(AUTHED_USER_KEY))
  }, [])

  return (
    <div className="App">
      <h1>{`Bienvenido, ${username}`}</h1>
      <Outlet />
    </div>
  );
}

export default App;
