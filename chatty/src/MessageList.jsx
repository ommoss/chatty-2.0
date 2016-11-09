import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
      var _data = this.props.dataProp;
      return(
        <div>
            {_data.map(function(object, i){
               return (
                <div className = "message" key={object.id}>
                <Message usernameProp = {object.user}
                          contentProp = {object.content} />
                </div>
                )
             })}
        </div>
       );
    }
  // render() {
  //   return (
  //     <div>
  //       <div className="message"><Message dataProp = {this.props.dataProp}></Message></div>
  //       <div className="message system"></div>
  //     </div>
  //   );
  // }
}
export default MessageList;