//import React from "react";
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline , ConfigProvider} from 'antd';
import { DatePicker, Space , Layout} from 'antd';
import axios from 'axios';


// const { RangePicker } = DatePicker;

// const onChange = (value, dateString) => {
//   console.log('Selected Time: ', value);
//   console.log('Formatted Selected Time: ', dateString);
// };
// const onOk = (value) => {
//   console.log('onOk: ', value);
// };

// function Projects() {
//     const output = (<Space direction="vertical" size={12}>
//     <DatePicker showTime onChange={onChange} onOk={onOk} />
//     <RangePicker
//       showTime={{
//         format: 'HH:mm',
//       }}
//       format="YYYY-MM-DD HH:mm"
//       onChange={onChange}
//       onOk={onOk}
//     />
//   </Space>);

//     return (
//         <ConfigProvider theme="dark">
//             <div className="todo">
//             <h1>Create Project</h1>

//             <div className='todo-wrapper'>
//                 <div className='todo-input'>
//                     <div className='todo-input-item'>
//                         <label>Title</label>
//                         <input type="text" placeholder="What's the task title?" />
//                     </div>
//                     <div className='todo-input-item'>
//                         <label>Description</label>
//                         <input type="text" placeholder="What's the task description?" />
//                     </div>
//                     <div className='todo-input-item'>
//                         <label>Members</label>
//                         <input type="text" placeholder="List usernames (include your own)" />
//                     </div>
//                     <div className='todo-input-item'>
//                         <label>Description</label>
//                         <input type="text" placeholder="What's the task description?" />
//                     </div>
//                     <div>
//                     {output}
//                     </div>
//                     <div className='todo-input-item'>
//                         <button type='button' className='primaryBtn'>Add</button>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         </ConfigProvider>
//     )
// }

// export default Projects;


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
    this.setState({
        users: ['test user'],
        owner: 'test user'
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
      deadline: this.state.deadline,
      description: this.state.description,
      members: [this.state.owner],
      owner: this.state.owner,
      permissions: this.state.permissions,
      title: this.state.title,
  }

  axios.post('http://localhost:5000/project/add', project).then(rest => console.log('Added Project'));

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
    </div>
    
    )
  }
}