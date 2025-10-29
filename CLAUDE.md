# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite application demonstrating advanced Redux Toolkit patterns including:
- Entity Adapters for normalized state management
- Custom middleware for logging, performance monitoring, and authorization
- Role-based access control (admin/user)
- Multiple feature slices with cross-slice communication

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production (runs TypeScript compiler first, then Vite build)
npm run build

# Run ESLint on all files
npm run lint

# Preview production build
npm run preview
```

## Architecture

### State Management (Redux Toolkit)

The application uses Redux Toolkit with a centralized store configuration in `src/store.ts`. The store is organized into feature slices:

- **auth**: User authentication state (name, admin role)
- **admin**: Admin-specific state and functionality
- **todos**: Todo items management
- **tasks**: Task management
- **catalog**: Main catalog items using Entity Adapter for normalized state
- **ui**: UI-related state (theme, etc.)

### Middleware Stack

Custom middleware is applied in this order (see `src/store.ts:21-25`):
1. **authGuardMiddleware**: Blocks admin/catalog/todo mutations if user is not admin
2. **loggerMiddleware**: Logs actions starting with `admin/` or `auth/`
3. **performanceMiddleware**: Monitors action performance

### Entity Adapter Pattern

The `catalogSlice` (`src/features/catalog/catalogSlice.ts`) demonstrates Entity Adapter usage:
- Items are normalized by ID in `entities` and `ids` arrays
- Auto-sorted by `title` field
- Provides built-in selectors: `selectAll`, `selectById`, `selectTotal`
- Supports CRUD operations: `addItem`, `removeItem`, `toggleItem`, `setItems`

### Custom Hooks

Type-safe Redux hooks are exported from `src/hook.ts`:
- `useAppDispatch()`: Typed dispatch hook
- `useAppSelector()`: Typed selector hook

Use these instead of raw `useDispatch` and `useSelector` for proper TypeScript inference.

### Cross-Slice Communication

Slices respond to external actions via `extraReducers`:
- `catalogSlice` listens for `ui/resetAll` action to clear all items (see `src/features/catalog/catalogSlice.ts:56-59`)

### Authorization Pattern

The `authGuardMiddleware` (`src/middlewares/authGuard.ts`) intercepts actions and blocks them if the user lacks admin privileges. It checks:
- `catalog/addItem` - Requires admin to add items to catalog
- `catalog/removeItem` - Requires admin to remove items from catalog

The middleware properly uses `store.getState()` to access current state and `isAction()` to validate action types.

### Component Organization

Components are organized in `src/components/`:
- Feature-specific components (e.g., `CatalogList`, `CatalogControls`, `RoleToggle`)
- Some components use CSS modules (`.module.css` files)

## TypeScript Configuration

The project uses three TypeScript configs:
- `tsconfig.json`: Base configuration
- `tsconfig.app.json`: Application code settings
- `tsconfig.node.json`: Build tooling settings

## Project Structure Notes

- Old example components (Counter, Profile, Cart) have been moved to `src/_old_examples/` for reference
- These examples are excluded from TypeScript compilation and ESLint via `tsconfig.app.json` and `eslint.config.js`
- The main application focuses on the Catalog feature with role-based access control

## Adding New Features

When adding a new feature slice:
1. Create slice in `src/features/<feature-name>/<feature-name>Slice.ts`
2. Export actions, selectors, and default reducer
3. Add reducer to store in `src/store.ts`
4. If using Entity Adapter, export custom selectors using `getSelectors()`
5. Create corresponding components in `src/components/`
6. If admin-only actions, update `authGuardMiddleware` logic

## Code Patterns

- Use `createSlice` for all Redux state
- Use `PayloadAction<T>` for typed action payloads
- Export selectors alongside slice actions
- Use Entity Adapter for collections with CRUD operations
- Apply Immer-style mutations inside reducers (state is a draft)
