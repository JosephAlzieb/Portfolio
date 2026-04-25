# Joseph Alzieb — Portfolio Website

A modern, responsive portfolio website built with **Next.js 16**, **Tailwind CSS v4**, **Framer Motion**, and **next-intl** for internationalization.


---


## Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/JosephAlzieb/Portfolio.git

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build

```bash
# Create production build (static export)
npm run build

# The static site will be generated in the `out/` directory
```

---

## Configuration

### Personal Data

All personal information is centralized in `src/lib/data.ts`. Update this file to change:

- Name, title, location, company
- Social links (GitHub, LinkedIn, website)
- Skills and tech stack
- Projects list
- Certifications
- Navigation items

### Translations

Translation files are located in `src/messages/`:

- `en.json` — English translations
- `de.json` — German translations

Add or modify translations for all UI text here.

### Theme Colors

Theme colors are defined as CSS custom properties in `src/app/globals.css`:

```css
:root {
  --primary: #3b82f6;    /* Main accent color */
  --secondary: #8b5cf6;  /* Secondary accent */
  --accent: #06b6d4;     /* Tertiary accent */
}

[data-theme="dark"] {
  /* Dark mode overrides */
}
```

### Contact Form

The contact form uses a placeholder Formspree action URL. To enable form submissions:

1. Create a free account at [Formspree](https://formspree.io)
2. Create a new form
3. Replace the `action` URL in `src/components/Contact.tsx` with your Formspree endpoint