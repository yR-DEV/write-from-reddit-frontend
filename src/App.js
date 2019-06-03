import React from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import M from 'materialize-css';

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
      toggle_submit: false,
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

    this.setState({ writing_response_draft: "", selected_prompt: "" })

    M.AutoInit();
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
        writing_prompt_id: this.state.selected_prompt_id
      })
    })
      .then(res => this.main())
  }

  destroyResponse = (event) => {
    fetch(`${RESPONSE_API}/${event.target.id}`, {method: "DELETE"})
      .then(response => this.main())
  } 

  setPromptRedirect = () => {
    console.log('inside of setPromptRedirect');
  }

  setPrompt = (event) => {
    this.setPromptRedirect();
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
    const promptForEdit = this.state.writing_prompts.filter(prompt => {
      return responseToEdit[0].writing_prompt_id === prompt.id
    })
    this.setState({ writing_response_draft: responseToEdit[0].fiction_response,
                    edit_id: event.target.id,
                    selected_prompt: promptForEdit[0].fiction_prompt
                  })
    this.toggleEditButton();
  }

  createEditBody = (editId) => {
    return JSON.stringify({
      fiction_response: this.state.writing_response_draft,
      writer_id: 1,
      writing_prompt_id: 1
    })
  }

  submitEdit = (event) => {
    this.setState({ toggle_edit: false })
    const editBody = this.createEditBody(event.target.id);
    fetch(`${RESPONSE_API}/${event.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: editBody
    })
    .then(response => this.main())
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div className="row dropdown-nav">
          <a  class='dropdown-trigger btn red accent-2 drp-btn' href='#' onClick={this.handleDropDown} data-target='dropdown1'><i class="material-icons nav-icon">adjust</i></a>
          </div>  
            <ul id='dropdown1' class='dropdown-content'>
              <li><Link class="red-text" to="/">Prompts</Link></li>
              <li><Link class="red-text" to="/responses/">Responses</Link></li>
              <li><Link class="red-text" to="/write/">Write</Link></li>
              <li class="divider" tabindex="-1"></li> 
              <li><Link class="red-text" to="#">Logout</Link></li>
            </ul>
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

