import React from 'react';
import {Stock} from "./Stock";

// Initializing a class definition

class AMS extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Stock1: new Stock("Stock1", "STK1", 100 , 3.24),
            Stock2: new Stock("Stock1", "STK2", 43 , 4.27),
            Stock3: new Stock("Stock1", "STK3", 270 , 1.29),
            Stock4: new Stock("Stock1", "STK4", 70 , 2.20),
        }
    }
    testPrint(){
        return "text form inside the AMS"
    }
    renderStocks(){
        return (
        <div>
        <p> {this.state.Stock1.render()} </p>
        <p> {this.state.Stock2.render()} </p>
        <p> {this.state.Stock3.render()} </p>
        <p> {this.state.Stock4.render()} </p>
        </div>
    );
    }
}

export let ams = new AMS();
