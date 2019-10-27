import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import { Stock } from './Stock'

class Stocks extends React.Component {
    render() {
        return (
            <div className='stocks'>
                <li><NavLink exact activeClassName="current" to='/stocks/NewStockForm'>Add Stock</NavLink></li>
                <h1>Stocks</h1>
                <Stock name={'AAPL'} />
                <h1></h1>
                <Stock name={'GOOGL'} />
                <h1></h1>
                <Stock name={'MSFT'} />
                <h1></h1>
                <Stock name={'TSLA'} />
            </div>
        );
    }
}

export { Stocks };
