import React from 'react'
import styled from 'styled-components'
import Line from './Line'
import referee from '../assets/referee33.gif'
import referee2 from '../assets/referee24.gif'

const Wrapper = styled.div`
  z-index: 1;
  height: 75%;
  width: 610px;
  padding-bottom: 50px;
  margin: 0 53px;
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  display: flex;
  overflow-x: visible;
  .start {
      height: 100%;
  }
  .start-dot {
    height: 11px;
    width: 11px;
    min-width: 10px;
    border: solid 1px black;
    border-radius: 50px;
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
    right: -80px;
    top: 25px;
  }
`

export default class Animation extends React.Component {
    class = {
    }


    render() {
   
        return (
            <Wrapper>
                <div className='start' style={{width: `${this.props.margins.start}%`}}/>
                {/* <div className='start-dot' /> */}
                {this.props.game.drivesArr[this.props.selectedDrive - 1].plays.map((line, i) => (
                    <Line index={i} drive={this.props.game.drivesArr[this.props.selectedDrive - 1]} key={i} line={line}/>
                ))}
                {/* <div className="arrow-container">
                <div className="arrow-line"/>
                <div className="arrow"/>
                </div> */}

                {(this.props.driveResult() === 'touchdown' || this.props.driveResult() === 'Successful') &&
                <img className='referee' src={referee} alt="" height='100'/>}

                {(this.props.driveResult() === 'Failed') &&
                <img className='referee2' src={referee} alt="" height='100'/>}

            </Wrapper>
        )
    }
}