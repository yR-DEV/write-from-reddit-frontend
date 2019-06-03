import React from 'react';

const Response = (props) => {

    

    return (
        <div className="container">
            <div className="card">
                <div className="row">
                    <div className="col s10">
                        <div className="response-text" onClick={props.setPrompt}>
                            
                            {props.response.fiction_response}
                            
                        </div>
                    </div>
                    <div className="col s2">       
                        <div className="container response-btn-container">
                            <a className="red accent-2 waves-effect waves-light btn edit-res-btn" onClick={props.editResponse} id={props.response.id}>Edit</a>
                            <br></br>
                            <br></br>
                            <a className="red accent-2 waves-effect waves-light btn" onClick={props.destroyResponse} id={props.response.id}>Delete</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <p>Last Update: </p>
                    <p>{props.response.updated_at}</p>
                </div>
            </div>
        </div>
    )
}

export default Response

{/* <a class="waves-effect waves-light btn"><i class="material-icons right">cloud</i>button</a> */}