import axios from 'axios';
import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await axios.post('/auth/login', userInfo); // Replace '/auth/login' with your API endpoint
    const token = response.data.token;

    // Save the token to localStorage for later use
    localStorage.setItem('token', token);

    return token; // Return the token for further use in your app
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);
    throw error; // Pass the error up the stack
  }
};

export { login };