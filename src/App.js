import React from 'react';
import logo from './logo.svg';
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
        <Routes />
      </div>
    );
  }
}

export default App;
