import React from 'react'
import { SessionContext, getSessionCookie, setSessionCookie } from "./Session";

export function addStock(assetType, code, units, date, price ){
        try{
          const stock = {"assetType": assetType,"code": code,"units": units,"date": date,"buyPrice": price};
          var session = getSessionCookie()
          if(session["stocks"] == undefined){
              session["stocks"] = [stock]
          } else {
              session["stocks"] = session["stocks"].concat([stock]);
          }
          console.log(session)
          setSessionCookie(JSON.stringify(session));
        } catch(err){
            alert(err);
        }

    }

export function removeStock(){

}
