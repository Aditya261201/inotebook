import React from 'react'

const Noteitem = (props) => {
    const { note } = props;
    return (
        <div className="col-md-3 my-2">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae possimus esse qui corrupti quae voluptate, dolorum excepturi fugit laborum at voluptatem mollitia, consequatur tempora numquam nihil iusto. Temporibus facere nisi et corporis, in commodi eum fugiat ipsam exercitationem nobis quam eius quae maxime error eligendi!</p>
                    <span className="material-symbols-outlined mx-2" role="button">delete</span>
                    <span className="material-symbols-outlined mx-2" role="button">edit</span>
                </div>
            </div>
        </div>
    )
}

export default Noteitem