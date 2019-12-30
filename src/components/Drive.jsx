import React from 'react'
import styled from 'styled-components'
import Play from './Play'

const Wrapper = styled.div`
  .drive {
    text-align: left;
    padding: 5px 10px;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    font-size: 1.25rem;
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
    font-size: 1.25rem;
    font-weight: bold;
    font-family: sans-serif;
    color: black;
  }
`

export default class Drive extends React.Component {
  state = {}

  addDriveYards = () => {
    let driveYards = [0]
    this.props.drive.plays.map(play => {
      if (play.gainLoss === 'loss'){
      return driveYards.push(+(-play.playDist))
    } else if (play.gainLoss){
      return driveYards.push(+play.playDist)
    }
    })
    let total = driveYards.reduce((acc, yards) => {
      return acc + yards
    })
    return total
  }

  render() {
    const { drive } = this.props
    return (
      <Wrapper selected={this.props.selectedDrive}>
        <p
          id={drive.driveCount}
          onClick={() => this.props.setCurrentDrive(drive.driveCount)}
          className={this.props.selectedDrive === drive.driveCount ? 'selected-drive' : 'drive'} >
          Drive {drive.driveCount}: {this.props.teamObj.school}{' '}
          {this.props.teamObj.mascot}  ({drive.plays.length} {(drive.plays.length === 1 ? 'play' : 'plays')}, {`${this.addDriveYards()}`} yards)
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
