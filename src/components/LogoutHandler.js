import React from "react"
import Cookies from "js-cookie"
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import { getSessionCookie } from "./Session"

/**
 * class that handles the logout page and sending of session data
 *
 * @class
 * @exports LogoutHandler
 *
 */class LogoutHandler extends React.Component{

      /**
      *
      * @return {html} returns the html for the logout success page
      *
      */render = () => {
          const data = JSON.stringify(getSessionCookie())
          const url = "http://127.0.0.1:5000/logout-"+data
          axios
              .get(url)
              .then( response => {
                  console.log(response)
                  let data = response.data
                  if (data["msg"] === "Success"){
                      Cookies.remove("session")
                      this.props.forceSessionUpdate()
                      this.props.history.push("/")
                      return (<div>You Have Successfully Logged Out!</div>)
                  } else {
                      return (<div>You Have NOT Successfully Logged Out, Your Data is Not Saved</div>)
                  }
              })

          Cookies.remove("session")
          this.props.forceSessionUpdate()
          this.props.history.push("/")
          return (<div>You Have Successfully Logged Out!</div>)
      }
}

export default withRouter(LogoutHandler)
