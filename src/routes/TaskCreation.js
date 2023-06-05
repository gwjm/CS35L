import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { AlignCenterOutlined } from '@ant-design/icons';
import AuthContext from "../contexts/AuthProvider.js";


const { Option } = Select;

const TaskForm = () => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const [members, setMembers] = useState([]);
    const { id } = useParams();
    const [form] = useForm();

  
    const onFinish = async values => {
      console.log('Success:', values);
      try {
        // const userlogged = await axios.get(`http://localhost:3001/api/users/findusername/${auth.user1}`);
        console.log("Data Submission");
        const data = {...values}; 
        console.log(data)
        const response = await axios.post(`http://localhost:3001/api/tasks/add/${id}`, data);
        console.log('Task created successfully');
        
        navigate('/Dashboard')
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
        form={form}
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
              form.setFieldsValue({status: Number(value)});}}
            >
              <Option value={0}>Not Started</Option>
              <Option value={1}>In Progress</Option>
              <Option value={2}>Completed</Option>
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
              Add Task 
          </Button>
        </Form.Item>
      </Form>
    );
  }

export default TaskForm;