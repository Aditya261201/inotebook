import React,{useContext} from 'react'
import noteContext from "../Context/notes/noteContext"

const Noteitem = (props) => {

    const context = useContext(noteContext);   // using noteContext
    const {deleteNote} = context; 

    const { note,updateNote } = props;
    return (
        <div className="col-md-3 my-2">
            <div className="card" style={{"border": '1px solid black'}}>
                <div className="card-body">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '85%' }}>{note.tag}</span>
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <span className="material-symbols-outlined mx-2" role="button" onClick={()=>{deleteNote(note._id)}}>delete</span>
                    <span className="material-symbols-outlined mx-2" role="button" onClick={() => {updateNote(note)}}>edit</span>
                </div>
            </div>
        </div>
    )
}

export default Noteitem