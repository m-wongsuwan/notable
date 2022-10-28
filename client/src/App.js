import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import { ProfilesContext } from "./context/ProfilesProvider";
import { UserContext } from './context/UserProvider'
import Navbar from "./Navbar";
import Chat from "./routes/chat/Chat";
import Notes from "./routes/notes/Notes";
import Discovery from "./routes/discovery/Discovery";
import Home from "./routes/home/Home";
import Profile from "./routes/profile/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import Signup from "./routes/signup/Signup";


export default function App() {
  
  const { token, logout, login, user } = React.useContext(UserContext)
  const { profileToView } = React.useContext(ProfilesContext)
  
  return (
    <div className="App">
      <Navbar logout={logout} token={token} login={login} />
      <Routes>
        <Route 
          path="/"
          element={ token ? <Navigate to="/discovery" /> : <Home />}
        />
        <Route 
          path="/signup"
          element={<Signup />}
        />
        <Route 
          path="/discovery"
          element={
          <ProtectedRoute token={token} redirectTo="/" >
            <Discovery />
          </ProtectedRoute>}
        />
        <Route 
          path="/chat"
          element={
          <ProtectedRoute token={token} redirectTo="/" >
            <Chat />
          </ProtectedRoute>}
        />
        <Route 
          path="/notes"
          element={
          <ProtectedRoute token={token} redirectTo="/" >
            <Notes />
          </ProtectedRoute>}
        />
        <Route 
          path="/profile"
          element={
          <ProtectedRoute token={token} redirectTo="/" >
            <Profile user={user} isUserProfile={true}/>
          </ProtectedRoute>}
        />
        <Route 
          path="/viewprofile"
          element={
          <ProtectedRoute token={token} redirectTo="/" >
            <Profile user={profileToView} isUserProfile={false}/>
          </ProtectedRoute>}
        />
      </Routes>
    </div>
  );
}
