import axios from 'axios';

// Read backend URL from Vite env; fall back to localhost for dev
const BACKEND_URL = (import.meta && import.meta.env && import.meta.env.VITE_BACKEND_URL)
  ? String(import.meta.env.VITE_BACKEND_URL)
  : 'http://localhost:5000';

// Ensure no trailing slash and append /api
const normalizedBase = `${BACKEND_URL.replace(/\/$/, '')}/api`;

const api = axios.create({
  baseURL: normalizedBase,
  timeout: 60000, // 60 seconds timeout since LLMs can take time
});

export const generateStudyMaterial = async (notes) => {
  try {
    const response = await api.post('/generate', { notes });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.error || 'Server error occurred.');
    } else if (error.request) {
      // The request was made but no response was received (e.g. timeout or network down)
      throw new Error('Network error. Please check your connection and ensure the server is running.');
    } else {
      // Something happened in setting up the request
      throw new Error('An unexpected error occurred.');
    }
  }
};
