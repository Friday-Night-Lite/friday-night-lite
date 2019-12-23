import React from 'react'
import styled from 'styled-components'
import { returnText } from '../functions/returnText'

const Plays = styled.h1`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-family: sans-serif;
    font-weight: bold;
    text-align: left;
    font-size: 12px;
    padding: 5px;
    .play-desc {
        font-weight: 400;
    }
`

export default class Play extends React.Component {
  state = {}
  render() {
    const { play } = this.props
    return (
      <Plays>
        Play {play.playCount}: <p className='play-desc'>{returnText(play)}</p>
      </Plays>
    )
  }
}
