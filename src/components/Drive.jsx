import React from 'react'
import styled from 'styled-components'
import Play from './Play'

const Wrapper = styled.div`
  .drive {
    text-align: left;
    padding: 5px 10px;
    border: 1px solid lightgray;
    font-size: 1.25rem;
    font-weight: bold;
    font-family: sans-serif;
    color: #999999;
    &:hover {
      cursor: pointer;
      color: black;
    }
  }
  .selected-drive {
    text-align: left;
    padding: 5px 10px;
    border: 1px solid lightgray;
    font-size: 1.25rem;
    font-weight: bold;
    font-family: sans-serif;
    color: black;
  }
`

export default class Drive extends React.Component{
    state={

    }

// showPlays(){
//     this.setState({
//         showPlays: !this.state.showPlays
//     })
// }
// colorChange = (id) => {
//   let drive = document.getElementsById(id)
//   drive.addClass('selected')
//   this.props.setCurrentDrive(id)
// }

    render(){
      
        const { drive } = this.props
        return (
          <Wrapper selected={this.props.selectedDrive}>
            <p
              id={drive.driveCount}
              onClick={() => this.props.setCurrentDrive(drive.driveCount)}
              className={this.props.selectedDrive === drive.driveCount ? 'selected-drive' : 'drive'} >
              Drive {drive.driveCount}: {this.props.teamObj.school}{' '}
              {this.props.teamObj.mascot}
            </p>
            {this.props.selectedDrive === drive.driveCount && (
              <div className='plays'>
                {drive.plays.map((play, i) => (
                  <Play key={i} play={play} />
                ))}
              </div>
            )}
          </Wrapper>
        )
    }
} 
