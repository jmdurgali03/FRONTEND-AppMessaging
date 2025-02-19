import './Workspace.css';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useWorkspace } from '../../hooks/useWorkspace.jsx';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import ENVIROMENT from '../../utils/enviroment.js';
import CreateChannel from '../../components/channel/CreateChannel.jsx';
import NewMessage from '../../components/message/new/NewMessage.jsx';
import MessagesList from '../../components/message/list/MessagesList.jsx';

const Workspace = () => {
    const { workspace_id, channel_id } = useParams();
    const { isLoading, workspaces, getMessages } = useWorkspace();
    const [messages, setMessages] = useState([]);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isInviting, setIsInviting] = useState(false);

    useEffect(() => {
        if (workspace_id && channel_id) {
            getMessages(channel_id).then(
                fetchedMessages => {
                    setMessages(fetchedMessages);
                }
            );
        }

    }, [workspace_id, channel_id]);

    if (isLoading) {
        return <span>Loading...</span>;
    }

    const workspace_selected = workspaces.find(workspace => workspace._id == Number(workspace_id));

    if (!workspace_selected) {
        return <span>Workspace not found</span>;
    }

    const channel_selected = workspace_selected.channels.find(channel => channel._id == Number(channel_id));

    if (!channel_selected) {
        return <span>Channel not found</span>;
    }

    const handleSidebarToggle = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const getMailFromToken = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const decoded_token = jwtDecode(token);
            return decoded_token.email;
        }

        catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    };

    const handleInviteUser = async () => {
        const { value: email } = await Swal.fire({
            title: 'Invite User',
            input: 'email',
            inputLabel: 'Email address: ',
            inputPlaceholder: 'workspace@domain.com',
            showCancelButton: true,
            confirmButtonColor: "#611f69",
            cancelButtonColor: "#d33",
            confirmButtonText: "Add user!",
            cancelButtonText: "Cancel"
        });

        if (email) {
            setIsInviting(true);

            try {
                const response = await fetch(`${ENVIROMENT.API_URL}/workspaces/${workspace_id}/invite`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();

                if (response.ok) {
                    Swal.fire({
                        title: 'User invited',
                        text: 'User invited successfully',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                }

                else {
                    Swal.fire({
                        title: 'Error',
                        text: data.message,
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }

            }

            catch (error) {
                console.error('Error inviting user: ', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Please try again',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }

            finally {
                setIsInviting(false);
            }
        }
    }

    return (
        <div className='workspace-div'>
            <main className='workspace-main'>
                <button className='hamburger-button' onClick={handleSidebarToggle}>☰</button>
                <h2>{workspace_selected.name}</h2>

                <div className='button-container'>
                    {
                        workspace_selected.owner.email === getMailFromToken() && (
                            <button
                                className="generate-invitation-button"
                                onClick={handleInviteUser}
                                disabled={isInviting}
                            >
                                {isInviting ? 'Adding...' : 'Add user'}
                            </button>
                        )
                    }

                    <Link to={'/home'}>
                        <button className='exit-button'>Exit</button>
                    </Link>
                </div>
            </main>

            <div className='workspace-container'>
                <div className={`workspace-container-channels-sidebar ${isSidebarVisible ? '-visible' : '-hidden'}`}>
                    <h4>Channels</h4>
                    <ul className='channel-list'>
                        {
                            workspace_selected.channels.map(
                                (channel) => (
                                    <li key={channel._id}>
                                        <Link to={`/workspace/${workspace_selected._id}/channel/${channel._id}`}>
                                            <span className="channel-hash">#</span> {channel.name}
                                        </Link>
                                    </li>
                                )
                            )
                        }
                    </ul>
                    <span className='add-channel'>
                        + <CreateChannel workspaceID={workspace_selected._id} />
                    </span>
                </div>

                <div className='workspace-container-messages'>
                    <MessagesList messages={messages} channelName={channel_selected?.name} />

                    <NewMessage
                        workspace_id={workspace_selected._id}
                        channel_id={channel_selected._id}
                        update_messages={setMessages}
                        channel_name={channel_selected.name}
                    />
                </div>
            </div>
        </div>
    )
}

export default Workspace