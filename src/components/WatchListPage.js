import React from 'react'
import WatchList from './WatchList'

class WatchListPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            watchlists : { 'List 1' : ['MSFT', 'AMZN', 'GOOGL'], 'List 2' : ['CBA', 'VAF', 'VAS'] },
            // watchlists: props.watchlists,
        }
    }

    createTable = () => {
        let table = []

        let children = []
        let wl = this.state.watchlists
        Object.keys(wl).forEach(function(key) {
            //console.log(wl[key])
            children.push(<WatchList name={key} key = {key} watchlist={wl[key]}/>)
        });
        table.push(children)
        return table
    }

    render() {
        return (
            <div>
                {this.createTable()}
            </div>
        )
    }
}

export { WatchListPage }
