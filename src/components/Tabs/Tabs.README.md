# Tabs

Source: Figma tab item `4627:6302` and tab list `4627:6303`.

```tsx
import { Tabs } from './Tabs'
import { DashboardIcon } from '../../icons/line'

<Tabs
  label="Order status"
  defaultValue="all"
  items={[
    { value: 'all', label: 'All Orders', count: 128, leadingIcon: <DashboardIcon />, content: <OrderList /> },
    { value: 'processing', label: 'Processing', count: 24, content: <ProcessingOrders /> },
  ]}
/>
```

Use unique item values. Omit `leadingIcon` or `count` to hide those elements; zero counts remain visible. Set `disabled` on unavailable items. `content` renders inside a linked tab panel and stays mounted while hidden.

Use `value` and `onValueChange` for controlled selection, or `defaultValue` for an initial uncontrolled selection. A missing, removed, or disabled selection falls back to the first enabled item. All-disabled and empty lists have no selection.

Arrow keys activate adjacent enabled tabs and wrap around; Home/End select the first/last enabled tab. Direction follows inherited RTL styling. Tab moves from the selected tab to its panel. Narrow lists scroll horizontally.

`Tabs` forwards native div attributes and refs to its root. `TabItem` forwards native button attributes and refs, with `selected`, `leadingIcon`, and `count` props. Standalone `TabItem` consumers own tablist semantics, panel relationships, and keyboard navigation. Hover and focus are CSS states.

Colors, typography, and radii reuse existing foundations. The count's 16px line height is component-specific, as specified in Figma; the existing 12px body style uses 18px.
