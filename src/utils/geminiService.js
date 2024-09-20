import axios from 'axios';

const API_KEY = 'AIzaSyAwGm6wE6mvrwumTQRFGMhJfw76HhvcOXA';
const BASE_URL = 'https://gemini-api.google.com/v1/';

export const getGeminiResponse = async (inputText) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/analyze`,
            {
                input: inputText,
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching Gemini AI response:", error);
        throw error;
    }
};
