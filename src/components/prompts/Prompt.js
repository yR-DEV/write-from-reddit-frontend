import React from 'react';

const Prompt = (props) => {

    // const changeToActive = () => {
    //     props.setPrompt();
    // }

    return (
        <div className="container">
            <a  className="collection-item black-text" id={props.prompt.id} onClick={props.setPrompt}>
                {props.prompt.fiction_prompt}
            </a>
        </div>
    )
}

export default Prompt