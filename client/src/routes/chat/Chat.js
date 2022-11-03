import React, { useState } from 'react'
import { ChatAndNoteContext } from '../../context/ChatAndNoteProvider'
import { ProfilesContext } from '../../context/ProfilesProvider'
import { UserContext } from '../../context/UserProvider'

export default function Chat() {

    const { user } = React.useContext(UserContext)
    const { 
        setFocusProfile, 
        profileToView, 
        // setProfileToView, 
        getName, 
        // profiles 
    } = React.useContext(ProfilesContext)
    const { 
        chats, 
        // getChats, 
        focusChat, 
        setFocusChat, 
        sendMessage 
    } = React.useContext(ChatAndNoteContext)

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
                <h3 className='chat--name' onClick={()=> {
                    setFocusProfile(chat.users.find(element => element !== user._id))
                    setFocusChat(chat)
                } }>{getName(chat.users.find(element => element !== user._id))}</h3>
            </div>
        )
    })

    function displayMessages(chatObj) {
        return chatObj.chatLog.map((message, index) => {
            return (
                <div key={`message-${index}`} className={`chat--${message.sender === user._id ? 'user' : 'crush'}Message chat--namePlusMessage`}>
                    <h4>{getName(message.sender)}</h4>
                    <p className='chat--message'>{message.messageText}</p>
                    <br />
                </div>
            )
        })
    }
    const messageDisplay = document.getElementById('chat--messageDisplay')

    function scrollToBottom() {
        document.getElementById('chat--messageDisplay').scrollTop = messageDisplay.scrollHeight + 1130 - 859
    }

    scrollToBottom()


    return (
        <div className='chat'>
            <h1 className='pageHead'>Chat</h1>

            <div className='chat--gridContainer'>
                <div className='chat--chatList'>
                    <h2>Active Chats</h2>
                    {chats ? nameList : ""}
                </div>
                <div className='chat--chatBox' >
                    <h2>Talk to {profileToView.firstName}!</h2>
                    <div className='chat--messageDisplay' id='chat--messageDisplay'>
                        {displayMessages(focusChat)}
                    </div>

                    <form
                        className='chat--sendMessageForm'
                        onSubmit={(e)=> {
                            e.preventDefault()
                            sendMessage(profileToView._id, focusChat._id, inputs)
                            setFocusChat(prevState => {
                                let newChatLogObj = inputs
                                newChatLogObj.sender = user._id
                                return ({
                                    ...prevState,
                                    chatLog: [...prevState.chatLog, newChatLogObj]
                                })
                            })
                            // setFocusChat(prevState => ({
                            //     ...prevState,
                            //     chatLog: [...prevState.chatLog, inputs]
                            // }))
                            setInputs(initInputs)
                        }}
                    >
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