import React from "react";
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline , ConfigProvider} from 'antd';
import { DatePicker, Space , Layout} from 'antd';


const { RangePicker } = DatePicker;

const onChange = (value, dateString) => {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
};
const onOk = (value) => {
  console.log('onOk: ', value);
};

function Projects() {
    const output = (<Space direction="vertical" size={12}>
    <DatePicker showTime onChange={onChange} onOk={onOk} />
    <RangePicker
      showTime={{
        format: 'HH:mm',
      }}
      format="YYYY-MM-DD HH:mm"
      onChange={onChange}
      onOk={onOk}
    />
  </Space>);

    return (
        <ConfigProvider theme="dark">
            <div className="projects">
                <h1>Projects</h1>
                {output},
            </div>
        </ConfigProvider>
    )
}

export default Projects;