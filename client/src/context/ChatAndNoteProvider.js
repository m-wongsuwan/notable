import React, { useState } from "react";
import axios from 'axios'
import { UserContext } from './UserProvider'
import { ProfilesContext } from "./ProfilesProvider";

export const ChatAndNoteContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function ChatAndNoteProvider(props) {

    const { user, token } = React.useContext(UserContext)
    const { profileToView } = React.useContext(ProfilesContext)

    const [sentNotes, setSentNotes] = useState([])
    const [receivedNotes, setReceivedNotes] = useState([])
    const [chats, setChats] = useState([])
    const [focusChat, setFocusChat] = React.useState({})

    
    function returnLeftNote(receiverId) {
        return sentNotes.find(note => note.receivingUserId === receiverId)
    }

    function getReceivedNotes() {
        userAxios.get(`/api/notes/getnotes/${user._id}`)
            .then(res => setReceivedNotes(res.data))
            .catch(err => console.log(err))
    }
    React.useEffect(()=> {
        if(token) {
            getReceivedNotes()
        } 
    }, [token, profileToView])

    function getChats() {
        userAxios.get('/api/chat/getchats')
            .then(res => {
                setChats(res.data)
            })
            .catch(err => console.log(err))
    }
    React.useEffect(()=> {
        if(token) {
            getChats()
        }
    }, [token, profileToView])


    function getSentNotes(userId) {
        userAxios.get(`/api/notes/getsentnotes/${userId}`)
            .then(res => setSentNotes(res.data))
            .catch(err => console.log(err))
    }

    React.useEffect(()=> {
        if(token) {
            getSentNotes(user._id)
        }
    }, [token])

    // i don't think i need to make an api call when we have chats state to work with
    function getConversation(chatId) {
        userAxios.get(`/api/chat/getconversation/${chatId}`)
            .then(res => setFocusChat(res.data))
            .catch(err => console.log(err))
    }

    // React.useEffect(()=> {
    //     if(token && profileToView) {
    //         // needs caht id not profile id
    //         getConversation(profileToView._id)
    //     }
    // }, [token, profileToView])

    function leaveNote(noteObj, userId) {
        userAxios.post(`/api/notes/addnote/${userId}`, noteObj)
            .then(res => setSentNotes(prevNotes =>[...prevNotes, res.data]))
            .catch(err => console.log(err))
    }

    function startChat(otherUserId) {
        userAxios.post(`/api/chat/startchat/${otherUserId}`)
            .then(res => setChats(prevChats => ([...prevChats, res.data])))
            .catch(err => console.log(err))
    }

    function usersHaveChat(otherUserId) {
        const usersContainsId = (element) => element.users.indexOf(otherUserId) > -1
        return console.log(chats.some(usersContainsId))
    }

    function sendMessage(userId, chatId, updateObj){
        userAxios.put(`/api/chat/sendmessage/${userId}`, updateObj)
            .then(res => setChats(prevChats => {
                let returnChats = prevChats
                return returnChats.map(chat => {
                    if(chat._id === chatId) {
                        return ({
                            ...chat,
                            chatLog: [...chat.chatLog, updateObj]
                        })
                    } else {
                        return chat
                    }
                })
                
            }))
            .catch(err => console.log(err))
    }

    return(
        <ChatAndNoteContext.Provider
            value={{
                leaveNote,
                sentNotes,
                setSentNotes,
                receivedNotes,
                returnLeftNote,
                startChat,
                chats,
                focusChat,
                setFocusChat,
                usersHaveChat,
                sendMessage
            }}
        >
            {props.children}
        </ChatAndNoteContext.Provider>
    )


}