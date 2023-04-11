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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
     <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Sidebar component={App} userRole={'unknown'} pageName={"صفحه اصلی"} />} />
              <Route path="/Login" element={<Sidebar component={Login} userRole={'unknown'} pageName={"ورود"} />}/>
              <Route path="/Register" element={<Sidebar component={Register} userRole={'unknown'} pageName={"ثبت نام"} />}/>
              <Route path="/Policy" element={<Sidebar component={Policy} userRole={'unknown'} pageName={"شرایط سایت"} />}/>
              <Route path="/LawyerPage" element={<Sidebar component={LawyerPage} userRole={'user'} pageName={"پروفایل عمومی وکیل"} />}/>
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
