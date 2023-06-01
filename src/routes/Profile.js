import React, { useContext, useState } from "react";
import AuthContext from "../contexts/AuthProvider.js";
import { Input, Space, Button, Form, Select } from "antd";
import useFetch from '../hooks/useFetch';
import { AlignCenterOutlined } from '@ant-design/icons';
import axios from 'axios';

function Profile() {
    const { auth } = useContext(AuthContext);
    const { data, loading, error } = useFetch('http://localhost:3001/api/users/');
    //const { user, setUser } = useState();
    console.log("hello")
    let user;
    var j = 0;
    let filteredData = []

    //get current user and filter out already friends and yourself
    //TODO: filter out already friends
    for (var i = 0; i < data.length; i++) {
        if (data[i].username === auth.user1) {
            user = data[i];
        }
        else {
            filteredData[j] = data[i];
            j++;
        }
    }
    console.log(user)

    const labeledData = filteredData.map(obj => {
        return { value: obj.username, label: obj.username }
    });

    const onFinish = async values => {
   

        console.log(auth.user1)
        let login_id = 'Unknown';

        axios.get('http://localhost:3001/api/users/')
        .then(response => {
        if (response.data.length > 0) {
            //array of usernames
          let users = response.data.map(user => user.username)
          //array of user IDs
          let ids = response.data.map(user => user._id)
            
          //find the user id of the currently logged in user, then post an update to that user's friend list
          for (var i = 0; i < users.length; i++) {
            if (users[i] == auth.user1) {
                login_id = ids[i];
                let new_friend = values.users;
                console.log('Works to here');
                //I DONT KNOW HOW TO MAKE IT WORK. SEE 1:44 AT https://www.youtube.com/watch?v=7CqJlxBYj-M and 
                //THE UPDATE FUNCTION IN https://github.com/beaucarnes/mern-exercise-tracker-mongodb/blob/master/backend/routes/exercises.js
                axios.post('http://localhost:3001/api/users/addFriend/'+login_id, login_id, new_friend);
            }
            }

         // let aser = User.findById(login_id)
                // user = {
                //         username: aser.username,
                //         email: aser.email,
                //         password: aser.password,
                //         ownedprojects: aser.ownedprojects,
                //         joinedprojects: aser.joinedprojects,
                //         friends: aser.friends,
                        
                // }
                // user.friends.append(new_friend)

    }});
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
                {console.log(user)}
                <p>Username: {user ? user.username : ""}</p>
                <p>Email: {user ? user.email : ""}</p>
            </div>
            <div className="search">
                <p>Add Friends (because you don't have any in real life :D)</p>
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
                </div>
            </div>
        </div >
    );
};
export default Profile;