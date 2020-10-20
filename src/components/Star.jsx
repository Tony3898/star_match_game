import React, {Component} from "react";

class Star extends Component {

  range = (min , max ) => {
    return Array.from({length: max - min + 1}, (_, i) => min + i)
  }

  render() {
    const {count} = this.props
    return (
        <>
          {
            this.range(1, count).map(r => <div key={r} className={'star'}/>)
          }
        </>
    )
  }

}

export default Star