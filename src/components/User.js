import React from 'react'

class UserData extends React.component{

    constructor(json){
        this.state = {
            username: json.username,
            stocks: json.stocks,
            watchlist: json.watchlist,
        };
    }

    addStock(assetType, code, units, date, price ){
        try{
        this.setState(state => {
          const stock = [assetType, code, units, date, price];
          const newstocks = state.data.stocks.concat(stock);
          return {
              stocks: newstocks,
          };
        });
        } catch(err){
            alert(err);
        }

    }

    removeStock(){

    }

    toJSON(){
        return this.state.data.JSON.stringify();
    }

}
