import React from 'react'
import axios from 'axios'
import styled, { keyframes } from 'styled-components'
import football from '../assets/football.jpg'
import GamePreview from './GamePreview'
// import Scoreboard from './Scoreboard'

const keyFrameFootball = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const ModalBackdrop = styled.div`
  background: rgba(000, 000, 000, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 5;
  .modal-outer {
    position: fixed;
    width: 650px;
    background: lightgrey;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-312.5px, -300px);
  }
  .no {
    position: fixed;
    color: white;
    font-size: 80px;
    width: 100%;
    height: 100%;
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
  @media (max-width: 920px) {
    .modal-outer {
      padding: 7px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 95%;
      transform: translate(-50%, -50%);
    }
    .no {
      font-size: 40px;
    }
  }
`

export default class Modal extends React.Component {
  state = {
    games: [],
    loading: false
  }

  componentDidMount() {
    this.getGames()
  }

  getGames() {
    this.setState({ loading: true })
    let state = this.props.st
    axios.get(`/api/games/${state}`).then(res => {
      this.setState({
        games: res.data.data,
        loading: false
      })
    })
  }

  render() {
    return (
      <ModalBackdrop
        hidden={!this.props.st}
        id='grey-back'
        onClick={this.props.closeMenu}>
        {this.state.games.length > 0 ? (
          <div
            className='modal-outer'
            ref={element => {
              this.props.assignElement(element)
            }}>
            {this.state.games.map(game => {
              return (
                <GamePreview
                  closeMenu={this.props.hideMenu}
                  assignElement={this.props.assignElement}
                  key={game._id}
                  game={game}
                />
              )
            })}
          </div>
        ) : this.state.loading ? (
          <div className='loading'>
            <img className='football' src={football} alt='football' />
          </div>
        ) : (
          <h1 className='no'>No Games Currently</h1>
        )}
      </ModalBackdrop>
    )
  }
}
