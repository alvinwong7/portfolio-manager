import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';

const Stocks = () => (
  <div className='stocks'>
  <li><NavLink exact activeClassName="current" to='/NewStockForm'>Add Stock</NavLink></li>
    <h1>Stocks</h1>
    <p> Stock1: </p>
    <p> Stock2: </p>
  </div>
);

export { Stocks };
