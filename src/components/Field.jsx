import React from 'react'
import styled from 'styled-components'
import Animation from './Animation'
import './Field.css'
import goal from '../assets/goal.png'
import upright from '../assets/upright.png'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 25px;
  .fieldContainer {
    position: relative;
    top: 0;
  }
  .animation {
    z-index: 20;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .caption {
    font-size: 1.25rem;
    font-family: sans-serif;
    margin-top: 50px;
    font-weight: bold;
  }
  .field-container {
    width: 900px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 7px;
    background: white;
    box-shadow: 1px 1px 2px #999999;
  }
`

const Home = styled.p`
  font-size: 1.25rem;
  font-weight: 400;
  color: white;
  transform: rotate(-90deg);
`

const Away = styled.p`
  font-size: 1.25rem;
  font-weight: 400;
  color: white;
  transform: rotate(90deg);
`

const LeftZone = styled.div`
  display: flex;
  align-items: center;
  margin-top: 9px;
  width: 50px;
  height: 101px;
  transform: skew(331deg);
  background: ${props => props.color};
`

const RightZone = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 9px;
  width: 50px;
  height: 101px;
  transform: skew(29deg);
  background: ${props => props.color};
`

export default class Field extends React.Component {
  state = {
    start: 0,
    selectedDrive: 0
  }

  // componentDidMount() {
  //   if (this.props.selectedDrive > 0) {
  //   this.setState({
  //     start: this.props.game.drivesArr[(this.props.selectedDrive - 1)].yardLine,
  //     selectedDrive: this.props.selectedDrive
  //   })
  // }
  // }

  addDriveYards = () => {
    let driveYards = [0]
    const { selectedDrive, game } = this.props
    const { drivesArr } = game
    let currentDrive
    if (selectedDrive > 0) {
      currentDrive = selectedDrive - 1
    } else {
      currentDrive = drivesArr.length - 1
    }
      this.props.game.drivesArr[currentDrive].plays.forEach(
        play => {
          if (play.gainLoss === 'loss') {
            driveYards.push(-+play.playDist)
          } else if (play.gainLoss) {
            driveYards.push(+play.playDist)
          }
        }
      )
    let total = driveYards.reduce((acc, yards) => {
      return acc + yards
    })
    return total
  }

  driveResult = () => {
    const { selectedDrive, game } = this.props
    const { drivesArr } = game
    let currentDrive
    if (selectedDrive > 0) {
      currentDrive = selectedDrive - 1
    } else{
      currentDrive = drivesArr.length - 1
    }
    if (drivesArr[currentDrive].plays.length) {
      if (this.props.game.drivesArr[currentDrive].plays.length > 1) {
        if (
          this.props.game.drivesArr[currentDrive].plays[
            this.props.game.drivesArr[currentDrive].plays.length - 2
          ].result === 'touchdown'
        ) {
          return 'touchdown'
        }
      }
      let result = this.props.game.drivesArr[currentDrive].plays[
        this.props.game.drivesArr[currentDrive].plays.length - 1
      ].result

      if (
        result === '1st' ||
        result === '2nd' ||
        result === '3rd' ||
        result === '4th'
      ) {
        return 'in progress'
      }

      return result
    }
  }

  render() {
    let currentDrive
    const { selectedDrive } = this.props
    const { drivesArr, start_time } = this.props.game
    if (this.props.selectedDrive > 0) {
      currentDrive = selectedDrive - 1
    } else {
      currentDrive = drivesArr.length - 1
    }
    return (
      <Wrapper>
        <div className='field-container'>
          <div className='caption'>
            {drivesArr.length > 0 ? (
              selectedDrive > 0 ? (
                <h1>
                  Drive {selectedDrive}:{' '}
                  {this.props.game[drivesArr[currentDrive].team].school}{' '}
                  {this.props.game[drivesArr[currentDrive].team].mascot} (
                  {drivesArr[currentDrive].plays.length}{' '}
                  {drivesArr[currentDrive].plays.length === 1
                    ? 'play'
                    : 'plays'}
                  , {`${this.addDriveYards()}`} yards) {this.driveResult()}
                  {(this.driveResult() === 'Successful' ||
                    this.driveResult() === 'Failed') &&
                    ' FG'}
                </h1>
              ) : (
                <h1>
                  Current Drive:{' '}
                  {this.props.game[drivesArr[currentDrive].team].school}{' '}
                  {this.props.game[drivesArr[currentDrive].team].mascot} (
                  {drivesArr[currentDrive].plays.length}{' '}
                  {drivesArr[currentDrive].plays.length === 1
                    ? 'play'
                    : 'plays'}
                  , {`${this.addDriveYards()}`} yards) {this.driveResult()}
                  {(this.driveResult() === 'Successful' ||
                    this.driveResult() === 'Failed') &&
                    ' FG'}
                </h1>
              )
            ) : (
              <h1>Start Time: {start_time}</h1>
            )}
          </div>

          <div className='fieldContainer'>
            <div className='animation'>
              {drivesArr.length > 0 && (
                <Animation
                  margins={this.props.game.drivesArr[currentDrive].yardLine}
                  game={this.props.game}
                  selectedDrive={currentDrive}
                  driveResult={this.driveResult}
                />
              )}
            </div>

            <div className='fieldDiv'>
              <img className='goal-post-left' src={goal} alt='' height='100' />

              <LeftZone color={this.props.game.home.color}>
                <Home>{this.props.game.home.school}</Home>
              </LeftZone>
              <div className='trapezoid'></div>
              <RightZone color={this.props.game.away.color}>
                <Away>{this.props.game.away.school}</Away>
              </RightZone>

              <img className='goal-post-right' src={goal} alt='' height='100' />
              
              {this.props.game.drivesArr.length > 0 &&
              this.props.game.drivesArr[currentDrive].plays > 0  ?
              this.props.game.drivesArr[currentDrive].plays[
                this.props.game.drivesArr[currentDrive].plays.length - 1
              ].result === 'Successful' && (
                <img
                  className='goal-post-right-right'
                  src={upright}
                  alt=''
                  height='65'
                />
              ) : null}
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}
