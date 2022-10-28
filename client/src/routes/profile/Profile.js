import React, { useState } from 'react'
import { ChatAndNoteContext } from '../../context/ChatAndNoteProvider'
import { ProfilesContext } from '../../context/ProfilesProvider'
import { UserContext } from '../../context/UserProvider'
import noprofilepic from '../../images/noprofilepic.svg'


export default function Profile(props) {

    const { logout } = React.useContext(UserContext)
    const { getAge, returnGenderString, returnAgeAndGenderString, seekingGenderString } = React.useContext(ProfilesContext)
    const { leaveNote, setSentNotes } = React.useContext(ChatAndNoteContext)

    const {
        handle,
        agePrefFloor,
        profileImgUrl,
        agePrefCeiling,
        birthday,
        firstName,
        aboutMe,
        lastName,
        gender,
        genderPref,
        _id
    } = props.user

    const initInputs = {noteText: ""}
    const [inputs, setInputs] = useState(initInputs)
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
            {/* conditionally render depending if a note has been left */}
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
            {/* conditionally render reminder that you both most leave a note before chat can occur */}
            <button>Chat!</button>
        </div>
    )
}