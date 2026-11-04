import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox, type CheckboxProps } from './Checkbox'
import './Checkbox.stories.css'

const states = [
  'default', 'hover', 'pressed', 'focused', 'selected', 'selected-hover',
  'selected-pressed', 'disabled', 'disabled-selected', 'error',
] as const

const meta = {
  title: 'Fretara/Checkbox',
  component: Checkbox,
  parameters: { layout: 'padded' },
  argTypes: {
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
export const Default: Story = { args: {} }
export const Hover: Story = { parameters: { pseudo: { hover: true } } }
export const Pressed: Story = { parameters: { pseudo: { active: true } } }
export const Focused: Story = { parameters: { pseudo: { focusVisible: true } } }
export const Selected: Story = { args: { defaultChecked: true } }
export const SelectedHover: Story = { args: { defaultChecked: true }, parameters: { pseudo: { hover: true } } }
export const SelectedPressed: Story = { args: { defaultChecked: true }, parameters: { pseudo: { active: true } } }
export const Disabled: Story = { args: { disabled: true } }
export const DisabledSelected: Story = { args: { disabled: true, defaultChecked: true } }
export const Error: Story = { args: { invalid: true } }
export const WithDescription: Story = { args: { showDescription: true } }
export const Required: Story = { args: { required: true, showDescription: true } }
export const WithErrorMessage: Story = { args: { invalid: true, showErrorMessage: true } }
export const WithoutLabel: Story = { args: { showLabel: false } }

export const AllVariants: Story = {
  parameters: { controls: { disable: true }, pseudo: { hover: ['.checkbox-preview--hover', '.checkbox-preview--selected-hover'], active: ['.checkbox-preview--pressed', '.checkbox-preview--selected-pressed'], focusVisible: ['.checkbox-preview--focused input'] } },
  render: () => (
    <div className="checkbox-gallery" aria-label="All Figma checkbox variants">
      {states.map((state) => (
        <div className="checkbox-gallery__column" key={state}>
          <span className="checkbox-gallery__heading body-12-medium">{state.replaceAll('-', ' ')}</span>
          <Checkbox {...previewProps(state)} />
          <Checkbox {...previewProps(state)} showRequired showDescription />
          <Checkbox {...previewProps(state)} showRequired showDescription showErrorMessage />
          <Checkbox {...previewProps(state)} showLabel={false} />
        </div>
      ))}
    </div>
  ),
}

function previewProps(state: typeof states[number]): CheckboxProps {
  return {
    className: `checkbox-preview--${state}`,
    defaultChecked: state.includes('selected'),
    disabled: state.startsWith('disabled'),
    invalid: state === 'error',
  }
}
