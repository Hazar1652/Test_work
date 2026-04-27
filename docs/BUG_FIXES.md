# Bug Fix Explanations

This document summarizes bugs encountered during implementation and why each fix works.

## 1) App failed to start (`npm start` ENOENT)

### Symptom

`npm` reported `Could not read package.json` in project root.

### Root Cause

Project root missed startup scaffolding (`package.json` and app entry files).

### Fix

- Added `package.json` scripts and dependencies metadata
- Added `index.html`, `src/main.jsx`, and `src/App.jsx`
- Wired `Provider`, `ChakraProvider`, and store setup

### Why It Works

Vite now has a valid project entrypoint and npm scripts to boot the app.

## 2) Chakra UI runtime/export errors

### Symptom

Build/runtime errors for missing exports like `FormControl`, `FormLabel`, `AlertIcon`.

### Root Cause

Code used Chakra v2-style APIs with Chakra v3 package.

### Fix

- Replaced form controls with `Field` + `NativeSelect`
- Replaced alert usage with `Alert.Root`, `Alert.Indicator`, `Alert.Title`, `Alert.Description`
- Updated card root usage to Chakra v3 API (`Card.Root`)

### Why It Works

Components now use valid exports and composition model for Chakra v3.

## 3) Status update crashed (`Cannot assign to read only property 'status'`)

### Symptom

Updating task status threw immutable assignment error in `tasksApi`.

### Root Cause

Mock API mutated a task object that was shared with Redux-managed data.

### Fix

- Return cloned objects from fetch API
- Use immutable replacement in update API (replace object in array, no direct mutation)

### Why It Works

No shared mutable references remain; updates are immutable and Redux-safe.

## 4) Assignee filter options disappeared after selecting one assignee

### Symptom

Selecting `Jane Smith` removed `John Doe` from assignee filter options.

### Root Cause

API returned already-filtered datasets, shrinking `items` used to derive unique assignees.

### Fix

- `fetchTasks` returns full dataset
- Filtering is done in selector layer (`selectFilteredTasks`)

### Why It Works

Filter options derive from complete task list, so assignee options remain stable.

## 5) Dashboard error boundary fallback triggered after perf refactor

### Symptom

`Something went wrong in dashboard UI` after TaskList optimization.

### Root Cause

Refactor left missing variables in `TaskList` render path (`shouldVirtualize`, memoized data).

### Fix

- Restored memoized derivations
- Added virtualization row safety guard for missing task rows

### Why It Works

Render path no longer references undefined values and virtualization remains safe.
