import React from 'react'
import styled from 'styled-components'
import Jersey from '../components/Jersey'

const Wrapper = styled.div`
  border: 1px solid black;
  border-radius: 7px;
  height: 400px;
  width: 350px;
  padding: 15px;
  box-sizing: border-box;
  h1 {
    font-size: 1.25rem;
    font-family: sans-serif;
    font-weight: 600;
    border-bottom: 1px solid black;
    color: black;
  }
  span {
    font-weight: bold;
    font-size: 1.1rem;
  }
  .section {
    display: flex;
    justify-content: space-between;
  }
  .stats {
    margin: 0 -200%;
  }
  .box {
    display: flex;
}
.home, .away {
    font-family: sans-serif;
    color: #999999;
}
.home {
    margin-right: 50px;
  }
`

export default class GameLeaders extends React.Component{
    state={
      //HOME
      hPass: {},
      hRush: {},
      hRec: {},
      
      //AWAY
      aPass: {},
      aRush: {},
      aRec: {},
    }

    async findLeaders(){
      //needs update
      const  aPlayers = this.props.game.away.players
      const hPlayers = this.props.game.home.players

      // console.log(aPlayers)

      //pass - away
      let aPassLeaders = []
      for (const key in aPlayers){
        if (aPlayers[key].passYards){
        let yards = aPlayers[key].passYards.reduce((acc, num) => {return acc + num})
        aPassLeaders.push({name: aPlayers[key].last_name, yards, number: aPlayers[key].player_number, position: aPlayers[key].position, tds: aPlayers[key].passTDs, })
      }
      }
      let aPassLeader = {
        name: '---',
        number: '00',
        position: '--',
        yards: '---'
      }
      if (aPassLeaders.length > 0){
      aPassLeader = aPassLeaders.reduce((prev, current) => {return (prev.yards > current.yards) ? prev : current})}
      //pass - home
      let hPassLeaders = []
      for (const key in hPlayers){
        if (hPlayers[key].passYards){
        let yards = hPlayers[key].passYards.reduce((acc, num) => {return acc + num})
        hPassLeaders.push({name: hPlayers[key].last_name, yards, number: hPlayers[key].player_number, position: hPlayers[key].position , tds: hPlayers[key].passTDs,})
      }
      }
      let hPassLeader = {
        name: '---',
        number: '00',
        position: '--',
        yards: '---'
      }
      if (hPassLeaders.length > 0){
      hPassLeader = hPassLeaders.reduce((prev, current) => {return (prev.yards > current.yards) ? prev : current})
    }
      //rush - away
      let aRushLeaders = []
      for (const key in aPlayers){
        if (aPlayers[key].rushYards){
        let yards = aPlayers[key].rushYards.reduce((acc, num) => {return acc + num})
        aRushLeaders.push({name: aPlayers[key].last_name, yards, number: aPlayers[key].player_number, tds: aPlayers[key].rushTDs, position: aPlayers[key].position })
      }
      }
      let aRushLeader = {
        name: '---',
        number: '00',
        position: '--',
        yards: '---'
      }
      if (aRushLeaders.length > 0){
      aRushLeader = aRushLeaders.reduce((prev, current) => {return (prev.yards > current.yards) ? prev : current})
}
      //rush - home
      let hRushLeaders = []
      for (const key in hPlayers){
        if (hPlayers[key].rushYards){
        let yards = hPlayers[key].rushYards.reduce((acc, num) => {return acc + num})
        hRushLeaders.push({name: hPlayers[key].last_name, yards, number: hPlayers[key].player_number, tds: hPlayers[key].rushTDs, position: hPlayers[key].position })
      }
      }
      let hRushLeader = {
        name: '---',
        number: '00',
        position: '--',
        yards: '---'
      }
      if (hRushLeaders.length > 0){
      hRushLeader = hRushLeaders.reduce((prev, current) => {return (prev.yards > current.yards) ? prev : current})}
      //rec - away
      let aRecLeaders = []
      for (const key in aPlayers){
        if (aPlayers[key].recYards){
        let yards = aPlayers[key].recYards.reduce((acc, num) => {return acc + num})
        aRecLeaders.push({name: aPlayers[key].last_name, yards, number: aPlayers[key].player_number, position: aPlayers[key].position, tds: aPlayers[key].recTDs })
      }
      }
      let aRecLeader = {
        name: '---',
        number: '00',
        position: '--',
        yards: '---'
      }
      if (aRecLeaders.length > 0){
      aRecLeader = aRecLeaders.reduce((prev, current) => {return (prev.yards > current.yards) ? prev : current})}
      //rec - home
      let hRecLeaders = []
      for (const key in hPlayers){
        if (hPlayers[key].recYards){
        let yards = hPlayers[key].recYards.reduce((acc, num) => {return acc + num})
        hRecLeaders.push({name: hPlayers[key].last_name, yards, number: hPlayers[key].player_number, position: hPlayers[key].position, tds: hPlayers[key].recTDs })}
      }
      let hRecLeader = {
        name: '---',
        number: '00',
        position: '--',
        yards: '---'
      }
      if (hRecLeaders.length > 0){
      hRecLeader = hRecLeaders.reduce((prev, current) => {return (prev.yards > current.yards) ? prev : current})
    }

      //SET STATE
      await this.setState({
        aPass : aPassLeader, 
        hPass: hPassLeader,
        aRush: aRushLeader,
        hRush: hRushLeader,
        aRec: aRecLeader,
        hRec: hRecLeader
      })
      // console.log(aRushLeader)
      // console.log(this.state.aRush)
  }

