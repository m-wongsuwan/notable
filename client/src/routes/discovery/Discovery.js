import React from 'react'
import { ProfilesContext } from '../../context/ProfilesProvider'
import { UserContext } from '../../context/UserProvider'
import ProfileCard from './components/ProfileCard'

export default function Discovery() {

    const { profiles } = React.useContext(ProfilesContext)
    const { user } = React.useContext(UserContext)

    const profilesMap = profiles.map(profile => {
        return (
            <ProfileCard 
                profile={profile}
                key={profile._id}
            />
        )
    })

    return (
        <div className='discovery'>
            <h1>Discovery</h1>
            <div className='discovery--profileDisplay'>
                {profilesMap}
            </div>
        </div>
    )
}