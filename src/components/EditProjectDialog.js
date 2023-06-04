import { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';

const EditProjectDialog = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleOpen = () => {
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
        visible={visible}
        title="Edit Project"
        okText="Save"
        cancelText="Cancel"
        onCancel={handleClose}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="projectTitle"
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

export default EditProjectDialog;
