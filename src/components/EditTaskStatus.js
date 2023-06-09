import { useState, useEffect} from 'react';
import { Button, Form, Select, Modal} from 'antd';
import axios from 'axios';
import { showErrorDialog } from "../components/ErrorDialog";

const { Option } = Select;
const EditTaskStatus = (task_id) => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [id, setId] = useState();
    const [task, setTask] = useState();

    useEffect(() => {
        const fetchTask = async () => {
            if (id != null) {
                try {
                    const response = await axios.get(`http://localhost:3001/api/tasks/get/${id}`);
                    setTask(response.data);

                } catch (error) {
                    console.log('Error fetching task:', error);
                    showErrorDialog('Error fetching task');
                }
            }
        };
        setId(task_id.task)
        // console.log(id);
        fetchTask();
    }, [id]);

    const handleOpen = () => {
        setVisible(true);
    };
    
    const handleClose = () => {
        setVisible(false);
        form.resetFields();
    };

    const handleSave = () => {
        // console.log(task)
        form.validateFields().then(async (values) => {
            // Process the submitted form values
            console.log(values);
            task.status = values.status
            setVisible(false);
            form.resetFields();
            try {
                await axios.patch(`http://localhost:3001/api/tasks/update/${id}`, task);
                console.log("Task updated successfully");
                window.location.reload(false);
            }
            catch (error) {
                console.log("Error updating task:", error);
            }
        });
    }

    return (
        <div>
          <Button type="primary" onClick={handleOpen}>
            Set Status
          </Button>
          <Modal
                open={visible}
                title="Edit Task Status"
                okText="Save"
                cancelText="Cancel"
                onCancel={handleClose}
                onOk={handleSave}
              ><Form form = {form} layout = "vertical">
                <Form.Item name="status" label="Status" rules={[{ required: true }]}>
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
              </Form>
            </Modal>
        </div>
    );  
}
export default EditTaskStatus;