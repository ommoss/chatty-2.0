import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
//import data from './data.jsx'
let counter = 4;
class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
          currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
          messages: [
            {
              id: "1",
              username: "Bob",
              content: "Has anyone seen my marbles?",
            },
            {
              id: "2",
              username: "Anonymous",
              content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
            }
          ],
          value: "",
      }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   }
   handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    const newMessage = {id: counter, username: this.state.currentUser.name, content: this.state.value};
    console.log(newMessage);
    const messages = this.state.messages.concat(newMessage);
    counter += 1;
    this.setState({value: ""})
    this.setState({messages: messages});
     }
   componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }
   render() {
      return (
      <div className="wrapper">
        <div>
          <nav><h1>Chatty</h1></nav>
        </div>
        <div id = "message-list">
            <MessageList dataProp = {this.state.messages} />
         </div>
        <footer><ChatBar value = {this.state.value} currentUserProp = {this.state.currentUser.name}  handleSubmit = {this.handleSubmit} handleChange= {this.handleChange}/></footer>
      </div>
    );
  }
}

export default App;
