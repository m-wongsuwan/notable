import React, { useState } from 'react'
import axios from 'axios'
import { UserContext } from './UserProvider'

export const ProfilesContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function ProfilesProvider(props) {

    const { user } = React.useContext(UserContext)

    const [profiles, setProfiles] = useState([])

    React.useEffect(()=> {
        userAxios.get('/api/users')
            .then(res => setProfiles(res.data))
            .catch(err => console.log(err))
    }, [user])



    return (
        <ProfilesContext.Provider
            value={{

            }}
        >
            {props.children}
        </ProfilesContext.Provider>
    )
}