import React,{useContext} from 'react'
import noteContext from "../Context/notes/noteContext"
import Noteitem from './Noteitem';

const Notes = () => {

    const context = useContext(noteContext);   // using noteContext
    const {notes, setNotes} = context;         // destructuring context as notes and setNotes function.


    return (
        <div className="row my-3">
            <h1>Your Notes</h1>
            {notes.map((note) =>{
                return <Noteitem note={note}/>
            })}
        </div>
    )
}

export default Notes