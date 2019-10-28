import React from 'react'
import { Stocks } from './Stocks'
import { Contact } from './Contact'
import { NewStockForm } from './NewStockForm'
import { StockPage } from './StockPage'
import { PortfolioPage } from './PortfolioPage'
import { PortfolioBuilderPage } from './PortfolioBuilderPage'
import { WatchListPage } from './WatchListPage'

import { Switch, Route } from 'react-router-dom'

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={PortfolioPage}/>
        <Route path="/myportfolio" component={PortfolioPage}/>
        <Route path="/builder" component={PortfolioBuilderPage}/>
        <Route path="/watchlist" component={WatchListPage}/>
        <Route path="/stocks" component={Stocks}/>
        <Route path="/stock/:stockName" component={StockPage}/>
        <Route path="/stocks/NewStockForm" component={NewStockForm}></Route>
        <Route path="/contact" component={Contact}/>
      </Switch>
    );
  }
}

export { Routes };
