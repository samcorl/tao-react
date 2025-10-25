# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React web application that displays the Tao Te Ching, allowing users to view random chapters or search through all 81 chapters. The application is built as a single-page app for displaying ancient Chinese philosophical text with modern web interface.

## Tech Stack

- **React 18** with functional components and hooks
- **Kendo UI React** for UI components (dropdowns, autocomplete, cards)
- **CSS Modules** for component-scoped styling
- **Create React App** (react-scripts) for build tooling
- **Docker** with multi-stage build for deployment
- **Nginx** for production serving

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (irreversible)
npm run eject
```

## Application Architecture

### Main Components

- **App** (`src/index.js`): Root component with random chapter trigger
- **ChapterViewer** (`src/components/ChapterViewer.js`): Main container managing chapter state and localStorage persistence
- **ChapterSelector** (`src/components/ChapterSelector.js`): Dropdown for selecting chapters 1-81
- **ChapterSearch** (`src/components/ChapterSearch.js`): Autocomplete search through chapter content
- **ChapterText** (`src/components/ChapterText.js`): Renders chapter text with search highlighting

### Data Structure

- **Text Data**: `src/tao.json` contains 81 chapters as arrays of strings
- **Data Export**: `src/tao.js` exports the JSON data as default export
- **Chapter Format**: Each chapter is an array where empty strings represent paragraph breaks

### State Management

- Uses React hooks (useState, useEffect, useMemo, useCallback)
- localStorage persistence for current chapter
- Search term highlighting across components
- Debounced random chapter selection (500ms minimum)

### Styling

- CSS Modules with `.module.css` files
- Component-scoped styles prevent global conflicts
- Kendo UI theme applied globally in `src/index.js`
- Dark theme with black background set in `public/index.html`

## Deployment

### Docker Deployment
- Multi-stage Dockerfile (Node.js build + Nginx serve)
- Production optimized with gzip, caching, security headers
- Run `./deploy.sh` for local Docker deployment on port 3000

### Google Cloud Run
- Serverless deployment with automatic scaling
- Run `./deploy-gcp.sh` for cloud deployment
- Free tier eligible for personal use

## File Structure

```
src/
├── components/           # React components with CSS modules
│   ├── ChapterViewer.js   # Main chapter container
│   ├── ChapterSelector.js # Chapter dropdown
│   ├── ChapterSearch.js   # Search functionality  
│   └── ChapterText.js     # Text rendering
├── tao.json             # Chapter text data (81 chapters)
├── tao.js               # Data export module
├── index.js             # App entry point
└── index.css            # Global styles
```

## Key Development Notes

- **CSS Modules**: All component styles use CSS modules pattern
- **Kendo UI**: Components use Kendo React library with default theme
- **Accessibility**: Components include ARIA labels and semantic HTML
- **Performance**: Uses React.memo and useMemo for optimization
- **Search**: Full-text search across all chapters with highlighting
- **Persistence**: Current chapter saved to localStorage
- **Responsive**: Mobile-friendly interface

## Production Considerations

- Built with Create React App optimizations
- Static assets cached for performance
- Security headers configured in nginx
- Docker health checks included
- Memory efficient (256MB container limit)