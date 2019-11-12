import React from 'react'
import axios from 'axios'
import { CardDeck } from 'react-bootstrap'
import { getSessionCookie } from './Session'

import { PortfolioCard } from './PortfolioCard'
import { NewPortfolioForm } from './NewPortfolioForm'

class PortfolioBuilderPage extends React.Component {
    constructor(props) {
        super(props)
        let portfolios = getSessionCookie()["portfolios"]

        this.state = {
            userPortfolios : portfolios,
            loaded : false
        }
        this.updateSession = this.updateSession.bind(this)
    }

    createCards = () => {
        let cards = []
        let children = []

        let portfolios = this.state.userPortfolios
        let component = this
        Object.keys(portfolios).forEach(function(key) {
            if (key != 'default')
                children.push(<div><PortfolioCard name={key} stocks={portfolios[key]} updateSession={component.updateSession}/><br/></div>)
        });
    
        cards.push(children)
        return cards
    }

    updateSession = () => {
        let portfolios = getSessionCookie()["portfolios"]
        console.log(portfolios)
        this.setState({
            userPortfolios : portfolios
        })
    }

    render() {
        return (
            <div>
                <h1>Portfolio Builder</h1>
                <NewPortfolioForm updateSession={this.updateSession}/>
                <br/>
                <br/>
                <CardDeck>
                    {this.createCards()}
                </CardDeck>
            </div>
        );
    }
}

export { PortfolioBuilderPage }
