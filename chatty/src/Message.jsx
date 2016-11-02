import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class Message extends Component {

  render() {
    return (
      <div>
      <span className="username">{this.props.usernameProp}</span>
      <span className="content">{this.props.contentProp}</span>
     </div>
    );
  }
}
export default Message;