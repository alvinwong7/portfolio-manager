import React from 'react'
import { PortfolioOverview } from './PortfolioOverview'

class PortfolioPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>My Portfolio</h1>
                <PortfolioOverview />
            </div>
        );
    }
}

export { PortfolioPage }