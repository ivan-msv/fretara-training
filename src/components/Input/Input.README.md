# Input

Source: [Figma Input Field, 4573:599](https://www.figma.com/design/8IMduhFcLt3Dbc9m7kkBJn/Fretara--training-?node-id=4573-599).

`Input` forwards native input props and refs to its `<input>`, including `className`, `style`, `type`, `value`, `defaultValue`, validation attributes, and event handlers. Omit `label` and provide `aria-label` or `aria-labelledby` for the label-off variant. `leadingIcon` is decorative; `unit` is included in the accessible description.

Native `required` also displays a decorative red star beside the label. Playground provides label, leading-icon and unit visibility toggles; these are story controls, not extra component props.

Figma Default/Hover/Selected/Filled/Disabled map to native empty, hover, focus, value, and disabled behavior. `status` supports `error`, `warning`, `success`, and `not-enquiry`. Error sets `aria-invalid`; Not Enquiry adds the existing red information icon beside the label. It does not imply disabled or read-only behavior. Consumer-provided `aria-describedby` is preserved alongside unit/status descriptions.

The set has no helper-text or trailing-icon variant; its trailing content is a unit. External descriptions can be linked with `aria-describedby`. No artificial interaction-state props are exposed. Focus remains visible for every status, and disabled overrides status field colors. These combinations extend the individual Figma states for usable native interactions.

Dimensions: 320px width (shrinking to available space), 40px field, 4px label gap, 8px icon/unit gap, 20px leading icon and 16px information icon. Existing typography, color and radius tokens and the local Satoshi font asset are reused. Figma's gray-300 placeholder/unit color is retained, though its contrast on white is below WCAG AA.

Storybook includes each state, label-off variants, icon/unit examples, a Playground, and interaction checks for controlled typing, reset, form submission data, validation, descriptions and keyboard navigation. Hover and Focused use actual browser interaction.
