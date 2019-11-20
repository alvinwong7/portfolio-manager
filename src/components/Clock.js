import React from 'react'

/**
 * Clock component used in Nav Bar
 *
 * @class
 */class Clock extends React.Component {

 /**
  * Initialise with props and set the state to current time
  *
  * @constructor
  */constructor(props) {
    super(props)
    this.state = {date: new Date()}
  }

  /**
   * Lifecycle method to start the tick interval
   *
   */componentDidMount = () => {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
  }

  /**
   * Lifecycle method to stop the clock
   *
   */componentWillUnmount = () => {
    clearInterval(this.timerID)
  }

  tick = () => {
    this.setState({
      date: new Date()
    })
  }

  /**
   * Lifecycle method to stop the clock
   *
   * @returns {html} converts time to string and returns html text
   */render = () => {
    return (
      <div>
        {this.state.date.toLocaleTimeString()}
      </div>
    )
  }
}

export { Clock }
