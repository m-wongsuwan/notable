import React from 'react'
import { ChatAndNoteContext } from '../../context/ChatAndNoteProvider'

export default function Notes() {

    const { sentNotes, receivedNotes } = React.useContext(ChatAndNoteContext)

    return (
        <div className='notes'>
            <h1>Notes</h1>
            <h2>Notes received</h2>
            <button onClick={()=> console.log(receivedNotes)}>console log received notes</button>
            <h2>Notes left</h2>
            <button onClick={()=> console.log(sentNotes)}>console log sent notes</button>
        </div>
    )
}