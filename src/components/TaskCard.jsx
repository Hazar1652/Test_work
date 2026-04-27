import {
  Badge,
  Card,
  CardBody,
  Field,
  HStack,
  NativeSelect,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { memo, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { updateTaskStatusRequest } from '../features/tasks/tasksSlice';

const PRIORITY_COLORS = {
  critical: 'red',
  high: 'orange',
  medium: 'yellow',
  low: 'green',
};

const STATUS_OPTIONS = ['todo', 'in-progress', 'done'];

function TaskCard({ task, isUpdating = false }) {
  const dispatch = useDispatch();

  const isOverdue = useMemo(() => {
    if (!task?.dueDate || task.status === 'done') {
      return false;
    }

    const dueDate = new Date(task.dueDate);
    const now = new Date();
    dueDate.setHours(23, 59, 59, 999);
    return dueDate < now;
  }, [task?.dueDate, task.status]);

  const handleStatusChange = useCallback((event) => {
    dispatch(
      updateTaskStatusRequest({
        taskId: task.id,
        newStatus: event.target.value,
      })
    );
  }, [dispatch, task.id]);

  return (
    <Card.Root variant="outline">
      <CardBody>
        <VStack align="stretch" spacing={4}>
          <HStack justify="space-between" align="start">
            <VStack align="start" spacing={1}>
              <Text fontSize="lg" fontWeight="semibold">
                {task.title}
              </Text>
              <Text color="gray.500" fontSize="sm">
                Task #{task.id}
              </Text>
            </VStack>
            <Badge colorScheme={PRIORITY_COLORS[task.priority] ?? 'gray'} textTransform="capitalize">
              {task.priority}
            </Badge>
          </HStack>

          <Text color="gray.700">
            Assignee: <Text as="span">{task.assignee || 'Unassigned'}</Text>
          </Text>

          <Text color={isOverdue ? 'red.600' : 'gray.700'} fontWeight={isOverdue ? 'semibold' : 'normal'}>
            Due: {task.dueDate || 'No due date'} {isOverdue ? '(Overdue)' : ''}
          </Text>

          <Field.Root>
            <Field.Label mb={1}>Status</Field.Label>
            <HStack>
              <NativeSelect.Root>
                <NativeSelect.Field
                  value={task.status}
                  onChange={handleStatusChange}
                  disabled={isUpdating}
                  textTransform="capitalize"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              {isUpdating ? <Spinner size="sm" /> : null}
            </HStack>
          </Field.Root>
        </VStack>
      </CardBody>
    </Card.Root>
  );
}

export default memo(TaskCard);
