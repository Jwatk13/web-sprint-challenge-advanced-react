import React from 'react';
import { useState } from 'react';
import axios from 'axios';



// Suggested initial states
// const initialMessage = ''
// const initialEmail = ''
// const initialSteps = 0
// const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  const [state, setState] = useState({
    message: "",
    email: "",
    index: 4,
    steps: 0,
    x: 2,
    y: 2
  })

  const getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    return `(${state.x}, ${state.y})`;
  }
  


  const getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `Coordinates ${getXY()}`
  }

  const reset = () => {
    // Use this helper to reset all states to their initial values.
    setState({
      ...state,
      message: "",
      email: "",
      index: 4,
      x: 2,
      y: 2,
      steps: 0,
    })
  }


  const getNextIndex = (evt) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    // direction parameter
    switch (evt.target.id) {
      case 'up': 
        if (state.index > 2) {
          setState({
            ...state,
            index: state.index - 3,
            steps: state.steps + 1,
            y: state.y - 1,
            message: ""
          })
        } else {
          setState({
            ...state,
            message: "You can't go up"
          })
        }
        break
      case 'down': 
        if (state.index < 6) {
          setState({
            ...state,
            index: state.index + 3,
            steps: state.steps + 1,
            y: state.y + 1,
            message: ""
          })
        } else {
          setState({
            ...state,
            message: "You can't go down"
          })
        }
        break
      case 'left': 
        if (state.index === 0 || state.index === 3 || state.index === 6) {
          setState({
            ...state,
            message: "You can't go left"
          })
        } else {
          setState({
            ...state,
            index: state.index - 1,
            steps: state.steps + 1,
            x: state.x - 1,
            message: ""
          })
        }
        break
      case 'right': 
        if (state.index === 2 || state.index === 5 || state.index === 8) {
          setState({
            ...state,
            message: "You can't go right"
          })
        } else {
          setState({
            ...state,
            index: state.index + 1,
            steps: state.steps + 1,
            x: state.x + 1,
            message: ""
          })
        }
        break
      default: break
    }
  }

  const steps = () => {
    return state.steps === 1  ? `You moved ${state.steps} time` : `You moved ${state.steps} times`
  }

  const onChange = (evt) => {
    // You will need this to update the value of the input.
    const { value } = evt.target
    setState({
      ...state,
      email: value
    })
  }

  const onSubmit = (evt) => {
    evt.preventDefault()
    // Use a POST request to send a payload to the server.
    axios.post(`http://localhost:9000/api/result`, {steps: state.steps, y: state.y, x: state.x, email: state.email})
      .then(res => {
        console.log(res, "onSubmit log")
        debugger
        setState({
          ...state,
          message: res.data.message,
          email: ""
        })
      })
      .catch(err => {
        console.log(err)
        setState({
          ...state,
          message: err.response.data.message
        })
      })
  }


  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">{steps()}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === state.index ? ' active' : ''}`}>
              {idx === state.index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{state.message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={getNextIndex}>LEFT</button>
        <button id="up" onClick={getNextIndex}>UP</button>
        <button id="right" onClick={getNextIndex}>RIGHT</button>
        <button id="down" onClick={getNextIndex}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input value={state.email} onChange={onChange} id="email" type="email" placeholder="type email"></input>
        <input  id="submit" type="submit"></input>
      </form>
    </div>
  )
}
