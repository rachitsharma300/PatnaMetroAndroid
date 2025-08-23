// src/services/api.js
import axios from 'axios';

// For environment variables, you'll need to install and setup react-native-config
// const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080/api";

// For now, hardcode or use a relative URL if your backend is on the same network
// For physical device testing, use your machine's local IP (e.g., "http://192.168.1.100:8080/api")
const API_BASE_URL = "http://localhost:8080/api"; // Will only work for Android Emulator

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;