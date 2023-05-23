//import React from "react";
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline , ConfigProvider} from 'antd';
import { DatePicker, Space , Layout} from 'antd';
import axios from 'axios';

import React, { Component } from 'react';
//import axios from 'axios';
//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";

export default class CreateProject extends Component {
  constructor(props) {
    super(props);

    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDeadline = this.onChangeDeadline.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeOwner = this.onChangeOwner.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    //this.onChangeMembers = this.onChangeMembers.bind(this);
    //this.onChangePermissions = this.onChangePermissions.bind(this);
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      owner: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

componentDidMount() {
  axios.get('http://localhost:3001/api/users/')
        .then(response => {
          console.log(response.data)
          if (response.data.length > 0) {
            this.setState({
              users: response.data.map(user => user.username),
              username: response.data[0].username
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })
  }

onChangeDate(date) {
  this.setState({ date: date});
}

onChangeDeadline(date) {
  this.setState({ deadline: date});
}

onChangeDescription(e) {
  this.setState({ description: e.target.value});
}

//not sure about members and permissions

onChangeOwner(e) {
  this.setState({owner: e.target.value});
}

onChangeTitle(e) {
  this.setState({title: e.target.value});
}

onSubmit(e) {
  e.preventDefault();

  const project = {
    date: new Date(),
    //deadline: this.state.deadline,
    title: this.state.title,
    description: this.state.description,
    members: [this.state.owner],
    owner: owner_id, //CHANGE THIS LINE
    //permissions: this.state.permissions,
}

  var owner_id = 'XXX';
  axios.get('http://localhost:3001/api/users/')
        .then(response => {
          if (response.data.length > 0) { 
          let users = response.data.map(user => user.username)
          let ids = response.data.map(user => user._id)

          for (var i = 0; i < users.length; i++) {
            if (project.owner == users[i]) {
              console.log("HEREEEEEEEEEEEEEEE")
              project.owner = ids[i];
          }}}})

  

  axios.post('http://localhost:3001/api/projects/add', project).then(rest => console.log('Added Project'));

  //change following line to section where project added to database
  console.log(project)
}

  render() {
    return (
      <div>
      <h3>Create New Project</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.owner}
              onChange={this.onChangeOwner}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Title: </label>
          <input  type="text" placeholder="What's the task title?"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text" placeholder="Describe the task"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Deadline: </label>
          <div>
            <DatePicker
              selected={this.state.deadline}
              onChange={this.onChangeDeadline}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Project" className="btn btn-primary" />
        </div>
      </form>
      <h3>Create New User</h3>
      <form onSubmit={this.onSubmit2}>
      <div className="form-group"> 
          <label>Title: </label>
          <input  type="text" placeholder="What's the username?"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
              />
      </div>
      <div className="form-group"> 
          <label>Password: </label>
          <input  type="text" placeholder="What's the password?"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
              />
      </div>
      <div className="form-group">
          <input type="submit" value="Create User" className="btn btn-primary" />
        </div>
      </form>
    </div>);
  }
}
