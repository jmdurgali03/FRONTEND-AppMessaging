import React from 'react';
import './MessagesList.css';

const MessagesList = ({ messages, channelName }) => {
    return (
        <>
            <nav className='nav-channel-title'>
                <h4 className="channel-title"># {channelName}</h4>
            </nav>

            <div className='message-list-container'>
                {
                    messages.length > 0 ? (
                        messages.map((message, index) => {
                            const authorInitial = message.author.charAt(0).toUpperCase();
                            return (
                                <div key={message._id || `message-${index}`} className="message-item">
                                    <div className="message-avatar">{authorInitial}</div>
                                    <div className="message-content">
                                        <div className="message-header">
                                            <span className="message-author">{message.author}</span>
                                            <span className="message-time">{new Date(message.createdAt).toLocaleString()}</span>
                                        </div>
                                        <div className="message-text">{message.text}</div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="no-messages">No messages in this channel yet.</p>
                    )
                }
            </div>
        </>
    )
}

export default MessagesList;