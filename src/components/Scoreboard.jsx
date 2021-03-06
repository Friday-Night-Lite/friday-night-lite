import React from "react";
import styled from "styled-components";
import NewHelmet from "../components/NewHelmet";
import "../assets/digital-7.ttf"
import football from '../assets/football.jpg'

const Wrapper = styled.div`
  box-shadow: 1px 1px 2px #999999;
  background: white;
  display: flex;
  width: 900px;
  margin: 5px auto;
  border-radius: 7px;
  box-sizing: border-box;
  padding: 10px;
  .school-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 150px;
    font-size: 1.25rem;
  }
  .team {
    display: flex;
  }
  .teams {
    display: flex;
    width: 100%;
    justify-content: center;
    box-sizing: border-box;
    font-family: sans-serif;
    padding: 0 150px;
  }
  .field-component {
    display: flex;
  }
  .clock {
    display: flex;
    align-items: center;
    font-family: Digital-7;
    font-size: 3rem;
    justify-content: center;
    background: white;
    border: solid 1px #999999;
    border-radius: 5px;
    padding: 0 20px;
    margin: 0 55px;
    width: 150px;
    box-shadow: 1px 1px 2px #999999;
  }
  .clock span {
    font-size: 2rem;
    margin: 10px;
    font-family: sans-serif;
    color: black;
    font-weight: 500;
  }
  .clockContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
  #title {
    font-family: sans-serif;
    font-size: 1rem;
  }
  .score {
    font-size: 4rem;
    font-family: Digital-7;
  }
  .box-score {
    display: flex;
    padding: 3px 5px;
    margin-bottom: 3px;
    font-family: sans-serif;
  }
  .quarter {
    display: flex;
    flex-direction: column;
    padding: 2px;
  }
  span {
    font-weight: 700;
    color: #999999;
  }
  .poss {
    height: 25px;
    margin: 0 15px;
  }
  .school-score {
    display: flex;
    align-items: center;
  }
  .placeholder {
    display: flex;
    justify-content: center;
  }
  .hidden {
    visibility: hidden;
  }
  @media (max-width: 920px) {
    padding: 5px;
    margin-bottom: 15px;
    width: 100%;
    max-width: 425px;
    .clock span {
      font-size: 1rem;
      margin: 0;
      color: black;
      font-weight: 500;
    }
    .teams {
      padding: 0 0;
    }
    .team {
      align-items: center;
      justify-content: center;
    }
    .school-info {
      width: unset;
      font-size: 0.75rem;
    }
    .score {
      font-size: 2rem;
    }
    .clock {
      font-size: 2rem;
      border: solid 1px #999999;
      border-radius: 5px;
      padding: 5px 5px 0 5px;
      margin: 0 0;
      width: unset;
      box-shadow: 1px 1px 2px #999999;
    }
    .box-score {
      padding: 0 0;
      margin-bottom: 0;
      font-size: .5rem;
    }
    .poss {
      height: 10px;
      margin: 0 0px;
    }
    #title {
      font-size: 0.75rem;
    }
    .quarter {
      padding: 2px 2px;
    }
  }
`




export default class Scoreboard extends React.Component {
  state = {
    gameObj: {},
    quarter: '',
    hScore: 0,
    aScore: 0,
    hs1: '-',
    hs2: '-',
    hs3: '-',
    hs4: '-',
    as1: '-',
    as2: '-',
    as3: '-',
    as4: '-'

  }

  componentDidMount = async () => {
    await this.setState({ 
      game: this.props.game,
      quarter: this.props.quarter
    })
    this.calculateScore()
    this.props.findTime()
  }
  
  componentDidUpdate = (prevProps) => {
    if (this.props.game !== prevProps.game) {
      this.setState({ gameObj: this.props.game }, () => {
        this.calculateScore()
        this.props.findTime()
      })
    }
  }

  teamBall = () => {
    if (this.props.game.drivesArr.length > 0) {
    const { drivesArr } = this.props.game
    let teamBall = drivesArr[drivesArr.length -1 ].team
    return teamBall}
  }


  calculateScore = async () => {
    const { away, home } = this.props.game.score
    //away quarters
    let newAS1 = await away.first.reduce((acc, num) => {
       return acc + num
    })
    let newAS2 = await away.second.reduce((acc, num) => {
      return acc + num
    })
    let newAS3 = await away.third.reduce((acc, num) => {
      return acc + num
    })
    let newAS4 = await away.fourth.reduce((acc, num) => {
      return acc + num
    })
    //home quarters
    let newHS1 = await home.first.reduce((acc, num) => {
      return acc + num
    })
    let newHS2 = await home.second.reduce((acc, num) => {
      return acc + num
    })
    let newHS3 = await home.third.reduce((acc, num) => {
      return acc + num
    })
    let newHS4 = await home.fourth.reduce((acc, num) => {
      return acc + num
    })
    
    //away score
    let newAScore = 0
    newAScore = newAS1 + newAS2 + newAS3 + newAS4

    //home score
    let newHScore = 0
    newHScore = newHS1 + newHS2 + newHS3 + newHS4

        this.setState({
          hScore: newHScore,
          aScore: newAScore,
          hs1: newHS1,
          hs2: newHS2,
          hs3: newHS3,
          hs4: newHS4,
          as1: newAS1,
          as2: newAS2,
          as3: newAS3,
          as4: newAS4
        })

  }

