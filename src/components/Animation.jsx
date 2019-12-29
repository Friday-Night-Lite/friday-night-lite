import React from 'react'
import styled from 'styled-components'
import Line from './Line'

const Wrapper = styled.div`

  z-index: 10;
  height: 75%;
  width: 610px;
  padding-bottom: 50px;
  margin: 0 53px;
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  display: flex;
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
`

export default class Animation extends React.Component {
    class = {
    }


    render() {
   
        return (
            <Wrapper>
                <div className='start' style={{marginLeft: `${this.props.margins.start}%`}}/>
                {/* <div className='start-dot' /> */}
                {this.props.game.drivesArr[this.props.selectedDrive - 1].plays.map((line, i) => (
                    <Line index={i} drive={this.props.game.drivesArr[this.props.selectedDrive - 1]} key={i} line={line}/>
                ))}
                {/* <div className="arrow-container">
                <div className="arrow-line"/>
                <div className="arrow"/>
                </div> */}
            </Wrapper>
        )
    }
}