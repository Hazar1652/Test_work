import { Box, Skeleton, Stack } from '@chakra-ui/react';
import { Suspense, lazy } from 'react';

const TaskDashboard = lazy(() => import('./components/TaskDashboard'));

function DashboardFallback() {
  return (
    <Box p={8}>
      <Stack spacing={4}>
        <Skeleton height="32px" />
        <Skeleton height="48px" />
        <Skeleton height="180px" />
        <Skeleton height="180px" />
      </Stack>
    </Box>
  );
}

function App() {
  return (
    <Suspense fallback={<DashboardFallback />}>
      <TaskDashboard />
    </Suspense>
  );
}

export default App;
