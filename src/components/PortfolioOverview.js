import React from 'react'
import { Card } from 'react-bootstrap'

/** 
 * Class for the top level component of the portfolio page
 * 
 * @class
 * @exports PortfolioOverview
*/
class PortfolioOverview extends React.Component {
	/**
     * Initialises the list of portfolio stocks
     * 
     * @constructor
     */
	constructor(props) {
		super(props)
		this.state = {
			/** List of stocks belonging to the portfolio the component is in */
			userStocks: this.props.userStocks,
			/** Total value of the portfolio */
			networth: '0',
		}
	}

	/**
	 * Calculates the total networth of the portfolio given by the sum of the 
	 * value of each stock. @see PortfolioPage in the function @see getInfo for 
	 * more information on the calculation of value
	 */
	evalNetworth() {
		let value = 0
		let stocks = this.props.userStocks

		// Calculates sum of the value of each stock in the portfolio
		for (let i = 0; i < stocks.length; i++) {
			value += parseFloat(stocks[i]['value'])
		}

		this.setState({
			networth: value.toFixed(2).toString()
		})
	}

	/**
	 * Lifecycle method to evaluate the networth of the given stocks 
	 * once the component is mounted
	 */
	componentDidMount() {
		this.evalNetworth()
	}

	/**
	 * @TODO ?????????????????????????????????????????????????
	 * @param {object} nextProps 
	 */
	componentWillReceiveProps(nextProps) {
		this.evalNetworth()
	}

	render() {
		return (
		<Card>
		<Card.Header>Personal Portfolio Performance</Card.Header>
		<Card.Body>
			<Card.Text>
			${this.state.networth}
			</Card.Text>
		</Card.Body>
		</Card>
		)
	}
}

export { PortfolioOverview }
