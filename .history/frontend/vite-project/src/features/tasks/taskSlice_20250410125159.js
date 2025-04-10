
// task slice 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as taskService from './taskService'; 

//AsyncThunk is used here
// Create an asynchronous action to perform different action tasks from the API
// GET tasks
export const fetchTasks = createAsyncThunk('tasks/fetch', async (_, thunkAPI) => {
  try {
    return await taskService.viewTasks();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error fetching tasks');
  }
});

//  ADD task
export const createTask = createAsyncThunk('tasks/add', async (taskData, thunkAPI) => {
  try {
    return await taskService.addTask(taskData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error adding task');
  }
});

//  DELETE task
export const removeTask = createAsyncThunk('tasks/delete', async (taskId, thunkAPI) => {
  try {
    await taskService.deleteTask(taskId);
    return taskId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error deleting task');
  }
});
//creating a slice of the state to manage tasks, loading status, and errors

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [], // Holds the array of tasks fetched from the backend
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  Add task
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      //  Delete task
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;



