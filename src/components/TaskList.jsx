import {
  Alert,
  Box,
  Button,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { memo, useMemo } from 'react';
import { List } from 'react-window';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectFilteredTasks,
  selectIsLoading,
  selectUpdatingTaskId,
} from '../features/tasks/tasksSelectors';
import { fetchTasksRequest } from '../features/tasks/tasksSlice';
import TaskCard from './TaskCard';

const VIRTUALIZATION_THRESHOLD = 100;
const VIRTUAL_ROW_HEIGHT = 220;
const VIRTUAL_LIST_HEIGHT = 700;

const VirtualizedTaskRow = memo(function VirtualizedTaskRow({
  index,
  style,
  tasks,
  updatingTaskId,
}) {
  const task = tasks[index];
  if (!task) {
    return null;
  }

  return (
    <Box style={style} px={1} pb={4}>
      <TaskCard task={task} isUpdating={updatingTaskId === task.id} />
    </Box>
  );
});

function TaskList({ viewMode = 'grid' }) {
  const dispatch = useDispatch();
  const tasks = useSelector(selectFilteredTasks);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const updatingTaskId = useSelector(selectUpdatingTaskId);
  const shouldVirtualize = viewMode === 'list' && tasks.length >= VIRTUALIZATION_THRESHOLD;

  const taskCards = useMemo(
    () =>
      tasks.map((task) => (
        <TaskCard key={task.id} task={task} isUpdating={updatingTaskId === task.id} />
      )),
    [tasks, updatingTaskId]
  );

  const virtualizedRowProps = useMemo(
    () => ({
      tasks,
      updatingTaskId,
    }),
    [tasks, updatingTaskId]
  );

  if (isLoading) {
    return (
      <Stack spacing={4}>
        {[...Array(3)].map((_, index) => (
          <Skeleton key={`task-skeleton-${index}`} height="170px" borderRadius="md" />
        ))}
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert.Root status="error" borderRadius="md" alignItems="start" flexDirection="column">
        <Alert.Indicator />
        <Box>
          <Alert.Title>Failed to load tasks.</Alert.Title>
          <Alert.Description>{error}</Alert.Description>
        </Box>
        <Button mt={3} size="sm" onClick={() => dispatch(fetchTasksRequest())}>
          Retry
        </Button>
      </Alert.Root>
    );
  }

  if (!tasks.length) {
    return (
      <VStack py={8} spacing={2} border="1px dashed" borderColor="gray.300" borderRadius="md">
        <Text fontWeight="semibold">No tasks found</Text>
        <Text color="gray.500">Try changing filters or reload task data.</Text>
      </VStack>
    );
  }

  if (viewMode === 'list') {
    if (shouldVirtualize) {
      return (
        <Box borderWidth="1px" borderColor="gray.200" borderRadius="md" p={2}>
          <List
            defaultHeight={VIRTUAL_LIST_HEIGHT}
            rowComponent={VirtualizedTaskRow}
            rowCount={tasks.length}
            rowHeight={VIRTUAL_ROW_HEIGHT}
            rowProps={virtualizedRowProps}
            style={{ height: VIRTUAL_LIST_HEIGHT }}
            overscanCount={8}
          />
        </Box>
      );
    }

    return (
      <Stack spacing={4}>
        {taskCards}
      </Stack>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={4}>
      {taskCards}
    </SimpleGrid>
  );
}

export default memo(TaskList);
