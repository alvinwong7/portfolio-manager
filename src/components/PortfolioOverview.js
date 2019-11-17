import React from 'react'
import { Card } from 'react-bootstrap'
import { PortfolioPlot } from './PortfolioPlot'

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
    let stocks = this.props.userStocks
    Object.keys(this.props.userStocks).forEach(function(key) {
      value += parseFloat(stocks[key]['value'])
    });
    this.setState({
      networth : value.toString()
    })
  }

  componentDidMount() {
    this.evalNetworth()
  }

  componentWillReceiveProps(nextProps){
    this.evalNetworth()
  }

  render() {
    console.log(this.props.userStocks)
    return (
      <Card>
      <Card.Header>Personal Portfolio Performance</Card.Header>
      <Card.Body>
        <Card.Text>
        {this.state.networth}
        </Card.Text>
        <PortfolioPlot userStocks={this.state.userStocks} years={1}/>
      </Card.Body>
      </Card>
    )
  }
}

export { PortfolioOverview }
