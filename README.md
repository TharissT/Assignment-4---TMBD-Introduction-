# 🟪 React Router

## 🚀 Features

- Full multi-page SPA using React Router
- Nested routing for movie details, credits and reviews
- Dynamic API fetching for different views
- Search, pagination and trending filtering
- Reusable UI components across multiple routes
- Modal-based movie detail view with navigation control
- Deep linking to nested routes (credits, reviews)
- Query param based filtering for trending content
- Custom hook based API abstraction (`useTmdb`)
- Debounced search input for performance optimization

## 🧠 Key Concepts

### Client-Side Routing with React Router

The app uses `react-router-dom` to build a full SPA with multiple pages. Routes are defined centrally using `Routes` and `Route`, allowing navigation without page reloads.

Nested routes are used for movie details:

- `/movie/:id`
- `/movie/:id/credits`
- `/movie/:id/reviews`

This demonstrates how React can model hierarchical UI structures using routing.

### Nested Routing with `Outlet`

The `MovieView` uses `Outlet` to render nested routes like credits and reviews. This allows shared layout while swapping inner content dynamically.

### Dynamic Route Parameters

`useParams` is used to extract the movie `id` from the URL. This enables dynamic API requests based on the current route.

### Programmatic Navigation

`useNavigate` is used to control navigation in code, such as:

- Opening a modal
- Going back on close
- Navigating from a grid item click

This shows how navigation can be event-driven rather than link-based.

### Data Fetching with Custom Hooks

The `useTmdb` hook abstracts API logic and is reused across all views. It handles:

- Fetching data
- Passing query params
- Reacting to dependency changes

This demonstrates reusable data-fetching logic across multiple pages.

### Query Parameters and URL State

The `TrendingView` uses `useSearchParams` to store UI state in the URL. This allows:

- Shareable filter states
- Persistent UI configuration
- Clean separation of UI and data

### Controlled Pagination

Pagination is managed per view using `useState`. Each view independently controls its page state while reusing the same pagination component.

### Conditional Rendering Across Routes

Each view handles loading states independently and conditionally renders:

- Loading UI
- Empty states
- Content views

This ensures safe rendering based on API state.

### Component Reusability at Scale

Core UI components are reused across the app:

- `ImageGrid` for lists of movies and people
- `Pagination` for page navigation
- `SearchBar` for search input
- `ButtonGroup` for toggles
- `Modal` for overlays
- `Link` and `LinkGroup` for navigation

This shows a scalable component-driven architecture.

### Event-Driven UI Updates

User interactions such as:

- Clicking a movie
- Changing pages
- Switching trending interval
- Searching content

All trigger state updates and API re-fetches, demonstrating reactive UI design.

### URL-Driven State vs Local State

The app mixes:

- Local state (`useState`) for UI control like modals and pagination
- URL state (`useSearchParams`) for shareable filters

This shows advanced state management strategy.

### Type Safety with TypeScript

Strong typing is used across:

- API responses
- Component props
- Route params

This ensures predictable data flow and reduces runtime errors.

### Layout Composition with Shared Shells

`MainLayout` wraps multiple routes, allowing shared UI like navigation while rendering different pages inside.

## 🔧 Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios
- React Icons
