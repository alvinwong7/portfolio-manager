import React from 'react'
import { Stock } from './Stock'
import { StockTable } from './StockTable'

import { NavLink, Switch, Route } from 'react-router-dom'

class Stocks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stocks : ['MSFT', 'AMZN', 'GOOGL'],
    }
  }

  render() {
    // <li><NavLink exact activeClassName="current" to="/stocks/NewStockForm">Add Stock</NavLink></li>
    return (
      <div className='stocks'>
        <StockTable stocks={this.state.stocks}/>
      </div>
    );
  }
}

export { Stocks };
