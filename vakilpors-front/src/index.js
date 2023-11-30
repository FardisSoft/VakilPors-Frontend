import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthProvider';

import './css/public/bootstrap.min.css';
import './css/public/bootstrap.rtl.min.css';
import './css/public/fontstyles.css';
import './css/public/scrollbar.css';

import App from './App';

import Policy from './components/Policy';
import Sidebar from './components/Sidebar';
import ContactUs from './components/ContactUs';
import ChatPage from './components/chatPage';
import Rate from './components/Rate';
import AsasiLaw from './components/AsasiLaw';
import _404page from './components/404page';

import Login from './components/authentication/Login'
import Register from './components/authentication/Register';
import ForgotPassword from './components/authentication/ForgotPassword';
import ResetPassword from './components/authentication/ResetPassword';
import ActivationAccount from './components/authentication/ActivationAccount';

import LawyerPage from './components/profile/LawyerPage';
import Call_Edit_Lawyer_Profile from './components/profile/Call_Edit_Lawyer_Profile';
import Call_Edit_User_Profile from './components/profile/Call_Edit_User_Profile';

import Forum from './components/forum/Forum';
import Replies from './components/forum/Replies';

import Lawyer_search_page from './components/Lawyer-search-page/Lawyer_search_page';

import PremiumPage from './components/premium-page/PremiumPage';
import ResponseTransaction from './components/premium-page/ResponseTransaction';
import Wallet from './components/premium-page/Wallet';
import PremiumLawyers from './components/premium-page/PremiumLawyers';

import AddNewCase from './components/case-pages/addNewCase';
import ShowCases from './components/case-pages/ShowCases';
import UserSendCases from './components/case-pages/UserSendCases';

import VideoCall from './components/video-call/VideoCall';

import VerifyLawyers from './components/admin-pages/VerifyLawyers';
import VisitPannelStatistics from './components/admin-pages/Statistics-v2';
import HandleTransactions from './components/admin-pages/HandleTransactions';

import AdvertisingPage from './components/premium-page/Avertising';
import Lawyer_Jobinfo from './components/profile/Lawyer_Jobinfo';


import AllUsersTable from './components/admin-pages/AllUsers';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
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
              <Route path="/edit-user" element={<Sidebar component={Call_Edit_User_Profile}/>}/>
              <Route path="/edit_lawyer" element={<Sidebar component={Call_Edit_Lawyer_Profile}/>}/>
              <Route path="/Replies/:threadId/:userId" element={<Sidebar component={Replies}/>}/>
              <Route path="/contactUs" element={<Sidebar component={ContactUs}/>}/>
              <Route path="/Forgot_Password" element={<Sidebar component={ForgotPassword}/>}/>
              <Route path="/Reset_Password/:phoneNumber/:isSMS" element={<Sidebar component={ResetPassword}/>}/>
              <Route path="/Activation_Account/:phoneNumber" element={<Sidebar component={ActivationAccount}/>}/>
              <Route path="/chatPage" element={<Sidebar component={ChatPage}/>}/>
              <Route path="/PremiumPage" element={<Sidebar component={PremiumPage}/>}/>
              <Route path="/new-case/:func" element={<Sidebar component={AddNewCase}/>}/>
              <Route path="/show-cases/:isLawyer" element={<Sidebar component={ShowCases}/>}/>
              <Route path="/user-send-cases/:LawyerId" element={<Sidebar component={UserSendCases}/>}/>
              <Route path="/payment/verify" element={<Sidebar component={ResponseTransaction} />}/>
              <Route path="/Rate/:LawyerId" element={<Sidebar component={Rate}/>}/>
              <Route path="/wallet" element={<Sidebar component={Wallet}/>}/>
              <Route path="/videoCall/:roomId" element={<Sidebar component={VideoCall}/>}/>
              <Route path="/VerifyLawyers" element={<Sidebar component={VerifyLawyers}/>}/>
              <Route path="/Statistics" element={<Sidebar component={VisitPannelStatistics}/>}/>
              <Route path="/AllUsers" element={<Sidebar component={AllUsersTable}/>}/>
              <Route path="/AsasiLaw" element={<Sidebar component={AsasiLaw}/>}/>
              <Route path="/HandleTransactions" element={<Sidebar component={HandleTransactions}/>}/>
              <Route path="/AdvertisingPage" element={<Sidebar component={AdvertisingPage}/>}/>
              <Route path="/PremiumLawyers" element={<Sidebar component={PremiumLawyers}/>}/>
              <Route path="/editjob_lawyer" element={<Sidebar component={Lawyer_Jobinfo}/>}/>
              <Route path="*" element={<_404page/>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();