import React from 'react';

const Prompt = (props) => {


    return (
        <div className="container">
            <p id={props.prompt.id} onClick={props.setPrompt}>
                {props.prompt.fiction_prompt}
            </p>
        </div>
    )
}

export default Prompt