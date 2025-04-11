import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api/';

export const getItems = async () => {
    try{
        const response = await axios.get(`${API_URL}/items`);
        return response.data
    } catch(error){
        console.error("Error fetching items", error);
        throw error;
    }
};