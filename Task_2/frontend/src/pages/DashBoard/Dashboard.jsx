import '../../css/DashBoard.css'
import Navbar from '../../components/Navbar';
import Metrics from './Metrics';
const Dashboard = ({ allBlogs, allUsers }) => {

  return (
    <>
      <Navbar></Navbar>
      <div>
        <Metrics allBlogs={allBlogs} allUsers={allUsers}></Metrics>
      </div>

    </>
  )
}

export default Dashboard