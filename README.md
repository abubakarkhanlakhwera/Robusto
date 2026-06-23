# Robusto Task Manager

Todoist-inspired task management product built with Next.js, Tailwind CSS, Firebase, and Zustand.

## Overview

Robusto is a full-stack-style productivity app focused on the workflows people expect from a modern task manager: projects, tasks, due dates, reminders, filtering, and persistent state. It is a stronger portfolio project because it demonstrates product thinking, frontend architecture, state management, and UI polish beyond a small tutorial exercise.

Live demo: [robusto.vercel.app](https://robusto.vercel.app)

## Core Features

- Task and project organization
- Todoist-style interaction patterns
- Zustand state management
- Firebase-backed product direction
- Next.js application structure
- Tailwind CSS styling
- Formatting and linting configuration

## Tech Stack

- Next.js 15
- React 19
- JavaScript
- Tailwind CSS
- Zustand
- Firebase
- Prettier and ESLint

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

## Environment Variables

Create a local `.env.local` file if Firebase-backed features are enabled.

```text
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Do not commit real production credentials or private project settings.

## Product Roadmap

- Add screenshots and short GIFs of the task workflow
- Document the state model and Firebase data shape
- Add unit tests for task/project reducers and date parsing
- Add end-to-end smoke tests for core task flows
- Add a portfolio case-study section explaining decisions and tradeoffs

## Author

Muhammad AbuBakar Siddique
Portfolio: [abees.me](https://abees.me)
