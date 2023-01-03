import React, { useContext, useEffect, useRef, useState} from 'react'
import noteContext from "../Context/notes/noteContext"
import AddNote from './AddNote';
import Noteitem from './Noteitem';

const Notes = (props) => {

    const context = useContext(noteContext);   // using noteContext
    const { notes, getNotes, editNote } = context;
    

    // to get all the notes on the frontend from backend
    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])


    const ref = useRef(null)    // useRef hook uses the reference
    const refClose = useRef(null)    // useRef hook uses the reference
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "" })

    const updateNote =(currentNote)=>{
        ref.current.click()   // when update note is called current refrence positon will be clicked.
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }
    //for changing the state value
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })      //means all the values in note object remains as it.but add/overwrite the further written properties.
    }

    //handle click when we click on addnote submit button.
    const handleClick = (e) => {
        // console.log("updating note..", note)
        // console.log(note.id)
        editNote(note.id, note.etitle,note.edescription,note.etag);
        refClose.current.click();    // close the modal
        props.showAlert("Updated Successfully", "success")
    } 

    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            {/* button for modal with none display and ref */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            {/* modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* form to edit note */}
                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Description</label>
                                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="etag" className="form-label">Tag</label>
                                <input type="text" maxLength={13} className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 3 || note.edescription.length < 5} onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container row my-3">
                    <h1>Your Notes</h1>
                <div className="contaier d-flex">
                    {notes.length === 0 && "No notes to display "}
                    {notes.map((note) => {
                        return <Noteitem note={note} updateNote={updateNote} key={note._id} showAlert={props.showAlert}/>
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes