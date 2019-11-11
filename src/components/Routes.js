import React, { useState, useContext } from 'react';
import  Stocks  from './Stocks'
import { Contact } from './Contact'
import { NewStockForm } from './NewStockForm'
import { StockPage } from './StockPage'
import { PortfolioPage } from './PortfolioPage'
import { PortfolioBuilderPage } from './PortfolioBuilderPage'
import { WatchListPage } from './WatchListPage'
import  LoginHandler from './LoginHandler'
import  LogoutHandler from './LogoutHandler'
import { Switch, Route } from 'react-router-dom'
import { SessionContext, getSessionCookie } from "./Session";
import useDeepCompareEffect from 'use-deep-compare-effect'


const Routes = (props) => {
    const [session, setSession] = useState(getSessionCookie());

    useDeepCompareEffect( () => {

        setSession(getSessionCookie());
        //console.log("getting session Cookie with s= "+ JSON.stringify(session));
        },
        [session]
    );

    const forceSessionUpdate = () => {
        setSession(getSessionCookie());
        //console.log("FORCED:getting session Cookie with s= "+ JSON.stringify(session));
        return ;
    }

    return (
    <SessionContext.Provider value={session} >
      <Switch>
            <Route exact path="/login" render={() => <LoginHandler  history = {props.history} forceSessionUpdate={forceSessionUpdate} />}/>
            <Route exact path="/logout" render={() => <LogoutHandler  history = {props.history} forceSessionUpdate={forceSessionUpdate} />}/>
            <Route path="*" component={ProtectedHandler} />
        </Switch>
    </SessionContext.Provider>
    );


}

const ProtectedHandler = ({ history }) => {
  const session = useContext(SessionContext);
  if (session.username === undefined) {
    //alert("session username is underfined pushing /login");
    history.push("/login");
    }
  return (
      <Switch>
      <Route exact path="/" component={PortfolioPage}/>
      <Route path="/logout" component={LogoutHandler} />
      <Route path="/myportfolio" component={PortfolioPage}/>
      <Route path="/builder/:portfolioName" component={PortfolioPage}/>
      <Route path="/builder" component={PortfolioBuilderPage}/>
      <Route path="/watchlist" component={WatchListPage}/>
      <Route path="/stocks" component={Stocks}/>
      <Route path="/stock/:stockName" component={StockPage}/>
      <Route path="/stocks/NewStockForm" component={NewStockForm}></Route>
      <Route path="/contact" component={Contact}/>
      </Switch>
  );
};

export { Routes };
