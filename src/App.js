import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

class App extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      location: '',
      posts: [],
      results: [],
      users: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    console.log('Success!')
    axios.get('https://api.github.com/users/maecapozzi')
    .then(response => this.setState({
      username: response.data.name,
      location: response.data.location
    }))

    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => this.setState({
      results: response.data
    }))
  }

  componentDidMount() {
    axios.get(`https://www.reddit.com/r/reactjs.json`)
      .then(res => {
        const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ posts });
      });

      axios.get('http://jsonplaceholder.typicode.com/posts')
      .then(response => this.setState({
        users: response.data
      }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to My React App</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <hr />
        <div className='button__container'>
          <button className='button' onClick={this.handleClick}>Click Me</button>
        </div>
        <p>{this.state.username}</p>
        <p>{this.state.location}</p>

        <hr />
        <ul>
          {this.state.results.map(result =>
            <li key={result.id}>{result.name}</li>
          )}
        </ul>

        <hr />
        <ul>
          {this.state.users.map(user =>
            <li key={user.id}>{user.userId} : {user.title}</li>
          )}
        </ul>

        <hr />
        <ul>
          {this.state.posts.map(post =>
            <li key={post.id}>{post.title}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
