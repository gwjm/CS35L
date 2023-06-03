import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { AlignCenterOutlined } from '@ant-design/icons';
import AuthContext from "../contexts/AuthProvider.js";
import useFetch from '../hooks/useFetch';

const { Option } = Select;

const TaskForm = () => {
    const { auth } = useContext(AuthContext);
    const [members, setMembers] = useState([]);
    const { id } = useParams();
    console.log(id);
  
    const { data, loading, error } = useFetch('http://localhost:3001/api/users/');
    let user;
    var j = 0;
    let filteredData = []

    //get current user and filter out already friends and yourself
    //TODO: filter out already friends
    for (var i = 0; i < data.length; i++) {
        if (data[i].username === auth.user1) {
            user = data[i];
        }
        else {
            filteredData[j] = data[i];
            j++;
        }
    }
    //console.log(user)

    const labeledData = filteredData.map(obj => {
        return { value: obj.username, label: obj.username }
    });


    const onFinish = async values => {
      console.log('Success:', values);
      try {
        // const userlogged = await axios.get(`http://localhost:3001/api/users/findusername/${auth.user1}`);
        console.log("Data Submission");
        const data = {...values}; 
        console.log(data)
        const response = await axios.post(`http://localhost:3001/api/tasks/add/${id}`, data);
        console.log('Task created successfully');

        // addTask([...tasks, response.data._id]);
      } catch (error) {
        console.log("Failed to create task")
        console.log(error)
        console.error(error);
      }
    }
  
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    }
  
    return (
      <Form
        name="basic"
        labelCol={AlignCenterOutlined}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        projectid={id}
      >
        <Form.Item
          label="Task Title"
          name="title"
          rules={[{ required: true, message: 'Please input your task title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Task Description"
          name="description"
          rules={[{ required: false, message: 'Please input your task description!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Due Date"
          name="dueDate"
          rules={[{ required: true, message: 'Please input your task due date!' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Task Status"
          name="status"
          rules={[{ required: true, message: 'Please input your task status!' }]}
        >

          <Select
            showSearch
            placeholder="Select a status"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={(value) => {
              Form.setFieldsValue({ status: value === "Completed" });
              }}
            >
              <Option value={false}>Not Started</Option>
              <Option value={true}>Completed</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Assigned User(s)"
          name="assignedUsers"
          rules={[{ required: false, message: 'Please input your task assigned user(s)!' }]}
        >
          <Select
            mode="multiple"
            showSearch
            //onSearch={fetchMembers}
            //filterOption={false}

            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={labeledData}
            placeholder="Select members"
          >
            {/* {members.map(member => (
              <Option key={member._id} value={member._id}>
                {member.username}
              </Option>
            ))} */}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" Link to={`/Dashboard`}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }

export default TaskForm;