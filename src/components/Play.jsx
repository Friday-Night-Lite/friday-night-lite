import React from 'react'
import styled from 'styled-components'
import { returnText } from '../functions/returnText'

const Plays = styled.h1`
    display: flex;
    align-items: flex-start;
    font-family: sans-serif;
    font-weight: bold;
    text-align: left;
    font-size: 12px;
    padding: 5px 5px 5px 15px;
    color: black;
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
        Play {play.playCount}: <span className='play-desc'>{returnText(play)}</span>
      </Plays>
    )
  }
}
