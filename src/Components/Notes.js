import React,{useContext} from 'react'
import noteContext from "../Context/notes/noteContext"
import AddNote from './AddNote';
import Noteitem from './Noteitem';

const Notes = () => {

    const context = useContext(noteContext);   // using noteContext
    const { notes, addNote, deleteNote, editNote } = context; 


    return (
        <>
        {/* add note component. */}
        <AddNote/>     
        <div className="row my-3">
            <h1>Your Notes</h1>
            {notes.map((note) =>{
                return <Noteitem note={note} key={note._id}/>
            })}
        </div>
        </>
    )
}

export default Notes