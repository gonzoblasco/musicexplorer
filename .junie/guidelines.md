# MusicExplorer Project Guidelines

## Project Overview

MusicExplorer is a modern web application built with Next.js 15 and TypeScript that allows users to explore information
about music artists, their albums, and songs using TheAudioDB API. The application provides a responsive and intuitive
interface for music discovery.

### Key Features

- **Artist Search**: Find detailed information about music artists
- **Artist Profiles**: View biographies, country of origin, formation year, and social media links
- **Discography Exploration**: Browse complete albums and their details
- **Song Listings**: Discover tracks from each album with duration and music video links
- **Dark/Light Mode**: Adaptive interface with system theme preference support
- **Responsive Design**: Optimized experience on mobile, tablet, and desktop devices

## Technical Architecture

### Frontend Stack

- **Next.js 15**: React framework with App Router for file-based routing and Server Components
- **React 19**: UI library with the latest hooks and patterns
- **TypeScript**: Static typing for improved safety and developer experience
- **Tailwind CSS 4**: Utility-first CSS for fast and consistent styling
- **TanStack Query**: Server state management, caching, and data updates
- **next-themes**: Dark/light mode integration with persistence

### Project Structure

```
music-explorer/
├── app/                   # Pages and routes (Next.js App Router)
├── components/            # Reusable components
│   ├── album/             # Album-related components
│   ├── artist/            # Artist-related components
│   ├── common/            # Common components (errors, no results)
│   ├── home/              # Home page components
│   ├── layout/            # Structure components (header, footer)
│   ├── search/            # Search components
│   └── ui/                # Basic UI components (buttons, inputs)
├── hooks/                 # Custom hooks for reusable logic
├── lib/                   # Utilities and services
│   ├── api/               # Functions for API interactions
│   └── utils/             # General utilities
├── public/                # Static files
├── types/                 # TypeScript type definitions
└── __tests__/             # Unit and component tests
```

## Development Guidelines

### Code Style and Conventions

1. **TypeScript**: Use strong typing for all components, functions, and variables
2. **Component Structure**:
    - Use Server Components by default unless client-side interactivity is needed
    - Follow the Container/Presentational pattern for better maintainability
    - Keep components focused on a single responsibility
3. **Naming Conventions**:
    - Use PascalCase for components and their files
    - Use camelCase for functions, variables, and custom hooks
    - Use kebab-case for CSS class names
4. **State Management**:
    - Use TanStack Query for server state
    - Use React's built-in state management (useState, useReducer) for UI state
    - Create custom hooks to encapsulate complex state logic

### Testing Strategy

1. **Unit Tests**: For pure functions and hooks
2. **Component Tests**: For rendering and behavior verification
3. **Integration Tests**: For validating component interactions
4. **End-to-End Tests**: For testing complete user flows

All tests should be placed in the `__tests__` directory, mirroring the structure of the source code.

### Performance Considerations

1. Use Next.js Image component for optimized image loading
2. Implement Suspense boundaries for progressive component loading
3. Apply debouncing for search inputs to reduce unnecessary API requests
4. Use memoization to prevent unnecessary re-renders

### API Integration

The application uses TheAudioDB API, which has some limitations:

- Limited search to certain artists
- Daily query limits
- Some premium features not available

When developing new features, consider these limitations and implement appropriate error handling and fallbacks.

## Contribution Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Ensure all tests pass before submitting a Pull Request.

## Future Development

Planned features for future versions:

- PWA implementation for offline use
- Integrated music player with song previews
- Authentication for saving favorite artists
- Song lyrics view
- Advanced album and song filtering
- Integration with streaming services

When implementing new features, consider how they align with the existing architecture and user experience.