import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Modal, message } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const { Option } = Select;

const TaskForm = () => {
  const [visible, setVisible] = useState(false);
  const { id } = useParams();
  const [form] = Form.useForm();
  const [members, setMembers] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
    form.resetFields();
  };

    //used to search for friends in the text box
  const filteredMembers = members.filter(
      (member) =>
        member.username.toLowerCase().includes(filterValue.toLowerCase())
  );

  const onFinish = async (values) => {
    try {
      const data = { ...values };
      const response = await axios.post(`http://localhost:3001/api/tasks/add/${id}`, data);
      console.log('Task created successfully');
      setVisible(false);
      form.resetFields();
      message.success('Task created successfully');
      window.location.reload(); // TODO: Refetch data instead of reload page
    } catch (error) {
      console.error('Failed to create task', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/projects/find/${id}`);
      setMembers(response.data.members);
      console.log(response.data.members);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMembers(); // Call fetchMembers when the component is mounted
  }, []);

  return (
    <div>
      <Button type="primary" onClick={handleOpen}>
        Add Task
      </Button>

      <Modal
        title="Add Task"
        visible={visible}
        onCancel={handleClose}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
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
            <DatePicker disabledDate={(current) => current.isBefore(moment()-1)} />
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
            rules={[{ required: true, message: 'Please input your task assigned user(s)!' }]}
          >
            <Select 
              showSearch
              mode="multiple" 
              placeholder="Select members"
              onSearch={(value_key) => setFilterValue(value_key)}
            >
              {members.map(member => ( 
                <Option key={member.username} value={member._id}>
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
      </Modal>
    </div>
  );
};

export default TaskForm;
