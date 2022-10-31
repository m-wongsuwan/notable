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
                <h3 onClick={()=> {
                    setFocusProfile(chat.users.find(element => element !== user._id))
                    setFocusChat(chat)
                } }>{getName(chat.users.find(element => element !== user._id))}</h3>
            </div>
        )
    })

    function displayMessages(chatObj) {
        return chatObj.chatLog.map((message, index) => {
            return (
                <div key={`message-${index}`} className={`chat--${message.sender === user._id ? 'user' : 'crush'}Message`}>
                    <h4>{getName(message.sender)}</h4>
                    <p>{message.messageText}</p>
                    <br />
                </div>
            )
        })
    }

    return (
        <div className='chat'>
            <h1>Chat</h1>
            <button onClick={()=> {
                console.log(inputs)
            }} >inputs</button>
            <div className='chat--gridContainer'>
                <div className='chat--chatList'>
                    {chats ? nameList : ""}
                </div>
                <div className='chat--chatBox' >
                    <p>chatbox</p>
                    <p>{profileToView.firstName}</p>
                    {displayMessages(focusChat)}
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