  render() {
    
    const {
      away,
      home,
      status
    } = this.props.game
    const {
      min,
      sec
    } = this.props
    const {
      hScore,
      aScore,
      hs1,
      hs2,
      hs3,
      hs4,
      as1,
      as2,
      as3,
      as4 } = this.state

    return (
      <Wrapper quarter={this.state.quarter}>
        <div className='teams'>
          <div className='team'>
            <NewHelmet
              helmHeight={window.screen.width > 800 ? 120 : 60}
              color={home.color}
            />
            <div className='school-info'>
              {/* <h2>{home.school}</h2> */}
              <h2>{home.mascot}</h2>
              {!(this.props.game.status === 'upcoming') && (
                <div className='school-score'>
                  <h3 className='score'>{hScore.toString()}</h3>
                  {status === 'inProgress' && this.teamBall() === 'home' && (
                    <img className='poss' src={football} alt='football' />
                  )}
                </div>
              )}
            </div>
          </div>

          <div className='clockContainer'>
            {!(status === 'upcoming') && (
              <>
                {status === 'inProgress' && <h1 id='title'>Time Remaining:</h1>}
                {status === 'FINAL' && <h1 id='title'>FINAL</h1>}

                <div className='clock'>
                  <div className='numbers'>
                    <p className='hours'></p>
                    <p className='placeholder'>
                      {min.length === 1 ? `0${min}` : `${min}`}
                    </p>
                  </div>
                  <div className='colon'>
                    <p>:</p>
                  </div>
                  <div className='numbers'>
                    <p className='minutes'></p>
                    <p className='placeholder'>
                      {sec.length === 1 ? `0${sec}` : `${sec}`}
                    </p>
                  </div>
                </div>
                <div className='box-score'>
                  <div className='quarter'>
                    <p className='hidden'>
                      <span>team</span>
                    </p>
                    <p>
                      <span className='school'>
                        {this.props.game.home.school}
                      </span>
                    </p>
                    <p>
                      <span className='school'>
                        {this.props.game.away.school}
                      </span>
                    </p>
                  </div>

                  <div className='quarter first'>
                    <p>
                      <span>1st</span>
                    </p>
                    <p>{hs1.toString()}</p>
                    <p>{as1.toString()}</p>
                  </div>

                  <div className='quarter second'>
                    <p>
                      <span>2nd</span>
                    </p>
                    <p>{hs2.toString()}</p>
                    <p>{as2.toString()}</p>
                  </div>

                  <div className='quarter third'>
                    <p>
                      <span>3rd</span>
                    </p>
                    <p>{hs3.toString()}</p>
                    <p>{as3.toString()}</p>
                  </div>

                  <div className='quarter fourth'>
                    <p>
                      <span>4th</span>
                    </p>
                    <p>{hs4.toString()}</p>
                    <p>{as4.toString()}</p>
                  </div>
                </div>
              </>
            )}

            {this.props.game.status === 'upcoming' && (
              <div>
                <h1 id='title'>Kickoff at:</h1>
                <h1 className='clock'>
                  {this.props.game.start_time.substring(
                    0,
                    this.props.game.start_time.length - 2
                  )}
                  <span>
                    {this.props.game.start_time.substring(
                      this.props.game.start_time.length - 2
                    )}
                  </span>
                </h1>
              </div>
            )}

            {this.props.game.status === 'final' && <h1>FINAL</h1>}
          </div>
          <br />
          <div className='team'>
            <div className='school-info'>
              {/* <h2>{away.school}</h2> */}
              <h2>{away.mascot}</h2>
              {!(status === 'upcoming') && (
                <div className='school-score'>
                  {status === 'inProgress' && this.teamBall() === 'away' && (
                    <img className='poss' src={football} alt='football' />
                  )}

                  <h3 className='score'>{aScore.toString()}</h3>
                </div>
              )}
            </div>
            <NewHelmet
              helmHeight={window.screen.width > 800 ? 120 : 60}
              flip={true}
              color={away.color}
            />
          </div>
        </div>
      </Wrapper>
    )
  }
}
