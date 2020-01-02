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
    display: flex;
    justify-content: center;
  }
  .football {
    height: 150px;
    animation: ${keyFrameFootball} 3s linear;
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
`

class Game extends React.Component {
  state = {
    isLoading: true,
    gameObj: {},
    gameId: '',
    selectedDrive: 0,
    min: '15',
    sec: '00',
    quarter: ''
  }

  componentDidMount() {
    let id = this.props.match.params.id
    axios.get(`/api/game/${id}`).then(res => {
      this.setState({
        gameObj: res.data.data,
        gameId: id,
        isLoading: false
      })
    })
  }

  updateGame = game => {
    this.setState({ gameObj: game })
  }

  setCurrentDrive = id => {
    this.setState(
      {
        selectedDrive: id
      },
      () => this.findTime()
    )
  }

  findTime = () => {
    let min
    let sec
    let quarter
    if (!this.state.selectedDrive && this.state.gameObj.drivesArr.length > 0 && this.state.gameObj.drivesArr[0].plays.length > 0 ) {
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
  render() {
    return (
      <Wrapper>
        {/* LOADING... */}
        {this.state.isLoading && (
          <div className='loading'>
            {/* <h1>Loading...</h1> */}
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
        {this.props.show && !this.state.isLoading && (
          <Admin updateGame={this.updateGame} game={this.state.gameObj} />
        )}

        {!this.state.isLoading && (
          <div className='container'>
            <GameLeaders game={this.state.gameObj} />
            <Drives
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
