import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

let counter = 1;
class App extends React.Component {
   constructor(props){
      super(props);
      this.socket = new WebSocket("ws://localhost:4000");
      this.state = {
          currentUser: "Anonymous", // optional. if currentUser is not defined, it means the user is Anonymous
          messages: [],
          value: "",
      }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.socket.onmessage = (event) => {

      let data = JSON.parse(event.data);
      if(data.type === "message"){
        const messages = this.state.messages.concat(data);
        this.setState({messages: messages});
      }else if(data.type === "incomingNotification"){
        this.setState({total: data.total})
      }
    }
   }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
  this.socket.send(JSON.stringify(event))
  this.setState({value: ""})
     }
   componentDidMount() {
     this.socket.onopen = function (event) {
      console.log("Connected to Server.")
    };
  }
  handleNameChange(newName, oldName){
    this.setState({currentUser: newName})
    console.log(newName, oldName)
    let nameChange = {
      type: "userChange",
      new: newName,
      old: oldName,
    }
    this.socket.send(JSON.stringify(nameChange));
  }
   render() {
      return (
      <div className="wrapper">
        <div>
          <nav>
            <h1>Chatty</h1>
            <div id="users">Users Online: {this.state.total}</div>
          </nav>
        </div>
        <div id = "message-list">
            <MessageList dataProp = {this.state.messages} />
         </div>
        <footer><ChatBar value = {this.state.value} currentUserProp = {this.state.currentUser}  handleSubmit = {this.handleSubmit} handleChange= {this.handleChange} handleNameChange = {this.handleNameChange}/></footer>
      </div>
    );
  }
}

export default App;
