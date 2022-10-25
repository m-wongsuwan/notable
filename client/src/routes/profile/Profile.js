import React from 'react'
import { UserContext } from '../../context/UserProvider'


export default function Profile() {
    const currentDate = new Date()
    console.log(currentDate.getMonth())

    const { token, user, logout } = React.useContext(UserContext)

    const {
        handle,
        agePrefFloor,
        agePrefCeiling,
        birthMonth,
        birthYear,
        firstName,
        lastName,
        gender,
        genderPref,
        _id
    } = user

    function capitalizeName(string) {
        return string[0].toUpperCase() + string.substring(1)
    }

    return (
        <div className='profile'>
            <h1>Welcome to Your Profile, {capitalizeName(firstName)}</h1>
            <button onClick={logout}>Log Out</button>
            <p>{agePrefFloor}</p>
        </div>
    )
}