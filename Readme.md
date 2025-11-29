# Everyday Utilities

A collection of simple, client-side web utilities for everyday tasks. Built as a learning project to practice vibe coding with Claude Code.

## About

This is a lightweight, privacy-focused web app that provides commonly-needed text tools and unit conversions. Everything runs in your browser - no data is sent to any server or stored anywhere.

## Features

### Text Tools
- **Character & Word Counter** - Live statistics including character count (with/without spaces), word count, lines, sentences, and paragraphs
- **Case Converter** - Convert text between 9 different case styles:
  - lowercase, UPPERCASE, Title Case, Sentence case
  - camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE
- **Text Diff Checker** - Side-by-side comparison with visual highlighting of additions, deletions, and unchanged lines

### Unit Converter
- **Temperature** - Celsius, Fahrenheit, Kelvin
- **Length** - Millimeters, Centimeters, Meters, Kilometers, Inches, Feet, Yards, Miles
- **Weight** - Milligrams, Grams, Kilograms, Metric Tons, Ounces, Pounds, Stones
- **Volume** - Milliliters, Liters, Cubic Meters, Teaspoons, Tablespoons, Fluid Ounces, Cups, Pints, Quarts, Gallons
- **File Size** - Bytes, KB, MB, GB, TB

## Tech Stack

- Vanilla HTML, CSS, and JavaScript
- No dependencies or frameworks
- Fully responsive design
- Client-side only (no backend)

## Getting Started

### Prerequisites
- A modern web browser
- No dependencies to install

### Installation
```bash
# Clone the repo
git clone https://github.com/slourens/ClaudeCodeLearningSplour.git

# Navigate to the directory
cd ClaudeCodeLearningSplour
```

### Usage
Simply open `index.html` in your web browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or drag and drop the file into your browser.

## Deployment

Ready to deploy to Netlify, Vercel, or any static hosting service. Just upload these three files:
- `index.html`
- `styles.css`
- `app.js`

### Netlify Deployment
```bash
# Install Netlify CLI (optional)
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

Or simply drag and drop the files into the Netlify web interface.

## License

MIT (or your choice)