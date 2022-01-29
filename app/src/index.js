import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Login from './components/auth/login';
import { userAuthed } from './shared/helper/get-authed-user';
import Signup from './components/auth/signup';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from './shared/constants/routes';
import ListTasks from './components/tasks/list-tasks';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN_ROUTE} element={userAuthed() ? <Navigate to={"/"} /> : <Login />} />
        <Route path={SIGNUP_ROUTE} element={userAuthed() ? <Navigate to={"/"} /> : <Signup />} />
        <Route path="/" element={userAuthed() ? <ListTasks /> : <Navigate to={"/login"}/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
