import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import PlayInputs from './PlayInputs'
import AfterTDInputs from './AfterTDInputs'
import SubmitButton from './SubmitButton'
import Penalties from './Penalties'

const Wrapper = styled.div`
box-shadow: 1px 1px 2px #999999;
background: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 15px auto;
  padding: 25px;
  /* border: 1px solid black; */
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
    drivingTeam: '',

    showAfterTD: false,
    afterTD: '',
    kicker: '',
    patRes: '',
    patBlocker: '',

    penalty: '',
    yards: '',
    penTeam: ''
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
      sec
    } = this.state
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
    this.setState({
      drivingTeam: team
    })
    axios
      .put('/api/game/drive', {
        id: gameId,
        drive: {
          driveCount,
          team,
          fieldSide,
          yardLine,
          plays: []
        }
      })
      .then(res => {
        const idLoc = res.data.drivesArr.length - 1
        this.setState({
          driveCount: driveCount + 1,
          showAddDrive: false,
          showAddPlay: true,
          game: res.data,
          driveId: res.data.drivesArr[idLoc]._id,
          fieldSide: '',
          yardLine: ''
        })
        this.props.updateGame(res.data)
      })
      .catch(err => console.log(err))
  }
  setDriveInfo = id => {
    let setDrive = this.state.game.drivesArr.find(drive => {
      return drive._id === id
    })
    
    this.setState({
      playCount: setDrive.plays.length + 1,
      driveId: id,
      team: setDrive.team,
      drivingTeam: setDrive.team
    })
  }
  resumeDrive = () => {
    this.setState({ showAddDrive: false, showAddPlay: true })
  }

  addScore = () => {
    let { team, result, quarter } = this.state
    let { score } = this.props.game
    let points = 0
    //PAT
    if (result === 'Successful PAT') {
      points = 1
      this.setState({
        showAddDrive: true,
        team: '',
        showAfterTD: false
      })
    }

    //2-pt
    if (result === '2 point') {
      points = 2
      this.setState({
        showAddDrive: true,
        team: '',
        showAfterTD: false
      })
    }

    //FG
    if (result === 'Successful') {
      points = 3
      this.setState({
        showAddDrive: true,
        showAddPlay: false,
        team: ''
      })
    }

    //TD
    if (result === 'touchdown') {
      points = 6
    }

    //safety
    if (result === 'safety') {
      points = 2
      team === 'home' ? (team = 'away') : (team = 'home')
      this.setState({
        showAddDrive: true,
        showAddPlay: false,
        team: ''
      })
    }
    if (
      result === 'downs' ||
      result === 'fumble' ||
      result === 'interception' ||
      result === 'Failed' ||
      result === 'blocked' ||
      result === 'Time expires' ||
      result === 'punt'
    ) {
      this.setState({
        showAddDrive: true,
        showAddPlay: false,
        team: ''
      })
    }
    if (points > 0) {
      let addPoints = score[team][quarter]
      addPoints.push(points)
      let newPoints = { ...score }
      this.submitPlay(newPoints)
    } else {
      this.submitPlay()
    }
  }

  submitPlay = async scoreObj => {
    const {
      penalty,
      yards,
      penTeam,
      game,
      gameId,
      driveId,
      playType,
      gainLoss,
      playDist,
      player1,
      player2,
      kicker,
      result,
      afterTD,
      min,
      sec,
      quarter,
      kickType,
      playCount,
      drivingTeam
    } = this.state
    let playObj = {
      penalty,
      yards,
      penTeam,
      playType,
      gainLoss,
      playDist,
      player1,
      player2,
      kicker,
      result,
      afterTD,
      min,
      sec,
      quarter,
      kickType,
      playCount
    }
    let teamObj = {}
    let index1
    let index2
    let playerA
    let playerB

    index1 = game[drivingTeam].players.findIndex(player => {
      return player1 === player.last_name
    })

    playerA = game[drivingTeam].players[index1]

    if (playType === 'Run') {
      if (result === 'touchdown') {
        if (!playerA.rushTDs) {
          playerA.rushTDs = 1
        } else {
          playerA.rushTDs += 1
        }
      }
      if (!playerA.rushYards) {
        gainLoss === 'gain'
          ? (playerA.rushYards = [+playDist])
          : (playerA.rushYards = [-+playDist])
      } else {
        gainLoss === 'gain'
          ? (playerA.rushYards = [...playerA.rushYards, +playDist])
          : (playerA.rushYards = [...playerA.rushYards, -+playDist])
      }

      let updatedPlayers = [...game[drivingTeam].players]

      teamObj = { ...game[drivingTeam], players: updatedPlayers }
    }

    if (playType === 'pass') {
      index2 = game[drivingTeam].players.findIndex(player => {
        return player2 === player.last_name
      })

      playerB = game[drivingTeam].players[index2]

      if (result === 'touchdown') {
        if (!playerA.recTDs) {
          playerA.passTDs = 1
        } else {
          playerA.passTDs += 1
        }
        if (!playerB.recTDs) {
          playerB.recTDs = 1
        } else {
          playerB.recTDs += 1
        }
      }
      if (!playerA.passYards) {
        gainLoss === 'gain'
          ? (playerA.passYards = [+playDist])
          : (playerA.passYards = [-+playDist])
      } else {
        gainLoss === 'gain'
          ? (playerA.passYards = [...playerA.passYards, +playDist])
          : (playerA.passYards = [...playerA.passYards, -+playDist])
      }

      if (!playerB.recYards) {
        gainLoss === 'gain'
          ? (playerB.recYards = [+playDist])
          : (playerB.recYards = [-+playDist])
      } else {
        gainLoss === 'gain'
          ? (playerB.recYards = [...playerB.recYards, +playDist])
          : (playerB.recYards = [...playerB.recYards, -+playDist])
      }

      let updatedPlayers = [...game[drivingTeam].players]
      teamObj = { ...game[drivingTeam], players: updatedPlayers }
    }else {
      teamObj = { ...game[drivingTeam] }
    }
    this.setState({ game: { ...this.state.game, score: scoreObj } }, () => {
      axios
        .put(`/api/game`, {
          driveId,
          gameId,
          playObj,
          scoreObj,
          teamObj,
          drivingTeam
        })
        .then(res => {
          if (this.state.result === 'touchdown') {
            this.setState({
              showAfterTD: true,
              showAddPlay: false,
              playCount: playCount + 1
            })
          }
          this.setState({
            playType: '',
            gainLoss: '',
            playDist: '',
            player1: '',
            player2: '',
            result: '',
            kickType: '',
            afterTD: '',
            kicker: '',
            patRes: '',
            patBlocker: ''
          })
          this.props.updateGame(res.data.game)
        })
    })
  }

  // showAfterTD = () => {
  //   this.setState({ showAfterTD: true })
  // }

  setPenalty = (penObj) => {
    this.setState({
      penalty: penObj.penalty,
      yards: penObj.yards
    })
  }

  render() {
    return (
      <Wrapper>
        {/* Add drive inputs */}
        {this.state.showAddDrive && (
          <div className='new-drive'>
            <select
              required={true}
              onChange={e => this.handleChange(e.target)}
              name='team'
              className='team-select'>
              <option value=''>Select Team</option>
              <option value='home'>Home</option>
              <option value='away'>Away</option>
            </select>
            <select
              required={true}
              onChange={e => this.handleChange(e.target)}
              name='fieldSide'>
              <option value=''>Field Side</option>
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
                  Yard Line
                </option>
              ))}
            </datalist>
            <SubmitButton
              disable={this.state.submitDrive}
              addScore={this.submitDrive}
              title='Add Drive'
            />
            <select
              name='driveId'
              onChange={e => this.setDriveInfo(e.target.value)}>
              <option value=''>Select Drive</option>
              {this.props.game.drivesArr.map(drive => {
                return (
                  <option key={drive.driveCount} value={drive._id}>
                    Drive: {drive.driveCount}
                  </option>
                )
              })}
            </select>
            <SubmitButton
              disable={!this.state.driveId}
              title='Resume Drive'
              addScore={this.resumeDrive}
            />
          </div>
        )}

        <AfterTDInputs
          admin={this.state}
          handleChange={this.handleChange}
          addScore={this.addScore}
        />

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
              <option value='Run'>Run</option>
              <option value='pass'>Pass</option>
              <option value='incomplete pass'>Incomplete Pass</option>
              <option value='sack'>Sack</option>
              <option value='kick'>Kick</option>
              <option value='penalty'>Penalty</option>
            </select>

            {this.state.playType === 'penalty' ? (
                  <Penalties
                    setPenalty={this.setPenalty}
                    handleChange={this.handleChange}
                    adminState={this.state}
                    addScore={this.addScore}
                  />) :
                <PlayInputs
                  handleChange={this.handleChange}
                  adminState={this.state}
                  addScore={this.addScore}
                />
            }
          </div>
        )}
      </Wrapper>
    )
  }
}
