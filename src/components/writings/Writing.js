import React from 'react';

export default class Writing extends React.Component {

    render() {
        return (
            <div className="container">
                <h3>{this.props.selectedPrompt}</h3>
                {
                    !this.props.toggleEdit ? <a className="red accent-2 waves-effect waves-light btn" onClick={this.props.submitDraft}>Submit</a> : <a className="red accent-2 waves-effect waves-light btn" onClick={this.props.submitEdit} id={this.props.editId}>SubmitEdit</a>
                }
                <br></br>
                <br></br>
                <div className="row">
                <div class="input-field col s12">
                <textarea class="materialize-textarea" onChange={this.props.handleDraft} value={this.props.writingResponseDraft}></textarea>
                </div>
                </div>
            </div>
        )
    }
}

