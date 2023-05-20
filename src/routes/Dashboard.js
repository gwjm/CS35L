import { Avatar, Button, List, Skeleton, Divider } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import useFetch from '../hooks/useFetch';
import { Link } from "react-router-dom";
import axios from 'axios';

function Dashboard() {
    const { data, loading, error } = useFetch('http://localhost:3001/api/projects');



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
                    dataLength={data.length}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={<Divider plain>-------------------</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={data}

                        renderItem={(item) => (
                            <List.Item actions={[<a key="list-loadmore-edit">edit</a>]} key={item.body}>
                                <List.Item.Meta
                                    title={<Link to={`/Projects/${item._id}`}>{item.title}</Link>}
                                    description={<div>Owner:  {item.owner}</div>}
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