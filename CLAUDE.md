# Project Context: Everyday Utilities

## Overview
This is a learning project to practice vibe coding - building useful, deployable tools through iterative AI-assisted development. The result is a clean, minimal web app providing text tools and unit conversions that people use daily.

## Project Goals
- Practice vibe coding workflow with Claude Code
- Build something people actually want to use
- Keep it simple and deployable (static hosting like Netlify)
- Prioritize user privacy (all client-side, no data transmission)

## Tech Stack Decisions
- **Vanilla JavaScript** - No frameworks or dependencies
- **Static files only** - Three files: index.html, styles.css, app.js
- **Client-side processing** - Everything runs in the browser
- **Mobile responsive** - Works on all screen sizes

## Design Principles
- **Minimal and clean** - Simple, focused UI
- **No over-engineering** - Keep code straightforward
- **Progressive enhancement** - Start simple, add features incrementally
- **Privacy-first** - No data collection, storage, or transmission

## Code Style Preferences
- Use vanilla JavaScript (no frameworks)
- Clear, readable variable and function names
- Comments only where logic isn't self-evident
- Consistent formatting and spacing
- Mobile-first responsive design

## Project Structure
```
/
├── index.html      # Main HTML structure
├── styles.css      # All styling (CSS variables for theming)
├── app.js          # All JavaScript functionality
└── Readme.md       # Project documentation
```

## Current Features

### Text Tools
1. **Character/Word Counter** - Real-time stats as you type
2. **Case Converter** - 9 different case transformations
3. **Text Diff Checker** - Line-by-line comparison with visual highlighting

### Unit Converter
5 conversion categories with multiple units each:
- Temperature (Celsius, Fahrenheit, Kelvin)
- Length (metric and imperial)
- Weight (metric and imperial)
- Volume (cooking and metric measurements)
- File Size (Bytes to TB)

## UI/UX Patterns
- **Tab-based navigation** - Each tool in its own panel
- **Live updates** - Conversions and counts happen as you type
- **Copy functionality** - Easy clipboard copying where needed
- **Swap button** - Quick unit reversal in converter
- **Formula display** - Shows conversion result clearly

## Future Expansion Ideas
When adding new features, consider:
- More text tools (lorem ipsum, base64 encode/decode, hash generator)
- Additional conversions (currency with API, timezone, number bases)
- Developer tools (JSON formatter, JWT decoder, color picker)
- Export/download capabilities
- Keyboard shortcuts for power users
- Dark mode toggle

## Development Workflow
This project follows vibe coding principles:
1. Start with user need
2. Build minimal viable version
3. Test and refine
4. Add features incrementally
5. Keep deployment simple

## Important Notes
- All code is client-side JavaScript
- No build process required
- Works offline after initial load
- No external dependencies or CDNs
- Designed for static hosting (Netlify, Vercel, GitHub Pages)
