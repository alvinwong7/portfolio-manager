import React from "react"
import * as Cookies from "js-cookie"

/**
 * Function to save session data into a cookie
 *
 * @param {Object} session a json string or json object
 * @function
 * @exports setSessionCookie
 */export const setSessionCookie = (session: any): void => {
  Cookies.remove("session")
  Cookies.set("session", session, { expires: 14 })
}

/**
 * Function to collect session data from cookie
 *
 * @returns {JSON Object} sessionCookie
 * @function
 * @exports getSessionCookie
 */export const getSessionCookie: any = () => {
  const sessionCookie = Cookies.get("session")
  //alert("getting session Cookie")
  if (sessionCookie === undefined) {
    return {}
  } else {
    return JSON.parse(sessionCookie)
}
}

export const SessionContext = React.createContext(getSessionCookie())
