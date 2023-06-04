import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Modal } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const { Option } = Select;

const TaskForm = () => {
  const [visible, setVisible] = useState(false);
  const { id } = useParams();
  const [form] = Form.useForm();

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      const data = { ...values };
      const response = await axios.post(`http://localhost:3001/api/tasks/add/${id}`, data);
      console.log('Task created successfully');
      setVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Failed to create task', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Task Status"
            name="status"
            rules={[{ required: true, message: 'Please input your task status!' }]}
          >
            <Select>
              <Option value={false}>Not Started</Option>
              <Option value={true}>Completed</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Assigned User(s)"
            name="assignedUsers"
            rules={[{ required: false, message: 'Please input your task assigned user(s)!' }]}
          >
            <Select mode="multiple" placeholder="Select members">
              {/* Render the options */}
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
