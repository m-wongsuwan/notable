import React, { useState } from 'react'
import { ChatAndNoteContext } from '../../context/ChatAndNoteProvider'
import { ProfilesContext } from '../../context/ProfilesProvider'
import { UserContext } from '../../context/UserProvider'

export default function Chat() {

    const { user } = React.useContext(UserContext)
    const { setFocusProfile, profileToView, setProfileToView, getName, profiles } = React.useContext(ProfilesContext)
    const { chats, getChats, focusChat, setFocusChat, sendMessage } = React.useContext(ChatAndNoteContext)

    // const name = chats.map((chat, index) => {
    //     return getName(chat.users.find(element => element !== user._id))
    // })
    const initInputs = {messageText: ""}
    const [inputs, setInputs] = useState(initInputs)
    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    const nameList = chats.map((chat, index) => {
        return(
            <div key={index}>
                <h3 onClick={()=> {
                    setFocusProfile(chat.users.find(element => element !== user._id))
                    setFocusChat(chat)
                } }>{getName(chat.users.find(element => element !== user._id))}</h3>
            </div>
        )
    })

    function displayChat(chatObj) {

    }

    return (
        <div className='chat'>
            <h1>Chat</h1>
            <button onClick={()=> {
                console.log(chats)
            }} >chats</button>
            <div className='chat--gridContainer'>
                <div className='chat--chatList'>
                    {chats ? nameList : ""}
                </div>
                <div className='chat--chatBox' >
                    <p>chatbox</p>
                    <p>{profileToView.firstName}</p>
                    <button onClick={()=> console.log(focusChat)} >focus chat</button>
                    <button onClick={()=> console.log('hi')}>log something</button>
                    <form onSubmit={(e)=> {
                        e.preventDefault()
                        sendMessage(profileToView._id, focusChat._id, inputs)
                        setInputs(initInputs)
                    }}>
                        <input 
                            type="text"
                            placeholder='Aa'
                            name='messageText'     
                            value={inputs.messageText}
                            onChange={handleChange}
                            required
                        />
                    <button>Send</button>
                </form>
                </div>

            </div>
            
        </div>
    )
}