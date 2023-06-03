import { Modal } from 'antd';

export const showErrorDialog = (errorMessage) => {
  Modal.error({
    title: 'Error',
    content: errorMessage,
  });
};
