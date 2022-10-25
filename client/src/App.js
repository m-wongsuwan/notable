import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserContext } from './context/UserProvider'
import Navbar from "./Navbar";
import Chat from "./routes/chat/Chat";
import Discovery from "./routes/discovery/Discovery";
import Home from "./routes/home/Home";
import Profile from "./routes/profile/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import Signup from "./routes/signup/Signup";


export default function App() {
  
  const { token, logout, login } = React.useContext(UserContext)
  
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
          path="/profile"
          element={
          <ProtectedRoute token={token} redirectTo="/" >
            <Profile />
          </ProtectedRoute>}
        />
      </Routes>
    </div>
  );
}
