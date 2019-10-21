import React from 'react';
import {Home} from "./components/home.js";
import {Clock} from "./components/Clock.js";
import {Stocks} from "./components/Stocks.js";
import {Contact} from "./components/Contact.js";
import {NewStockForm} from "./components/NewStockForm.js";
import {ams} from "./components/AMS.js";

import './App.css';
import { NavLink, Switch, Route } from 'react-router-dom';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            AMS: ams
        }
    }

    render(){
        return(
        <div className='app'>
          <h1>HRDM Portfolio Management System</h1>
          <Clock />
          <Navigation />
          <Main />
        </div>
        )
        }

    }

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
     <Route exact path='/stocks/NewStockForm'> <NewStockForm /> </Route>
     <Route exact path='/contact' component={Contact}></Route>
   </Switch>
 );

export default App;
