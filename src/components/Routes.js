import React, { useState, useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import useDeepCompareEffect from 'use-deep-compare-effect'

import { Contact } from './Contact'
import LoginHandler from './LoginHandler'
import LogoutHandler from './LogoutHandler'
import NewUser from './NewUser'
import { PortfolioBuilderPage } from './PortfolioBuilder/PortfolioBuilderPage'
import { PortfolioPage } from './UserPortfolio/PortfolioPage'
import { SessionContext, getSessionCookie } from "./Session"
import { StockPage } from './Stock/StockPage'
import { WatchListPage } from './WatchList/WatchListPage'

/**
 * Routes const that handles the dynamic routing to login/out/newuser and to
 * secure urls
 *
 * @const
 * @exports Routes
 */
const Routes = (props) => {
    const [session, setSession] = useState(getSessionCookie())

    useDeepCompareEffect( () => {
        setSession(getSessionCookie())
        },
        [session]
    )

    const forceSessionUpdate = () => {
        setSession(getSessionCookie())
    }

    return (
    <SessionContext.Provider value={session} >
      <Switch>
            <Route exact path="/login" render={() => <LoginHandler  history = {props.history} forceSessionUpdate={forceSessionUpdate} />}/>
            <Route exact path="/logout" render={() => <LogoutHandler  history = {props.history} forceSessionUpdate={forceSessionUpdate} />}/>
            <Route exact path="/NewUser" render={() => <NewUser  history = {props.history} forceSessionUpdate={forceSessionUpdate} />}/>
            <Route path="*" component={ProtectedHandler} />
        </Switch>
    </SessionContext.Provider>
    )
}

/**
 * Constant for checking the user login state and protecting certain routes
 *
 * @const
 */
const ProtectedHandler = ({ history }) => {
    const session = useContext(SessionContext)
    if (session.username === undefined) {
        //alert("session username is underfined pushing /login")
        history.push("/login")
        return(<div> you shouldn't be here </div>)
        }
    return (
        <Switch>
        <Route exact path="/" component={PortfolioPage}/>
        <Route path="/logout" component={LogoutHandler} />
        <Route path="/myportfolio" component={PortfolioPage}/>
        <Route path="/builder/:portfolioName" component={PortfolioPage}/>
        <Route path="/builder" component={PortfolioBuilderPage}/>
        <Route path="/watchlist" component={WatchListPage}/>
        <Route path="/stock/:stockName" component={StockPage}/>
        <Route path="/contact" component={Contact}/>
        </Switch>
    )
}

export { Routes }
