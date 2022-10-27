import React from 'react'
import { ProfilesContext } from '../../context/ProfilesProvider'
import { UserContext } from '../../context/UserProvider'
import noprofilepic from '../../images/noprofilepic.svg'


export default function Profile(props) {

    const { logout } = React.useContext(UserContext)
    const { getAge, returnGenderString, returnAgeAndGenderString, seekingGenderString } = React.useContext(ProfilesContext)

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

    function capitalizeName(string) {
        return string[0].toUpperCase() + string.substring(1)
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
            { profileImgUrl ? <img className='profile--img' src={profileImgUrl} /> : <img src={noprofilepic} className='profile--img' />}
            <div className='profile--about'>
                <h2>About {firstName}</h2>
                <p>{aboutMe}</p>
            </div>
            <div className='profile--seeking'>
                <h3>Seeking...</h3>
                <p>Age {agePrefFloor} to {agePrefCeiling}</p>
                <p>{seekingGenderString(genderPref)}</p>
                
            </div>
            <button>Leave a note!</button>
        </div>
    )
}