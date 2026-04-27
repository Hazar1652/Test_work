# Task Dashboard

React + Redux Toolkit + Redux Saga + Chakra UI task dashboard.

## Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Start development server

```bash
npm start
```

The app runs at `http://localhost:5173`.

### 3) Build production bundle

```bash
npm run build
```

### 4) Preview production bundle

```bash
npm run preview
```

## Available Scripts

- `npm start` - start Vite dev server
- `npm run dev` - same as start
- `npm run build` - build production bundle
- `npm run preview` - preview production build

## Environment Variables

No required environment variables for current implementation.

If API endpoints are externalized later, add a `.env` file with Vite-prefixed keys, for example:

```bash
VITE_API_BASE_URL=https://api.example.com
```

## Project Notes

- Core task dashboard requirements are implemented.
- See `docs/ARCHITECTURE.md` for design decisions.
- See `docs/REQUIREMENTS_CHECKLIST.md` for requirement coverage.
- See `docs/BUG_FIXES.md` for bug-fix explanations.
