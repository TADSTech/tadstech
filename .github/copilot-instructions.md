# Copilot Instructions for TADSTech Portfolio

## Project Overview

This is a modern portfolio website for Michael Tunwashe (TADS), showcasing data science projects, full-stack development work, and professional experience. The site is built with React, TypeScript, and Vite, emphasizing performance, accessibility, and clean design.

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite with SWC for fast builds
- **Styling**: TailwindCSS 4.x + custom CSS
- **Routing**: React Router DOM v7
- **Icons**: FontAwesome React
- **Hosting**: Firebase (tadstech.web.app)

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production (runs TypeScript compiler first)
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

## Code Style & Conventions

### TypeScript
- Use TypeScript for all new files
- Define interfaces for props and data structures
- Prefer `React.FC` for functional components
- Use explicit types rather than `any` (avoid eslint disables when possible)

### React Patterns
- Functional components with hooks (useState, useEffect, etc.)
- Custom hooks for shared logic
- Use React.memo for performance optimization when needed
- Keep components focused and single-responsibility

### File Organization
```
src/
├── components/      # Reusable UI components
├── pages/          # Page-level components (routes)
├── assets/         # Images, icons, static files
└── App.tsx         # Main application component
```

### Styling
- Use TailwindCSS utility classes where appropriate
- Component-specific styles in separate CSS files (e.g., `ComponentName.css`)
- Follow existing dark mode patterns using CSS variables and `.dark` class
- Maintain responsive design (mobile-first approach)
- Use semantic HTML elements for accessibility

### Naming Conventions
- Components: PascalCase (e.g., `GitHubPage.tsx`, `ServicesPreview.tsx`)
- CSS files: lowercase with component name (e.g., `github.css`, `servicespreview.css`)
- Interfaces: PascalCase with descriptive names (e.g., `GitHubRepo`, `ServiceModel`)
- Variables/Functions: camelCase

## SEO & Meta Tags
- Use React Helmet for page-specific meta tags
- Include title, description, keywords, and Open Graph tags
- Ensure canonical URLs are set correctly
- Include author and social meta information

## API Integration
- GitHub API is used to fetch repository data (unauthenticated)
- Handle loading, error, and success states properly
- Include retry mechanisms for failed requests
- No authentication tokens required for public repo data

## Accessibility
- Use semantic HTML (header, nav, section, article, footer)
- Include ARIA labels for interactive elements
- Ensure keyboard navigation works properly
- Maintain proper heading hierarchy (h1, h2, h3)
- Provide alt text for images

## Performance
- Lazy load images and heavy components when appropriate
- Optimize bundle size (Vite handles tree-shaking)
- Use React.memo for expensive re-renders
- Minimize API calls (cache when possible)

## Important Notes
- The owner is transitioning from Flutter/Dart to React/TypeScript
- Focus on data science and full-stack development projects
- Professional tone with emphasis on technical expertise
- All repositories under @tadstech are open source
- Email contact: motrenewed@gmail.com

## Common Tasks

### Adding a New Page
1. Create component in `src/pages/`
2. Add route in `App.tsx` 
3. Include React Helmet for SEO
4. Add navigation link if needed
5. Create corresponding CSS file

### Adding a New Component
1. Create in `src/components/`
2. Define TypeScript interface for props
3. Export as default
4. Add CSS file if needed
5. Ensure responsive design

### Modifying Styles
1. Check if TailwindCSS utility can be used
2. Use component-specific CSS file for custom styles
3. Maintain dark mode compatibility
4. Test on different screen sizes

## Don't
- Don't use `any` type without eslint-disable comment explanation
- Don't break existing dark mode functionality
- Don't remove accessibility features
- Don't add dependencies without good reason
- Don't modify build configuration without testing
- Don't ignore ESLint warnings (fix them properly)

## Testing
- Currently no automated testing framework (manual testing only)
- Test all changes in both light and dark modes
- Verify responsive behavior on mobile, tablet, and desktop
- Check browser console for errors
- Test API integrations thoroughly
