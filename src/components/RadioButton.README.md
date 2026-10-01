# RadioButton

Implements [Figma node 4606:2068](https://www.figma.com/design/8IMduhFcLt3Dbc9m7kkBJn/?node-id=4606-2068).

```tsx
import { RadioButton } from './RadioButton'

<fieldset>
  <legend>Practice frequency</legend>
  <RadioButton name="frequency" value="daily" labelText="Daily" defaultChecked />
  <RadioButton name="frequency" value="weekly" labelText="Weekly" />
</fieldset>
```

Native input props and refs are forwarded. Use a shared `name` for mutual exclusion and native arrow-key navigation. Both `checked`/`onChange` and `defaultChecked` are supported. Use a fieldset and legend to label a group.

Optional label, helper, error, and required-marker props follow Checkbox conventions. `required` enables native validation; `showRequired` only displays a marker. `invalid` sets `aria-invalid`. Visible helper/error text is linked through `aria-describedby`, preserving caller-supplied IDs. For a hidden label, provide meaningful `labelText` or `aria-label`.

Interaction states use CSS pseudo-classes. Fixed hover/pressed previews are confined to Storybook. Keyboard focus adds a visible token-based outline because Figma's focused shadow has zero spread. Forced-colors mode uses native controls. Disabled colors and opacity follow Figma, including its low-contrast helper text. The existing Satoshi font asset is reused without duplicating the file.
