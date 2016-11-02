import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Data extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         username: "Bob",
         "content": "Content from props..."
      }
   }

   render() {
      return (
         <div>
            <Username usernameProp = {this.state.username}/>
            <Content contentProp = {this.state.content}/>
         </div>
      );
   }
}

export default Data;

