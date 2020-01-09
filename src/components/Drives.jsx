import React from 'react'
import styled from 'styled-components'
import Drive from './Drive'

const Wrapper = styled.div`
  box-shadow: 1px 1px 2px #999999;
  background: white;
  margin-left: 25px;
  box-sizing: border-box;
  border-radius: 7px;
  height: 400px;
  width: 525px;
  overflow: scroll;
  display: ${props => props.shown ? 'none' : 'inital'};
  @media (max-width: 920px) {
      width: 100%;
      margin: 0;
      border-radius: 0 0 7px 7px;
  }
`

export default class Drives extends React.Component{
    state={

    }
    render(){
        
        const { drivesArr } = this.props.game
        return(
            <Wrapper shown={this.props.display}>
                {drivesArr.length === 0 ? 'No drives yet' :
                <div className='drives'>   
                    {drivesArr.map(drive => <Drive selectedDrive={this.props.selectedDrive} setCurrentDrive={this.props.setCurrentDrive} teamObj={this.props.game[drive.team]} key={drive.driveCount} drive={drive}/>)}
                </div>}
            </Wrapper>
        )
    }
} 