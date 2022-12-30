import React, { useContext, useState } from 'react'
import noteContext from "../Context/notes/noteContext"

const AddNote = () => {

    const context = useContext(noteContext);   // using noteContext
    const {addNote} = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })   // state for adding notes ...initial state for note is blank title,description,tag.

    //for changing the state value
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})      //means all the values in note object remains as it.but add/overwrite the further written properties.
    }

    //handle click when we click on addnote submit button.
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)  
    }

    return (
        <div className="container my-4">
            <h1>Add a note</h1>
            <form className="my-3">

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" maxLength={13} className="form-control" id="tag" name="tag" onChange={onChange} />
                </div>
                
                <button type="submit" onClick={handleClick} className="btn btn-primary">Add note</button>
            </form>
        </div>
    )
}

export default AddNote
