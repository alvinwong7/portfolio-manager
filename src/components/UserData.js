import { getSessionCookie, setSessionCookie } from "./Session"

export function addPortfolio(portfolioName, basePortfolio) {
    try {
        var session = getSessionCookie()
        if (portfolioName in session['portfolios']) {
            alert("You cannot add a portfolio which shares a name with an existing portfolio")
        }
        session['portfolios'][portfolioName] = []
        if (basePortfolio !== 'None') {
            session['portfolios'][portfolioName] = session['portfolios'][basePortfolio]
        }
        setSessionCookie(JSON.stringify(session))
        console.log(session)
    } catch (err) {
        alert(err)
    }
}

export function deletePortfolio(portfolioName) {
    try {
        var session = getSessionCookie()
        delete session['portfolios'][portfolioName]
        setSessionCookie(JSON.stringify(session))
        console.log(session)
    } catch(err) {
        alert(err)
    }
}

export function addPortfolioStock(portfolioName, assetType, code, units, date, price) {
    const stock = {"assetType": assetType,"code": code,"units": units,"date": date,"buyPrice": price}
    console.log(portfolioName)
    var session = getSessionCookie()
    let array = session['portfolios'][portfolioName]
    console.log(array)
    console.log(session)
    array[array.length] = stock
    session['portfolios'][portfolioName] = array
    setSessionCookie(JSON.stringify(session))
}

export function deletePortfolioStock(portfolioName, code) {
    var session = getSessionCookie()
    let index = session['portfolios'][portfolioName].findIndex(item => item['code'] === code)
    if (index !== -1) {
        session['portfolios'][portfolioName].splice(index,1)
        setSessionCookie(JSON.stringify(session))
    }
}

export function addWatchlistStock(watchlistName, code) {
    var session = getSessionCookie()
    let array = session['watchlists'][watchlistName]
    array[array.length] = code
    session['watchlists'][watchlistName] = array
    setSessionCookie(JSON.stringify(session))
}

export function deleteWatchlistStock(watchlistName, code) {
    var session = getSessionCookie()
    let index = session['watchlists'][watchlistName].findIndex((stock) =>stock === code)
    if (index !== -1) {
        session['watchlists'][watchlistName].splice(index,1)
        setSessionCookie(JSON.stringify(session))
    } else {
        console.log("unable to find and del Watchliststock")
    }
}

export function addWatchlist(watchlistName) {
    try {
        let session = getSessionCookie()

        if(!session['watchlists']){
            session['watchlists'] = {}
        }

        if (watchlistName in session['watchlists']) {
            alert("You cannot add a watchlist which shares a name with an existing watchlist")
        }

        session['watchlists'][watchlistName] = []
        setSessionCookie(JSON.stringify(session))
        console.log(session)
    } catch (err) {
        alert(err)
    }
}

export function deleteWatchlist(watchlistName) {
    try {
        let session = getSessionCookie()
        delete session['watchlists'][watchlistName]
        setSessionCookie(JSON.stringify(session))
        console.log(session)
    } catch(err) {
        alert(err)
    }
}
