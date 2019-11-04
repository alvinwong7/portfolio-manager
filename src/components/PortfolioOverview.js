import React from 'react'
import { Card } from 'react-bootstrap'

// Top level component of portfolio page
class PortfolioOverview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userStocks : this.props.userStocks,
      networth : '0',
    }
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

export { PortfolioOverview }
