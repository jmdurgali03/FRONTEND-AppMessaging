import { useEffect, useState } from "react";
import ENVIROMENT from '../utils/enviroment.js';
import axios from 'axios';

export const useWorkspace = () => {
    const [workspaces, setWorkspaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found in localStorage', token);
                    return;
                }

                const response = await axios.get(`${ENVIROMENT.API_URL}/workspaces`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log('API Response (hook):', response.data);
                setWorkspaces(response.data.data.workspaces || []);
            } catch (error) {
                console.error('Error fetching workspaces:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWorkspaces();
    }, []);

    const getMessages = async (channel_id) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found in LS', token);
                return
            }

            const response = await axios.get(ENVIROMENT.API_URL + `/api/messages/${channel_id}`, {
                headers: { Authorization: 'Bearer ${token}' }
            });

            return response.data.data.messages || [];
        }

        catch (error) {
            if (error.response && error.response.status === 404) {
                console.log(`No messages found for channel ${channel_id}, => empty array.`)
                return [];
            }
            console.error('Error fetching messages: ', error);
            return [];
        }
    }

    return { isLoading, workspaces, getMessages };
}