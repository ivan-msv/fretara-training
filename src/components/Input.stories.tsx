import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { useState } from 'react'
import { SearchIcon } from '../icons/line/SearchIcon'
import { Input, type InputProps } from './Input'
import './Input.stories.css'

type InputStoryArgs = InputProps & {
  showLabel?: boolean
  showLeadingIcon?: boolean
  showUnit?: boolean
}

const meta = {
  title: 'Fretara/Input',
  component: Input,
  parameters: { layout: 'padded' },
  args: { label: 'Label', placeholder: 'Enter value...' },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    defaultValue: { control: 'text' },
    status: { control: 'select', options: [undefined, 'error', 'warning', 'success', 'not-enquiry'] },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
    unit: { control: 'text' },
    leadingIcon: { control: 'select', options: ['none', 'search'], mapping: { none: undefined, search: <SearchIcon /> } },
  },
} satisfies Meta<InputStoryArgs>

export default meta
type Story = StoryObj<InputStoryArgs>

export const Playground: Story = {
  args: { showLabel: true, showLeadingIcon: false, showUnit: false, unit: 'kg', required: false },
  argTypes: {
    showLabel: { control: 'boolean', name: 'Show label' },
    showLeadingIcon: { control: 'boolean', name: 'Show leading icon' },
    showUnit: { control: 'boolean', name: 'Show unit' },
    leadingIcon: { table: { disable: true } },
  },
  render: ({ showLabel, showLeadingIcon, showUnit, ...args }) => (
    <Input
      key={String(args.defaultValue)}
      {...args}
      label={showLabel ? args.label : undefined}
      aria-label={showLabel && args.label ? args['aria-label'] : args['aria-label'] ?? args.label ?? 'Value'}
      leadingIcon={showLeadingIcon ? <SearchIcon /> : undefined}
      unit={showUnit ? args.unit : undefined}
    />
  ),
}
export const Default: Story = {}
export const Required: Story = { args: { required: true } }
export const Hover: Story = {
  play: async ({ canvasElement }) => { await userEvent.hover(within(canvasElement).getByRole('textbox')) },
}
export const Focused: Story = {
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox')
    input.focus()
    await expect(input).toHaveFocus()
  },
}
export const HoverWithoutLabel: Story = { ...Hover, args: { label: undefined, 'aria-label': 'Value' } }
export const FocusedWithoutLabel: Story = { ...Focused, args: { label: undefined, 'aria-label': 'Value' } }
export const Filled: Story = { args: { defaultValue: 'Enter value...' } }
export const Error: Story = { args: { status: 'error', defaultValue: 'Enter value...' } }
export const Warning: Story = { args: { status: 'warning', defaultValue: 'Enter value...' } }
export const Success: Story = { args: { status: 'success', defaultValue: 'Enter value...' } }
export const NotEnquiry: Story = { args: { status: 'not-enquiry' } }
export const Disabled: Story = { args: { disabled: true } }
export const WithoutLabel: Story = { args: { label: undefined, 'aria-label': 'Value' } }
export const WithLeadingIcon: Story = { args: { leadingIcon: <SearchIcon /> } }
export const WithUnit: Story = { args: { label: 'Weight', unit: 'kg', inputMode: 'decimal' } }

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="input-gallery">
      {([
        ['Default', {}],
        ['Filled', { defaultValue: 'Enter value...' }],
        ['Error', { status: 'error', defaultValue: 'Enter value...' }],
        ['Warning', { status: 'warning', defaultValue: 'Enter value...' }],
        ['Success', { status: 'success', defaultValue: 'Enter value...' }],
        ['Not Enquiry', { status: 'not-enquiry' }],
        ['Disabled', { disabled: true }],
      ] as const).map(([name, props]) => (
        <div className="input-gallery__group" key={name}>
          <h2 className="body-12-medium">{name}</h2>
          <Input label="Label" placeholder="Enter value..." {...props} />
          <Input aria-label={`${name} without label`} placeholder="Enter value..." {...props} />
        </div>
      ))}
    </div>
  ),
}

function ControlledExample() {
  const [value, setValue] = useState('')
  return (
    <form className="input-gallery__group" onReset={() => setValue('')}>
      <Input label="Weight" name="weight" value={value} onChange={event => setValue(event.target.value)} unit="kg" />
      <output aria-label="Current value">{value}</output>
      <button type="reset">Reset</button>
    </form>
  )
}

export const Controlled: Story = {
  render: () => <ControlledExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox', { name: 'Weight' })
    await userEvent.type(input, '72')
    await expect(input).toHaveValue('72')
    await expect(canvas.getByLabelText('Current value')).toHaveTextContent('72')
    await expect(input).toHaveAccessibleDescription('kg')
    await userEvent.click(canvas.getByRole('button', { name: 'Reset' }))
    await expect(input).toHaveValue('')
  },
}

export const NativeBehavior: Story = {
  render: () => (
    <form className="input-gallery__group">
      <Input label="Email" name="email" type="email" required defaultValue="hello@example.com" />
      <Input label="Disabled" name="disabled" disabled defaultValue="Excluded" />
      <Input label="Read only" name="readOnly" readOnly defaultValue="Included" />
      <Input label="Error" status="error" aria-describedby="input-error-description" />
      <p id="input-error-description" className="body-14-medium">Please enter a valid value.</p>
      <button type="reset">Reset</button>
    </form>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const email = canvas.getByRole('textbox', { name: 'Email' })
    await userEvent.clear(email)
    await expect(email).toBeInvalid()
    await userEvent.type(email, 'updated@example.com')
    const data = new FormData(canvasElement.querySelector('form')!)
    await expect(data.get('email')).toBe('updated@example.com')
    await expect(data.has('disabled')).toBe(false)
    await expect(data.get('readOnly')).toBe('Included')
    await expect(canvas.getByRole('textbox', { name: 'Error' })).toHaveAccessibleDescription('Please enter a valid value.')
    await userEvent.click(canvas.getByRole('button', { name: 'Reset' }))
    await expect(email).toHaveValue('hello@example.com')
    email.focus()
    await userEvent.tab()
    await expect(canvas.getByRole('textbox', { name: 'Read only' })).toHaveFocus()
  },
}
