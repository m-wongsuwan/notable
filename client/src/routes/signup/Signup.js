import React, { useState } from 'react'
import { UserContext } from '../../context/UserProvider'
import { useNavigate } from 'react-router-dom'

export default function Signup() {

    const { signup } = React.useContext(UserContext)

    let navigate = useNavigate();

    const initInputs = {
        handle: "",
        password: "",
        firstName: "",
        lastName: "",
        profileImgUrl: "",
        birthday: "",
        aboutMe: "",
        agePrefFloor: "",
        agePrefCeiling: "",
        gender: "",
        genderPref: []
    }
    const [inputs, setInputs] = useState(initInputs)

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleCheck(e) {
        const { checked, value } = e.target
        let updatedList = [...inputs.genderPref]
        if (checked) {
            updatedList = [...inputs.genderPref, value]
        } else {
            updatedList.splice(inputs.genderPref.indexOf(value), 1)
        }
        setInputs(prevInputs => ({
            ...prevInputs,
            genderPref: [...updatedList]
        }))
    }

    function handleSignup(signupObj) {
        signup(signupObj)
        navigate('/discovery')
    }

    return (
        <div className='signup'>
            <h1>Signup</h1>
            <form onSubmit={(e)=> {
                e.preventDefault()
                handleSignup(inputs)
            }}>
                <label htmlFor="handle">Handle</label>
                <input 
                    type="text"
                    placeholder='Handle'
                    name='handle'     
                    value={inputs.handle}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    placeholder='Password'
                    name='password'     
                    value={inputs.password}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="firstName">First Name</label>
                <input 
                    type="text"
                    placeholder='First Name'
                    name='firstName'     
                    value={inputs.firstName}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="lastName">Last Name</label>
                <input 
                    type="text"
                    placeholder='Last Name'
                    name='lastName'     
                    value={inputs.lastName}
                    onChange={handleChange}
                />
                <input 
                    type="radio" 
                    value="WOMAN" 
                    name="gender"
                    checked={inputs.gender === "WOMAN"}
                    onChange={handleChange}
                />
                <label htmlFor="gender">Woman</label>
                <input 
                    type="radio" 
                    value="MAN" 
                    name="gender"
                    checked={inputs.gender === "MAN"}
                    onChange={handleChange}
                />
                <label htmlFor="gender">Man</label>
                <input 
                    type="radio" 
                    value="NON-BINARY" 
                    name="gender"
                    checked={inputs.gender === "NON-BINARY"}
                    onChange={handleChange}
                />
                <label htmlFor="gender">Non-Binary</label>
                <input 
                    type="radio" 
                    value="OTHER" 
                    name="gender"
                    checked={inputs.gender === "OTHER"}
                    onChange={handleChange}
                />
                <label htmlFor="gender">Other</label>
                <label htmlFor="profileImgUrl">Profile Image URL</label>
                <input 
                    type="text"
                    placeholder='Profile Image URL'
                    name='profileImgUrl'     
                    value={inputs.profileImgUrl}
                    onChange={handleChange}
                />
                <label htmlFor="birthday">Date of Birth</label>
                <input 
                    type="date"
                    min="1922-01-01"
                    max="2004-10-01"
                    name='birthday'     
                    value={inputs.birthday}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="aboutMe">Tell us about yourself!</label>
                <input 
                    type="textarea"
                    name='aboutMe'     
                    value={inputs.aboutMe}
                    onChange={handleChange}
                    required
                />

                <h3>I'm looking for...</h3>
                <label htmlFor="agePrefFloor">Someone between the ages of</label>
                <input 
                    type="number"
                    min="18"
                    max="100"
                    placeholder='18'
                    name='agePrefFloor'     
                    value={inputs.agePrefFloor}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="agePrefCeiling">and</label>
                <input 
                    type="number"
                    min="18"
                    max="100"
                    placeholder='100'
                    name='agePrefCeiling'     
                    value={inputs.agePrefCeiling}
                    onChange={handleChange}
                    required
                />
                <br />
                <label htmlFor='genderPref'>Who is</label>
                <input 
                type="checkbox"
                value="WOMAN"
                onChange={handleCheck}
                />
                <span>a Woman</span>
                <input 
                type="checkbox"
                value="MAN"
                onChange={handleCheck}
                />
                <span>a Man</span>
                <input 
                type="checkbox"
                value="NON-BINARY"
                onChange={handleCheck}
                />

                <span>Non-Binary</span>
                <input 
                type="checkbox"
                value="OTHER"
                onChange={handleCheck}
                />
                <span>Other</span>

                <button>Submit</button>
            </form>
        </div>
    )
}
