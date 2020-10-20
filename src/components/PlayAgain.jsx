import React, {Component} from "react";

class PlayAgain extends Component {

  render() {
    const {onClick, gameStatus} = this.props
    let message = {
      '1': 'Active',
      '10': 'Won',
      "-10": 'Lost'
    }
    return (
        <>
          <h1 className={'message'}
               style={{color: gameStatus === 10 ? 'green' : 'red'}}>{message[gameStatus.toString()]}</h1>
          <button className={'game-done'} onClick={onClick}>Play Again</button>
        </>
    )
  }
}

export default PlayAgain