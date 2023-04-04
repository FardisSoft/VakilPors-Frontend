import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Policy from './components/Policy';
import Main from './components/Lawyer-search-page/Main';
import Search from './components/Lawyer-search-page/Search';
import Teacher_item from './components/Lawyer-search-page/Teacher_item';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/Policy" element={<Policy/>}/>
            <Route path="/Main" element={<Main/>}/>
            <Route path="/Search" element={<Search/>}/>
            <Route path="/Teacher" element={<Teacher_item/>}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
