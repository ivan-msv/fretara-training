# Statuses and badges

Source: [Figma Status/Badge, 4601:2616](https://www.figma.com/design/obfA79k84IcRerE44fUqL7/Fretara--NEW-?node-id=4601-2616).

```tsx
import { StatusBadge } from './StatusBadge'
import { CheckmarkCircleFillIcon } from '../icons/fill'

<StatusBadge status="success" label="Approved" />
<StatusBadge type="badge" status="warning" label="Pending" />
<StatusBadge status="success" label="Completed" showDot={false}
  leadingIcon={<CheckmarkCircleFillIcon />} />
```

- `type`: `status` (default, 26px high) or `badge` (22px high).
- `status`: `default`, `success`, `warning`, `error`, `neutral`, `blue`, or `disabled`.
- `label`: visible text, defaults to `Label`.
- `showDot`: defaults to true; applies only to Status.
- `showLeadingIcon`: defaults to true; uses the exact Figma bell unless `leadingIcon` is supplied.
- Native span attributes and `className` are forwarded. These are informational labels, not buttons; `disabled` is a visual variant. Add `role="status"` only when announcing a live status change is appropriate.

Storybook: **Fretara / Statuses and Badges**, including the complete 14-variant gallery and icon controls.

The SVGs in `assets/status-badge` are locally stored Figma exports: 6×6 dots and 16×16 bells. The blue variant intentionally preserves Figma's #0057ff foreground, #d7ebff background, and #cadaf9 border, rather than changing the foundation's --blue token. Strokes are inset to preserve Figma dimensions.

Typography reuses `heading-12-bold`. Like existing components, it requires the consuming app to provide Satoshi Variable; this repository currently does not bundle that font. The disabled palette follows Figma, including its reduced text contrast.
