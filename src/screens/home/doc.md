
.home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    padding: 20px;
    background-color: #4A154B;
    min-height: 100vh;
    width: 100vw;
    margin-top: 30px;
}

.home-container h1 {
    color: #ffffff;
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 10px;
}

.home-container h2 {
    font-size: 2rem;
    color: #ffffff;
    margin-bottom: 20px;
}

.profile-btn, .logout-btn {
    background-color: #FFFFFF;
    color: #4A154B;
    border: 1px solid #4A154B;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s, color 0.3s;
    margin: 10px;
}

.profile-btn:hover, .logout-btn:hover {
    background-color: #4A154B;
    color: #FFFFFF;
}

.home-workspaces-mainlist {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 900px;
    background-color: #3F0E40;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.home-workspaces-title {
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;    
    height: 60px;
    padding: 10px 20px;
    border-radius: 8px 8px 0 0;
    background-color: #ecdfed;
    color: #333;
}

.workspace-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFFFFF;
    color: black;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 8px;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.workspace-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.workspace-item img {
    width: 75px;
    height: 75px;
    border-radius: 5px;
    margin-right: 20px;
}

.workspace-item h3 {
    font-size: 1.2rem;
    color: #3F0E40;
}

.workspace-item button {
    background-color: #611f69;
    color: #FFFFFF;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
}

.workspace-item button:hover {
    background-color: #532057;
}

.create-workspace-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    width: 100%;
}

.create-workspace-container p {
    color: #4A154B;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 20px;
}

.create-workspace-container button {
    background-color: transparent;
    color: #4A154B;
    border: 2px solid #4A154B;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s, color 0.3s;
}

.create-workspace-container button:hover {
    background-color: #4A154B;
    color: #FFFFFF;
}

@media screen and (max-width: 640px) {
    .home-container h1 {
        font-size: 2rem;
    }
    .home-container h2 {
        font-size: 1.5rem;
    }
    .workspace-item {
        flex-direction: column;
        text-align: center;
        padding: 10px;
    }
    .workspace-item img {
        width: 50px;
        height: 50px;
        margin-bottom: 10px;
    }
    .create-workspace-container {
        padding: 20px;
    }
    .create-workspace-container button {
        padding: 10px 20px;
        font-size: 14px;
    }
}

@media screen and (min-width: 641px) and (max-width: 1024px) {
    .home-container h1 {
        font-size: 3rem;
    }
    .workspace-item img {
        width: 60px;
        height: 60px;
    }
    .workspace-item button {
        font-size: 14px;
    }
}

@media screen and (min-width: 1025px) {
    .home-container h1 {
        font-size: 4rem;
    }
    .workspace-item img {
        width: 75px;
        height: 75px;
    }
}