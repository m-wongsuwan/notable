import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import UserProvider from './context/UserProvider'
import ProfilesProvider from './context/ProfilesProvider';
import ChatAndNoteProvider from './context/ChatAndNoteProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserProvider>
      <ProfilesProvider>
        <ChatAndNoteProvider>
          <App />
        </ChatAndNoteProvider>
      </ProfilesProvider>
    </UserProvider>  
  </BrowserRouter>
);
