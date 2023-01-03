import React,{ useContext } from 'react'
import Notes from './Notes'


const Home = (props) => {

    const {showAlert} = props;

    return (
        <div>
            <div className="container my-4">
                <Notes showAlert={showAlert} />
            </div>
        </div>
    )
}

export default Home
