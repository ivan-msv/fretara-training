# Button

Icon-only buttons, and buttons whose children have no readable text, must provide an `aria-label`. Icons are decorative and hidden from assistive technology.

```tsx
<Button leadingIcon={<PlusIcon />} aria-label="Add quote" />
```

Use native `disabled`, `type`, and event attributes. Keyboard focus uses the primary foundation token. Storybook includes an interactive Playground, Icon Only, Disabled, and an All Variants matrix using real CSS pseudo-state rules.
