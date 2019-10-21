import React from 'react';
import { NavLink } from 'react-router-dom';

const Stocks = () => (
  <div className='stocks'>
  <li><NavLink exact activeClassName="current" to='/NewStockForm'></NavLink></li>
    <h1>Stocks</h1>
    <p> Stock1: </p>
    <p> Stock2: Im making changes </p>
  </div>
);

export { Stocks };
