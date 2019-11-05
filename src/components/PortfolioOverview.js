import React from 'react'
import { Card } from 'react-bootstrap'

// Top level component of portfolio page
class PortfolioOverview extends React.Component {
    constructor(props) {
<<<<<<< HEAD
        super(props)
        this.state = {
            userStocks : this.props.userStocks,
            networth : '0',
        }
=======
    super(props)
    this.addStock = this.addStock.bind(this);
    this.state = {
      stocks : ['MSFT']//, 'AMZN', 'GOOGL'],
>>>>>>> parent of a7affba... cleaning up login and portfolio
    }

    evalNetworth() {
        let value = 0
        let stocks = this.state.userStocks
        Object.keys(this.state.userStocks).forEach(function(key) {
            value += parseFloat(stocks[key]['value'])
        });
        this.setState({
            networth : value.toString()
        })
    }

    componentDidMount() {
        this.evalNetworth()
    }

    render() {
        return (
            <Card>
            <Card.Header>Personal Portfolio Performance</Card.Header>
            <Card.Body>
                <Card.Text>
                {this.state.networth}
                </Card.Text>
            </Card.Body>
            </Card>
        )
    }
}

<<<<<<< HEAD
export { PortfolioOverview }
=======
export{ PortfolioOverview }
>>>>>>> parent of a7affba... cleaning up login and portfolio
