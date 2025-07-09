import React from 'react'
import { useAuth } from '../../components/Auth'
import DoughnutChart from './DoughnutChart'
import GroupChart from './GroupChart'
import '../../css/DashBoard.css'

const Metrics = ({allUsers , allBlogs}) => {
    const { user } = useAuth()

    const admin = allUsers?.filter((user) => user.isAdmin === true);

    const comments = allBlogs?.flatMap((blog) => blog.comments || []);

    const likes = allBlogs?.flatMap((blog) => blog.likes || []);




    return (
        <>
            <div>Hi , <b>{user?.name}</b> <br />
                Welcome to The Dashboard <br /> Here you can manage posts , users and other admin tasks</div>

            <div className="boxes">
                <div className="insideBox" style={{ backgroundColor: "pink" }}>
                    <i className="fa-solid fa-users"></i>
                    <p>{allUsers?.length} users</p>
                </div>
                <div className="insideBox" style={{ backgroundColor: "lightblue" }}>
                    <i className="fa-solid fa-blog"></i>
                    <p>{allBlogs?.length} blogs</p>
                </div>
                <div className="insideBox" style={{ backgroundColor: "lightgreen" }}>
                    <i className="fa-solid fa-user-tie"></i>
                    <p>{admin?.length} admin</p>
                </div>
                <div className="insideBox" style={{ backgroundColor: "#b592fd" }}>
                    <i className="fa-solid fa-comments"></i>
                    <p>{comments?.length} comments</p>
                </div>
                <div className="insideBox" style={{ backgroundColor: "#7fd1d1" }}>
                    <i className="fa-solid fa-thumbs-up"></i>                <p>{likes?.length} likes</p>
                </div>
            </div>


            <div className="charts">
                <div className="groupChart">
                    <GroupChart allBlogs={allBlogs}></GroupChart>
                </div>

                <div className="doughnutChart">
                    <DoughnutChart allBlogs={allBlogs} allUsers={allUsers}></DoughnutChart>
                </div>

            </div>
        </>
    )
}

export default Metrics