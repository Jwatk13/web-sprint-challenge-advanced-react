import React from 'react';
import axios from 'axios';

// Suggested initial states

const coordinates = [
  ["(1, 1)"], ["(2, 1)"], ["(3, 1)"],
  ["(1, 2)"], ["(2, 2)"], ["(3, 2)"],
  ["(1, 3)"], ["(2, 3)"], ["(3, 3)"]
]


// const initialMessage = ''
// const initialEmail = ''
// const initialSteps = 0
// const initialIndex = coordinates[4]... the index the "B" is at

//'http://localhost:9000/api/result';

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  state = {
    message: "",
    email: "",
    index: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    steps: 0,
    x: 2,
    y: 2
  };
  

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
   for (let i = 0; i < this.state.index.length; i++) {
     if ( this.state.index[i] === 0 ) {
       return this.state.x === 1 && this.state.y === 1; 
     } else {
       if ( this.state.index[i] === 1 ) {
         return this.state.x === 2 && this.state.y === 1;
       } else {
        if ( this.state.index[i] === 2 ) {
          return this.state.x === 3 && this.state.y === 1;
        } else {
          if ( this.state.index[i] === 3 ) {
            return this.state.x === 1 && this.state.y === 2;
          } else {
            if ( this.state.index[i] === 4 ) {
              return this.state.x === 2 && this.state.y === 2;
            } else {
              if ( this.state.index[i] === 5 ) {
                return this.state.x === 3 && this.state.y === 2;
              } else {
                if ( this.state.index[i] === 6 ) {
                  return this.state.x === 1 && this.state.y === 3;
                } else {
                  if ( this.state.index[i] === 7 ) {
                    return this.state.x === 2 && this.state.y === 3;
                  } else {
                    if ( this.state.index[i] === 8 ) {
                      return this.state.x === 3 && this.state.y === 3;
                    } 
                  }
                }
              }
            }
          }
        }
      }
     } 
   }
  }
  


  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    
    this.getXY
    this.setState({
      ... this.state,
      index: "Coordinates" && this.state.x + this.state.y
    })
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({
      ...this.state,
      message: "",
      email: "",
      x: 2,
      y: 2,
      steps: 0,
    })
  };

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

    // how to know which coordinates are next too the coordinates of the active square...
    // return those coordinates and move the active square to those coordinates, else return a message saying 'That move is impossible'

    direction === 'left' ? this.state.x + this.state.y : this.state.message;
    direction === 'right' ? this.state.x + this.state.y : this.state.message;
    direction === 'up' ? this.state.x + this.state.y : this.state.message;
    direction === 'down' ? this.state.x + this.state.y : this.state.message;

  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const { value } = evt.target
    this.setState({
      ... this.state,
      x: 1,
      y: 1
    })
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    const { value } = evt.target
    this.setState({
      ...this.state,
      email: value
    })
  }

  onSubmit = () => {
    // Use a POST request to send a payload to the server.
    axios.post(`http://localhost:9000/api/result`, {x: this.state.x, y: this.state.y, steps: this.state.steps, email: this.state.email })
      .then(res => {
      })
      .catch(err => {
        console.log({err})
      })
    this.setState({
      ...this.state,
      message: this.state.message,
      email: ""
    })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        
        <div className="info">
          {console.log('I made it')}
          <h3 id="coordinates">Coordinates {this.state.index}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {
            this.state.index.map(idx => (
              <div key={idx} className={`square${idx === this.state.x + this.state.y ? ' active' : ''}`}>
                {idx === this.state.x + this.state.y ? 'B' : null}
                
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.getNextIndex}>LEFT</button>
          <button id="up" onClick={this.getNextIndex}>UP</button>
          <button id="right" onClick={this.getNextIndex}>RIGHT</button>
          <button id="down" onClick={this.getNextIndex}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form>
          <input onChange={this.onChange} value={this.state.email} id="email" type="email" placeholder="type email"></input>
          <input onSubmit={this.onSubmit} id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
  
}
