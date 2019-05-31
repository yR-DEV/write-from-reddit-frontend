import React from 'react';

const Response = (props) => {

    

    return (
        <div className="container">
            <div onClick={props.setPrompt}>
                {props.response.fiction_response}
            </div>
            <button onClick={props.editResponse} id={props.response.id}>Edit</button>
            <button onClick={props.destroyResponse} id={props.response.id}>Delete</button>
        </div>
    )
}

export default Response