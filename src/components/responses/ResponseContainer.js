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
        <div className="container">
            {responses}
        </div>
    )
}

export default ResponseContainer