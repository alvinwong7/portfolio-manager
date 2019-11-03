import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import { Stock } from './Stock'

class Stocks extends React.Component {

    //<li><NavLink exact activeClassName="current" to='/stocks/NewStockForm'>Add Stock</NavLink></li>

    render() {
        return (
            <div className='stocks'>
                <Stock name={'TSLA'} />
            </div>
        );
    }
}

export { Stocks };
