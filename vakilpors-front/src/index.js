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
import Call_Edit_Lawyer_Profile from './components/profile/lawyer/Call_Edit_Lawyer_Profile';
import Call_Edit_User_Profile from './components/profile/user/Call_Edit_User_Profile';
import Call_Display_User_Profile from './components/profile/user/Call_Display_User_Profile';
import Replies from './components/Replies';
import ContactUs from './components/ContactUs';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ActivationAccount from './components/ActivationAccount';
import ChatPage from './components/chatPage';
import PremiumPage from './components/premium-page/PremiumPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
     <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Sidebar component={App} homePage={true}/>} />
              <Route path="/Login" element={<Sidebar component={Login}/>}/>
              <Route path="/Register" element={<Sidebar component={Register}/>}/>
              <Route path="/Policy" element={<Sidebar component={Policy}/>}/>
              <Route path="/Forum" element={<Sidebar component={Forum}/>}/>
              <Route path="/LawyerPage/:LawyerId" element={<Sidebar component={LawyerPage}/>}/>
              <Route path="/Lawyer-search-page" element={<Sidebar component={Lawyer_search_page}/>}/>
              {/* <Route path="/user-display-profile" element={<Sidebar component={Call_Display_User_Profile}/>}/> */}
              <Route path="/edit-user" element={<Sidebar component={Call_Edit_User_Profile}/>}/>
              <Route path="/edit_lawyer" element={<Sidebar component={Call_Edit_Lawyer_Profile}/>}/>
              <Route path="/Replies/:threadId/:userId" element={<Sidebar component={Replies}/>}/>
              <Route path="/contactUs" element={<Sidebar component={ContactUs}/>}/>
              <Route path="/Forgot_Password" element={<Sidebar component={ForgotPassword}/>}/>
              <Route path="/Reset_Password/:phoneNumber" element={<Sidebar component={ResetPassword}/>}/>
              <Route path="/Activation_Account/:phoneNumber" element={<Sidebar component={ActivationAccount}/>}/>
              <Route path="/chatPage" element={<Sidebar component={ChatPage}/>}/>
              <Route path="/PremiumPage" element={<Sidebar component={PremiumPage}/>}/>
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