import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatAndNoteContext } from '../../context/ChatAndNoteProvider'
import { ProfilesContext } from '../../context/ProfilesProvider'
import { UserContext } from '../../context/UserProvider'
import noprofilepic from '../../images/noprofilepic.svg'


export default function Profile(props) {

    let navigate = useNavigate();

    const { logout } = React.useContext(UserContext)
    const { 
        // getName, 
        // getAge, 
        // returnGenderString, 
        returnAgeAndGenderString, 
        seekingGenderString,
        setFocusProfile
    } = React.useContext(ProfilesContext)
    const { 
        leaveNote,
        returnLeftNote,
        startChat,
        setFocusChat,
        usersHaveChat,
        // chats,
        findChatWithThisUser
     } = React.useContext(ChatAndNoteContext)

    const {
        // handle,
        agePrefFloor,
        profileImgUrl,
        agePrefCeiling,
        birthday,
        firstName,
        aboutMe,
        // lastName,
        gender,
        genderPref,
        _id
    } = props.user

    const initInputs = {noteText: ""}
    const [inputs, setInputs] = useState(initInputs)
    const leftNote = returnLeftNote(_id)

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function capitalizeName(string) {
        if (string) {
            return string[0].toUpperCase() + string.substring(1)
        }
    }

    function returnLogOutButton(){
        if(props.isUserProfile) {
            return (
                <>
                <button onClick={logout}>Log Out</button>
                <br />
            </>
            )
        }
    }

    function conditionalNoteDisplay() {
        if(leftNote) {
            return (
                <div className='leftNote'>
                    <h2>Your note...</h2>
                    {/* <h3>{getName(leftNote.receivingUserId)}</h3> */}
                    <p>{leftNote.noteText}</p>
                </div>
            )
        } else {
            return (
                <form onSubmit={(e)=> {
                    e.preventDefault()
                    leaveNote(inputs, _id)
                    setInputs(initInputs)
                }}>
                    <input 
                        type="text"
                        placeholder='Leave your note here!'
                        name='noteText'     
                        value={inputs.noteText}
                        onChange={handleChange}
                        required
                    />

                    <button>Leave a note!</button>
                </form>
            )
        }
    }

    return (
        <div className='profile'>
            {props.isUserProfile && <h1>Welcome to Your Profile</h1>}
            <h1> {capitalizeName(firstName)}</h1>
            <h3>{returnAgeAndGenderString(birthday, gender)}</h3>
            {returnLogOutButton()}
            { profileImgUrl ? <img className='profile--img' src={profileImgUrl} alt="Profile" /> : <img src={noprofilepic} className='profile--img' alt="Profile" />}
            <div className='profile--about'>
                <h2>About {capitalizeName(firstName)}</h2>
                <p>{aboutMe}</p>
            </div>
            <div className='profile--seeking'>
                <h3>Seeking...</h3>
                <p>Age {agePrefFloor} to {agePrefCeiling}</p>
                <p>{seekingGenderString(genderPref)}</p>
                
            </div>
            { props.isUserProfile ? "" : conditionalNoteDisplay()}
            {/* conditionally render reminder that you both most leave a note before chat can occur */}
            { !props.isUserProfile && 
                <button onClick={()=> {
                    if(!usersHaveChat(_id)){
                        startChat(_id)
                    }
                    setFocusProfile(_id)
                    setFocusChat(findChatWithThisUser(_id))
                    navigate('/chat')}}
                >
                    {usersHaveChat(_id) ? "Go to Chat" : "Start Chat!"}</button>
            }
            <button onClick={()=> usersHaveChat(_id)}>users have chat?</button>
        </div>
    )
}