import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox, type CheckboxState } from './Checkbox'
import './Checkbox.stories.css'

const states: CheckboxState[] = [
  'default', 'hover', 'pressed', 'focused', 'selected', 'selected-hover',
  'selected-pressed', 'disabled', 'disabled-selected', 'error',
]

const meta = {
  title: 'Fretara/Checkbox',
  component: Checkbox,
  parameters: { layout: 'padded' },
  argTypes: {
    state: { control: 'select', options: [undefined, ...states], description: 'Fixed Figma preview; leave unset for interactive use.' },
    labelText: { control: 'text' },
    descriptionText: { control: 'text' },
    errorText: { control: 'text' },
    showLabel: { control: 'boolean' },
    showDescription: { control: 'boolean' },
    showErrorMessage: { control: 'boolean' },
    showRequired: { control: 'boolean' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    labelText: 'Label', descriptionText: 'Helper text', errorText: 'Error message',
    showLabel: true, showDescription: false, showErrorMessage: false, showRequired: false,
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const Default: Story = { args: { state: 'default' } }
export const Hover: Story = { args: { state: 'hover' } }
export const Pressed: Story = { args: { state: 'pressed' } }
export const Focused: Story = { args: { state: 'focused' } }
export const Selected: Story = { args: { defaultChecked: true } }
export const SelectedHover: Story = { args: { state: 'selected-hover' } }
export const SelectedPressed: Story = { args: { state: 'selected-pressed' } }
export const Disabled: Story = { args: { disabled: true } }
export const DisabledSelected: Story = { args: { disabled: true, defaultChecked: true } }
export const Error: Story = { args: { invalid: true } }
export const WithDescription: Story = { args: { showDescription: true } }
export const Required: Story = { args: { required: true, showDescription: true } }
export const WithErrorMessage: Story = { args: { invalid: true, showErrorMessage: true } }
export const WithoutLabel: Story = { args: { showLabel: false } }

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="checkbox-gallery" aria-label="All Figma checkbox variants">
      {states.map((state) => (
        <div className="checkbox-gallery__column" key={state}>
          <span className="checkbox-gallery__heading body-12-medium">{state.replaceAll('-', ' ')}</span>
          <Checkbox state={state} />
          <Checkbox state={state} showRequired showDescription />
          <Checkbox state={state} showRequired showDescription showErrorMessage />
          <Checkbox state={state} showLabel={false} />
        </div>
      ))}
    </div>
  ),
}
