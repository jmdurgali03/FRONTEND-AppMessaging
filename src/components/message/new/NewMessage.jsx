import axios from 'axios';
import React, { useState } from 'react'
import ENVIROMENT from '../../../utils/enviroment';
import { Bold, Italic, Strikethrough, LinkIcon, ListOrdered, ListBulleted, Quote, Code, CodeBlock, SendNow } from './iconsIndex.js';

const NewMessage = ({ workspace_id, channel_id, update_messages, channel_name }) => {
    const [message, setMessage] = useState('');

    const getUserId = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const base64Url = token.split('.')[1];

            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

            const decodedPayload = JSON.parse(atob(base64))

            return decodedPayload.id;
        }

        catch (error) {
            console.error('Error decoding token:', error)
            return null
        }
    }

    const handleSubmitForm = async (event) => {
        event.preventDefault();

        if (!message) return;

        const new_message = {
            author_id: getUserId(),
            channel_id: channel_id,
            text: message,
        };

        try {
            const response = await axios.post(`${ENVIROMENT.API_URL}/api/messages`, new_message);

            if (response.ok) {
                const created_message = response.data.data;

                update_messages((prevMessages) => [...prevMessages, created_message]);
            }

            else {
                console.log(`Error sending message: ${response.data.message}`);
            }

            setMessage('');
        }

        catch (error) {
            console.log(`Error sending message: ${error}`);
        }
    }

    return (
        <form onSubmit={handleSubmitForm} className="new-message-form">
            <div className="messages-icons">
                <Bold className='messages-icon-bold' />
                <Italic className='messages-icon-italic' />
                <Strikethrough className='messages-icon-strikethrough' />
                <LinkIcon className='messages-icon-link' />
                <ListOrdered className='messages-icon-list-ordered' />
                <ListBulleted className='messages-icon-list-bulleted' />
                <Quote className='messages-icon-quote' />
                <Code className='messages-icon-code' />
                <CodeBlock className='messages-icon-code-block' />
            </div>
            <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={`Message #${channel_name}`}
                className="message-input"
            />
            <button type="submit" className="messages-icon-send-now">
                <SendNow />
            </button>
        </form>
    )
}

export default NewMessage;