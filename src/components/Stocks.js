import React from 'react';
import {Stock} from "./Stock";
import { NavLink, Switch, Route } from 'react-router-dom';

const Stocks = () => (
  <div className='stocks'>
  <li><NavLink exact activeClassName="current" to='/stocks/NewStockForm'>Add Stock</NavLink></li>
    <h1>Stocks</h1>
    <p> Stock1: </p>
    <p> Stock2: </p>
    <Stock />
  </div>
);

export { Stocks };
