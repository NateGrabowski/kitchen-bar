# Code Style and Conventions

## General
- **Language**: JavaScript/JSX (no TypeScript)
- **Framework**: React with functional components and hooks
- **No semicolons**: Codebase omits semicolons
- **Single quotes**: For strings in JavaScript
- **2-space indentation**

## React Patterns
- Functional components with `export default function ComponentName()`
- `useState` for local state management
- `lazy` and `Suspense` for code splitting
- Inline styles (no CSS files)

## File Structure
- Visualization components in `visualization/jsx/`
- Main app in `src/`
- Documentation in `docs/`
- Archived versions in `archive/` subdirectories

## Naming
- Components: PascalCase (`App.jsx`)
- Visualization files: kebab-case with version (`kitchen-bar-planner-v4.jsx`)
- Config objects use camelCase keys

## Comments
- Use comments for design parameters and calculated values
- Document dimension relationships and constraints
