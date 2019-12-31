import React from 'react'
import styled from 'styled-components'
import football from '../assets/football.jpg'

const PostDot = styled.div`
  &.dot {
    height: 11px;
    width: 11px;
    border-radius: 50%;
    background: black;
    box-sizing: border-box;
    z-index: ${props => `${props.index}`};
  }
  &.post-pass {
    margin: 0 -5.5px;
    z-index: ${props => `${props.index}`};
  }
  &.post-run {
    margin: 0 -5.5px;
    z-index: ${props => `${props.index}`};
  }
`
const Play = styled.div`
    &.run {
      height: 5px;
      background: black;
      margin: 0 0 2.8px 0;
      z-index: ${props => `${props.index}`};
    }
    &.penalty-run {
      height: 5px;
      background: black;
      margin: ${props => `0 -1px 2.8px -${props.penaltyYards}%`};
      z-index: ${props => `${props.index}`};
    }
    &.loss-run {
      height: 5px;
      background: black;
      opacity: .6;
      margin: ${props => `0 -1px 2.8px -${props.lossYards}%`};
      z-index: ${props => `${props.index}`};
    }
    &.td-run {
      position: absolute;
      right: 30px;
      height: 5px;
      background: black;
      margin: 0 -1px 2.8px -5px;
      z-index: ${props => `${props.index}`};
    }
    &.pass {
      border: 4px solid black;
      border-radius: ${props =>
        `50%/${props.passArch * 1.25}px ${props.passArch * 1.25}px 0 0`};
      height: ${props => props.passArch / 1.3}%;
      border-color: black transparent transparent transparent;
      z-index: ${props => `${props.index}`};
    }
    &.penalty-pass {
      border: 4px solid black;
      border-radius: ${props =>
        `50%/${props.passArch}px ${props.passArch}px 0 0`};
      margin: ${props => `0 0 0 -${props.penaltyYards}%`};
      height: ${props => props.passArch / 1.5}%;
      border-color: black transparent transparent transparent;
      z-index: ${props => `${props.index}`};
    }
    &.loss-pass {
      border: 4px solid black;
      border-radius: ${props =>
        `50%/${props.passArch}px ${props.passArch}px 0 0`};
      margin: ${props => `0 0 0 -${props.lossYards}%`};
      height: ${props => props.passArch / 1.5}%;
      border-color: black transparent transparent transparent;
      z-index: ${props => `${props.index}`};
    }
    &.td-pass {
      position: absolute;
      right: 30px;
      border: 4px solid black;
      border-radius: ${props =>
        `50%/${props.passArch + 10}px ${props.passArch + 10}px 0 0`};
      height: ${props => props.passArch / 2}%;
      border-color: black transparent transparent transparent;
      z-index: ${props => `${props.index}`};
    }
    &.kick {
      border: 4px dashed green;
      border-radius: ${props =>
        `50%/${props.passArch}px ${props.passArch}px 0 0`};
      margin: 0 0 0 -10px;
      height: ${props => props.passArch / 2}%;
      border-color: green transparent transparent transparent;
      z-index: ${props => `${props.index}`};
    }
  `
const PenDot = styled.div`
    height: 11px;
    width: 11px;
    min-width: 10px;
    border-radius: 50%;
    box-sizing: border-box;
    z-index: ${props => `${props.index}`};
    &.loss {
    background: red;
    margin: ${props => `0 -5.5px 0 calc(-${props.penaltyMargin}% - 5.5px)`};
    z-index: ${props => `${props.index + 2}`};
    }
    &.gain {
    margin: 0 -5.5px;
    background: white;
    z-index: ${props => `${props.index + 2}`};
    }
`

const Penalty = styled.div`
  &.at-fault {
    border-top: 3px dashed red;
    margin: 0 0 4px 0;
    z-index: ${props => `${props.index}`};
  }
  &.gain-yards {
    border-top: 3px dashed white;
    margin: 0 0 4px 0;
    z-index: ${props => `${props.index}`};
  }
`
const LossDot = styled.div`
  height: 11px;
  width: 11px;
  min-width: 10px;
  border-radius: 50%;
  box-sizing: border-box;
  z-index: ${props => `${props.index + 2}`};
  background: red;
  margin: ${props => `0 -5.5px 0 calc(-${props.lossMargin}% - 5.5px)`};
`
const Loss = styled.div`
  border-top: 3px solid red;
  margin: 0 0 4px 0;
  z-index: ${props => `${props.index}`};
`
const Football = styled.img`
  height: 15px;
  position: absolute;
  right: 20px;
  z-index: ${props => `${props.index + 5}`};
`

