import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {
          type: "newMessage",
          currentUser: "Anonymous", // optional. if currentUser is not defined, it means the user is Anonymous
          oldName: "",
          message: "",
      }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    }
    handleChange(event) {
      this.setState({message: event.target.value})
      console.log("rendering <ChatBar />")
    };
    handleNameChange(event){
      this.setState({currentUser: event.target.value})
      console.log(this.state.currentUser)
    }
    handleSubmit(event){
      if(event.key == "Enter" && event.target.value !== ""){
        if(event.target.id == "username"){
          if(this.state.oldName !== ""){
            if(this.state.currentUser === this.state.oldname){
              this.props.handleNameChange(this.state.currentUser, this.state.oldName);
              this.setState({oldName: this.state.currentUser})
            }
          }
        }
        else if(event.target.id === "new-message"){
            var msg = {
                type: "message",
                text: this.state.message,
                user: this.state.currentUser,
              };
          if(this.state.oldName !== "" && (this.state.oldName !== this.state.currentUser)){
            console.log("message inside if");
            console.log(this.state.oldName);
            console.log(this.state.currentUser);
            this.props.handleNameChange(this.state.currentUser, this.state.oldName);
          }
          this.setState({oldName: this.state.currentUser});
          this.props.handleSubmit(msg);
          this.state.message = "";
        }
      }
    }
  render() {
    return (
    <div>
      <input id="username" type="text" placeholder = {this.state.currentUser} onChange = {this.handleNameChange} onKeyDown ={this.handleSubmit} value = {this.props.user}/>
      <input id="new-message" type="text" placeholder="Type a message and hit ENTER" value = {this.state.message} onChange = {this.handleChange} onKeyDown = {this.handleSubmit}/>
    </div>
    );
  }
}
export default ChatBar;

