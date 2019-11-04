import React from 'react'
//import { Stock } from './Stock'
import { StockTable } from './StockTable'

//import { NavLink, Switch, Route } from 'react-router-dom'
import { NewStockForm } from './NewStockForm'


// Top level component of portfolio page
class PortfolioOverview extends React.Component {
    constructor(props) {
    super(props)
    this.addStock = this.addStock.bind(this);
    this.state = {
      stocks : ['MSFT']//, 'AMZN', 'GOOGL'],
    }

  }

  render() {
    // <li><NavLink exact activeClassName="current" to="/stocks/NewStockForm">Add Stock</NavLink></li>
    return (
      <div className='stocks'>
        <StockTable stocks={this.state.stocks}/>
        <NewStockForm addStock ={this.addStock} />
      </div>
    );
  }

  addStock(stock){
      try{
      this.setState(state => {
        const stocks = state.stocks.concat(stock);
        return {
          stocks
        };
      });
      } catch(err){
          alert(err);
      }
      //alert("added "+ stock);
    }
}

export{ PortfolioOverview }