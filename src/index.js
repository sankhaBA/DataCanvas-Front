import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Navigation
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Projects from './pages/Projects';
import ProjectOverview from './pages/ProjectOverview';
import Devices from './pages/Devices';
import UserSettings from './pages/UserSettings';
import ConfigureTable from './pages/ConfigureTable';
import DataTableHandler from './pages/DataTableHandler';
import ProjectSettings from './pages/ProjectSettings';
import DatasetViewer from './pages/DatasetViewer';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import ExpandedWidget from './pages/ExpandedWidget';

const root = ReactDOM.createRoot(document.getElementById('root'));

const uid = localStorage.getItem('uid');
const token = localStorage.getItem('auth-token');

root.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/overview" element={<ProjectOverview />} />
      <Route path="/devices" element={<Devices />} />
      <Route path="/configtable" element={<ConfigureTable />} />
      <Route path="/datahandler" element={<DataTableHandler />} />
      <Route path="/usersettings" element={<UserSettings />} />
      <Route path="/projectsettings" element={<ProjectSettings />} />
      <Route path="/dataset" element={<DatasetViewer />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/expand" element={<ExpandedWidget />} />
    </Routes>
  </Router>
);

reportWebVitals();
