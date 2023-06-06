import { useState } from 'react';
import { Button, Form, Select} from 'antd';
import axios from 'axios';

const EditTaskStatus = () => {
    const [visible, setVisible] = useState(false);
    const [form] = UserForm();

    const handleOpen = () => {
        setVisible(true);
    };
    
    const handleClose = () => {
        setVisible(false);
        form.resetFields();
    };
}
export default EditTaskStatus;