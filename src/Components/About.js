import React from 'react'
import { useContext, useEffect } from 'react'
import noteContext from '../Context/notes/noteContext'   // here we want to use context so first we import it. and also 

const About = () => {
    const a = useContext(noteContext)
    useEffect(() => {      
        a.update()    // updating the state i.e. as per update func in NoteState.js
        // eslint-disable-next-line
    }, [])
    
    return (
        // here we can use state ie.
        <div>this is about {a.state.name} and he is in {a.state.class} class.</div>
    )
}

export default About 