import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Tweet from './Tweet'
import axios from 'axios'
import window from '../seed.js'
import update from 'immutability-helper'
import TweetForm from './TweetForm'

class TweetList extends React.Component {
  state = { tweets: [], editingTweetId: null, newTweet: false };

  componentDidMount() {
    //this.setState({ products: window.Seed.products }); 
    axios.get('http://localhost:3001/api/v1/tweets.json')
      .then(response => {
        console.log(response)
        this.setState({ tweets: response.data })
      })
      .catch(error => console.log(error))
  }

  addNewTweet = () => {
    axios.post(
      'http://localhost:3001/api/v1/tweets',
      {
        tweet:
          {
            username: '',
            body: ''
          }
      }
    ).then(response => {
      console.log(response)
      const tweets = update(this.state.tweets, {
        $splice: [[0, 0, response.data]]
      })
      this.setState(
        {
          tweets: tweets,
          editingTweetId: response.data.id,
          newTweet: true
        }
      )
    }).catch(error => console.log(error))
  }

  updateTweet = (tweet) => {
    const tweetIndex = this.state.tweets.findIndex(x => x.id === tweet.id)
    const tweets = update(this.state.tweets, {
      [tweetIndex]: { $set: tweet }
    })
    this.setState({ tweet: tweet })
  }
  render() {

    const tweets = this.state.tweets.sort((a, b) => (b.id - a.id));
    const tweetComponents = tweets.map((tweet) => (
      <Tweet
        id={tweet.id}
        username={tweet.username}
        body={tweet.body} />
    )
    );

    return (
      <div>
        <button className="newTweetButton ui button olive" onClick={this.addNewTweet}>New Tweet</button>
        {this.state.tweets.map((tweet) => {
          if (this.state.editingTweetId === tweet.id) {
            return (<TweetForm tweet={tweet} key={tweet.id} updateTweet={this.updateTweet} />)
          }
        })}
        <div className='ui unstackable items'>
          {tweetComponents}
        </div>
      </div>
    );

  }
}

ReactDOM.render(
  <TweetList/>,
  document.getElementById('content')
);

export default TweetList

