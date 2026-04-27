// BuggyTaskCounter.jsx
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Text, Button } from '@chakra-ui/react';
import { selectAllTasks } from '../features/tasks/tasksSelectors';

const BuggyTaskCounter = () => {
  // Select only task items array via memoized selector, not the whole slice object.
  const tasks = useSelector(selectAllTasks);
  // Manual offset for demo purposes (independent from real task count).
  const [manualCount, setManualCount] = useState(0);

  // Derived value: actual tasks + manual increments.
  // useMemo avoids recalculation unless task length or manual count changed.
  const count = useMemo(() => tasks.length + manualCount, [tasks.length, manualCount]);

  const incrementCount = () => {
    // Functional state update prevents stale state bugs on rapid clicks.
    setManualCount((prev) => prev + 1);
  };

  return (
    <Box>
      <Text>Total Tasks: {count}</Text>
      {/* Pass function reference; do not call it during render. */}
      <Button onClick={incrementCount}>Add Manual Count</Button>
      {tasks.map((task) => (
        // Stable key helps React reconcile list items efficiently.
        <Text key={task.id}>{task.title}</Text>
      ))}
    </Box>
  );
};

export default BuggyTaskCounter;