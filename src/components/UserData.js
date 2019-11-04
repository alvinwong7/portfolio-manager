import React from 'react'
import { SessionContext, getSessionCookie, setSessionCookie } from "./Session";


class UserData extends React.Component{

    constructor(props){
        super(props);
        const session = getSessionCookie();
        this.state = {
            username: session.username,
            stocks: session.stocks,
            watchlist: session.watchlist,
        };
    }

    addStock(assetType, code, units, date, price ){
        alert("setting New Data 0 = "+ code);
        try{
        this.setState((state, assetType, code, units, date, price) => {
          const stock = [assetType, code, units, date, price];
          alert("setting New Data 1 = ");
          const newstocks = state.data.stocks.concat(stock);
          return {
              stocks: stock,
          };
        });
        const newData = this.toJSON();
        //alert("setting New Data = "+newData);
        setSessionCookie(this.toJSON());

        } catch(err){
            alert(err);
        }

    }

    removeStock(){

    }

    toJSON(){
        return JSON.stringify(this.state);
    }

}

export default UserData;
