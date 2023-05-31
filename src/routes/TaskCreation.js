import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { AlignCenterOutlined } from '@ant-design/icons';
import AuthContext from "../contexts/AuthProvider.js";

const { Option } = Select;

const TaskForm = () => {
    const { auth } = useContext(AuthContext);
    const [members, setMembers] = useState([]);
    const {projectid} = useParams();
  
    const onFinish = async values => {
      console.log('Success:', values);
      try {
        // const userlogged = await axios.get(`http://localhost:3001/api/users/findusername/${auth.user1}`);
        const data = { ...values }; 

        console.log(data)
        const response = await axios.post(`http://localhost:3001/api/tasks/${projectid}`, data);
        console.log('Task created successfully');
        // addTask([...tasks, response.data._id]);
      } catch (error) {
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
          label="Assigned User(s)"
          name="assignedUsers"
          rules={[{ required: false, message: 'Please input your task assigned user(s)!' }]}
        >
          <Select
            mode="multiple"
            showSearch
            // onSearch={fetchMembers}
            filterOption={false}
            placeholder="Select members"
          >
            {members.map(member => (
              <Option key={member._id} value={member._id}>
                {member.username}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }

export default TaskForm;