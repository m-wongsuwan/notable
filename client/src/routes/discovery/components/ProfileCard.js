import React from "react";
import { useNavigate } from 'react-router-dom'
import { ProfilesContext } from "../../../context/ProfilesProvider";

export default function ProfileCard(props) {

    const { setFocusProfile, returnAgeAndGenderString, getAge, returnGenderString } = React.useContext(ProfilesContext)

    let navigate = useNavigate();

    const {
        _id,
        handle,
        profileImgUrl,
        birthday,
        aboutMe,
        agePrefFloor,
        agePrefCeiling,
        gender,
        genderPref
    } = props.profile


    function capitalizeName(string) {
        return string[0].toUpperCase() + string.substring(1)
    }


    return (
        <div className="profileCard">
            <h2>{capitalizeName(handle)}</h2>
            <h3>{returnAgeAndGenderString(birthday, gender)}</h3>
            <img src={profileImgUrl} style={{width: "200px", maxHeight: "600px"}} />
            <button onClick={()=> {
                setFocusProfile(_id)
                navigate('/viewprofile')
            }}>See Profile</button>
            <button onClick={()=> setFocusProfile(_id)} > setfocus profile</button>
        </div>
    )
}



    // function getAge(dateString) {
    //     const today = new Date()
    //     const birthDate = new Date(dateString)    
    //     let age = today.getFullYear() - birthDate.getFullYear()
    //     const m = today.getMonth() - birthDate.getMonth()
    //     if( m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    //         age--
    //     }
    //     return age
    // }
    
    // function returnGenderString(gender) {
    //     if(gender === 'MAN') {
    //         return "man"
    //     } else if (gender === 'WOMAN') {
    //         return 'woman'
    //     } else if (gender === "NON-BINARY") {
    //         return 'non-binary person'
    //     } else {
    //         return 'person'
    //     }
    // }
