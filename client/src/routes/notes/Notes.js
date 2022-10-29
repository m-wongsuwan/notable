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
            <div className='leftNote' key={`leftNote${index}`}>
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
            <div className='receivedNote' key={`leftNote${index}`}>
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

    return (
        <div className='notes'>
            <h1>Notes</h1>
            <h2>Notes received</h2>
            {receivedNotes.length > 0 ? receivedNotesDisplay : noNotesMessage('received')}
            <h2>Notes left</h2>
            {sentNotes.length > 0 ? sentNotesDisplay : noNotesMessage('sent')}
        </div>
    )
}