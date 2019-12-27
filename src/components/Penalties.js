import React, { Component } from 'react'
import SubmitButton from "./SubmitButton"

class Penalties extends Component {
  state = {
    penalties: [
      {
        penalty: 'Blocking below the waist',
        yards: 15
      },
      {
        penalty: 'Block in the back',
        yards: 10
      },
      {
        penalty: 'Chop block',
        yards: 15
      },
      {
        penalty: 'Clipping',
        yards: 15
      },
      {
        penalty: 'Delay of game',
        yards: 5
      },
      {
        penalty: 'Encroachment',
        yards: 5
      },
      {
        penalty: 'Face mask(unintentional)',
        yards: 5
      },
      {
        penalty: 'Face mask(intentional)',
        yards: 15
      },
      {
        penalty: 'False start',
        yards: 5
      },
      {
        penalty: 'Helmet-to-helmet collision',
        yards: 15
      },
      {
        penalty: 'Holding',
        yards: 10
      },
      {
        penalty: 'Horse-collar tackle',
        yards: 15
      },
      {
        penalty: 'Illegal batting',
        yards: 15
      },
      {
        penalty: 'Illegal formation',
        yards: 5
      },
      {
        penalty: 'Illegal forward pass',
        yards: 5
      },
      {
        penalty: 'Illegal hands to the face',
        yards: 10
      },
      {
        penalty: 'Illegal kick',
        yards: 15
      },
      {
        penalty: 'Illegal motion',
        yards: 5
      },
      {
        penalty: 'Illegal participation',
        yards: 15
      },
      {
        penalty: 'Illegal shift',
        yards: 5
      },
      {
        penalty: 'Illegal Substitution/"Too many players"',
        yards: 5
      },
      {
        penalty: 'Illegal touching of a forward pass',
        yards: 5
      },
      {
        penalty: 'Illegal use of hands',
        yards: 10
      },
      {
        penalty: 'Ineligible receiver downfield',
        yards: 5
      },
      {
        penalty: 'Intentional grounding',
        yards: 5
      },
      {
        penalty: 'Neutral Zone Infraction',
        yards: 5
      },
      {
        penalty: 'Pass interference',
        yards: 15
      },
      {
        penalty: 'Personal foul',
        yards: 15
      },
      {
        penalty: 'Roughing the passer',
        yards: 15
      },
      {
        penalty: 'Roughing the kicker',
        yards: 15
      },
      {
        penalty: 'Roughing the snapper',
        yards: 15
      },
      {
        penalty: 'Running into the kicker',
        yards: 5
      },
      {
        penalty: 'Sideline infraction(second)',
        yards: 5
      },
      {
        penalty: 'Sideline infraction(third)',
        yards: 15
      },
      {
        penalty: 'Spearing',
        yards: 15
      },
      {
        penalty: 'Targeting',
        yards: 15
      },
      {
        penalty: 'Tripping',
        yards: 15
      },
      {
        penalty: 'Unsportsmanlike conduct',
        yards: 15
      }
    ]
  }

  selectPenalty = name => {
    let penObj = this.state.penalties.find(penalty => {
      return name === penalty.penalty
    })
    this.props.setPenalty(penObj)
  }

  render() {
    let admin = this.props.adminState
    return (
      <div>
        <select
          required={true}
          onChange={e => this.props.handleChange(e.target)}
          name='penTeam'
          className='team-select'>
          <option value=''>Select Team</option>
          <option value='home'>Home</option>
          <option value='away'>Away</option>
        </select>
        <input
          onChange={e => this.props.handleChange(e.target)}
          name='player1'
          placeholder='Penalized Player'
          list='player1'
          value={admin.player1}
        />
        <datalist id='player1'>
          {admin.team === 'home'
            ? admin.game.home.players.map((player, i) => (
                <option key={i} value={player.last_name}>
                  {player.position}
                </option>
              ))
            : admin.game.away.players.map((player, i) => (
                <option key={i} value={player.last_name}>
                  {player.position}
                </option>
              ))}
        </datalist>
        <select
          value={admin.penalty}
          onChange={e => this.selectPenalty(e.target.value)}>
          <option value=''>Select Penalty</option>
          {this.state.penalties.map((penalty, i) => {
            return (
              <option key={i} value={penalty.penalty}>
                {penalty.penalty}
              </option>
            )
          })}
        </select>
        <select
          onChange={e => this.props.handleChange(e.target)}
          name='result'
          value={admin.result}>
          <option>Penalty Result</option>
          <option value='1st'>1st Down</option>
          <option value='2nd'>2nd Down</option>
          <option value='3rd'>3rd Down</option>
          <option value='4th'>4th Down</option>
        </select>
        <SubmitButton
          addScore={this.props.addScore}
          disable={
            !(admin.penalty && admin.player1 && admin.penTeam && admin.result)
          }
          title='Add Penalty'
        />
      </div>
    )
  }
}
 
export default Penalties


