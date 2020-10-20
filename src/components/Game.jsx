import React, {Component} from 'react';
import '../assets/css/style.css';
import Star from "./Star";
import PlayNumber from "./PlayNumber";
import PlayAgain from "./PlayAgain";

class Game extends Component {

  constructor(props) {
    super(props);
    this.timerId = null
    this.state = {
      stars: this.random(1, 9),
      availableNumbers: this.range(1, 9),
      candidateNumbers: [],
      secondsLeft: 10
    }
  }

  range = (min, max) => {
    return Array.from({length: max - min + 1}, (_, i) => min + i)
  }

  random = (min, max) => min + Math.floor(Math.random() * (max - min + 1))

  sum = (arr) => arr.reduce((acc, curr) => acc + curr, 0)

  randomSumIn = (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = this.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[this.random(0, sums.length - 1)];
  }

  candidateWrong = () => {
    const {stars, candidateNumbers} = this.state
    return this.sum(candidateNumbers) > stars
  }

  gameStatus = () => {
    let {availableNumbers, secondsLeft} = this.state
    return availableNumbers.length === 0 ? 10 : secondsLeft <= 0 ? -10 : 1
  }

  onNumberClick = (currentNumber, currentStatus) => {
    let {stars, availableNumbers, candidateNumbers} = this.state
    if (currentStatus !== 'used' && this.gameStatus() === 1) {
      let newCandidatesNumbers = currentStatus === 'available' ? candidateNumbers.concat(currentNumber) : candidateNumbers.filter(c => c !== currentNumber)
      if (this.sum(newCandidatesNumbers) !== stars) {
        this.setState({candidateNumbers: newCandidatesNumbers})
      } else {
        let newAvailableNumbers = availableNumbers.filter(a => !newCandidatesNumbers.includes(a))
        let newStars = this.randomSumIn(newAvailableNumbers, 9)
        this.setState({availableNumbers: newAvailableNumbers, candidateNumbers: [], stars: newStars})
      }
    }
  }

  numberStatus = (n) => {
    const {availableNumbers, candidateNumbers} = this.state
    if (!availableNumbers.includes(n))
      return 'used'
    if (candidateNumbers.includes(n))
      return this.candidateWrong() ? 'wrong' : 'candidate'
    return 'available'
  }

  /*onGameDone = () => {
    this.setState({availableNumbers: this.range(1, 9), candidateNumbers: [], stars: this.random(1, 9), secondsLeft: 10})
  }*/

  checkTime = () => {
    let self = this;
    let {secondsLeft, availableNumbers} = this.state
    if (secondsLeft > 0 && availableNumbers.length) {
      self.setState({secondsLeft: secondsLeft - 1})
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.checkTime.bind(this), 1000)
  }

  componentWillMount() {
    clearTimeout(this.timerId)
  }

  render() {
    const {stars, secondsLeft} = this.state
    const {startGame} = this.props
    let checkGameStatus = this.gameStatus()
    return (
        <div className="game">
          <div className="help">
            Pick 1 or more numbers that sum to the number of stars
          </div>
          <div className={'body'}>
            <div className={'left'}>
              {checkGameStatus !== 1 ? (<PlayAgain onClick={startGame} gameStatus={checkGameStatus}/>) : (
                  <Star count={stars}/>)}
            </div>
            <div className={'right'}>
              {
                this.range(1, 9).map(n =>
                    <PlayNumber key={n} number={n} status={this.numberStatus(n)} onClick={this.onNumberClick}/>
                )
              }
            </div>
          </div>
          <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
  }


}

export default Game;
