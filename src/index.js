import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Navigation
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Projects from './pages/Projects';
import ProjectOverview from './pages/ProjectOverview';
import Devices from './pages/Devices';
import DataTableHandler from './pages/DataTableHandler';

const root = ReactDOM.createRoot(document.getElementById('root'));

const uid = localStorage.getItem('uid');
const token = localStorage.getItem('auth-token');
console.log(uid, token);

root.render(
  // <React.StrictMode>
  //   <SignUp />
  // </React.StrictMode>
 
  <Router>
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/projects" element={(uid && token) ? <Projects /> : <Login/>} />
      <Route path="/overview" element={(uid && token) ? <ProjectOverview /> : <Login/>}  />
      <Route path="/devices" element={<Devices />} />
      <Route path="/datahandler" element={<DataTableHandler />} />
    </Routes>
  </Router>
);

reportWebVitals();
