import React, {Component} from "react";
import Game from "./Game";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gameId: 0
    }
  }

  updateGameId = () => {
    const {gameId} = this.state
    console.log(gameId)
    this.setState({gameId: gameId + 1})
  }

  render() {
    const {gameId} = this.state
    return (
        <Game key={gameId} startGame={this.updateGameId}/>
    )
  }
}

export default App