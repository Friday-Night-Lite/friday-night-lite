import React from "react";
import Modal from "./Games-Modal";
import USAMap from "react-usa-map";
import styled from 'styled-components'

class Map extends React.Component {
  state = {
    modalDisplay: false,
    st: "",
    states: ['AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MP', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UM', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY']
  }

  closeMenu = event => {
    const greyBack = document.getElementById('grey-back')
      if (greyBack.contains(event.target)) {
      this.setState({ modalDisplay: false }, () => {
        greyBack.removeEventListener("click", this.closeMenu);
      });
    }
  };
  showMenu = () => {
    this.setState({ modalDisplay: true }, () => {
      const greyBack = document.getElementById('grey-back')
          greyBack.addEventListener('click', this.closeMenu)
      })
  };
  handleChange = (trg) => {
    this.setState({ [trg.name]: trg.value }, () => this.showMenu());
  }
  mapHandler = event => {
    this.setState({
      st: event.target.dataset.name
    });
    this.showMenu();
  };
  assignElement = (el) => {
    this.Modal = el
  }

  render() {
    console.log(this.state.st);
    
    return (
      <>
        <MapPage>
          {window.screen.width > 800 ? (
            <div className='App'>
              <USAMap onClick={this.mapHandler} height='70vh' width='100vw' />
            </div>
          ) : (
            <div className='mobile'>
              <h3>Find Games By State:</h3>
              <select
                name='st'
                value={this.state.st}
                onChange={e => this.handleChange(e.target)}>
                  <option>--</option>
                {this.state.states.map((oneState, i) => {
                  return (
                    <option value={oneState} key={i}>
                      {oneState}
                    </option>
                  )
                })}
              </select>
            </div>
          )}
        </MapPage>
          {this.state.st && <Modal
            modalDisplay={this.state.modalDisplay}
            closeMenu={this.hideMenu}
            st={this.state.st}
            assignElement={this.assignElement}
          />}
      </>
    )
  }
}


export default Map;

const MapPage = styled.div `
display: flex;
align-items: center;
justify-content: center;
background: #c9c9c9;
min-height: calc(100vh - 175px);
box-sizing: border-box;
path {
  fill: white;
}
path:hover {
    opacity: 0.60;
    cursor:  pointer;
    transform: scale(1.006) ;
    z-index: 3;
  }
  .mobile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .mobile select {
    font-size: 16px;
    background: white;
    margin: 10px;
  }
  .mobile h3 {
    font-size: 24px;
  }
    `
