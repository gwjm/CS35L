import React, { useContext, useState } from "react";
import AuthContext from "../contexts/AuthProvider.js";
import { Input, Space, Button, Form, Select } from "antd";
import useFetch from '../hooks/useFetch';
import { AlignCenterOutlined } from '@ant-design/icons';

function Profile() {
    const { auth } = useContext(AuthContext);
    const { data, loading, error } = useFetch('http://localhost:3001/api/users/');

    var user;
    for (var i = 0; i < data.length; i++) {
        if (data[i].username === auth.user1) {
            user = data[i];
        }
    }

    //TODO: filter out already friends
    const filteredData = ({}

    );
    //TODO: change the data below to filteredData
    const labeledData = data.map(obj => {
        return { value: obj.username, label: obj.username }
    });

    const onFinish = async values => {
        console.log('Success:', values);
        //TODO: add value to friends list here

    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    }

    /*const clearSearch = () => {
        //console.log(clearSearch )
        setInputValue('');
    }*/

    return (
        <div>
            <h1>My Profile</h1>
            <div>
                <p>Username: {auth.user1}</p>
            </div>
            <div className="search">
                <p>Find Friends (because you don't have any in real life :D)</p>
                <div>
                    <Form
                        name="basic"
                        //labelCol={AlignCenterOutlined}
                        wrapperCol={{ span: 16 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            //label="Users"
                            name="users"
                            rules={[{ required: true, message: 'Please select a user to friend!' }]}
                        >
                            <Select
                                //mode="multiple"
                                showSearch
                                //optionFilterProp="children"
                                //onSearch={clearSearch}
                                //filterOption={false}
                                placeholder="Find friends"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={labeledData}
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    {/*members.slice(0, 10).map(member => (
                            <Option key={member._id} value={member._id}>
                                {member.username}
                            </Option>
                        ))*/}
                </div>
                {/*<div className="searchInputs">
                    <Search
                        placeholder="input search text"
                        value={input}
                        onChange={(e) => handleFilter(e)}
                        enterButton
                    />
                </div>
                {filteredData.length !== 0 && (
                    <div className="dataResult">
                        {filteredData.slice(0, 10).map((value, index) => {
                            return (
                                <div className="dataItem" key={value.username}>
                                    <p>{value.username}</p>

                                </div>
                            );
                        })}
                    </div>
                    )}*/}
            </div>
        </div >
    );
};
export default Profile;