import React from 'react';
import axios from 'axios';

//'http://localhost:9000/api/result';

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  state = {
    message: "",
    email: "",
    index: 4,
    steps: 0,
    x: 2,
    y: 2,
  }

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    return `(${this.state.x}, ${this.state.y})`;
  }
  


  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `Coordinates ${this.getXY()}`
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({
      ...this.state,
      message: "",
      email: "",
      index: 4,
      x: 2,
      y: 2,
      steps: 0,
    })
  }

  // isActiveSquare = (idx) => {
  //   const currentX = Math.floor(idx / 3) + 1;
  //   const currentY = (idx % 3) + 1;
  //   // console.log(idx)
  //   return ((this.state.x === currentX) && (this.state.y === currentY))
  // }


  getNextIndex = (evt) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    // direction parameter
    switch (evt.target.id) {
      case 'up': 
        if (this.state.index > 2) {
          this.setState({
            ...this.state,
            index: this.state.index - 3,
            steps: this.state.steps + 1,
            y: this.state.y - 1,
            message: ""
          })
        } else {
          this.setState({
            ...this.state,
            message: "You can't go up"
          })
        }
        break
      case 'down': 
        if (this.state.index < 6) {
          this.setState({
            ...this.state,
            index: this.state.index + 3,
            steps: this.state.steps + 1,
            y: this.state.y + 1,
            message: ""
          })
        } else {
          this.setState({
            ...this.state,
            message: "You can't go down"
          })
        }
        break
      case 'left': 
        if (this.state.index === 0 || this.state.index === 3 || this.state.index === 6) {
          this.setState({
            ...this.state,
            message: "You can't go left"
          })
        } else {
          this.setState({
            ...this.state,
            index: this.state.index - 1,
            steps: this.state.steps + 1,
            x: this.state.x - 1,
            message: ""
          })
        }
        break
      case 'right': 
        if (this.state.index === 2 || this.state.index === 5 || this.state.index === 8) {
          this.setState({
            ...this.state,
            message: "You can't go right"
          })
        } else {
          this.setState({
            ...this.state,
            index: this.state.index + 1,
            steps: this.state.steps + 1,
            x: this.state.x + 1,
            message: ""
          })
        }
        break
      default: break
    }
  }

  steps = () => {
    return this.state.steps === 1  ? `You moved ${this.state.steps} time` : `You moved ${this.state.steps} times`
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    const { value } = evt.target
    this.setState({
      ...this.state,
      email: value
    })
  }

  onSubmit = (evt) => {
    evt.preventDefault()
    // Use a POST request to send a payload to the server.
    axios.post(`http://localhost:9000/api/result`, {steps: this.state.steps, y: this.state.y, x: this.state.x, email: this.state.email})
      .then(res => {
        console.log(res, "onSubmit log")
        this.setState({
          ...this.state,
          message: res.data.message,
          email: ""
        })
      })
      .catch(err => {
        console.log(err.response)
        this.setState({
          ...this.state,
          message: err.response.data.message
        })
      })
  }

  

  render() {
    
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        
        <div className="info">
          
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">{this.steps()}</h3>
        </div>
        <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
              {idx === this.state.index ? 'B' : null}
            </div>
          ))
        }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.getNextIndex} >LEFT</button>
          <button id="up" onClick={this.getNextIndex}>UP</button>
          <button id="right" onClick={this.getNextIndex}>RIGHT</button>
          <button id="down" onClick={this.getNextIndex}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} value={this.state.email} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
  
}
