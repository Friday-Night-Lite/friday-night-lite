import React from 'react'
import styled from 'styled-components'
import football from '../assets/football.jpg'

const PostDot = styled.div`
  height: 11px;
  width: 11px;
  border-radius: 50%;
  background: black;
  box-sizing: border-box;
  margin: 0 -5.5px;
  z-index: ${props => `${props.index}`};
  &.punt {
    margin-left: -8px;
    background: orange;
  }
`
const Play = styled.div`
overflow: hidden;
animation: show 1000ms cubic-bezier(0.250, 0.100, 0.250, 1.000);
  &.run {
    height: 5px;
    background: black;
    margin: 0 0 2.8px 0;
    z-index: ${props => `${props.index}`};
  }
  &.loss-run {
    height: 5px;
    background: black;
    opacity: 0.6;
    margin: ${props => `0 -1px 2.8px -${props.lossYards}%`};
    z-index: ${props => `${props.index}`};
  }
  &.pen-run {
    height: 5px;
    background: black;
    opacity: 0.6;
    margin: ${props => `0 -1px 2.8px -${props.penaltyYards}%`};
    z-index: ${props => `${props.index}`};
  }
  &.td-run {
    position: absolute;
    right: -25px;
    bottom: 52.8px;
    height: 5px;
    background: black;
    z-index: ${props => `${props.index}`};
  }
  &.pass {
    border: 4px solid black;
    border-radius: 50%/100% 100% 0 0;
    height: ${props => props.passArch}%;
    border-color: black transparent transparent transparent;
    z-index: ${props => `${props.index}`};
  }
  &.loss-pass {
    border: 4px solid black;
    border-radius: 50%/100% 100% 0 0;
    margin: ${props => `0 0 0 -${props.lossYards}%`};
    height: ${props => props.passArch}%;
    border-color: black transparent transparent transparent;
    z-index: ${props => `${props.index}`};
  }
  &.pen-pass {
    border: 4px solid black;
    border-radius: 50%/100% 100% 0 0;
    margin: ${props => `0 0 0 -${props.penaltyYards}%`};
    height: ${props => props.passArch}%;
    border-color: black transparent transparent transparent;
    z-index: ${props => `${props.index}`};
  }
  &.td-pass {
    position: absolute;
    right: -25px;
    border: 4px solid black;
    border-radius: 50%/100% 100% 0 0;
    /* border-radius: ${props => `50%/100% 100% 0 0`}; */
    height: ${props => props.passArch}%;
    border-color: black transparent transparent transparent;
    z-index: ${props => `${props.index}`};
  }
  &.punt {
    border: 4px solid orange;
    border-radius: 50%/100% 100% 0 0;
    /* margin: 0 0 0 -10px; */
    height: ${props => props.passArch}%;
    border-color: orange transparent transparent transparent;
    z-index: ${props => `${props.index - 4}`};
  }
  &.loss-punt {
    border: 4px solid orange;
    border-radius: 50%/100% 100% 0 0;
    margin: ${props => `0 0 0 calc(-${props.lossYards}% - 3px)`};
    height: ${props =>
      props.passArch < 45 ? props.passArch : props.passArch / 2}%;
    border-color: orange transparent transparent transparent;
    z-index: ${props => `${props.index - 4}`};
  }
  &.FG {
    position: absolute;
    right: -140px;
    border: 4px solid;
    border-radius: 50%/100% 100% 0 0;
    height: ${props =>
      props.passArch < 45 ? props.passArch * 1.3 : props.passArch}%;
  }
  &.loss-FG {
    position: absolute;
    right: -140px;
    border: 4px solid;
    border-radius: 50%/100% 100% 0 0;
    height: ${props => props.passArch}%;
    z-index: ${props => `${props.index}`};
  }
  &#failed {
    border-color: red transparent transparent transparent;
  }
  &#success {
    border-color: green transparent transparent transparent;
  }
`
const PenDot = styled.div`
  height: 11px;
  width: 11px;
  min-width: 10px;
  border-radius: 50%;
  box-sizing: border-box;
  z-index: ${props => `${props.index + 2}`};
  &.loss {
    background: red;
    margin: ${props => `0 -5.5px 0 calc(-${props.penaltyMargin}% - 5.5px)`};
  }
  &.gain {
    margin: 0 -5.5px;
    background: white;
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
  right: -35px;
  z-index: ${props => `${props.index + 5}`};
`

