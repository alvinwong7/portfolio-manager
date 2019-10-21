import React from 'react';
// Initializing a class definition
class Stock {
    constructor(name, symbol, units, purchasePrice ) {
        this.name = name;
        this.symbol = symbol;
        this.units = units;
        this.purchasePrice = purchasePrice;
        this.price = purchasePrice;
        this.getCurrentPrice();
    }

    getCurrentPrice(){
        this.lastRefresh = new Date()//lastRefresh;
        if(Math.random()>0.5){
            this.price = this.price + 0.01;
        } else {
            this.price = this.price - 0.01;
        }
        return this.price;
    }

    render(){
        return(
           <p> {this.symbol} is at {this.price} with {this.units} units </p>
        );
    }

}

export { Stock };
