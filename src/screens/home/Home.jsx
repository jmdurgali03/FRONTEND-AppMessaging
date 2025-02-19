import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Home.css'
import Swal from 'sweetalert2'
import WorkspaceItem from './WokrspaceItem.jsx';
import { useWorkspace } from '../../hooks/useWorkspace.jsx';

const Home = () => {
    const navigate = useNavigate();

    const { workspaces, isLoading } = useWorkspace();

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You'll be logged out",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#611f69",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out!",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                navigate('/');
            }
        })
    }

    return (
        <div className='home-container'>
            <div className="profile-buttons">
                <Link to="/profile">
                    <button className="profile-btn">View Profile</button>
                </Link>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
            <h1>Welcome to App Messaging</h1>
            <h2>Enjoy efficient communication!</h2>

            <div className='home-main-div'>
                <span className='home-workspaces-title'>Workspaces for @you</span>

                <main className='home-workspaces-mainlist'>
                    {isLoading ? (
                        <span className='span-loading'>Loading...</span>
                    ) : (
                        <div>
                            {workspaces.length > 0 ? (
                                workspaces.map((workspace) => {
                                    const ChannelID =
                                        workspace.channels?.length > 0 ? workspace.channels[0]._id : null;
                                    return (
                                        <div className="workspace-item" key={workspace._id}>
                                            <WorkspaceItem
                                                img={workspace.img}
                                                name={workspace.name}
                                                workspace_id={workspace._id}
                                            />
                                            {ChannelID && (
                                                <Link to={`/workspace/${workspace._id}/channel/${ChannelID}`}>
                                                    <button>Open</button>
                                                </Link>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className='no-workspaces'>
                                    <h3>No workspaces found. Create one!</h3>
                                </div>
                            )}
                            <div className="create-workspace-container">
                                <p>Want to use App Messaging with another team?</p>
                                <Link to='/workspace/new'>
                                    <button>Create Workspace</button>
                                </Link>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default Home