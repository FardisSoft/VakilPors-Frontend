import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './services/AuthProvider';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Policy from './components/Policy';
import LawyerPage from './components/LawyerPage';
import Sidebar from './components/Sidebar';
import { Box } from '@mui/material';
import Forum from './components/Forum';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
     <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Sidebar component={App}/>} />
              <Route path="/Login" element={<><Sidebar component={Box}/><Login/></>}/>
              <Route path="/Register" element={<><Sidebar component={Box}/><Register/></>}/>
              <Route path="/Policy" element={<Sidebar component={Policy}/>}/>
              <Route path="/LawyerPage" element={<Sidebar component={LawyerPage}/>}/>
              <Route path="/dashboard" element={<Sidebar component={Forum}/>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();