import React from 'react'
import styled from 'styled-components'
import "../assets/digital-7.ttf"
import { Link } from 'react-router-dom'
import Helmet from './Helmet'

const Link2 = styled(Link)`
text-decoration: none;
color: black;`

const Wrapper = styled.div`
  width: 600px;
  margin: 25px;
  background: white;
  border-radius: 7px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  .school-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
  }
  .teams , .team{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
  }
  .teams {
    padding: 0 15px;
  }
  .field-component {
    display: flex;
  }
  .at {
    font-size: 2rem;
  }
  h1 {
    font-size: 1.5rem;
  }
  h3 {
  font-size: 4rem;
  font-family: Digital-7;
  }
`

export default class GamePreview extends React.Component {
  state = {}

  totalScore = (team) => {
    const { away, home } = this.props.game.score
    //away quarters
    let newAS1 = away.first.reduce((acc, num) => {
      return acc + num
    })
    let newAS2 = away.second.reduce((acc, num) => {
      return acc + num
    })
    let newAS3 = away.third.reduce((acc, num) => {
      return acc + num
    })
    let newAS4 = away.fourth.reduce((acc, num) => {
      return acc + num
    })
    //home quarters
    let newHS1 = home.first.reduce((acc, num) => {
      return acc + num
    })
    let newHS2 = home.second.reduce((acc, num) => {
      return acc + num
    })
    let newHS3 = home.third.reduce((acc, num) => {
      return acc + num
    })
    let newHS4 = home.fourth.reduce((acc, num) => {
      return acc + num
    })



    let awayScore = newAS1 + newAS2 + newAS3 + newAS4
    let homeScore = newHS1 + newHS2 + newHS3 + newHS4


    if (team === 'home') {
      return homeScore
    }

    if (team === 'away') {
      return awayScore
    }

    return

  }

  render() {
    const h = this.props.game.home
    const a = this.props.game.away
    const { status, start_time } = this.props.game

    return (
      <Link2 to={`/game/${this.props.game._id}`}>
        <Wrapper >
          <div className='teams'>
            <div className='team'>
              <Helmet color1={h.color} />
              <div className='school-info'>
                <h2>{h.school}</h2>
                { status !=='upcoming' &&
                <h3>{this.totalScore('home')}</h3>}
              </div>
            </div>
            {this.props.game.status !== 'upcoming' && status === 'inProgress' ? <div className='at'>In Progress</div>
              : <div className='at'>{start_time}</div>
            }

            <div className='team'>
              <div className='school-info'>
                <h2>{a.school}</h2>
                { status !=='upcoming' &&
                <h3>{this.totalScore('away')}</h3>}
              </div>
              <Helmet rightHelmet={true} color1={a.color} />
            </div>
          </div>

        </Wrapper>
      </Link2>
    )
  }
}
