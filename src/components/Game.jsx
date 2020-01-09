import React from 'react'
import axios from 'axios'
import styled, { keyframes } from 'styled-components'
import Field from './Field'
import Scoreboard from './Scoreboard'
import Drives from './Drives'
import GameLeaders from './GameLeaders'
import Admin from './Admin'
import { withRouter } from 'react-router-dom'
import football from '../assets/football.jpg'
import io from 'socket.io-client'

const keyFrameFootball = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Wrapper = styled.div`
  background: #c9c9c9;
  padding-top: 25px;
  padding-bottom: 50px;
  .container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .football {
    height: 150px;
    animation: ${keyFrameFootball} 2s infinite linear;
  }
  .loading {
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .loading h1 {
    font-size: 3rem;
  }
  .toggle-info {
    display: none;
  }
  @media (max-width: 920px) {
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .drive-container {
      display: none;
    }
    .toggle-info {
      display: flex;
      width: 100%;
    }
    .button {
      font-size: 16px;
      font-weight: bold;
      width: 50%;
      background: white;
      border: none;
      padding: 10px;
    }
    .button:focus {
      outline: none;
    }
    .left {
      border-radius: 7px 0 0 0;
      /* border-right: 0.5px solid grey; */
    }
    .right {
      border-radius: 0 7px 0 0;
      /* border-left: 0.5px solid grey; */
    }
    .selected {
      background: #ededed;
      box-shadow: inset
        ${props =>
          props.infochange
            ? '-7px -7px 3px -6px #000000'
            : '7px -7px 3px -6px #000000'};
    }
    .selected:hover {
    }
  }
`

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      infoChange: false,
      isLoading: true,
      gameObj: {},
      gameId: '',
      selectedDrive: 0,
      min: '15',
      sec: '00',
      quarter: ''
    }
    this.socket = io.connect(':4321')
    this.socket.on('global response', data => {
      this.updateGame(data.game)
    })
  }

  componentDidMount = () => {
    let id = this.props.match.params.id
    axios.get(`/api/game/${id}`).then(res => {
      this.setState({
        gameObj: res.data.data,
        gameId: id,
        isLoading: false
      })
    })
  }

  componentWillUnmount() {
    this.socket.disconnect()
  }

  updateGame = game => {
    this.setState({ gameObj: game }, () => this.findTime())
  }

  setCurrentDrive = id => {
    this.setState({ selectedDrive: id }, () => this.findTime())
  }

  findTime = () => {
    let min
    let sec
    let quarter
    if (
      !this.state.selectedDrive &&
      this.state.gameObj.drivesArr.length > 0 &&
      this.state.gameObj.drivesArr[0].plays.length > 0
    ) {
      const { drivesArr } = this.state.gameObj
      const { plays } = drivesArr[drivesArr.length - 1]

      if (plays.length > 0) {
        min = plays[plays.length - 1].min
        sec = plays[plays.length - 1].sec
        quarter = plays[plays.length - 1].quarter
      } else {
        const prevPlays = [...drivesArr[drivesArr.length - 2].plays]
        min = prevPlays[prevPlays.length - 1].min
        sec = prevPlays[prevPlays.length - 1].sec
        quarter = prevPlays[prevPlays.length - 1].quarter
      }
      this.setState({
        min: min,
        sec: sec,
        quarter: quarter
      })
      return quarter
    }
  }
  infoToggle = button => {
    if (button === 'drives') {
      this.setState({ infoChange: false })
    }
    if (button === 'leaders') {
      this.setState({ infoChange: true })
    }
  }
  render() {
    return (
      <Wrapper infochange={!this.state.infoChange}>
        {/* LOADING... */}
        {this.state.isLoading && (
          <div className='loading'>
            <img className='football' src={football} alt='football' />
          </div>
        )}

        {!this.state.isLoading && (
          <Scoreboard
            game={this.state.gameObj}
            selectedDrive={this.state.selectedDrive}
            findTime={this.findTime}
            min={this.state.min}
            sec={this.state.sec}
            quarter={this.state.quarter}
          />
        )}
        {!this.state.isLoading && (
          <Field
            game={this.state.gameObj}
            selectedDrive={this.state.selectedDrive}
          />
        )}
        {!this.state.isLoading && null}
        {this.state.gameObj.status !== 'FINAL' &&
          this.props.show &&
          !this.state.isLoading && (
            <Admin updateGame={this.updateGame} game={this.state.gameObj} />
          )}

        {!this.state.isLoading && (
          <div className='container'>
            <div className='toggle-info'>
              <button
                className={
                  this.state.infoChange
                    ? 'button left '
                    : 'button left selected'
                }
                onClick={() => this.infoToggle('leaders')}>
                Game Leaders
              </button>
              <button
                className={
                  !this.state.infoChange
                    ? 'button right '
                    : 'button right selected'
                }
                onClick={() => this.infoToggle('drives')}>
                Drives
              </button>
            </div>
            <GameLeaders
              display={!this.state.infoChange}
              game={this.state.gameObj}
            />
            <Drives
              display={this.state.infoChange}
              setCurrentDrive={this.setCurrentDrive}
              selectedDrive={this.state.selectedDrive}
              game={this.state.gameObj}
            />
          </div>
        )}
      </Wrapper>
    )
  }
}

export default withRouter(Game)
