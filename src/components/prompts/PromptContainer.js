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
            <br></br>
            <button onClick={props.handleMorePrompts}>Get 4 more pls.</button>
            {prompts}
        </div>
    )
}

export default PromptContainer