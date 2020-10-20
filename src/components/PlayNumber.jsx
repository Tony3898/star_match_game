import React, {Component} from "react";

class PlayNumber extends Component {

  // Color Theme
  colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };

  render() {
    const {number, status, onClick} = this.props
    return (
        <>
          <button className={'number'} onClick={() => onClick(number, status)}
                  style={{backgroundColor: this.colors[status]}}>{number}
          </button>
        </>
    )
  }

}

export default PlayNumber