import React from 'react'

// Rows for portfolio table stock summary
class PurchasedStock extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name : this.props.name,
            price : this.props.userStocks['price'],
            profit : this.props.userStocks['profits/loss'],
            units : this.props.userStocks['units'],
            changePercent : this.props.userStocks['changePercent'],
            value : this.props.userStocks['value'],
            weight : this.props.userStocks['weight'],
        }
    }

    render() {
        return (
            <tr>
                <td>{this.state.name}</td>
                <td>{this.state.price}</td>
                <td>{this.state.profit}</td>
                <td>{this.state.units}</td>
                <td>{this.state.changePercent}</td>
                <td>{this.state.value}</td>
                <td>{this.state.weight}</td>
            </tr>
        )
    }
}

export { PurchasedStock }