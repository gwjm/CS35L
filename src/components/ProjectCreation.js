import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Button, DatePicker, Select, Card, Modal , message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlignCenterOutlined } from '@ant-design/icons';
import AuthContext from '../contexts/AuthProvider.js';
import moment from 'moment';

const { Option } = Select;

const ProjectForm = () => {
  const { auth } = useContext(AuthContext);
  const [members, setMembers] = useState([]);
  const [tasks, addTask] = useState([]);
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm(); // Add this line to use Ant Design's Form component

  const showModal = () => {
    setModalVisible(true);
  };

  const handleModalOk = () => {
    setModalVisible(false);
    form.resetFields(); // Reset form fields
    window.location.reload(); // TODO: remove this use effect hook
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const onFinish = async (values) => {
    const userIDs = [];
    //find the IDs associated with passed usernames
    for (const username of values.members) {
      try {
        const user_id = await axios.get(`http://localhost:3001/api/users/findusername/${username}`);
        userIDs.push(user_id.data._id);
      } catch (error) {
        message.error('Issue with finding user_id (CreateProject.js)');
      }
    }
    values.members = userIDs;

    try {
      const userlogged = await axios.get(`http://localhost:3001/api/users/findusername/${auth.user1}`);
      values.members.push(userlogged.data._id);
      const data = { ...values, owner: userlogged.data._id }; // Add the owner field with the logged-in user's _id

      //Check for valid deadline
      const curr_date = new Date();
      if (data.deadline < curr_date) {
        setModalVisible(true);
        message.error('Invalid deadline')
        return;
      }

      await axios.post('http://localhost:3001/api/projects/add', data);
      message.success('Project created successfully');
      handleModalOk();
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error('Project creation failed')
    console.log('Failed:', errorInfo);
  };
  const fetchMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/users/`);
      setMembers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMembers(); // Call fetchMembers when the component is mounted
  }, []); // The empty dependency array [] ensures that the effect runs only once on component mount

  return (
    <Card title="Create a Project">
      <Form
        name="basic"
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
            filterOption={true}
            placeholder="Select members"
          >
            {members.map((member) => (
              <Option key={member._id} value={member.username}>
                {member.username}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Deadline"
          name="deadline"
          rules={[{ required: true, message: 'Please select a deadline!' }]}
        >
          <DatePicker disabledDate={(current) => current.isBefore(moment() - 1)} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Invalid Deadline"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>The selected deadline is invalid.</p>
      </Modal>
    </Card>
  );
};

export default ProjectForm;
