import React from 'react'

class PortfolioOptions extends React.Component {
    render() {
        return (
            <option>{this.props.name}</option>
        )
    }
}

export { PortfolioOptions }
