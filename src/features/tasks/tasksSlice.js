import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
  updatingTaskId: null,
  error: null,
  filters: {
    status: null,
    assignee: null,
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasksRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchTasksSuccess: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
      state.error = null;
    },
    fetchTasksFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateTaskStatusRequest: (state, action) => {
      state.updatingTaskId = action.payload.taskId;
      state.error = null;
    },
    updateTaskStatusSuccess: (state, action) => {
      state.updatingTaskId = null;
      state.items = state.items.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      state.error = null;
    },
    updateTaskStatusFailure: (state, action) => {
      state.updatingTaskId = null;
      state.error = action.payload;
    },
    setFilter: (state, action) => {
      state.filters[action.payload.filter] = action.payload.value;
    },
    clearFilters: (state) => {
      state.filters.status = null;
      state.filters.assignee = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  updateTaskStatusRequest,
  updateTaskStatusSuccess,
  updateTaskStatusFailure,
  setFilter,
  clearFilters,
  clearError,
} = tasksSlice.actions;

export default tasksSlice.reducer;
