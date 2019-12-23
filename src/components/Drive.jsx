import React from 'react'
import styled from 'styled-components'
import Play from './Play'

const Wrapper = styled.div`
  .drives {
    &:hover {
    }
  }
  .drives {
    text-align: left;
    padding: 5px 10px;
    border: 1px solid lightgray;
    font-size: 1.25rem;
    font-weight: bold;
    font-family: sans-serif;
    color: ${'#999999'};
    &:hover {
      cursor: pointer;
      color: black;
    }
  }
    :matches(${props => props.selected}) {
      color: black;
    }
`

export default class Drive extends React.Component{
    state={
    }

showPlays(){
    this.setState({
        showPlays: !this.state.showPlays
    })
}

    render(){
      
        const { drive } = this.props
        return (
          <Wrapper selected={this.props.selectedDrive}>
            <h1
              onClick={() => this.props.setCurrentDrive(drive.driveCount)}
              className={`drives ${drive.driveCount}`}>
              Drive {drive.driveCount}: {this.props.teamObj.school}{' '}
              {this.props.teamObj.mascot}
            </h1>
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
