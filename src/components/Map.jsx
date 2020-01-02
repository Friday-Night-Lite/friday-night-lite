import React from "react";
import Modal from "./Games-Modal";
import USAMap from "react-usa-map";
import styled from 'styled-components'

class Map extends React.Component {
  state = {
    modalDisplay: false,
    st: ""
  };

  closeMenu = event => {
    const greyBack = document.getElementById('grey-back')
      if (greyBack.contains(event.target)) {
      this.setState({ modalDisplay: false }, () => {
        greyBack.removeEventListener("click", this.closeMenu);
      });
    }
  };
  showMenu = () => {
    this.setState({modalDisplay:true}, () => {
      const greyBack = document.getElementById('grey-back')
          greyBack.addEventListener('click', this.closeMenu)
      })
  };

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
    return (
      <>
      <MapPage>
        <div className="App">
          <USAMap onClick={this.mapHandler} height='70vh' width='100vw'/>
        </div>
      </MapPage>
          {this.state.modalDisplay ? (
            <Modal closeMenu={this.hideMenu} st={this.state.st} assignElement={this.assignElement} />
          ) : null}
          </>
    );
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
    `
