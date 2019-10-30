import React from 'react'

import { StockDetail } from './StockDetail'

// Stock page
class StockPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stockName : props.match.params.stockName,
        }
    }

    componentDidMount(){
        this.state = {
            stockName : this.props.match.params.stockName,

        }
        alert(this.props.match.params.stockName);
    }

    componentWillUnmount(){
        this.state = {}
        alert(this.props.match.params.stockName);
    }
    render() {
        return(
            <div>
                <h1>{this.state.stockName}</h1>
                <StockDetail stockName={[this.state.stockName]}/>
            </div>
        )
    }
}

export { StockPage }
