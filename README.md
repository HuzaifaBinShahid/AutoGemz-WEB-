# Pro UI Kit

Welcome! Our values are rooted in trust, integrity, and a relentless pursuit of excellence. We are not just a service provider; we are your automotive partners, committed to ensuring your vehicle's performance and longevity.

## Features

- ⚡ Next.js 14 with App Router
- 🔷 TypeScript for type safety
- 🎨 Tailwind CSS with custom color palette and dark mode
- 🔄 Redux Toolkit for state management
- 🔌 React Query for server state management
- 📡 Axios with interceptors for API calls
- 📝 React Hook Form with Zod validation
- 🌙 Dark mode with theme persistence
- 📱 Fully responsive design

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit, React Redux
- **Server State**: React Query (@tanstack/react-query)
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **Validation**: Zod
- **Fonts**: Chakra Petch (display), Mulish (sans-serif)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  ├─ app/                    # Next.js App Router pages
  │   ├─ auth/              # Authentication pages
  │   ├─ services/          # Service pages
  │   └─ ...
  ├─ components/
  │   ├─ ui/                # Reusable UI components
  │   ├─ layout/            # Layout components
  │   └─ auth/              # Auth-specific components
  ├─ features/              # Feature modules
  │   ├─ auth/
  │   └─ dashboard/
  ├─ store/                 # Redux store
  │   ├─ index.ts
  │   └─ slices/            # Redux slices
  ├─ services/              # API services
  ├─ lib/                   # Utilities and configurations
  ├─ constants/             # Constants and mock data
  ├─ types/                 # TypeScript type definitions
  └─ styles/               # Global styles
```

## Available Routes

### Public Routes
- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- `/blog` - Blog listing
- `/services/service1` - Service 1
- `/services/service2` - Service 2
- `/services/service3` - Service 3

### Auth Routes
- `/login` - Login page
- `/signup` - Sign up page
- `/forgot` - Forgot password
- `/auth/new-password` - Reset password
- `/verify` - Email verification
- `/auth/password-success` - Password reset success

### Protected Routes
- `/dashboard` - Dashboard
- `/profile` - User profile
- `/payments` - Payment history
- `/notifications` - Notifications

## Components

### UI Components

- **Button**: Variants (primary, secondary, ghost, danger), sizes (sm, md, lg), with icon support
- **Input**: With label, error message, and icon support
- **Icon**: SVG icon component

### Layout Components

- **MainLayout**: Main layout wrapper with Navbar and Footer
- **Navbar**: Responsive navigation with dropdown menu
- **Footer**: Site footer with links

## State Management

### Redux Slices

- **authSlice**: Manages authentication state (user, token, isAuthenticated)
- **uiSlice**: Manages UI state (theme, sidebar)

### Usage

```typescript
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '@/store/slices/uiSlice';

const theme = useSelector((state: RootState) => state.ui.theme);
const dispatch = useDispatch();
dispatch(toggleTheme());
```

## Dark Mode

Dark mode is managed by Redux and persists to localStorage. The theme is applied using Tailwind's `dark:` classes.

## API Configuration

Axios is configured with:
- Base URL from environment variables
- Request interceptor for adding auth tokens
- Response interceptor for error handling

## Form Validation

All forms use React Hook Form with Zod validation schemas.

## Building for Production

```bash
npm run build
npm start
```

## License

MIT

