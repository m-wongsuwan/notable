import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { ChatAndNoteContext } from "./context/ChatAndNoteProvider";
import { ProfilesContext } from "./context/ProfilesProvider";

// logout from navbar or profile? see bottom
    // currently profile

export default function Navbar(props) {

    const { profiles, profileToView } = React.useContext(ProfilesContext)
    const { chats } = React.useContext(ChatAndNoteContext)

    const { login, logout, token } = props

    const initLoginInputs = {
        handle: "",
        password: ""
    }

    const [loginInputs, setLoginInputs] = useState(initLoginInputs)

    function handleChange(e) {
        const { name, value } = e.target
        setLoginInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    const linkStyle = {
        textDecoration: "none",
        fontSize: "20px",
        color: "black",
        margin: "0px 20px"
    }

    return(
        <nav style={{display: "flex"}}>
            <h1>Notable ♥</h1>
            { token && 
                <div className="nav--links" >
                    <Link to='/notes' style={linkStyle} >Notes</Link> 
                    <Link to='/chat' style={linkStyle} >Chat</Link> 
                    <Link to='/discovery' style={linkStyle} >Discovery</Link>
                    <Link to='/profile' style={linkStyle} >Profile</Link>  
                </div>
            }
            { !token && 
                <div className="nav--loginForm">
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    login(loginInputs)
                    setLoginInputs(initLoginInputs)
                }} >
                    <input 
                        type="text" 
                        name="handle" 
                        value={loginInputs.handle} 
                        placeholder="Handle"
                        onChange={handleChange}
                    />
                    <input 
                        type="password" 
                        name="password" 
                        value={loginInputs.password} 
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    <button>Log In</button>
                </form>
                </div>
            
            }
        </nav>
    )
}

// let navigate = useNavigate()

// function logoutReturnToAuth() {
//     navigate('/')
//     logout()   
// }