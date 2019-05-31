import React from 'react';

export default class Writing extends React.Component {

    render() {
        return (
            <div className="container">
                <p>{this.props.selectedPrompt}</p>
                {
                    !this.props.toggleEdit ? <button onClick={this.props.submitDraft}>Submit</button> : <button onClick={this.props.submitEdit} id={this.props.editId}>SubmitEdit</button>
                }
                <div>{this.toggleButton}</div>
                <textarea onChange={this.props.handleDraft} value={this.props.writingResponseDraft}></textarea>
            </div>
        )
    }
}