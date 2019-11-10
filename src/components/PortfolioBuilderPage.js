import React from 'react'
import axios from 'axios'
import { CardDeck } from 'react-bootstrap'
import { getSessionCookie } from './Session'

import { PortfolioCard } from './PortfolioCard'

class PortfolioBuilderPage extends React.Component {
    constructor(props) {
        super(props)
        let portfolios = getSessionCookie()["portfolios"]

        this.state = {
            userPortfolios : portfolios,
            loaded : false
        }
    }

    createCards = () => {
        let cards = []
        let children = []

        let portfolios = this.state.userPortfolios
        Object.keys(portfolios).forEach(function(key) {
            children.push(<PortfolioCard name={key} stocks={portfolios[key]}/>)
        });
    
        cards.push(children)
        return cards
    }

    render() {
        return (
            <div>
                <h1>Portfolio Builder</h1>
                <CardDeck>
                    {this.createCards()}
                </CardDeck>
            </div>
        );
    }
}

export { PortfolioBuilderPage }
