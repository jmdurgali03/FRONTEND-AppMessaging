import React, { useState } from 'react';
import { useWorkspace } from '../../hooks/useWorkspace';
import './CreateChannel.css';
import { validateChannel } from '../../utils/validateCh';
import ENVIROMENT from '../../utils/enviroment';

const CreateChannel = ({ workspaceID, addNewChannel = () => { } }) => {
    const { workspaces, isLoading } = useWorkspace();
    const [newChannel, setNewChannel] = useState(false);
    const [channelName, setChannelName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const toggleNewChannel = () => {
        setNewChannel(!newChannel);
    }

    const handleCreateChannel = async (event) => {
        event.preventDefault();

        if (!workspaces || workspaces.length === 0) {
            setErrorMessage('Workspaces not loaded yet. Try again.');
            return;
        }

        const error = validateChannel(channelName, workspaces);

        if (error) {
            setErrorMessage(error);
            return;
        }

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found in LS', token);
                return
            }

            const response = await axios.post(`${ENVIROMENT.API_URL}/channels/${workspaceID}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({ name: channelName })
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error creating channel');
            }

            addNewChannel(data.data.new_channel);
            console.log(`Channel created: ${data.data.new_channel}`);

            setChannelName('');
            setNewChannel(false);
            setErrorMessage('');
        }

        catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.message);
        }

    }

    if (isLoading) {
        return <p>Loading channels...</p>;
    }

    return (
        <div className='channel-container'>
            <button className="toggle-channel-btn" onClick={toggleNewChannel}>
                {
                    newChannel ? (
                        <i className="fa-solid fa-minus toggle-icon"></i>
                    ) : (
                        <i className="fa-solid fa-plus toggle-icon"></i>
                    )
                }
            </button>

            {
                newChannel && (
                    <form className="new-channel-form" onSubmit={handleCreateChannel}>
                        <input
                            className="channel-input"
                            type="text"
                            placeholder="Channel name"
                            value={channelName}
                            onChange={(e) => setChannelName(e.target.value)}
                        />

                        <div className="form-buttons">
                            <button className="submit-btn" type="submit">Create</button>
                            <button className="cancel-btn" type="button"
                                onClick={() => {
                                    toggleNewChannel();
                                    setChannelName('');
                                    setErrorMessage('');
                                }}
                            >Cancel</button>
                        </div>
                    </form>
                )
            }

            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    )
}

export default CreateChannel;

