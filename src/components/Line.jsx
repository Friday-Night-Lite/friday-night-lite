import React from 'react'
import styled from 'styled-components'
import football from '../assets/football.jpg'


const PostDot = styled.div`
  &.dot {
    height: 11px;
    width: 11px;
    border: solid 1px black;
    border-radius: 50px;
    background: black;
    box-sizing: border-box;
    z-index: 2;
  }
  &.post-pass {
    margin-left: -7px;
    z-index: 2;
  }
  &.post-run {
    margin-left: -7px;
    z-index: 2;
  }
`
  const Play = styled.div`
    &.run {
      height: 5px;
      background: black;
      margin: 0 -1px 2.8px -5px;
      z-index: 2;
    }
    &.penalty-run {
      height: 5px;
      background: black;
      margin: ${props => `0 -1px 2.8px -${props.penaltyYards}%`};
      z-index: 2;
    }
    &.td-run {
      position: absolute;
      right: -15px;
      height: 5px;
      background: black;
      margin: 0 -1px 2.8px -5px;
      z-index: 2;
    }
    &.pass {
      border: 4px solid black;
      border-radius: ${props =>
        `50%/${props.passArch}px ${props.passArch}px 0 0`};
      margin: 0 0 0 -8px;
      height: ${props => props.passArch / 1.5}%;
      border-color: black transparent transparent transparent;
      z-index: 2;
    }
    &.penalty-pass {
      border: 4px solid black;
      border-radius: ${props =>
        `50%/${props.passArch}px ${props.passArch}px 0 0`};
      margin: ${props => `0 0 0 -${props.penaltyYards}%`};
      height: ${props => props.passArch / 1.5}%;
      border-color: black transparent transparent transparent;
      z-index: 2;
    }
    &.td-pass {
      position: absolute;
      right: 30px;
      /* right: ${props => `${props.playDist}%`}; */
      border: 4px solid black;
      border-radius: ${props =>
        `50%/${props.passArch + 10}px ${props.passArch + 10}px 0 0`};
      height: ${props => props.passArch / 2}%;
      border-color: black transparent transparent transparent;
      z-index: 2;
    }
    &.kick {
      border: 4px dashed green;
      border-radius: ${props =>
        `50%/${props.passArch}px ${props.passArch}px 0 0`};
      margin: 0 0 0 -10px;
      height: ${props => props.passArch / 2}%;
      border-color: green transparent transparent transparent;
      z-index: 2;
    }
    &.none,
    &.other {
      display: none;
      z-index: 2;
    }
  `
const PenDot = styled.div`
    height: 11px;
    width: 11px;
    min-width: 10px;
    border-radius: 50px;
    box-sizing: border-box;
    z-index: 2;
    &.loss {
    border: solid 1px red;
    background: red;
    margin: ${props => `0 -5px 0 calc(-${props.penaltyMargin}% - 14px)`};
    z-index: 3;
    }
    &.gain {
    border: solid 1px white;
    /* margin: ${props => `0 -5px 0 calc(-${props.penaltyMargin / 2}% - 5px)`}; */
    background: white;
    z-index: 3;
    }
    /* margin-left:${props => `calc(-${props.penaltyMargin}% - 5px)`}; */
`

const Penalty = styled.div`
    &.at-fault {
    border-top: 3px dashed red;
    margin: 0 -5px 4px 2px;
    z-index: 3;
    }
    &.gain-yards {
    border-top: 3px dashed white;
    margin: ${props => `0 -8px 4px calc(-${props.penaltyMargin / 2}% - 10px)`};
    z-index: 3;
    }
`
const LossDot = styled.div`
  height: 11px;
  width: 11px;
  min-width: 10px;
  border-radius: 50px;
  box-sizing: border-box;
  z-index: 2;
  border: solid 1px red;
  background: red;
  margin: ${props => `0 -5.5px 0 calc(-${props.lossMargin}% - 5.5px)`};
  z-index: 3;
`
const Loss = styled.div`    
    border-top: 3px solid red;
    margin: 0 0 4px 0;
    z-index: 3;
    `
const Football = styled.img`
height: 15px;
position: absolute;
right: 20px;
z-index: 3;
`

const Line = props => {
    const { playDist, playType, penTeam, yards, result, gainLoss } = props.line
    const passArch = playDist * 2
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
            }
            else {
                i = index
            }
        }
        if (playType === 'penalty') {
            i = index
        }
        while (i > 0 || drive.plays[i].penTeam === drive.team) {
            penaltyYards += (+drive.plays[i].yards)
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
      while (i > 0 && (drive.plays[i].gainLoss === 'loss')) {
        lossYards += (+drive.plays[i].playDist)
        i--
      }

      
      return lossYards
    } 
    
function elementType() {
    if (result === 'touchdown') {
      if (playType === 'Run') {
        return (
          <Play
            playDist={playDist}
            className='td-run'
            style={{ width: `calc(${playDist}% + 25px)` }}
          />
        )
      } else if (playType === 'Pass') {
        return (
          <Play
            playDist={playDist}
            passArch={passArch}
            className='td-pass'
            style={{ width: `calc(${playDist}% + 5px)` }}
          />
        )
      }  
    }
    if (gainLoss === 'loss') {
      checkLoss()
      return (
        <>
          <LossDot className='loss'lossMargin={lossYards} />
          <Loss
            className='loss-line'
            style={{ width: `${lossYards}%` }}
          />
        </>
      )
    }
    if (playType === 'Run') {
        return <Play penaltyYards={checkPenalties()} className={checkPenalties() ? 'penalty-run' : 'run'} style={{width: `calc(${playDist}% + 5px)`}} />
    }else if (playType === 'Pass') {
        return <Play passArch={passArch} penaltyYards={checkPenalties()} className={checkPenalties() ? 'penalty-pass' : 'pass'} style={{width: `${playDist}%`}} />
    }else if (playType === 'penalty') {
        if (penTeam === drive.team) {
            if (drive.plays.length > (index + 1)) {
                if (drive.plays[index + 1].penTeam === drive.team) {
                    return
                }else {
                  checkPenalties()
                    return (
                    <>
                    <PenDot className='loss' penaltyMargin={penaltyYards}/>
                    <Penalty className='at-fault' style={{width: `${penaltyYards}%`}}/>
                    </>
                    )
                }
            }else {
              checkPenalties()
                return (
                  <>
                    <PenDot className='loss' penaltyMargin={penaltyYards} />
                    <Penalty
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
                <PenDot className='gain' />
                <Penalty
                  className='gain-yards'
                  penaltyMargin={penaltyYards}
                  style={{ width: `${yards}%` }}
                />
              </>
            )
        }
    }else if (playType === 'kick') {
        return <Play className='kick' style={{width: `${playDist}%`}} passArch={passArch}/>
    }else {

    }
} 

    return (
        <>
        {index === 0 ? <div className='start-dot' /> : null}
        {/* {penTeam === drive.team ? <PenDot className='pen-dot' penaltyMargin={checkPenalties()}/> : null} */}
            {elementType()}
            {result !== 'touchdown' && <PostDot className={((playType === 'Run' || playType === 'Pass') && gainLoss === 'gain') ? (playType === 'Run') ? 'post-run dot': 'post-pass dot' : 'none'} />}
            {result === 'touchdown' && <Football src={football} />}
        </>
    )
}

export default Line