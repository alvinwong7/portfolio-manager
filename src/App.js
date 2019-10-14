import React from 'react';
import logo from './logo.svg';
import {Home} from "./components/home.js";
import {Clock} from "./components/Clock.js"
import {Stocks} from "./components/Stocks.js"
import {Contact} from "./components/Contact.js"
import {NewStockForm} from "./components/NewStockForm.js"

import './App.css';
import { NavLink, Switch, Route } from 'react-router-dom';

const App = () => (
  <div className='app'>
    <h1>HRDM Portfolio Management System</h1>
    <Clock />
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
     <Route exact path='/stocks/new'> <NewStockForm /></Route>
     <Route exact path='/contact' component={Contact}></Route>
   </Switch>
 );

export default App;
