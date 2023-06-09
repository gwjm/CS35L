import { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, DatePicker } from 'antd';
import axios from "axios";
import { showErrorDialog } from "./ErrorDialog";
import { useParams } from "react-router-dom";
import moment from 'moment';
import dayjs from 'dayjs';

const EditTaskDialog = (task_details) => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [id, setId] = useState();
    const [task, setTask] = useState();

    useEffect(() => {
        const fetchTask = async () => {
          if (id != null) {
            try {
              // console.log(id)
              const response = await axios.get(`http://localhost:3001/api/tasks/get/${id}`);
              setTask(response.data);
              console.log("Fetching Task...", task);
            } catch (error) {
              console.log('Error fetching Task:', error);
              showErrorDialog('Error fetching Task');
            }
          }
        };
        setId(task_details.task)
        // console.log(id)
        fetchTask();
      }, [id]);

    const handleOpen = () => {
        form.setFieldsValue({ title: task.title, description: task.description, dueDate: dayjs(task.dueDate, 'YYYY-MM-DD') })
        setVisible(true);
    };

    const handleClose = () => {
        setVisible(false);
        form.resetFields();
    };

    const handleSave = () => {
        form.validateFields().then((values) => {
            // Process the submitted form values
            // console.log(values);
            task.title = values.title
            task.description = values.description
            task.dueDate = values.dueDate
            setVisible(false);
            form.resetFields();
            try {
              axios.patch(`http://localhost:3001/api/tasks/update/${id}`, task);
              console.log("Project updated successfully");
              window.location.reload(false);
            }
            catch (error) {
              console.log("Error updating project:", error);
            }
      
          });
        }

        return (
            <div>
              <Button type="primary" onClick={handleOpen}>
                Edit
              </Button>
        
              <Modal
                open={visible}
                title="Edit Task"
                okText="Save"
                cancelText="Cancel"
                onCancel={handleClose}
                onOk={handleSave}
              >
                <Form form={form} layout="vertical">
                  <Form.Item
                    name="title"
                    label="Task Title"
                    rules={[{ required: true, message: 'Please enter a project title' }]}
                  >
                    <Input placeholder="Enter task title" />
                  </Form.Item>
        
                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter a description' }]}
                  >
                    <Input.TextArea placeholder="Enter task description" />
                  </Form.Item>
                  <Form.Item
                    label="dueDate"
                    name="dueDate"
                    rules={[{ required: true, message: 'Please select a task due date!' }]}
                  >
                    <DatePicker disabledDate={(current) => current.isBefore(moment() - 1)} />
                  </Form.Item>
                  {/* Add more form fields for other project details */}
                </Form>
              </Modal>
            </div>
          );
}

export default EditTaskDialog;