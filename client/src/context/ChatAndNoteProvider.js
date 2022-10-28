import React, { useState } from "react";
import axios from 'axios'
import { UserContext } from './UserProvider'

export const ChatAndNoteContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function ChatAndNoteProvider(props) {

    const { user, token } = React.useContext(UserContext)

    const [sentNotes, setSentNotes] = useState([])
    const [receivedNotes, setReceivedNotes] = useState([])

    function getReceivedNotes() {
        userAxios.get(`/api/notes/getnotes/${user._id}`)
        .then(res => setReceivedNotes(res.data))
        .catch(err => console.log(err))
    }

    React.useEffect(()=> {
        if(token) {
            getReceivedNotes()
        } else {
            console.log("no token")
        }
    }, [token])

    function getSentNotes(userId) {
        userAxios.get(`/api/notes/getsentnotes/${userId}`)
            .then(res => setSentNotes(res.data))
            .catch(err => console.log(err))
    }

    React.useEffect(()=> {
        if(token) {
            getSentNotes(user._id)
        } else {
            console.log("no token")
        }
    }, [token])

    function leaveNote(noteObj, userId) {
        userAxios.post(`/api/notes/addnote/${userId}`, noteObj)
            .then(res => setSentNotes(prevNotes =>[...prevNotes, res.data]))
            .catch(err => console.log(err))
    }

    return(
        <ChatAndNoteContext.Provider
            value={{
                leaveNote,
                sentNotes,
                setSentNotes,
                receivedNotes
            }}
        >
            {props.children}
        </ChatAndNoteContext.Provider>
    )


}