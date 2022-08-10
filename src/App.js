import React, { Component } from 'react'
import { Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import News from './components/News'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  pageSize = 9;
  // apiKey = process.env.REACT_APP_NEWS_API;
  apiKey = 'b73c9e81d69946bdb801f57363b1db7b';

  state = {
    progress: 0,
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <LoadingBar
            color='#f11946'
            height={3}
            progress={this.state.progress}
          />
          <Routes>
            <Route eaxct path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} category='general' country='in' />}></Route>
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='business' pageSize={this.pageSize} category='business' country='in' />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='entertainment' pageSize={this.pageSize} category='entertainment  ' country='in' />}></Route>
            <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' pageSize={this.pageSize} category='general' country='in' />}></Route>
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='health' pageSize={this.pageSize} category='health' country='in' />}></Route>
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='science' pageSize={this.pageSize} category='science' country='in' />}></Route>
            <Route exact path="/sport" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='sport' pageSize={this.pageSize} category='sport' country='in' />}></Route>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='technology' pageSize={this.pageSize} category='technology' country='in' />}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}

