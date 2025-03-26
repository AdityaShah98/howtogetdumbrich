# How To Get Dumb Rich - Developer Guidelines

## Build/Test Commands
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run all tests
- `npm test -- --testPathPattern=ComponentName` - Run specific test
- `npm run lint` - Lint code (add script to package.json)

## Code Style
- Use TypeScript for all new files
- Functional components with hooks for React
- Styled-components for CSS
- Organize imports: React first, then external libraries, then local imports
- Consistent naming: PascalCase for components, camelCase for functions/variables
- Component file structure: imports, interfaces, styled-components, component, export
- Prefer explicit typing over inferred types where possible
- Use interfaces for component props
- Handle errors with try/catch in async functions
- Avoid any type and use proper TypeScript interfaces

## File Structure
- Components in `src/components/`
- Hooks in `src/hooks/`
- Types in `src/types/`
- Utils in `src/utils/`
- Data in `src/data/`