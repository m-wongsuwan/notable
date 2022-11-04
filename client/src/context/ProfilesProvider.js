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

    const emptyProfile = {
        handle: "Tt",
        agePrefFloor: "",
        profileImgUrl: "",
        agePrefCeiling: "",
        birthday: "",
        firstName: "",
        lastName: "",
        gender: "",
        genderPref: [],
        _id: ""
    }
    

    const { user, token } = React.useContext(UserContext)

    const [profiles, setProfiles] = useState([])

    const [profileToView, setProfileToView] = useState(emptyProfile)

    function getProfiles() {
        userAxios.get('/api/users')
            .then(res => setProfiles(res.data))
            .catch(err => console.log(err))
    }

    function setFocusProfile(focusUserId) {
        setProfileToView(profiles.find(profile => profile._id === focusUserId))
        // userAxios.get(`/api/users/${focusUserId}`)
        //     .then(res => setProfileToView(res.data))
        //     .catch(err => console.log(err))
    }

    function getName(id) {
        const found = profiles.find(element => element._id === id)
        if(found) {
            return found.firstName
        } else {
            return "N/A"
        }
    }

    function getAge(dateString) {
        const today = new Date()
        const birthDate = new Date(dateString)    
        let age = today.getFullYear() - birthDate.getFullYear()
        const m = today.getMonth() - birthDate.getMonth()
        if( m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return age
    }

    function returnGenderString(gender) {
        if(gender === 'MAN') {
            return "man"
        } else if (gender === 'WOMAN') {
            return 'woman'
        } else if (gender === "NON-BINARY") {
            return 'non-binary person'
        } else {
            return 'person'
        }
    }

    function seekingGenderString(genderPrefArray) {
        let stringy = ""
        function stringIsPresent(string) {
            const containsString = (element) => element === string
            return genderPrefArray.findIndex(containsString) > -1
        }
        if(stringIsPresent("MAN")) {
            stringy = stringy + "Men    "
        }
        if(stringIsPresent("WOMAN")) {
            stringy = stringy + "Women    "
        }
        if(stringIsPresent("NON-BINARY")) {
            stringy = stringy + "Non-Binary Individuals    "
        }
        if(stringIsPresent("OTHER")) {
            stringy = stringy + "Other Gender Identities"
        }
        return stringy
    }

    function returnAgeAndGenderString(dateString, gender) {
        return `${getAge(dateString)} year old ${returnGenderString(gender)}`
    }

    React.useEffect(()=> {
        if(token) {
            getProfiles()
        } else {
            console.log("Get ready to find your person.")
        }        
    }, [token])



    return (
        <ProfilesContext.Provider
            value={{
                profiles,
                setFocusProfile,
                profileToView,
                getName,
                // this broke it???? why???
                getAge,
                returnGenderString,
                returnAgeAndGenderString,
                seekingGenderString
            }}
        >
            {props.children}
        </ProfilesContext.Provider>
    )
}