const Line = props => {
  const { playDist, playType, penTeam, yards, result, gainLoss } = props.line
  const passArch = playDist * 1.6
  const { drive, index } = props
  let penaltyYards = 0
  let lossYards = 0

  function checkPenalties() {
    let i = 0

    if (playType !== 'penalty') {
      if (index > 0) {
        i = index - 1
        if (drive.plays[i].penTeam !== drive.team) {
          return
        }
      } else {
        i = index
      }
    }
    if (playType === 'penalty') {
      i = index
    }
    while (i > 0 && drive.plays[i].penTeam === drive.team) {
      penaltyYards += +drive.plays[i].yards
      i--
    }
    return penaltyYards
  }
  function checkLoss() {
    let i = 0

    if (gainLoss !== 'loss') {
      if (index > 0) {
        i = index - 1
        if (drive.plays[i].gainLoss !== 'loss') {
          return
        }
      }
    }
    if (gainLoss === 'loss') {
      i = index
    }
    while (i > 0 && drive.plays[i].gainLoss === 'loss') {
      lossYards += +drive.plays[i].playDist
      i--
    }

    return lossYards
  }

  function elementType() {
    if (result === 'touchdown') {
      if (playType === 'Run') {
        return (
          <Play
            index={index}
            playDist={playDist}
            className='td-run'
            style={{ width: `calc(${playDist}% + 20px)` }}
          />
        )
      } else if (playType === 'Pass') {
        return (
          <Play
            index={index}
            playDist={playDist}
            passArch={passArch}
            className='td-pass'
            style={{ width: `calc(${playDist}% + 20px)` }}
          />
        )
      }
    }
    if (gainLoss === 'loss') {
      checkLoss()
      return (
        <>
          <LossDot index={index} className='loss' lossMargin={lossYards} />
          <Loss
            index={index}
            className='loss-line'
            style={{ width: `${lossYards}%` }}
          />
        </>
      )
    }
    if (playType === 'Run') {
      checkPenalties()
      checkLoss()
      return (
        <>
          <Play
            index={index}
            lossYards={lossYards}
            penaltyYards={penaltyYards}
            className={
              penaltyYards ? 'penalty-run' : lossYards ? 'loss-run' : 'run'
            }
            style={{ width: `${playDist}%` }}
          />
          <PostDot index={index} className='post-run dot' />
        </>
      )
    } else if (playType === 'Pass') {
      checkPenalties()
      checkLoss()
      return (
        <>
          <Play
            index={index}
            passArch={passArch}
            lossYards={lossYards}
            penaltyYards={penaltyYards}
            className={
              penaltyYards ? 'penalty-pass' : lossYards ? 'loss-pass' : 'pass'
            }
            style={{ width: `calc(${playDist}% - 8px)` }}
          />
          <PostDot index={index} className='post-pass dot' />
        </>
      )
    } else if (playType === 'penalty') {
      if (penTeam === drive.team) {
        if (drive.plays.length > index + 1) {
          if (drive.plays[index + 1].penTeam === drive.team) {
            return
          } else {
            checkPenalties()
            return (
              <>
                <PenDot
                  index={index}
                  className='loss'
                  penaltyMargin={penaltyYards}
                />
                <Penalty
                  index={index}
                  className='at-fault'
                  style={{ width: `${penaltyYards}%` }}
                />
              </>
            )
          }
        } else {
          checkPenalties()
          return (
            <>
              <PenDot
                index={index}
                className='loss'
                penaltyMargin={penaltyYards}
              />
              <Penalty
                index={index}
                className='at-fault'
                style={{ width: `${penaltyYards}%` }}
              />
            </>
          )
        }
      }
      if (penTeam !== drive.team) {
        checkPenalties()
        return (
          <>
            <Penalty
              index={index}
              className='gain-yards'
              penaltyMargin={penaltyYards}
              style={{ width: `${yards}%` }}
            />
            <PenDot index={index} className='gain' />
          </>
        )
      }
    } else if (playType === 'kick') {
      return (
        <Play
          index={index}
          className='kick'
          style={{ width: `${playDist}%` }}
          passArch={passArch}
        />
      )
    } else {
    }
  }

  return (
    <>
      {index === 0 ? <div className='start-dot' /> : null}
      {playDist !== '0' ? elementType() : null}
      {result === 'touchdown' && <Football index={index} src={football} />}
    </>
  )
}

export default Line
