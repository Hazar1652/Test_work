import { Component, memo, useCallback, useEffect, useState } from 'react';
import { Button, Container, Heading, HStack, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { fetchTasksRequest } from '../features/tasks/tasksSlice';
import TaskFilters from './TaskFilters';
import TaskList from './TaskList';

class DashboardErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
   
    console.error('DashboardErrorBoundary:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container maxW="container.xl" py={8}>
          <Heading size="md">Something went wrong in dashboard UI.</Heading>
        </Container>
      );
    }

    return this.props.children;
  }
}

function TaskDashboard() {
  const dispatch = useDispatch();
  const [viewMode, setViewMode] = useState('grid');
  const setGridView = useCallback(() => setViewMode('grid'), []);
  const setListView = useCallback(() => setViewMode('list'), []);

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, [dispatch]);

  return (
    <DashboardErrorBoundary>
      <Container maxW="container.xl" py={8}>
        <VStack align="stretch" spacing={6}>
          <Heading size="lg">Task Dashboard</Heading>

          <HStack spacing={3}>
            <Button
              colorScheme={viewMode === 'grid' ? 'blue' : 'gray'}
              onClick={setGridView}
            >
              Grid view
            </Button>
            <Button
              colorScheme={viewMode === 'list' ? 'blue' : 'gray'}
              onClick={setListView}
            >
              List view
            </Button>
          </HStack>

          <TaskFilters />
          <TaskList viewMode={viewMode} />
        </VStack>
      </Container>
    </DashboardErrorBoundary>
  );
}

export default memo(TaskDashboard);
