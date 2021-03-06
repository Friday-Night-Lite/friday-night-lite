import React from 'react'
import styled from 'styled-components'
import Line from './Line'
import referee from '../assets/referee33.gif'
import referee2 from '../assets/referee24.gif'
import referee3 from '../assets/referee29.gif'

const Wrapper = styled.div`
  z-index: 1;
  position: absolute;
  height: 75%;
  width: 605px;
  padding-bottom: 50px;
  margin: 0 65px;
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  display: flex;
  .start {
    height: 100%;
  }
  .start-dot {
    height: 11px;
    width: 11px;
    margin: 0 -5.5px 0 -3.5px;
    min-width: 10px;
    border-radius: 50%;
    background: black;
    box-sizing: border-box;
  }

  .arrow-container {
    display: flex;
    align-items: center;
    margin-left: -5px;
  }
  .arrow {
    /* margin-left: -1px; */
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-left: 15px solid black;
    border-bottom: 5px solid transparent;
  }
  .arrow-line {
    height: 4px;
    background: black;
    min-width: 5px;
    /* margin-left: -1px; */
  }
  .referee {
    position: absolute;
    right: -110px;
    top: 80px;
  }
  .safety-ref {
    position: absolute;
    left: -100px;
    top: 80px;
  }
  @media (max-width: 920px) {
    width: 90%;
    padding-bottom: 0;
    margin: 0;
  }
`

export default class Animation extends React.Component {
    class = {
    }


    render() {
  
        return (
          <Wrapper>
            {this.props.driveResult() === 'SAFETY' && (
              <img className='safety-ref' src={referee3} alt='' height='60' />
            )}
            <div
              className='start'
              style={{ width: `${this.props.margins}%` }}
            />
            {this.props.game.drivesArr[this.props.selectedDrive].plays.map(
              (play, i) => { return <Line
                  index={i}
                  drive={this.props.game.drivesArr[this.props.selectedDrive]}
                  key={i}
                  line={play}
                />
            })}
          

            {(this.props.driveResult() === 'TOUCHDOWN' ||
              this.props.driveResult() === 'SUCCESSFUL') && (
              <img className='referee' src={referee} alt='' height='60' />
            )}

            {this.props.driveResult() === 'FAILED' && (
              <img className='referee' src={referee2} alt='' height='60' />
            )}
          </Wrapper>
        )
    }
}