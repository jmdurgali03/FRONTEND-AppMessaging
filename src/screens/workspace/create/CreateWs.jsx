import React, { useState } from 'react';
import './CreateWs.css';
import { useNavigate } from 'react-router-dom';
import getRandomImage from '../../../../assets/images/getRandomImage.js';
import { validateWorkspace } from '../../../utils/validateWs.js';
import { validateChannel } from '../../../utils/validateCh.js';
import axios from 'axios';
import ENVIROMENT from '../../../utils/enviroment.js';

const CreateWs = () => {
    const [workspaceName, setWorkspaceName] = useState('');
    const [channelName, setChannelName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleCreateForm = async (event) => {
        event.preventDefault();

        const errorWs = validateWorkspace(workspaceName);
        if (errorWs) {
            setErrorMessage(errorWs);
            return;
        }

        const errorCh = validateChannel(channelName);
        if (errorCh) {
            setErrorMessage(errorCh);
            return;
        }

        setErrorMessage('');

        const new_workspace = {
            name: workspaceName,
            img: getRandomImage() || '/images-Ws/Team Hub.jpg',
            channels: [
                {
                    name: channelName,
                    messages: []
                }
            ]
        };

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setErrorMessage('No auth token found.');
                return
            }

            const response = await axios.post(
                `${ENVIROMENT.API_URL}/workspaces`,
                new_workspace,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.status === 201) {
                navigate('/home');
            } else {
                setErrorMessage('Error creating workspace, try again later!');
            }
        } catch (error) {
            console.error('Error creating workspace:', error);

            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Error creating workspace. Please try again.');
            }
        }
    };

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/home');
    };

    return (
        <div className='create-container'>
            <div className='new-workspace'>
                <h2 className='title-new'>Create new Workspace!</h2>

                <form onSubmit={handleCreateForm}>
                    <div className='form-input'>
                        <label htmlFor="name-ws">Workspace name</label>
                        <input
                            type="text"
                            id='name-ws'
                            name='name-ws'
                            value={workspaceName}
                            onChange={(event) => setWorkspaceName(event.target.value)}
                            placeholder='Eg: UTN prog web'
                        />
                    </div>

                    <div className='form-input'>
                        <label htmlFor="name-ch">Channel name</label>
                        <input
                            type="text"
                            id='name-ch'
                            name='name-ch'
                            value={channelName}
                            onChange={(event) => setChannelName(event.target.value)}
                            placeholder='Eg: General'
                        />
                    </div>

                    <div className='error-message'>
                        {errorMessage && <p>{errorMessage}</p>}
                    </div>

                    <div className='new-workspace-buttons'>
                        <button type='submit' className='confirm-btn'>Confirm</button>
                        <button onClick={handleCancel} className='cancel-btn'>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateWs;