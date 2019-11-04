import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import { Stock } from './Stock'

class Stocks extends React.Component {

    render() {
        return (
            <div className='stocks'>
                <Stock name={'TSLA'} />
            </div>
        );
    }
}

export default Stocks;
