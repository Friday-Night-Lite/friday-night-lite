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
  margin: 0 55px;
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
    /* border: solid 1px black; */
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
    right: -100px;
    top: 80px;
  }
  .safety-ref {
    position: absolute;
    left: -100px;
    top: 80px;
  }
`

export default class Animation extends React.Component {
    class = {
    }


    render() {
  
        return (
          <Wrapper>
            {this.props.driveResult() === 'safety' && (
              <img className='safety-ref' src={referee3} alt='' height='60' />
            )}
            <div
              className='start'
              style={{ width: `${this.props.margins}%` }}
            />
            {/* <div className='start-dot' /> */}
            {this.props.game.drivesArr[this.props.selectedDrive].plays.map(
              (line, i) => (
                <Line
                  index={i}
                  drive={this.props.game.drivesArr[this.props.selectedDrive]}
                  key={i}
                  line={line}
                />
              )
            )}
            {/* <div className="arrow-container">
                <div className="arrow-line"/>
                <div className="arrow"/>
                </div> */}

            {(this.props.driveResult() === 'touchdown' ||
              this.props.driveResult() === 'Successful') && (
              <img className='referee' src={referee} alt='' height='60' />
            )}

            {this.props.driveResult() === 'Failed' && (
              <img className='referee' src={referee2} alt='' height='60' />
            )}
          </Wrapper>
        )
    }
}