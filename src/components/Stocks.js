import React from 'react'
import { StockTable } from './StockTable'

class Stocks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stocks : ['MSFT', 'CBA', 'GOOGL'],
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
