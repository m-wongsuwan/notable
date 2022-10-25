import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import UserProvider from './context/UserProvider'
import ProfilesProvider from './context/ProfilesProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserProvider>
      <ProfilesProvider>
        <App />
      </ProfilesProvider>
    </UserProvider>  
  </BrowserRouter>
);
