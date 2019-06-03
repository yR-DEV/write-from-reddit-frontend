import React from 'react';

import Response from './Response';

const ResponseContainer = (props) => {

    const responses = props.writingResponses.map(response => {
        return <Response key={response.id} 
                    response={response} 
                    destroyResponse={props.destroyResponse}
                    editResponse={props.editResponse}
                />
    })

    return (
        <div className="container response-container">
            <div className="row">
                <h2>R E S P A W N Z E</h2>
            </div>
            <div className="row">
                {responses}
            </div>
        </div>
    )
}

export default ResponseContainer