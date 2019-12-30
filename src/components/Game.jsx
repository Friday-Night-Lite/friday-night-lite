import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Field from './Field'
import Scoreboard from './Scoreboard'
import Drives from './Drives'
import GameLeaders from './GameLeaders'
import Admin from './Admin'
import {withRouter} from "react-router-dom"

const Wrapper = styled.div`
background: #ececec;
padding-top: 25px;
padding-bottom: 50px;
.container {
    display: flex;
    justify-content: center;
}`

class Game extends React.Component {
  state = {
    isLoading: true,
    gameObj: {},
    gameId: '',
    selectedDrive: 0,
<<<<<<< HEAD
=======
    min: '15',
    sec: '00',
    quarter: ''
>>>>>>> master
  }

    componentDidMount(){
        let id = this.props.match.params.id
        axios.get(`/api/game/${id}`).then(res => {
            this.setState({
              gameObj: res.data.data,
              gameId: id,
              isLoading: false
            })
        })
  }


  updateGame = (game) => {
      this.setState({ gameObj: game });
  }

  setCurrentDrive = id => {
    this.setState({
        selectedDrive: id
    }, () => this.findTime())
  }

  findTime = () => {
    if (!this.state.selectedDrive && this.state.gameObj.drivesArr.length > 0){
      const {drivesArr} = this.state.gameObj
      const { plays } = drivesArr[drivesArr.length -1]

    let min = plays[plays.length -1].min
    let sec = plays[plays.length -1].sec
    let quarter = plays[plays.length -1].quarter
    this.setState({
      min: min, 
      sec: sec,
      quarter: quarter
    })
    return quarter
    } 
  }
  render() {

    return (
      <Wrapper>
        {this.state.isLoading && <h1>Loading...</h1>}
        {!(this.state.isLoading) && <Scoreboard game={this.state.gameObj} selectedDrive={this.state.selectedDrive} 
        findTime={this.findTime} min={this.state.min} sec={this.state.sec} quarter={this.state.quarter}/>}
        {(!this.state.isLoading && this.state.selectedDrive > 0) && <Field game={this.state.gameObj} selectedDrive={this.state.selectedDrive}/>}
        {!(this.state.isLoading) && ( null )}
         {this.props.show &&  
        !this.state.isLoading && <Admin 
          updateGame={this.updateGame}
            game={this.state.gameObj}
          />
         }
     
        {!this.state.isLoading && (
          <div className='container'>
            <GameLeaders game={this.state.gameObj} />
            <Drives setCurrentDrive={this.setCurrentDrive} selectedDrive={this.state.selectedDrive} game={this.state.gameObj} />
          </div>
        )}
      </Wrapper>
    )
  }
}

export default withRouter(Game)