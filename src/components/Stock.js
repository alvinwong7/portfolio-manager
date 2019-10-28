import React from 'react'

class Stock extends React.Component {
    constructor(props) {
        this.state = {
            stock : props.stockName
        }
    }
    
    render() {
        return(
            <div>
                <h1>{this.state.stock}</h1>
                <StockTable stocks={this.state.stock}/>
            </div>
        )
    }
}