  componentDidMount(){
    this.findLeaders()
  }

    render(){
      const { aPass, hPass, aRush, hRush, aRec, hRec } = this.state
        return (
          <Wrapper>

            {/* PASSING LEADERS */}
            <div className='section'>
              <Jersey color={this.props.game.home.color} number={hPass.number} school={this.props.game.home.school}/>
              <div className='stats'>
                <h1>Passing Leaders</h1>
                <div className='box'>
                  <div className='home'>
                    <p><span>{hPass.name}</span></p>
                    <p>{hPass.yards} yards</p>
                    <p>{hPass.tds} TD</p>
                    <p>{hPass.position} #{hPass.number}</p>
                  </div>
                  <div className='away'>
                    <p>
                      <span>
                      {aPass.name}
                      </span>
                    </p>
                    <p>{aPass.yards} yards</p>
                    <p>{aPass.tds} TD</p>
                    <p>{aPass.position} #{aPass.number}</p>
                  </div>
                </div>
              </div>
              <Jersey color={this.props.game.away.color} number={aPass.number} flip={true} school={this.props.game.away.school} />
            </div>

            {/* RUSHING LEADERS */}
            <div className='section'>
              <Jersey color={this.props.game.home.color} number={hRush.number} school={this.props.game.home.school}/>
              <div className='stats'>
                <h1>Rushing Leaders</h1>
                <div className='box'>
                  <div className='home'>
                    <p>
                      <span>{hRush.name}</span>
                    </p>
                    <p>{hRush.yards} yards</p>
                    <p>{hRush.tds} TD</p>
                    <p>{hRush.position} #{hRush.number}</p>
                  </div>
                  <div className='away'>
                    <p><span>
                      {aRush.name}
                    </span>
                      </p>
                    <p>{aRush.yards} yards</p>
                    <p>{aRush.tds} TD</p>
                   <p>{aRush.position} #{aRush.number}</p>
                  </div>
                </div>
              </div>
              <Jersey
                color={this.props.game.away.color}
                number={aRush.number}
                flip={true}
                school='HHS'
              />
            </div>

            {/* RECEIVING LEADERS */}
            <div className='section'>
              <Jersey color={this.props.game.home.color} number={hRec.number} school={this.props.game.home.school}/>
              <div className='stats'>
                <h1>Receiving Leaders</h1>
                <div className='box'>
                  <div className='home'>
                    <p>
                      <span>{hRec.name}</span>
                    </p>
                    <p>{hRec.yards} yards</p>
                    <p>{hRec.tds} TD</p>
                    <p>{hRec.position} #{hRec.number}</p>
                  </div>
                  <div className='away'>
                    <p><span>
                      {aRec.name}
                    </span>
                      </p>
                    <p>{aRec.yards} yards</p>
                    <p>{aRec.tds} TD</p>
                   <p>{aRec.position} #{aRec.number}</p>
                  </div>
                </div>
              </div>
              <Jersey
                color={this.props.game.away.color}
                number={aRec.number}
                flip={true}
                school='HHS'
              />
            </div>
      </Wrapper>
    )
  }
}
