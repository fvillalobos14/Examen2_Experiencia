import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'
import Axios from 'axios';
import {updateTweet} from './TweetList'

class Tweet extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editable: false, title: this.props.username, body:this.props.body };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  onUpdate = (tweet) => {
    this.props.onUpdate(tweet);
  };

  //handleUpVote = () => (this.props.onVote(this.props.id));

  handleUpdate = (tweet) => {
    axios.put(`http://localhost:3001/api/v1/tweets/${this.props.id}`, {
      tweet: tweet
    }).then(response => {
      console.log(response)
      this.props.updateTweet(response.data)
    }).catch(error => console.log(error))
  };

  handleEdit = () => {
    console.log('edit button clicked')
    if (this.state.editable === true) {
      var id = this.props.id;
      var username = this.refs.username.value;
      var body = this.refs.body.value;
      var twt = { id: id,username: username, body: body};
      this.handleUpdate(twt);
      window.location.reload(false)
    }
    this.setState({ editable: !this.state.editable })
  }

  deleteTweet = () => (axios.delete(
    `http://localhost:3001/api/v1/tweets/${this.props.id}`), window.location.reload(false)
  );

  render() {
    var u_field = this.state.editable ? <p><input ref="username" name="username" className="input" defaultValue={this.props.username} type="string" onChange={this.handleChange} /> </p> : <a href="#"> {this.props.username} </a>;
    var b_field = this.state.editable ? <input ref="body" name="body" className="input" defaultValue={this.props.body} type="string" /> : <p> {this.props.body} </p>;

    return (
      <div className='item' >
        <div className='middle aligned content'>
          <div className='header'>
            <p> &nbsp;&nbsp;&nbsp;&nbsp;
            <button className="DeleteTweetButton ui button red mini" onClick={this.deleteTweet}>Delete</button>
              <button className="EditTweetButton ui button teal mini" onClick={this.handleEdit}>{this.state.editable ? 'Submit' : 'Edit'}</button>
            </p>
          </div>
          <div className="field">
            {u_field}
            {b_field}
          </div>
        </div>
      </div>
    );
  }
}

export default Tweet