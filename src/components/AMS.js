import React from 'react';
import {GlobalStock} from "./GlobalStock";

// Initializing a class definition

class AMS extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Stock1: new GlobalStock('TLS'),
            Stock2: new GlobalStock('S32'),
            Stock3: new GlobalStock('BHP'),
            Stock4: new GlobalStock("MSFT"),
        }
    }

    testPrint(){
        return "text form inside the AMS"
    }

    renderStocks(){
        return (
        <div>
        {this.state.Stock1.render()}
        {this.state.Stock2.render()}
        {this.state.Stock3.render()}
        {this.state.Stock4.render()}
        </div>
    );
    }

    updateStocks(){
        this.state.Stock1.getUpdate()
    }
}

export let ams = new AMS();
