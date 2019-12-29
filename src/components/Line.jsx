import React from 'react'
import styled from 'styled-components'


const PostDot = styled.div`
&.dot {
    height: 11px;
    width: 11px;
    border: solid 1px black;
    border-radius: 50px;
    background: black;
    box-sizing: border-box;
  }
  &.post-pass {
    margin-left: -7px;
  }
  &.post-run {
    margin-left: -7px;
  }`
  const Play = styled.div`
  &.run {
    height: 5px;
    background: black;
    margin:0 -1px 2.8px -5px;
  }
  &.penalty-run {
    height: 5px;
    background: black;
    margin:${props => `0 -1px 2.8px -${props.penaltyYards}%`};
  }
  &.pass {
    border: 4px solid black;
    border-radius: ${props => `50%/${props.passArch}px ${props.passArch}px 0 0`};
    margin: 0 0 0 -8px;
    height: ${props => props.passArch / 2}%;
    border-color: black transparent transparent transparent;
  }
  &.penalty-pass {
    border: 4px solid black;
    border-radius: ${props => `50%/${props.passArch}px ${props.passArch}px 0 0`};
    margin: ${props => `0 0 0 -${props.penaltyYards}%`};
    height: ${props => props.passArch / 1.5}%;
    border-color: black transparent transparent transparent;
  }
  &.kick {
      border: 4px dashed green;
      border-radius: ${props => `50%/${props.passArch}px ${props.passArch}px 0 0`};
    margin: 0 0 0 -10px;
    height: ${props => props.passArch / 2}%;
    border-color: green transparent transparent transparent;
  }
  &.none, &.other {
    display: none;
  }
`
const PenDot = styled.div`
    height: 11px;
    width: 11px;
    min-width: 10px;
    border-radius: 50px;
    box-sizing: border-box;
    &.loss {
    border: solid 1px red;
    background: red;
    margin: 0 -8px 0 calc(-15% - 11px);
    z-index: 3;
    }
    &.gain {
    border: solid 1px white;
    margin-left: -5px;
    background: white;
    z-index: 3;
    }
    /* margin-left:${props => `calc(-${props.penaltyMargin}% - 5px)`}; */
`

const Penalty = styled.div`
    &.at-fault {
    border-top: 3px dashed red;
    margin: 0 0 4px 2px;
    z-index: 3;
    }
    &.gain-yards {
    border-top: 3px dashed white;
    margin: 0 -1px 4px -5px;
    z-index: 3;
    }
`

const Line = props => {
    const { playDist, playType, penTeam, yards } = props.line
    const passArch = playDist * 2
    const { drive, index } = props
    let penaltyYards = 0

    
    function checkPenalties() {
        penaltyYards = 0
        console.log(playType, index)
        
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
     console.log('penYards', penaltyYards)

function elementType() {
    if (playType === 'Run') {
        return <Play penaltyYards={checkPenalties()} className={checkPenalties() ? 'penalty-run' : 'run'} style={{width: `calc(${playDist}% + 5px)`}} />
    }else if (playType === 'pass') {
        return <Play passArch={passArch} penaltyYards={checkPenalties()} className={checkPenalties() ? 'penalty-pass' : 'pass'} style={{width: `${playDist}%`}} />
    }else if (playType === 'penalty') {
        if (penTeam === drive.team) {
            if (drive.plays.length > (index + 1)) {
                if (drive.plays[index + 1].penTeam === drive.team) {
                    return
                }else {
                    return (
                    <>
                    <PenDot className='loss' penaltyMargin={checkPenalties()}/>
                    <Penalty className='at-fault' style={{width: `${checkPenalties()}%`}} yards={yards}/>
                    </>
                    )
                }
            }else {
                return (
                <>
                <PenDot className='loss' penaltyMargin={checkPenalties()}/>
                <Penalty className='at-fault' style={{width: `${checkPenalties()}%`}} yards={yards}/>
                </>
                )
            }
        }
        if (penTeam !== drive.team) {
            return <>
            <Penalty className='gain-yards' style={{width: `${yards}%`}} />
            <PenDot className='gain' penaltyMargin={checkPenalties()}/>
            </>
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
            <PostDot className={(playType === 'Run' || playType === 'pass') ? (playType === 'Run') ? 'post-run dot': 'post-pass dot' : 'none'} />
        </>
    )
}

export default Line