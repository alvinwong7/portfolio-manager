import React from 'react'
import { Home } from './Home'
import  Stocks  from './Stocks'
import { Contact } from './Contact'
import { NewStockForm } from './NewStockForm'

import { Switch, Route } from 'react-router-dom'

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/stocks" component={Stocks}/>
        <Route path="/stocks/NewStockForm"> <NewStockForm /> </Route>
        <Route path="/contact" component={Contact}/>
      </Switch>
    );
  }
}

export { Routes };
