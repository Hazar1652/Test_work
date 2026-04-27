import { call, put, takeLatest, takeEvery, delay, select, retry } from 'redux-saga/effects';
import { tasksAPI } from '../../api/tasksApi';
import {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  updateTaskStatusRequest,
  updateTaskStatusSuccess,
  updateTaskStatusFailure,
  setFilter,
  clearFilters,
} from './tasksSlice';

const selectFilters = (state) => state.tasks.filters;

function* fetchTasksSaga() {
  try {
    const filters = yield select(selectFilters);
    const tasks = yield retry(3, 1000, tasksAPI.fetchTasks, filters);
    yield put(fetchTasksSuccess(tasks));
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
  }
}

function* updateTaskStatusSaga(action) {
  const { taskId, newStatus } = action.payload;
  try {
    const updatedTask = yield call(tasksAPI.updateTaskStatus, taskId, newStatus);
    yield put(updateTaskStatusSuccess(updatedTask));
  } catch (error) {
    yield put(updateTaskStatusFailure(error.message));
  }
}

function* handleFilterChangeSaga() {
  yield delay(300);
  yield put(fetchTasksRequest());
}

export function* watchTasksSaga() {
  yield takeLatest(fetchTasksRequest.type, fetchTasksSaga);
  yield takeEvery(updateTaskStatusRequest.type, updateTaskStatusSaga);
  yield takeLatest([setFilter.type, clearFilters.type], handleFilterChangeSaga);
}