import { useState, useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import axios from "axios";
import { showErrorDialog } from "./ErrorDialog";
import { useParams } from "react-router-dom";

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
    form.setFieldsValue({ title: project.title, description: project.description })
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      // Process the submitted form values
      console.log(values);
      setVisible(false);
      form.resetFields();
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

          {/* Add more form fields for other project details */}
        </Form>
      </Modal>
    </div>
  );
};

export default EditProjectDialogFromProjectDetails;
