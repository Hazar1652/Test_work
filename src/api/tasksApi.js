let MOCK_TASKS = [
  {
    id: 1,
    title: 'Review PR #123',
    status: 'in-progress',
    priority: 'high',
    assignee: 'John Doe',
    dueDate: '2024-02-15',
  },
  {
    id: 2,
    title: 'Update documentation',
    status: 'todo',
    priority: 'low',
    assignee: 'Jane Smith',
    dueDate: '2024-02-20',
  },
  {
    id: 3,
    title: 'Fix login bug',
    status: 'done',
    priority: 'critical',
    assignee: 'John Doe',
    dueDate: '2024-02-10',
  },
];

export const tasksAPI = {
  fetchTasks: () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.8) {
          reject(new Error('Failed to fetch tasks'));
          return;
        }

        // Always return full dataset. UI filters are applied via selectors,
        // which keeps assignee options stable in the filters panel.
        resolve(MOCK_TASKS.map((task) => ({ ...task })));
      }, 1500);
    }),

  updateTaskStatus: (taskId, newStatus) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.9) {
          reject(new Error('Failed to update task'));
          return;
        }

        const taskIndex = MOCK_TASKS.findIndex((item) => item.id === taskId);

        if (taskIndex === -1) {
          reject(new Error('Task not found'));
          return;
        }

        const updatedTask = {
          ...MOCK_TASKS[taskIndex],
          status: newStatus,
        };
        MOCK_TASKS[taskIndex] = updatedTask;
        resolve({ ...updatedTask });
      }, 800);
    }),
};
