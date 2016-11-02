// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

 ReactDOM.render(<App username="bob" content="hello world" />, document.getElementById('react-root'));
