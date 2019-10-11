import React from 'react';
import logo from './logo.svg';
import {Home} from "./home.js";
import './App.css';
import { NavLink, Switch, Route } from 'react-router-dom';

const App = () => (
  <div className='app'>
    <h1>HRDM Portfolio Management System</h1>
    <Navigation />
    <Main />
  </div>
);

const Navigation = () => (
  <nav>
    <ul>
      <li><NavLink exact activeClassName="current" to='/'>Home</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/stocks'>Stocks</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/contact'>Contact</NavLink></li>
    </ul>
  </nav>
);

 const Main = () => (
   <Switch>
     <Route exact path='/' component={Home}></Route>
     <Route exact path='/stocks' component={Stocks}></Route>
     <Route exact path='/contact' component={Contact}></Route>
   </Switch>
 );

const Stocks = () => (
  <div className='stocks'>
    <h1>Stocks</h1>
    <p> Stock1: </p>
    <p> Stock2: </p>
  </div>
);

const Contact = () => (
  <div className='contact'>
    <h1>Contact Us</h1>
    <p>You can reach the HRDM team via email: <strong>hello@example.com</strong></p>
  </div>
);
export default App;
