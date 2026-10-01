# Fretara Development Guidelines

## General workflow

- Treat Figma as the source of truth for UI implementation.
- When a task references a Figma design, use the connected Figma MCP to inspect it.
- Do not invent design values when they can be retrieved from Figma.
- Follow the existing project architecture and patterns before introducing new ones.
- Keep changes scoped to the requested task.
- Do not modify unrelated files.
- Avoid unnecessary dependencies and over-engineering.

## Design system

- Reuse existing Fretara design tokens whenever an appropriate token exists.
- Do not hardcode colors, typography, or corner-radius values when an existing token represents the same value.
- Do not create duplicate tokens.
- Do not create new design-system values unless they are supported by Figma or explicitly requested.
- Reuse the existing Fretara icon library instead of introducing external icon libraries.
- Monochrome icons should normally inherit color through `currentColor`.

## React components

- Use React + TypeScript.
- Prefer small, reusable component APIs.
- Do not blindly translate every Figma property into a React prop.
- Prefer semantic props over purely visual configuration when appropriate.
- Use native HTML behavior and attributes whenever possible.
- Use CSS pseudo-classes for interaction states such as hover, active, and focus rather than React state unless JavaScript state is genuinely required.
- Preserve accessibility and keyboard behavior.
- Forward appropriate native HTML attributes.
- Do not suppress focus indicators without providing an accessible replacement.

## Styling

- Follow the existing CSS architecture.
- Reuse existing color, typography, radius, and other foundation tokens.
- Avoid duplicated CSS.
- Do not introduce a new styling framework unless explicitly requested.

## Storybook

- New reusable components should have Storybook stories.
- Include meaningful variants and states.
- Include a Playground story when useful.
- Expose public component props through Controls where appropriate.
- Do not expose internal implementation details as controls.
- Use Storybook for visual verification against Figma.

## Validation

After implementation, run the relevant project checks:

- build / TypeScript
- lint
- Storybook build when Storybook or reusable components are affected

Fix failures caused by the current task before considering the work complete.

Review the final Git diff and check for:

- unrelated changes
- temporary testing code
- generated build output
- unnecessary dependencies
- duplicated tokens
- hardcoded values that should use existing tokens
- accessibility regressions

## Git

- Do not commit automatically after implementation.
- Leave changes uncommitted for visual/code review unless I explicitly ask you to commit.
- When asked to commit, stage only files belonging to the current task.
- Use a concise descriptive commit message.
- Do not push unless explicitly requested.

## Reporting

After completing an implementation, briefly report:

1. What changed
2. Files created or modified
3. Validation results
4. Any assumptions, discrepancies, or unresolved issues

Do not produce a long explanation when everything worked normally.
