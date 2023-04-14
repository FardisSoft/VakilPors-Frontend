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
import Forum from './components/Forum';
import Lawyer_search_page from './components/Lawyer-search-page/Lawyer_search_page';
import { Box } from '@mui/material';
// import ProfileDisplay from './components/profile/ProfileDisplay';
// import ProfileEdit from './components/profile/ProfileEdit';
import Display_Profile from './components/profile/Display_Profile';
import Edit_user_profile from './components/profile/Edit_user_profile';
import Call_edit_lawyer from './components/profile/Call_edit_lawyer';

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
              <Route path="/dashboard" element={<Sidebar component={Forum}/>}/>
              <Route path="/LawyerPage/:LawyerId" element={<Sidebar component={LawyerPage}/>}/>
              <Route path="/Lawyer-search-page" element={<Sidebar component={Lawyer_search_page}/>}/>
              <Route path="/user-display-profile" element={<Sidebar component={Display_Profile}/>}/>
              <Route path="/edit-user" element={<Sidebar component={Edit_user_profile}/>}/>
              <Route path="/edit_lawyer" element={<Sidebar component={Call_edit_lawyer}/>}/>
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