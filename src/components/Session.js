import React from "react";
import * as Cookies from "js-cookie";

export const setSessionCookie = (session: any): void => {
  Cookies.remove("session");
  Cookies.set("session", session, { expires: 14 });
  //alert("setting session Cookie");
};

export const getSessionCookie: any = () => {
  const sessionCookie = Cookies.get("session");
  //alert("getting session Cookie");
  if (sessionCookie === undefined) {
    return {};
  } else {
    return JSON.parse(sessionCookie);
}
};

export const SessionContext = React.createContext(getSessionCookie());