const Line = props => {
  const {
    playDist,
    playType,
    penTeam,
    yards,
    result,
    gainLoss,
    kickType
  } = props.line
  const passArch = playDist * 1.8
  const { drive, index } = props
  let penaltyYards = 0
  let lossYards = 0

  function checkPenalties() {
    let i = 0

    if (playType !== 'penalty' || playType === 'Incomplete pass' || playType === 'kick') {
      if (index > 0) {
        i = index - 1
        if (drive.plays[i].penTeam !== drive.team && drive.plays[i].playType !== 'Incomplete pass') {
          return
        }
      } else {
        i = index
      }
    }
    if (playType === 'penalty') {
      i = index
    }
    while ((i > 0 && drive.plays[i].penTeam === drive.team) || (i >= 0 && drive.plays[i].playType === 'Incomplete pass')) {
      penaltyYards += +drive.plays[i].yards
      i--
    }
    return penaltyYards
  }
  function checkLoss(play) {
    let i = 0

    if (gainLoss !== 'loss' || playType === 'Incomplete pass' || playType === 'kick') {
      if (index > 0) {
        i = index - 1
        if (drive.plays[i].gainLoss !== 'loss' && drive.plays[i].playType !== 'Incomplete pass') {
          return
        }
      }
    }
    if (gainLoss === 'loss') {
      i = index
    }
    if (i === 0 && drive.plays[i].gainLoss === 'loss') {
      return (lossYards = +drive.plays[i].playDist)
    }
    while ((i >= 0 && drive.plays[i].gainLoss === 'loss') || (i >= 0 && drive.plays[i].playType === 'Incomplete pass')) {
      lossYards += +drive.plays[i].playDist
      i--
    }
   
    return lossYards
  }

  function elementType() {
    if (result === 'touchdown') {
      if (playType === 'Run' || playType === 'Kick return') {
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
    if (playType === 'Run' || playType === 'Kick return') {
      checkPenalties()
      checkLoss()
      return (
        <>
          <Play
            index={index}
            lossYards={lossYards}
            penaltyYards={penaltyYards}
            className={
              penaltyYards ? 'pen-run' : lossYards ? 'loss-run' : 'run'
            }
            style={{ width: `${playDist}%` }}
          />
          <PostDot index={index} />
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
              penaltyYards ? 'pen-pass' : lossYards ? 'loss-pass' : 'pass'
            }
            style={{ width: `calc(${playDist}% - 8px)` }}
          />
          <PostDot index={index} />
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
      checkPenalties('punt')
      checkLoss('punt')
     
      if (kickType === 'punt') {
        return (
          <>
            <Play
              index={index}
              passArch={passArch}
              lossYards={lossYards}
              penaltyYards={penaltyYards}
              className={
                penaltyYards ? 'loss-punt' : lossYards ? 'loss-punt' : 'punt'
              }
              style={{ width: `calc(${playDist}% - 5px)` }}
            />
            {kickType === 'punt' && <PostDot index={index} className='punt' />}
          </>
        )
      }
      if (kickType === 'field goal attempt') {
        return (
          <>
            <Play
              index={index}
              passArch={+playDist + 22}
              lossYards={lossYards}
              penaltyYards={penaltyYards}
              id={result === 'Failed' ? 'failed' : 'success'}
              className={
                penaltyYards ? 'loss-FG' : lossYards ? 'loss-FG' : 'FG'
              }
              style={{ width: `${+playDist + 22}%` }}
            />
          </>
        )
      }
    }
  }
  return (
     <>
      {index === 0 ? <PostDot className='start-dot' index={index - 1} /> : null}
      {playDist !== '0' ? elementType() : null}
      {result === 'touchdown' && <Football index={index} src={football} />}
    </>
    )
}

export default Line
