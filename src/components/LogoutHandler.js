import React, { useState} from "react";
import { createBrowserHistory } from "history";
import Cookies from "js-cookie";
import {withRouter} from 'react-router-dom'
import { SessionContext, getSessionCookie, setSessionCookie } from "./Session";


class LogoutHandler extends React.Component{

      render(){
          Cookies.remove("session");
          this.props.forceSessionUpdate();
          this.props.history.push("/");
          return (<div>You Have Successfully Logged Out!</div>);
      }
};

export default withRouter(LogoutHandler);
