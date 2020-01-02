import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Map from './components/Map'
import Game from './components/Game'
import Header from './components/Header'
import Footer from './components/Footer'

class App extends React.Component {
  state = {
    show: !false
  }

  toggle = _ => {
    this.setState({
      show: !this.state.show
    })
  }
  render() {
    // console.log(this.state.show)
  

  return (
    <div className="App">
      


    <Router>
    <Header toggle={this.toggle} />
      <Switch>
        <Route path='/' exact component={Map}/>
        <Route path='/game/:id' component={() => (
        <Game show={this.state.show}/>)}/>
      </Switch>
    <Footer />
    </Router>

    </div>
  );
}
}

export default App;
