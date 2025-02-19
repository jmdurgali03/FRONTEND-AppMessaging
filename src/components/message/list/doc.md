.message-list-container {
    flex-grow: 1;
    overflow-y: auto;
    padding: 1rem;
    background-color: #1a1d21;
    color: #e0e0e0;
    height: calc(100vh - 100px);
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.nav-channel-title {
    background-color: #1e1f22;
    padding: 1rem;
    border-bottom: 1px solid #2c2f33;
}

.channel-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #fff;
    margin: 0;
}

.message-item {
    display: flex;
    align-items: flex-start;
    gap: 0.8rem;
    padding: 0.8rem;
    border-radius: 8px;
    transition: background 0.2s;
}

.message-item:hover {
    background: rgba(255, 255, 255, 0.05);
}

.message-avatar {
    width: 40px;
    height: 40px;
    background-color: #5865f2;
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    text-transform: uppercase;
}

.message-content {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.message-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #b9bbbe;
}

.message-author {
    font-weight: bold;
    color: #ffffff;
}

.message-time {
    font-size: 0.8rem;
    color: #b9bbbe;
}

.message-text {
    font-size: 1rem;
    color: #dcddde;
}