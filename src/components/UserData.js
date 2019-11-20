import { getSessionCookie, setSessionCookie } from "./Session"

/**
 * Add a new portfolio to cookies
 *
 * @param {string} portfolioName New portfolio name
 * @param {string} basePortfolio Portfolio to copy stocks from
 */
export function addPortfolio(portfolioName, basePortfolio) {
    try {
        let session = getSessionCookie()

        // Check if the new portfolios name already exists
        if (portfolioName in session['portfolios']) {
            alert("You cannot add a portfolio which shares a name with an existing portfolio")
        }

        // Check if the user wants to base the new portfolio off of another
        session['portfolios'][portfolioName] = []
        if (basePortfolio !== '') {
            // Sets stocks of new portfolio as the stocks of a specified existing portfolio
            session['portfolios'][portfolioName] = session['portfolios'][basePortfolio]
        }
        setSessionCookie(JSON.stringify(session))
    } catch (err) {
        alert(err)
    }
}

/**
 * Deletes a portfolio from the cookies
 *
 * @param {string} portfolioName
 */
export function deletePortfolio(portfolioName) {
    let session = getSessionCookie()
    delete session['portfolios'][portfolioName]
    setSessionCookie(JSON.stringify(session))
}

/**
 * Add a stock to a portfolio
 *
 * @param {string} portfolioName Name of the portfolio to add the stock
 * @param {string} assetType Asset type of the stock
 * @param {string} code Stocks code
 * @param {string} units Amount of stock owned
 * @param {string} date Date of purchase
 * @param {string} price Purchasing price
 */
export function addPortfolioStock(portfolioName, assetType, code, units, date, price) {
    const stock = {"assetType": assetType,"code": code,"units": units,"date": date,"buyPrice": price}
    let session = getSessionCookie()
    if (portfolioName = 'My portfolio') {
        portfolioName = 'default'
    }
    let array = session['portfolios'][portfolioName]
    array[array.length] = stock
    session['portfolios'][portfolioName] = array
    setSessionCookie(JSON.stringify(session))
}

/**
 * Delete stock from a portfolio
 *
 * @param {string} portfolioName Name of the portfolio to remove the stock
 * @param {string} code Code of the stock to be removed
 */
export function deletePortfolioStock(portfolioName, code) {
    let session = getSessionCookie()
    let index = session['portfolios'][portfolioName].findIndex(item => item['code'] === code)
    if (index !== -1) {
        session['portfolios'][portfolioName].splice(index,1)
        setSessionCookie(JSON.stringify(session))
    }
}

/**
 * Add stock to watchlist
 *
 * @param {string} watchlistName Name of the watchlist
 * @param {string} code Code of the stock to be added
 */
export function addWatchlistStock(watchlistName, code) {
    let session = getSessionCookie()
    let array = session['watchlists'][watchlistName]
    array[array.length] = code
    session['watchlists'][watchlistName] = array
    setSessionCookie(JSON.stringify(session))
}

/**
 * Delete stock from watchlist
 *
 * @param {string} watchlistName Name of the watchlist
 * @param {string} code Code of the stock to be removed
 */
export function deleteWatchlistStock(watchlistName, code) {
    let session = getSessionCookie()
    let index = session['watchlists'][watchlistName].findIndex((stock) =>stock === code)
    if (index !== -1) {
        session['watchlists'][watchlistName].splice(index,1)
        setSessionCookie(JSON.stringify(session))
    } else {
        console.log("unable to find and del Watchliststock")
    }
}

/**
 * Add a new watchlist for the user
 *
 * @param {string} watchlistName Name of the watchlist
 */
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

/**
 * Delete a watchlist
 *
 * @param {string} watchlistName Name of the watchlist
 */
export function deleteWatchlist(watchlistName) {
    let session = getSessionCookie()
    delete session['watchlists'][watchlistName]
    setSessionCookie(JSON.stringify(session))
}
