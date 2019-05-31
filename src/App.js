import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import PromptContainer from './components/prompts/PromptContainer';
import ResponseContainer from './components/responses/ResponseContainer';
import Writing from './components/writings/Writing';

import './App.css';

const PROMPT_API = "http://localhost:3000/api/v1/writing_prompts"
const RESPONSE_API = "http://localhost:3000/api/v1/writing_responses"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      writing_prompts: [],
      writing_responses: [],
      writing_response_draft: "",
      displayed_prompts: 4,
      selected_prompt: "",
      selected_prompt_id: 0,
      toggle_edit: false,
      edit_id: ""
    }
  }

  main = () => {
    fetch(PROMPT_API)
      .then(response => response.json())
      .then(writing_prompts => this.setState({ writing_prompts })) 
      
    fetch(RESPONSE_API)
      .then(response => response.json())
      .then(writing_responses => this.setState({ writing_responses }))  
  }

  componentDidMount = () => {
    this.main();
  }

  handleMorePrompts = (event) => {
    this.setState({ displayed_prompts: this.state.displayed_prompts + 4 })
  }

  handleDraft = (event) => {
    this.setState({ writing_response_draft: event.target.value })
  }

  redirectAfterNewResponse = () => {
    console.log('inside breh');
    
    return <Redirect to="/" />
  }

  submitDraft = (event) => {
    event.preventDefault();
    fetch(RESPONSE_API, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fiction_response: this.state.writing_response_draft,
        writer_id: 1,
        writing_prompt_id: 1
      })
    })
      .then(res => this.main())
      this.redirectAfterNewResponse();
  }

  destroyResponse = (event) => {
    fetch(`${RESPONSE_API}/${event.target.id}`, {method: "DELETE"})
      .then(response => this.main())
  } 

  setPrompt = (event) => {
    this.setState({ 
      selected_prompt: event.target.innerHTML, 
      selected_prompt_id: event.target.id
    })
  }

  toggleEditButton = () => {
    this.state.toggle_edit ? this.setState({ toggle_edit: false }) : this.setState({ toggle_edit: true })
  }

  editResponse = (event) => {
    const { id } = event.target;
    const responseToEdit = this.state.writing_responses.filter(response =>  {
      return response.id.toString() === id
    })
    this.setState({ writing_response_draft: responseToEdit[0].fiction_response,
                    edit_id: event.target.id,
                  })
    this.toggleEditButton();
  }

  // createEditBody = (editId) => {
  //   return JSON.stringify({
  //     fiction_response: this.state.writing_response_draft,
  //     writer_id: 1,
  //     writing_prompt_id: 
  //   })
  // }

  submitEdit = (event) => {
    console.log(event.target.id);
    const patchBody = JSON.stringify({
      fiction_response: this.state.writing_response_draft,
      writer_id: 1,
      writing_prompt_id: event.target.id
    })

    fetch(`${RESPONSE_API}/${event.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: patchBody
    })
    .then(response => this.main())
  }

//   fetch(`${endPoint}/${habitEditId}`, {
//     method: "PATCH",
//     headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//     },
//     body: JSON.stringify(patchBody)
// }).then(response => console.log(response))
// .then(res => {
//     main();
// })

  render() {
    return (
      <div className="App">
        <Router>

          <nav>
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">Logo</a>
              <ul id="nav-mobile" className="right">
                <li><Link to="/">Prompts</Link></li>
                <li><Link to="/responses/">Responses</Link></li>
                <li><Link to="/write/">Write</Link></li>
              </ul>
            </div>
          </nav>

          <Route 
            exact path="/" render={(props) => (
              <PromptContainer 
                writingPrompts={this.state.writing_prompts}
                displayedPrompts={this.state.displayed_prompts}
                handleMorePrompts={this.handleMorePrompts}
                setPrompt={this.setPrompt}
              />
            )}
          />

          <Route 
            exact path="/responses/" render={(props) => (
              <ResponseContainer 
                writingResponses={this.state.writing_responses}
                destroyResponse={this.destroyResponse}
                editResponse={this.editResponse}
              />
            )}
          />

          <Route 
            exact path="/write/" render={(props) => (
              <Writing 
                handleDraft={this.handleDraft}
                submitDraft={this.submitDraft}
                submitEdit={this.submitEdit}
                selectedPrompt={this.state.selected_prompt}
                writingResponseDraft={this.state.writing_response_draft}
                toggleEdit={this.state.toggle_edit}
                submitEdit={this.submitEdit}
                editId={this.state.edit_id}
              />
            )}
          />

        </Router>
      </div>
    );
  }
}

