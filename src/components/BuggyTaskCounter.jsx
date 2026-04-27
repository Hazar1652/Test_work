// BuggyTaskCounter.jsx
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Text, Button } from '@chakra-ui/react';
import { selectAllTasks } from '../features/tasks/tasksSelectors';

const BuggyTaskCounter = () => {
  const tasks = useSelector(selectAllTasks);
  const [manualCount, setManualCount] = useState(0);

  const count = useMemo(() => tasks.length + manualCount, [tasks.length, manualCount]);

  const incrementCount = () => {
    setManualCount((prev) => prev + 1);
  };

  return (
    <Box>
      <Text>Total Tasks: {count}</Text>
      <Button onClick={incrementCount()}>Add Manual Count</Button>
      {tasks.map((task) => (
        <Text key={task.id}>{task.title}</Text>
      ))}
    </Box>
  );
};

export default BuggyTaskCounter;