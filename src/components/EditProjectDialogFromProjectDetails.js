import { useState, useEffect, useCallback } from 'react';
import { Button, Modal, Form, Input, DatePicker } from 'antd';
import axios from "axios";
import { showErrorDialog } from "./ErrorDialog";
import { useParams } from "react-router-dom";
import moment from 'moment';
import dayjs from 'dayjs';

const EditProjectDialogFromProjectDetails = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const [project, setProject] = useState();

  useEffect(() => {
    const fetchProject = async () => {
      if (id != null) {
        try {
          console.log(id)
          const response = await axios.get(`http://localhost:3001/api/projects/find/${id}`);
          setProject(response.data);
          console.log("Fetching project...", project);
        } catch (error) {
          console.log('Error fetching project:', error);
          showErrorDialog('Error fetching project');
        }
      }
    };
    //setID(project_details.project._id)
    fetchProject();
  }, [id]);

  const handleOpen = () => {
    form.setFieldsValue({ title: project.title, description: project.description, deadline: dayjs(project.deadline, 'YYYY-MM-DD') })
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then(async (values) => {
      // Process the submitted form values
      project.title = values.title
      project.description = values.description
      project.deadline = values.deadline
      setVisible(false);
      form.resetFields();
      try {
        await axios.patch(`http://localhost:3001/api/projects/${id}`, project);
        console.log("Project updated successfully");
        window.location.reload(false);
      } catch (error) {
        console.log("Error updating project:", error);
      }
    });
  };

  return (
    <div>
      <Button type="primary" onClick={handleOpen}>
        Edit
      </Button>

      <Modal
        open={visible}
        title="Edit Project"
        okText="Save"
        cancelText="Cancel"
        onCancel={handleClose}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Project Title"
            rules={[{ required: true, message: 'Please enter a project title' }]}
          >
            <Input placeholder="Enter project title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <Input.TextArea placeholder="Enter project description" />
          </Form.Item>
            <Form.Item
            label="Deadline"
            name="deadline"
            rules={[{ required: true, message: 'Please select a deadline!' }]}
          >
            <DatePicker disabledDate={(current) => current.isBefore(moment() - 1) } />
          </Form.Item>
          {/* Add more form fields for other project details */}
        </Form>
      </Modal>
    </div>
  );
};

export default EditProjectDialogFromProjectDetails;
