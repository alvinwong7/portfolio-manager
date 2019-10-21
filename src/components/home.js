import React from 'react';
import {ams} from "./AMS.js";

const Home = () => (
 <div className='home'>
   <h1>Welcome! </h1>
   <p>To HighRes Data Management's Portfolio Management System</p>
   <p> Feel free to browse around and learn more.</p>
   <h1> Portfolio Overview </h1>
   <p> Current Value  = ________ </p>
   <p> Net Change = _________ </p>
   <p> Time vs Performace Graph goes here </p>
   <h2> Stocks </h2>
  {/* for each stock call function(stock.Symb) */}
  {ams.renderStocks()}
  {/*<p> ·   stock.get change()   Profit/loss (all time)</p>
  <p> ·  stock.getCurrentPrice()    Current price</p>
  <p> ·      Change % (of price since yesterday)</p>
  <p> ·      Units ()</p>
  <p> ·      Value (units * price)</p>
  <p> ·      Weight (% value of overall portfolio)</p>
    */}
 </div>
);


export { Home };
