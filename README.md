# Fretara UI

Fretara UI is a React and TypeScript component library built from the Fretara Figma design system. The project turns design specifications into reusable, accessible components and documents their variants and interaction states in Storybook.

[Explore the Storybook catalog](https://ivan-msv.github.io/fretara-training/)

## Project goals

- Reproduce the Fretara visual language accurately from Figma.
- Build reusable components with small, semantic APIs.
- Preserve native browser behavior, keyboard support, and accessible markup.
- Centralize color, typography, and corner-radius values as design tokens.
- Use Storybook as the component catalog and visual review environment.

## Implemented so far

| Area | Components and assets |
| --- | --- |
| Actions | Button |
| Form controls | Checkbox, Dropdown, Input, Radio Button |
| Navigation | Navbar, Sidebar, Sidebar Item, Tabs, Tab Item, Page Header |
| Feedback | Message, Status Badge, Toast |
| Data display | Table, toolbar, pagination, and reusable cell content |
| Foundations | Color tokens, typography styles, corner-radius stories, and Satoshi Variable font |
| Icons | Reusable line and fill React icon sets with a Storybook catalog |

The components include meaningful states and variants such as disabled, focused, selected, validation, loading/empty data, controlled and uncontrolled values, single and multiple selection, and responsive layouts where applicable.

## Latest additions

- **Navbar:** workspace selection using the existing Dropdown, controlled and uncontrolled selection, configurable labels, and a logout callback with a disabled state. Stories cover the open workspace menu, logout focus and disabled states, and a narrow layout.
- **Sidebar:** expanded and collapsed navigation, active links, nested navigation items, and a configurable navigation label. Collapse state is controlled through `collapsed` and `onCollapsedChange`; the Interactive story demonstrates the state wiring.
- **Status Badge:** consolidated icon rendering with a default bell icon and support for a custom `leadingIcon`.
- **Published Storybook:** a GitHub Actions workflow builds and deploys the component catalog to GitHub Pages.

## Accessibility and interaction

The component APIs build on native HTML attributes and behavior. Current accessibility work includes:

- Keyboard navigation for dropdowns and tabs.
- Appropriate labels, descriptions, validation attributes, and focus states for form controls.
- Semantic tab, table, pagination, status, alert, and live-region markup.
- Sidebar navigation labels, `aria-current` for active links, accessible labels for collapsed items, and labeled expand/collapse buttons.
- Icon colors based on `currentColor` where appropriate.
- Storybook interaction scenarios for behavior that cannot be verified by a static preview alone.

## Tech stack

- React 19
- TypeScript 6
- Vite 8
- Storybook 10
- ESLint 10
- Plain CSS with shared design tokens

## Getting started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm

### Installation

```bash
git clone git@github.com:ivan-msv/fretara-training.git
cd fretara-training
npm install
```

### Run Storybook

Storybook is the main workspace for exploring and reviewing the component library.

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) in your browser.

### Storybook deployment

The [Deploy Storybook workflow](.github/workflows/deploy-storybook.yml) runs on pushes to `main` and can also be started manually through GitHub Actions. It uses Node.js 24, installs dependencies with `npm ci`, builds Storybook, and deploys `storybook-static` to GitHub Pages.

The repository's Pages source must be set to **GitHub Actions**. The catalog is published at [ivan-msv.github.io/fretara-training](https://ivan-msv.github.io/fretara-training/).

### Run the Vite app

```bash
npm run dev
```

Open the local URL printed by Vite. The app currently provides a lightweight project entry point; component development happens primarily in Storybook.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create a production build |
| `npm run lint` | Run ESLint across the project |
| `npm run storybook` | Start Storybook on port 6006 |
| `npm run build-storybook` | Create a static Storybook build |
| `npm run preview` | Preview the Vite production build locally |

## Project structure

```text
Fretara/
├── .github/workflows/      # Storybook build and GitHub Pages deployment
├── .storybook/             # Storybook configuration and global preview styles
├── src/
│   ├── components/         # Components, styles, stories, and component notes
│   ├── icons/              # Line and fill icon components and icon catalog
│   ├── styles/             # Shared design tokens and typography utilities
│   ├── App.tsx             # Vite application entry view
│   └── main.tsx            # React bootstrap
├── AGENTS.md               # Project development guidelines
└── package.json            # Scripts and dependencies
```

Most reusable components keep their implementation, styles, stories, and supporting documentation together:

```text
src/components/ComponentName/
├── ComponentName.tsx
├── ComponentName.css
├── ComponentName.stories.tsx
└── ComponentName.README.md  # Included when extra usage notes are useful
```

## Working with the design system

Figma is the source of truth for component appearance and supported variants. Before adding new visual values, check the shared files in `src/styles` and reuse an existing token whenever it represents the design. Reusable components should include Storybook stories covering their meaningful variants and states.

Before opening a review, run:

```bash
npm run lint
npm run build
npm run build-storybook
```

## Current status

This is an actively developed training project. The core foundations and an initial set of reusable components are complete; additional Fretara components and composed product screens can be added incrementally from Figma.
