# Checkbox

Implements Figma component set `4606:1974` in `obfA79k84IcRerE44fUqL7`.

```tsx
import { Checkbox } from './Checkbox'

<Checkbox labelText="Remember me" name="remember" defaultChecked />
<Checkbox labelText="Accept terms" required showDescription descriptionText="Required to continue." />
<Checkbox labelText="Accept terms" invalid showErrorMessage errorText="Please accept the terms." />
```

Use native `checked` / `onChange` for controlled inputs, or `defaultChecked` for uncontrolled inputs. Native input attributes and refs are forwarded. `className` styles the outer label. Helper and error text are associated with the input using `aria-describedby`; hidden labels retain an accessible name.

`state` provides fixed previews of all ten Figma variants: default, hover, pressed, focused, selected, selected-hover, selected-pressed, disabled, disabled-selected, and error. Omit it for interactive use. `showRequired` controls the visual marker; `required` enables native form validation and also displays the marker.

Matches the 16px control, 1.5px inside border, 4px radius, 8px content gap, 2px vertical padding and content spacing, text styles, and 50% disabled opacity. Selected controls use the four original Figma SVGs at their native 16×16 dimensions. The locally installed Satoshi variable font is bundled for this component, under a scoped font-family alias.

Figma's Focused variant specifies a zero-width shadow. Its static preview preserves this; actual keyboard focus adds a visible 2px outline. Text wraps when constrained. Forced-color mode uses the native checkbox.

Storybook: **Fretara / Checkbox**, including an All Variants gallery and optional-content examples.
