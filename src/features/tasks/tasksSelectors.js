import { createSelector } from '@reduxjs/toolkit';

const selectTasksState = (state) => state.tasks;

export const selectAllTasks = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.items
);

export const selectFilters = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.filters
);

export const selectStatusFilter = createSelector(
  [selectFilters],
  (filters) => filters.status
);

export const selectAssigneeFilter = createSelector(
  [selectFilters],
  (filters) => filters.assignee
);

export const selectTasksByStatus = createSelector([selectAllTasks], (tasks) =>
  tasks.reduce((byStatus, task) => {
    const key = task.status;
    if (!byStatus[key]) {
      byStatus[key] = [];
    }
    byStatus[key].push(task);
    return byStatus;
  }, {})
);

export const selectTaskStats = createSelector([selectAllTasks], (tasks) =>
  tasks.reduce((stats, task) => {
    const key = task.status;
    stats[key] = (stats[key] ?? 0) + 1;
    return stats;
  }, {})
);

export const selectIsLoading = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.isLoading
);

export const selectError = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.error
);

export const selectUpdatingTaskId = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.updatingTaskId
);

export const selectUniqueAssignees = createSelector([selectAllTasks], (tasks) =>
  [...new Set(tasks.map((task) => task.assignee).filter(Boolean))]
);

export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectStatusFilter, selectAssigneeFilter],
  (tasks, status, assignee) =>
    tasks.filter((task) => {
      const statusMatch = !status || task.status === status;
      const assigneeMatch = !assignee || task.assignee === assignee;
      return statusMatch && assigneeMatch;
    })
);
