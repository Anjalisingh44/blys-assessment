// code for handling api url of task 
import axios from "axios";


const API_URL = "http://localhost:5001/api/task"; 


const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Add a task
export const addTask = async (taskData) => {
  const response = await axios.post(`${API_URL}/addtasks`, taskData, getAuthHeader());
  return response.data;
};

// View tasks
export const viewTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/gettask`, getAuthHeader());
      console.log(response);
      return response.data.tasks; // Ensure the API returns { tasks: [...] }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error; // Propagate the error for handling in the thunk
    }
  };

// Delete task
export const deleteTask = async (taskId) => {
  const response = await axios.delete(`${API_URL}/delete-task/${taskId}`, getAuthHeader());
  return response.data;
};
