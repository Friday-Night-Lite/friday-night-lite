import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import PlayInputs from './PlayInputs'
import AfterTDInputs from './AfterTDInputs'
import SubmitButton from './SubmitButton'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 15px auto;
  padding: 25px;
  border: 1px solid black;
  border-radius: 7px;
  width: 850px;
  .new-drive {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 800px;
  }
`

export default class Admin extends React.Component {
  state = {
    game: {},
    gameId: '',
   
    showAddDrive: true,
    submitDrive: true,
    team: '',
    fieldSide: '',
    yardLine: '',
    driveId: '',
    driveCount: 1,

    showAddPlay: false,
    submitPlay: true,
    playType: '',
    gainLoss: '',
    playDist: '',
    player1: '',
    player2: '',
    result: '',
    min: '',
    sec: '',
    quarter: 'first',
    kickType: '',
    playCount: 1,

    showAfterTD: false,
    afterTD: '',
    kicker: '',
    patRes: '',
    patBlocker: ''
  }

  componentDidMount = () => {
    this.setState({
      driveCount: this.props.game.drivesArr.length + 1,
      game: this.props.game,
      gameId: this.props.game._id
    })
  }

  handleChange = trg => {
    this.setState({ [trg.name]: trg.value }, () => {
      this.enableButtons()
    })
  }
  
  enableButtons = () => {
    const { 
      team, 
      fieldSide, 
      yardLine,  
      playType,
      gainLoss,
      playDist,
      player1,
      result,
      min,
      sec } = this.state
    if (team && fieldSide && yardLine) {
      this.setState({ submitDrive: false })
    }
    if (!team || !fieldSide || !yardLine) {
      this.setState({ submitDrive: true })
    }
    if (playType && gainLoss && playDist && player1 && result && min && sec) {
      this.setState({ submitPlay: false })
    }
    if (playType || gainLoss || playDist || player1 || result || min || sec) {
      this.setState({ submitPlay: true })
    }
  }

  submitDrive = () => {
    const { gameId, driveCount, team, fieldSide, yardLine } = this.state
    
    axios
      .put('/api/game/drive', {
        id: gameId,
        drive: { driveCount, team, fieldSide, yardLine, plays: [] }
      })
      .then(res => {
        const idLoc = res.data.drivesArr.length - 1
        this.setState({
          driveCount: driveCount + 1,
          showAddDrive: false,
          showAddPlay: true,
          game: res.data,
          driveId: res.data.drivesArr[idLoc]._id
        })
        this.props.updateGame(res.data)
      })
      .catch(err => console.log(err))
  }

  addScore = () => {
    let { team, result, quarter } = this.state
    let { score } = this.props.game
    let points = 0
    //extra point
    if (result === 'extra point') {
      points = 1
      this.setState({ showAddDrive: true,
      showAfterTD: false })
    }

    //2-pt
    if (result === '2 point') {
      points = 2
      this.setState({ showAddDrive: true, showAfterTD: false })
    }

    //FG
    if (result === 'Successful') {
      points = 3
      this.setState({ showAddDrive: true })
    }

    //TD
    if (result === 'touchdown') {
      points = 6
    }

    //safety
    if (result === 'safety') {
      points = 2
      team === 'home' ? team = 'away' : team = 'home'
      this.setState({ showAddDrive: true })
    }
    if (points > 0) {
      let addPoints = score[team][quarter]
      addPoints.push(points)
      let newPoints = { ...score }
      this.submitPlay(newPoints)
    }else {
      this.setState({ showAddPlay: true, playCount: this.playCount + 1 });
      this.submitPlay()
    }
  }

  submitPlay = async (scoreObj) => {
    const {
      gameId,
      driveId,
      playType,
      gainLoss,
      playDist,
      player1,
      player2,
      result,
      min,
      sec,
      quarter,
      kickType,
      playCount
    } = this.state
    let playObj = {
      playType,
        gainLoss,
        playDist,
        player1,
        player2,
        result,
        min,
        sec,
        quarter,
        kickType,
        playCount
    }
    this.setState({ game: {...this.state.game, score: scoreObj } }, () => {
      
      axios
        .put(`/api/game`, {
          driveId,
          gameId,
          playObj,
          scoreObj
          
        })
        .then(res => {
  
          if (this.state.result === 'touchdown') {
            this.setState({
              showAfterTD: true,
              showAddPlay: false
            })
          }
          this.setState(
            {
              playType: '',
              gainLoss: '',
              playDist: '',
              player1: '',
              player2: '',
              result: ''
            })
          this.props.updateGame(res.data.game)
        })
    })
  }

  showAfterTD = () => {
    this.setState({ showAfterTD: true })
  }

  render() {

    return (
      <Wrapper>
        {/* Add drive inputs */}
        {this.state.showAddDrive && (
          <form className='new-drive'>
            <select
              required={true}
              onChange={e => this.handleChange(e.target)}
              name='team'
              className='team-select'>
              <option>Select Team</option>
              <option value='home'>Home</option>
              <option value='away'>Away</option>
            </select>
            <select
              required={true}
              onChange={e => this.handleChange(e.target)}
              name='fieldSide'>
              <option>Field Side</option>
              <option value='home'>Home</option>
              <option value='away'>Away</option>
            </select>
            <input
              required={true}
              onChange={e => this.handleChange(e.target)}
              name='yardLine'
              placeholder='Yard Line'
              list='yard-line'
            />
            <datalist id='yard-line'>
              {[...Array(50)].map((el, i) => (
                <option key={i} value={`${i}`}>
                  Yards
                </option>
              ))}
            </datalist>
            <SubmitButton disable={this.state.submitDrive} addScore={this.submitDrive} title='Add Drive'/>
          </form>
        )}
        
        <AfterTDInputs admin={this.state} handleChange={this.handleChange} addScore={this.addScore}/>

        {this.state.showAddPlay && (
          <div>
            <select
            required={true}
              onChange={e => this.handleChange(e.target)}
              name='playType'
              placeholder='Play Type'
              value={this.state.playType}
              list='play-type'>
              <option>Play Type</option>
              <option value='run'>Run</option>
              <option value='pass'>Pass</option>
              <option value='sack'>Sack</option>
              <option value='incomplete pass'>Incomplete Pass</option>
              <option value='kick'>Kick</option>
            </select>

            {this.state.playType && (
              <PlayInputs
                handleChange={this.handleChange}
                adminState={this.state}
                addScore={this.addScore}
              />
            )}
          </div>
        )}
      </Wrapper>
    )
  }
}
