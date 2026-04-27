import { Button, Field, HStack, NativeSelect } from '@chakra-ui/react';
import { memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAssigneeFilter,
  selectStatusFilter,
  selectUniqueAssignees,
} from '../features/tasks/tasksSelectors';
import { clearFilters, setFilter } from '../features/tasks/tasksSlice';

const STATUS_OPTIONS = [
  { label: 'All', value: '' },
  { label: 'Todo', value: 'todo' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Done', value: 'done' },
];

function TaskFilters() {
  const dispatch = useDispatch();
  const statusFilter = useSelector(selectStatusFilter);
  const assigneeFilter = useSelector(selectAssigneeFilter);
  const assignees = useSelector(selectUniqueAssignees);

  const onStatusChange = (event) => {
    dispatch(
      setFilter({
        filter: 'status',
        value: event.target.value || null,
      })
    );
  };

  const onAssigneeChange = (event) => {
    dispatch(
      setFilter({
        filter: 'assignee',
        value: event.target.value || null,
      })
    );
  };

  const onClearFilters = () => {
    dispatch(clearFilters());
  };

  const assigneeOptions = useMemo(
    () =>
      assignees.map((assignee) => (
        <option key={assignee} value={assignee}>
          {assignee}
        </option>
      )),
    [assignees]
  );

  return (
    <HStack spacing={4} align="end" flexWrap="wrap">
      <Field.Root maxW="220px">
        <Field.Label mb={1}>Status</Field.Label>
        <NativeSelect.Root>
          <NativeSelect.Field value={statusFilter ?? ''} onChange={onStatusChange}>
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value || 'all'} value={option.value}>
                {option.label}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Field.Root>

      <Field.Root maxW="260px">
        <Field.Label mb={1}>Assignee</Field.Label>
        <NativeSelect.Root>
          <NativeSelect.Field value={assigneeFilter ?? ''} onChange={onAssigneeChange}>
            <option value="">All</option>
            {assigneeOptions}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Field.Root>

      <Button variant="outline" onClick={onClearFilters}>
        Clear filters
      </Button>
    </HStack>
  );
}

export default memo(TaskFilters);
