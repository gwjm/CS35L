import { Avatar, Button, List, Skeleton, Divider } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import useFetch from '../hooks/useFetch';
import { Link } from "react-router-dom";
import axios from 'axios';
import React, { useContext } from "react";
import AuthContext from "../contexts/AuthProvider.js";

function Profile() {
    const { auth } = useContext(AuthContext);

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
            <h1>My Profile</h1>
            <div>
                <p>Username: {auth.user1}</p>
            </div>
        </div>
    );
};
export default Profile;