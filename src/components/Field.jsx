import React from 'react'
import styled from 'styled-components'
import Animation from './Animation'
import './Field.css'
import goal from '../assets/goal.png'
import referee from '../assets/referee.jpg'


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* border: 1px solid black; */
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
    /* border: 1px solid black; */
    display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 7px;
  /* border: 1px solid #999999; */
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
    //selectedDrive logic...
    selectedDrive: 0
  }

  componentDidMount() {
    this.setState({
      start: this.props.game.drivesArr[(this.props.selectedDrive - 1)].yardLine,
      selectedDrive: this.props.selectedDrive
    })
  }

  addDriveYards = () => {
    let driveYards = [0]
    this.props.game.drivesArr[this.props.selectedDrive -1].plays.map(play => {
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
    const { selectedDrive } = this.props
    let currentDrive = selectedDrive -1
    const { drivesArr } = this.props.game
    return (
      <Wrapper>

        <div className="field-container">

        <div className="caption">

  <h1>Drive {selectedDrive}: {this.props.game[drivesArr[currentDrive].team].school} {this.props.game[drivesArr[currentDrive].team].mascot} ({drivesArr[currentDrive].plays.length} {(drivesArr[currentDrive].plays.length === 1 ? 'play' : 'plays')}, {`${this.addDriveYards()}`} yards)</h1>
    
        
        </div>


        <div className='fieldContainer'>
          <div className='animation'>
            {(this.props.selectedDrive > 0) &&
              <Animation margins={this.state} game={this.props.game} selectedDrive={this.props.selectedDrive} />
            }
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
            <img className='referee' src={referee} alt="" height='75'/>
          </div>

        </div>

        </div>


      </Wrapper>
    )
  }
}
