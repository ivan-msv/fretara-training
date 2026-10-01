import { useId, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioButton } from './RadioButton'
import './RadioButton.stories.css'

const meta = {
  title: 'Fretara/RadioButton',
  component: RadioButton,
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
  args: { labelText: 'Label' },
} satisfies Meta<typeof RadioButton>

export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {}
export const Selected: Story = { args: { defaultChecked: true } }
export const Disabled: Story = { args: { disabled: true } }
export const DisabledSelected: Story = { args: { disabled: true, defaultChecked: true } }
export const WithDescription: Story = { args: { showDescription: true } }
export const Required: Story = { args: { required: true, showDescription: true } }
export const Error: Story = { args: { invalid: true, showErrorMessage: true } }
export const WithoutLabel: Story = { args: { showLabel: false, 'aria-label': 'Choose option' } }
export const Focused: Story = {
  play: async ({ canvasElement }) => { canvasElement.querySelector('input')?.focus() },
}

function GroupExample() {
  const name = useId()
  const [value, setValue] = useState('daily')
  return (
    <fieldset className="radio-group">
      <legend className="body-14-medium">Practice frequency</legend>
      {['daily', 'weekly', 'monthly'].map((option) => (
        <RadioButton key={option} name={name} value={option} labelText={option}
          checked={value === option} onChange={(event) => setValue(event.target.value)} />
      ))}
    </fieldset>
  )
}
export const Group: Story = { render: () => <GroupExample /> }

const states = ['default', 'hover', 'pressed', 'focused', 'selected', 'selected-hover',
  'selected-pressed', 'disabled', 'disabled-selected', 'error']

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="radio-gallery" aria-label="All Figma radio button variants">
      {states.map((state) => {
        const props = { checked: state.includes('selected'), disabled: state.startsWith('disabled'),
          invalid: state === 'error', readOnly: true }
        return (
          <div className="radio-gallery__column" data-preview={state} key={state}>
            <span className="radio-gallery__heading body-12-medium">{state.replaceAll('-', ' ')}</span>
            <RadioButton {...props} />
            <RadioButton {...props} showRequired showDescription />
            <RadioButton {...props} showRequired showDescription showErrorMessage />
            <RadioButton {...props} showLabel={false} />
          </div>
        )
      })}
    </div>
  ),
}
