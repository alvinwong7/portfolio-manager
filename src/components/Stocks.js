import React from 'react';
import {Stock} from "./Stock";
import { NavLink, Switch, Route } from 'react-router-dom';

const Stocks = () => (
  <div className='stocks'>
  <li><NavLink exact activeClassName="current" to='/stocks/NewStockForm'>Add Stock</NavLink></li>
    <h1>Stocks</h1>
    <Stock name={'AAPL'} />
    <h1></h1>
    <Stock name={'MSFT'} />
    <h1></h1>
    <Stock name={'TSLA'} />
  </div>
);

export { Stocks };
