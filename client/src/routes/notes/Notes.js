import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatAndNoteContext } from '../../context/ChatAndNoteProvider'
import { ProfilesContext } from '../../context/ProfilesProvider'

export default function Notes() {

    let navigate = useNavigate();

    const { sentNotes, receivedNotes } = React.useContext(ChatAndNoteContext)
    const { getName, setFocusProfile } = React.useContext(ProfilesContext)

    const sentNotesDisplay = sentNotes.map((note, index) => {
        return (
            <div className='leftNote note' key={`leftNote${index}`}>
                <h3>{getName(note.receivingUserId)}</h3>
                <p>{note.noteText}</p>
                <button 
                    onClick={()=> {
                    setFocusProfile(note.receivingUserId)
                    navigate('/viewprofile')
                }}>
                    See Profile
                </button>
            </div>
        )
    })

    const receivedNotesDisplay = receivedNotes.map((note, index) => {
        return (
            <div className='receivedNote note' key={`leftNote${index}`}>
                <h3>{getName(note.initiatingUserId)}</h3>
                <p>{note.noteText}</p>
                <button 
                    onClick={()=> {
                    setFocusProfile(note.initiatingUserId)
                    navigate('/viewprofile')
                }}>
                    See Profile
                </button>
            </div>
        )
    })

    function noNotesMessage(sentOrReceived) {
        if(sentOrReceived === "sent") {
            return <h3>You haven't sent any notes yet. Check out the discovery page!</h3>
        } else {
            return <h3>You haven't received any notes yet. Give it some time! In the meantime try leaving some notes of your own!</h3>
        }
    }

    const conditionalStyleObj = {
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: "2em"
    }

    return (
        <div className='notes'>
            <h1 className='pageHead'>Notes</h1>
            <div className='notes--gridContainer'>
                <div className='notes--received'>
                    <h2>Received Notes</h2>
                    <div className='' style={receivedNotes.length === 0 ? conditionalStyleObj : {}}>
                        {receivedNotes.length > 0 ? receivedNotesDisplay : noNotesMessage('received')}
                    </div>
                </div>
                <div className='notes--left'>
                    <h2>Notes You Left</h2>
                    <div className='' style={sentNotes.length === 0 ? conditionalStyleObj : {}}>
                        {sentNotes.length > 0 ? sentNotesDisplay : noNotesMessage('sent')}
                    </div>
                </div>
            </div>
            
        </div>
    )
}