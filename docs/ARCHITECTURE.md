# Architecture Decisions

## Tech Stack

- React (function components + hooks)
- Redux Toolkit for state management
- Redux Saga for async orchestration and side effects
- Reselect selectors for derived data
- Chakra UI v3 for UI components
- Vite for build/dev tooling

## State Management Approach

`tasks` feature keeps normalized dashboard concerns in one slice:

- `items`: task list
- `isLoading`: fetch-in-progress state
- `updatingTaskId`: per-task status update loading state
- `error`: async error message
- `filters`: `status` and `assignee`

Why this approach:

- Clear separation of fetch loading vs update loading
- Predictable reducer transitions
- Easy selector composition for filtered views

## Async Operations

Redux Saga handles API side effects:

- `fetchTasksRequest` -> fetch with retry (`retry(3, 1000, ...)`)
- `updateTaskStatusRequest` -> single task update
- filter changes (`setFilter`, `clearFilters`) trigger debounced refetch

Why saga:

- Explicit flow control
- Good fit for cancellation/debounce/retry patterns
- Keeps components focused on rendering

## UI Composition

- `TaskDashboard` - shell, view mode state, error boundary
- `TaskFilters` - filter controls + Redux dispatches
- `TaskList` - state rendering branches (loading/error/empty/data)
- `TaskCard` - task details and status actions

## Performance Decisions

- `React.memo` on dashboard/task list/task card/filter components
- `useMemo` and `useCallback` where render churn is likely
- List virtualization (`react-window`) for 100+ tasks in list view
- Code-splitting dashboard via `React.lazy` + `Suspense`

## Trade-offs

- Mock API in-memory storage is simple but non-persistent
- Randomized mock failures are useful for resilience testing, but can make manual QA noisy
- Virtualization currently applied to list view only (not grid view)
