import React from 'react'
import { ProfilesContext } from '../../context/ProfilesProvider'
import { UserContext } from '../../context/UserProvider'
import ProfileCard from './components/ProfileCard'

export default function Discovery() {

    const { profiles, getAge } = React.useContext(ProfilesContext)
    const { user } = React.useContext(UserContext)

    function isTooOld(birthday) {
        return getAge(birthday) > user.agePrefCeiling
    }
    function isTooYoung(birthday) {
        return getAge(birthday) < user.agePrefFloor
    }

    function matchesGenderPref(gender) {
        return user.genderPref.indexOf(gender) > -1
    }

    const profilesMap = profiles.map(profile => {
        if(!isTooOld(profile.birthday) && !isTooYoung(profile.birthday) && matchesGenderPref(profile.gender) )
        return (
                <ProfileCard 
                    profile={profile}
                    key={profile._id}
                />
        )
    })

    return (
        <div className='discovery'>
            <h1 className='pageHead'>Discovery</h1>
            <div className='discovery--profileDisplay'>
                {profilesMap}
            </div>
        </div>
    )
}