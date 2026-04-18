# Task Management Dashboard

## 🚀 Tech Stack

* React 19
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* React Router v7

---

## 📌 Features

* Mock Authentication (Login using localStorage)
* Create Task (Modal form)
* Edit Task
* Delete Task
* Change Task Status (Todo / In Progress / Completed)
* Filter by Status
* Sort by Due Date
* Search by Title
* Dark Mode Toggle 🌙
* Responsive UI

---

## 📸 Screenshots

### 🔐 Login Page
<img width="1920" height="1080" alt="login png" src="https://github.com/user-attachments/assets/4f8564ce-57c7-4869-9f00-dd31f6e61081" />


### 📊 Dashboard

<img width="1920" height="1080" alt="dashboard png" src="https://github.com/user-attachments/assets/030866f9-0815-4108-b513-97f7b2cf1f16" />


### ➕ Create Task Modal

<img width="1920" height="1080" alt="Screenshot 2026-04-18 200458" src="https://github.com/user-attachments/assets/bb109c31-0e86-4c75-a59f-ca27bd014ef9" />

Another screenshots
<img width="1920" height="1080" alt="Screenshot 2026-04-18 200616" src="https://github.com/user-attachments/assets/7e0a1ba4-ef27-4030-a119-cd692aaf9691" />
<img width="1920" height="1080" alt="Screenshot 2026-04-18 200529" src="https://github.com/user-attachments/assets/e9dd845c-68bb-4774-90e6-b6c89a5535fa" />
<img width="1920" height="1080" alt="Screenshot 2026-04-18 200512" src="https://github.com/user-attachments/assets/75d93dec-205d-4eed-b544-f07ad01f4778" />
<img width="1920" height="1080" alt="Screenshot 2026-04-18 200625" src="https://github.com/user-attachments/assets/a8bf1991-e134-468c-a57b-8832b2c7b9c8" />
<img width="1920" height="1080" alt="Screenshot 2026-04-18 200644" src="https://github.com/user-attachments/assets/da9edbd2-f6a2-487c-a81e-4037a603c947" />
<img width="1920" height="1080" alt="Screenshot 2026-04-18 200706" src="https://github.com/user-attachments/assets/b58080c5-ab95-4795-842f-b94f386aeb6b" />

---

## ⚙️ Setup Instructions

```bash
npm install
npm run dev
```

---

## 📂 Folder Structure

```
src/
  components/
    ui/
    dashboard/
  hooks/
  lib/
  pages/
  types/
```

---

## 🧠 Folder Structure Design Decisions

The root configuration files (package.json, tsconfig.json, vite.config.ts, components.json) are positioned at the project root to enable easy access by build tools and development environments. The src directory serves as the primary application code container, following the conventional React project structure where all source code lives in a single root folder.

The components folder is subdivided into ui/ and dashboard/ subdirectories to separate reusable, generic components from domain-specific, feature-focused components. The ui/ folder contains primitive, presentational components like buttons, cards, and dialogs that follow no business logic and can be reused across the entire application. The dashboard/ subfolder contains specialized components (TaskDialog, TaskTable) that are tightly coupled to the dashboard feature and specific to that domain.

The hooks folder centralizes custom React hooks (useAuth, useTasks, useTheme), making state management and side effects logic discoverable and reusable across multiple components. This separation prevents logic duplication and keeps components focused on rendering.

The lib folder contains utility functions and mock data (utils.ts, mockData.ts) that support various parts of the application without being tied to any single component. This keeps helper functions accessible and organized by purpose rather than scattered throughout the codebase.

The pages folder holds top-level route components (DashboardPage, LoginPage) that represent full page views, making it clear which components serve as primary routing destinations versus intermediate components. This convention simplifies navigation and component hierarchy understanding.

The types folder (index.ts) consolidates TypeScript type definitions in a single, centralized location, ensuring all shared types are in one place for easy discovery and preventing circular dependency issues across feature boundaries.

---

## 🧠 Project Design Decisions

### Technology Stack Selection

The project uses React 19 with TypeScript to provide type safety and modern component patterns, combined with Vite as the build tool for fast development server startup and optimized production builds. React Router v7 handles client-side routing with built-in support for nested routes and navigation.

### UI Framework Architecture

The application adopts a component-based UI system using shadcn/ui components built on Base UI primitives and styled with Tailwind CSS for utility-first styling. This approach enables consistent design patterns while maintaining flexibility through Tailwind's configuration system and class-variance-authority for component variants.

### Routing and Authentication Pattern

Protected and public route wrappers are implemented at the top level to enforce authentication checks before allowing access to dashboard features. The useAuth hook provides centralized authentication state, and unauthenticated users are automatically redirected to the login page while authenticated users cannot access the login form.

### State Management Approach

Custom React hooks (useAuth, useTasks, useTheme) manage local and domain-specific state instead of adding external state management libraries, reducing complexity and bundle size while keeping state logic collocated with usage patterns.

### Type System Organization

All TypeScript types are centralized in types/index.ts using strict interfaces with union types for enum-like values (TaskStatus, TaskPriority), ensuring consistency across the application and preventing circular dependencies between modules.

### Build and Development Configuration

The development server is configured using Vite for fast refresh and optimized builds. TypeScript strict mode is enforced to catch type errors early and improve code reliability.

### Domain Modeling

Clear separation between User and Task entities with explicit interfaces defines the core data models, establishing a single source of truth for business logic and data handling.

---

## 📬 Submission

GitHub Repo: https://github.com/JanviPrince/task-management-app
