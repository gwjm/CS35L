import { Avatar, Button, List, Skeleton, Divider } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import useFetch from '../hooks/useFetch';
import { Link } from "react-router-dom";
import axios from 'axios';
import React, { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthProvider.js";

function Dashboard() {
    const { data, loading, error } = useFetch('http://localhost:3001/api/projects');
    //console.log(data);

    let data2 = []

    const { auth } = useContext(AuthContext);

    //set token to newly logged in user
    useEffect(() => {
        if (auth) {
            //console.log(auth);
            localStorage.setItem("token", JSON.stringify(auth));
        }
    }, [auth]);

    //console.log(Object.keys(auth).length === 0);
    let j = 0;
    for (var i = 0; i < data.length; i++) {
        if (data[i].owner.username === auth.user1) {
            data2[j] = data[i];
            j++;
        }
    }
    /* axios.get('http://localhost:3001/api/projects/')
         .then(function (response) {
             console.log(response);
         })
         .catch(function (error) {
             console.log(error);
         })
         .finally(function () {
 
         });*/



    //console.log(data);
    //console.log(data.id);

    return (
        <div>
            <h1>My Dashboard</h1>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <Link to="/Projects">
                <Button type="primary">Add Project</Button>
            </Link>
            <div
                id="scrollableDiv"
                style={{
                    height: 400,
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
            >
                <InfiniteScroll
                    dataLength={data2.length}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={<Divider plain>-------------------</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={data2}

                        renderItem={(item) => (
                            <List.Item
                                actions={[<a key="list-loadmore-edit">edit</a>]}
                                key={item.body}
                            >
                                <List.Item.Meta
                                    title={<Link to={`/Projects/${item._id}`}>{item.title} </Link>}
                                    description={<div>Owner: {item.owner.username}</div>}
                                />
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </div>
    );
};
export default Dashboard;