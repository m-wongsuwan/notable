import React, { useState } from "react";
import axios from 'axios'

export const UserContext = React.createContext()

// const userAxios = axios.create()

// userAxios.interceptors.request.use(config => {
//     const token = localStorage.getItem("token")
//     config.headers.Authorization = `Bearer ${token}`
//     return config
// })


export default function UserProvider(props) {
    
    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || "",
        token: localStorage.getItem('token') || "",
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)

    function signup(signupInfo){
        axios.post('/auth/signup', signupInfo)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthError(err.response.data.errMsg))
    }

    function login(credentials) {
        axios.post('/auth/login', credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch(err => handleAuthError(err.response.data.errMsg))
    }

    function logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            user: {},
            token: ""
        })
    }

    function handleAuthError(errMsg) {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    return(
        <UserContext.Provider
            value={{
                ...userState,
                setUserState,
                signup,
                login, 
                logout
            }}    
        >
            {props.children}
        </UserContext.Provider>
    )
}

// age garbage
// .then(res => {
//     const { user, token } = res.data
//     let userAge = 0
//     if(currentMonth >= user.birthMonth) {
//         userAge = currentYear - user.birthYear - 1
//     } else {
//         userAge = currentYear - user.birthYear
//     }
//     localStorage.setItem("token", token)
//     localStorage.setItem("user", JSON.stringify(user))
//     setUserState(prevUserState => ({
//         ...prevUserState,
//         user,
//         user: {...user, age: userAge},
//         token
//     }))
// })