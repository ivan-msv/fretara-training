# Dropdown

Figma sources: [Dropdown Input](https://www.figma.com/design/8IMduhFcLt3Dbc9m7kkBJn?node-id=4579-614) and the complete [Dropdown set](https://www.figma.com/design/8IMduhFcLt3Dbc9m7kkBJn?node-id=5598-18223).

```tsx
<Dropdown label="Customer" options={customers} value={customer} onValueChange={setCustomer} />
<Dropdown label="Services" options={services} multiple value={selectedServices} onValueChange={setSelectedServices} />
<Dropdown label="Priority" options={priorities} indicator="radio" />
```

Options have unique `value` strings, text `label`s, and optional `disabled`. Single-select values are strings; multiple values are string arrays. Omit `value` for internal state, optionally initialized with `defaultValue`. An empty string/array clears selection. Use nonempty option values. Keep controlled values and the selection mode consistent for the component's lifetime. `label`, `placeholder`, `leadingIcon`, and native button attributes (including ARIA labels/descriptions and event handlers) are supported. `className` and `style` apply to the wrapper; its default width is 320px, constrained to its container. This is a selection control, not an automatically submitted form field; consume `onValueChange` in the containing form.

## Design inventory

- Input set: Dropdown and Date Picker × Default, Hover, Selected, Disabled, Filled × label on/off. Optional 20px leading icon, 20px chevron. Date Picker is a separate control and outside this dropdown implementation.
- Complete Dropdown set: single-select closed default, closed selected, disabled, open hovered; checkbox multi-select open hovered; radio single-select open hovered. Both single and multiple selection are defined.
- Trigger: 40px high, 320px wide; 12px horizontal/10px vertical Figma padding with inside stroke; 8px radius; label gap 6px; Heading/14-Bold label and Body/14-Medium value. White background, Gray 100 border, Gray 300 placeholder, Gray 700 value, Gray 500 chevron. Unlabelled empty trigger uses Gray 200 border. Hover uses Gray 50 background and Gray 300 border (Gray 200 without label). The input's “Selected” variant is a 2px Primary 300 focus treatment, independent of the “Filled” value state.
- Menu: 4px trigger gap, 8px radius, white, Gray 100 inside stroke; 8px vertical/6px horizontal padding and 2px item gap. Actual Figma shadow: y=4, blur=12, black at approximately 8% (generated context described a different CSS blur; actual node properties were used).
- Items: 10px horizontal/8px vertical padding, 6px radius, Body/14-Medium. Single-select rows are 36px; checkbox/radio rows are 40px. Selected text uses Primary 300; selected plain rows use Primary 50; hover uses Gray 50. Checkbox/radio indicators are 16px, with 4px/full radius and 1.5px Gray 300 border. Selected indicators use Primary 300 and a white checkmark/6px dot.

## Behavior and review notes

A custom combobox/listbox is required to reproduce Figma's checkbox/radio menus. Native button activation is preserved; Arrow keys, Home/End and typeahead navigate enabled options, Enter/Space select, Escape closes, and Tab closes while moving focus normally. Single selection closes; multi-selection stays open. Pointer selection retains trigger focus. Outside pointer interactions and blur dismiss the menu. The portal avoids ancestor overflow clipping and positions above the trigger when needed. Options expose selection and disabled semantics; checkbox/radio indicators are decorative, avoiding nested interactive controls within listbox options.

- Figma shows selected menu options while the trigger still shows placeholder copy. Runtime displays the actual selected labels; multiple labels are comma-separated and visually truncated when needed.
- The complete set dims the entire disabled control to 50%, unlike the input set alone. The complete set's treatment is used.
- Figma's Gray 300 placeholder has low contrast on white (approximately 2.6:1). It is preserved for design fidelity and needs design approval for a darker token. Disabled option styling is an extension using the same Gray 300 token; Figma has no separate disabled option variant.
- The existing Fretara CheckmarkIcon is reused as requested; Figma's checkbox control has a slightly different hand-authored tick. The existing Checkbox component contains a native input and label, so it is unsuitable inside a listbox option. No new icon asset was created.
- Keyboard focus uses the input set's blue focus treatment; pointer-open menus retain the complete set's neutral trigger. Hover is real CSS interaction, not a public visual-state prop.
- The existing Satoshi font asset is reused. No token or unrelated component files were changed.

Storybook includes interactive Playground Controls, all three patterns, opened menus, focused/filled/disabled states, optional labels/icons, disabled options, an empty list, a long list, a controlled example, and an executable keyboard selection story. Hover can be inspected by moving the pointer over any enabled trigger or option.
