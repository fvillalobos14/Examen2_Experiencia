import React, { Component } from 'react'
import axios from 'axios'
import {Segment} from 'semantic-ui-react'

class TweetForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: this.props.tweet.username,
            body: this.props.tweet.body
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }


    handleBlur = () => {
        const tweet = {
            username: this.state.username,
            body: this.state.body
        }
    
    
        axios.put(
          `http://localhost:3001/api/v1/tweets/${this.props.tweet.id}`,
          {
            tweet: tweet
          }
        ).then(response => {
          console.log(response)
          this.props.updateTweet(response.data)
        }).catch(error => console.log(error))
      }

      render() {
        return (
            <Segment gray>
                <center> <form class = "ui form" onBlur={this.handleBlur}>
                <div class="ui grid">
                <div class="three column row">
                    <div class="column"></div>
                    <div class="column">
                        <div class="field">
                            <label><h5>Username</h5></label>
                            <input name="username" className="input" type="string" value={this.state.username} onChange={this.handleInput} />
                        
                        <div class="field">
                            <label><h5>Tweet</h5></label>
                            <textarea rows="2" name="body" className="input" value={this.state.body} onChange={this.handleInput}></textarea>
                        </div>
                        <button className="Submit" class="ui button" onClick={this.props.render}>Submit</button>
                        </div> 
                    </div>
                    </div>
                </div>
            </form></center>
            </Segment>
          );
      }
}

export default TweetForm