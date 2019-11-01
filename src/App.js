import React from 'react';
import  Navigation from "./components/Navigation.js"
import { Routes } from "./components/Routes.js"

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='app'>
        <Navigation />
        <Routes history = {this.props.history}/>
      </div>
    );
  }
}

export default App;
