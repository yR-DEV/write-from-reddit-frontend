import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Prompt from './Prompt';

const PromptContainer = (props) => {

    const prompts = props.writingPrompts.map((prompt, i) => {
        while (i < props.displayedPrompts)
            return <Prompt id={prompt.id} key={prompt.id} prompt={prompt} setPrompt={props.setPrompt}/>
    })    

    return (
        <div className="container">
            <h2>P R A W M P U H T S</h2>
            <br></br>
            <a className="red accent-2 waves-effect waves-light btn" onClick={props.handleMorePrompts}>'Get' 4 more... 'GET' IT?... SHUT UP IM FUNNY.</a>
            <br></br>
            <br></br>
            <div className="collection">
            {prompts}
            </div>
        </div>
    )
}

export default PromptContainer