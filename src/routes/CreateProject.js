import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AlignCenterOutlined } from '@ant-design/icons';
import AuthContext from "../contexts/AuthProvider.js";
import { showErrorDialog } from "../components/ErrorDialog.js"
const { Option } = Select;


const ProjectForm = () => {
  const { auth } = useContext(AuthContext);
  const [members, setMembers] = useState([]);
  const [tasks, addTask] = useState([]);
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const onFinish = async values => {
    console.log('Success:', values);
    showErrorDialog(`Success creating project ${values}!`)
    try {
      const userlogged = await axios.get(`http://localhost:3001/api/users/findusername/${auth.user1}`);
      const data = { ...values, owner: userlogged.data._id }; // Add the owner field with the logged-in user's _id
      console.log(data)
      await axios.post('http://localhost:3001/api/projects/add', data);
      console.log('Project created successfully');
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      showErrorDialog("Error creating project");
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    showErrorDialog("Error creating project");
  };
  const fetchMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/users/`);
      setMembers(response.data);
      console.log(response.data);
    } catch (error) {
      showErrorDialog("Error creating project");
    }
  };

  useEffect(() => {
    fetchMembers(); // Call fetchMembers when the component is mounted
  }, []); // The empty dependency array [] ensures that the effect runs only once on component mount


  return (
    <Form
      name="ProjectCreationForm"
      labelCol={AlignCenterOutlined}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Project Name"
        name="title"
        rules={[{ required: true, message: 'Please input your project name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input your project description!' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Members"
        name="members"
        rules={[{ required: true, message: 'Please select project members!' }]}
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
      <Form.Item
        label="Start Date"
        name="duration"
        rules={[{ required: true, message: 'Please select both start and end dates!' }]}
      >
      <RangePicker showTime/>
      </Form.Item>
      <Form.Item name="simpleDatePicker">
            <DatePicker />
      </Form.Item>
      <Form.Item
        name={['task']}
      >
        {/* <TaskForm tasks={tasks} addTask={addTask} /> */}
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProjectForm;
