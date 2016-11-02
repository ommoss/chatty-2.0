import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class ChatBar extends Component {
  render() {
    return (
    <div>
      <input id="username" type="text" value={this.props.currentUserProp} />
      <input id="new-message" type="text" placeholder="Type a message and hit ENTER" value = {this.props.value} onChange = {this.props.handleChange} />
      <button type = "submit" onClick= {this.props.handleSubmit}> Submit </button>
    </div>
    );
  }
}
export default ChatBar;

