import React from 'react'
import styled from 'styled-components'
import Play from './Play'

const Wrapper = styled.div`
  .drive {
    text-align: left;
    padding: 5px 10px;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    font-size: 1.1rem;
    font-weight: bold;
    font-family: sans-serif;
    color: #999999;
    &:hover {
      cursor: pointer;
      color: black;
    }
  }
  .selected-drive {
    text-align: left;
    padding: 5px 10px;
    border: 1px solid lightgray;
    font-size: 1.1rem;
    font-weight: bold;
    font-family: sans-serif;
    color: black;
  }
  .drive-title {
    /* font-size: 1rem; */
  }
  span {

  }
`

export default class Drive extends React.Component {
  state = {}

  addDriveYards = () => {
    let driveYards = [0]
    this.props.drive.plays.forEach(play => {
      if (play.gainLoss === 'loss'){
        driveYards.push(-(+play.playDist))
    } else if (play.gainLoss){
        driveYards.push(+play.playDist)
    }
    })
    let total = driveYards.reduce((acc, yards) => {
      return acc + yards
    })
    return total
  }

  driveResult = () => {
    if(this.props.drive.plays.length){

      if(this.props.drive.plays.length > 1){
    if (this.props.drive.plays[this.props.drive.plays.length-2].result === 'touchdown'){
      return 'touchdown'
    }
    }

    let result = this.props.drive.plays[this.props.drive.plays.length-1].result

    if (
      result === 'returned' ||
      result === 'touchback' ||
      result === 'fair catch' 
    ){
      return 'PUNT'
    }


    if (result === '1st' || result === '2nd' || result === '3rd' || result === '4th'){
      return 'in progress'
    }
    
    return result}
  }

  render() {
    const { drive } = this.props
    return (
      <Wrapper selected={this.props.selectedDrive}>
        <p 
          id={drive.driveCount}
          onClick={() => this.props.setCurrentDrive(drive.driveCount)}
          className={this.props.selectedDrive === drive.driveCount ? 'drive-title selected-drive' : 'drive-title drive'} >
          Drive {drive.driveCount}: {' '}
          {this.props.teamObj.mascot}  ({drive.plays.length} {(drive.plays.length === 1 ? 'play' : 'plays')}, {`${this.addDriveYards()}`} yards){' '}
    <span>{this.driveResult()} {(this.driveResult() === 'Successful' || this.driveResult() === 'Failed') && 'FG'}</span>
            </p>
        {this.props.selectedDrive === drive.driveCount && (
          <div className='plays'>
            {drive.plays.map((play, i) => (
              <Play key={i} play={play} />
            ))}
          </div>
        )}
      </Wrapper>
    )
  }
} 
