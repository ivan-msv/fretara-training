import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Dropdown } from './Dropdown'
import { SearchIcon } from '../icons/line'

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
]
const meta = {
  title: 'Fretara/Dropdown',
  component: Dropdown,
  parameters: { layout: 'padded', controls: { include: ['label', 'placeholder', 'disabled', 'multiple', 'indicator', 'options', 'leadingIcon'] } },
  args: { options, label: 'Title', placeholder: 'Select an option', disabled: false },
  argTypes: {
    label: { control: 'text' }, placeholder: { control: 'text' }, disabled: { control: 'boolean' },
    multiple: { control: 'boolean', description: 'Allow multiple selections. Checkbox indicators are automatic.' },
    indicator: { control: 'select', options: ['none', 'radio'], if: { arg: 'multiple', truthy: false } },
    options: { control: 'object' },
    leadingIcon: { control: 'select', options: ['none', 'search'], mapping: { none: undefined, search: <SearchIcon /> } },
  },
} satisfies Meta<typeof Dropdown>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: args => <Dropdown key={String(args.multiple)} {...args} />,
}
export const Selected: Story = { args: { defaultValue: 'a' } }
export const WithoutLabel: Story = { args: { label: undefined, 'aria-label': 'Choose an option' } }
export const WithLeadingIcon: Story = { args: { leadingIcon: <SearchIcon /> } }
export const Disabled: Story = { args: { disabled: true, placeholder: 'Disabled selection' } }
export const DisabledSelected: Story = { args: { disabled: true, defaultValue: 'a' } }
export const MultiSelect: Story = { args: { multiple: true, defaultValue: ['a'], label: 'Multi Select', placeholder: 'Select options' } }
export const RadioSelect: Story = { args: { indicator: 'radio', defaultValue: 'a', label: 'Radio Select' } }
export const DisabledOption: Story = { args: { options: [options[0], { ...options[1], disabled: true }, options[2]] } }
export const Empty: Story = { args: { options: [] } }
export const LongList: Story = { args: { options: Array.from({ length: 40 }, (_, index) => ({ value: String(index), label: `Option ${index + 1}` })) } }

// These stories exercise actual interaction; no visual-state props are exposed.
const openMenu: NonNullable<Story['play']> = async ({ canvasElement }) => {
  const trigger = canvasElement.querySelector<HTMLButtonElement>('[role="combobox"]')!
  trigger.focus()
  trigger.click()
}
export const OpenSingleSelect: Story = { args: { defaultValue: 'a', label: 'Single Select' }, play: openMenu }
export const OpenMultiSelect: Story = { ...MultiSelect, play: openMenu }
export const OpenRadioSelect: Story = { ...RadioSelect, play: openMenu }
export const Focused: Story = { play: ({ canvasElement }) => { canvasElement.querySelector<HTMLButtonElement>('button')?.focus() } }
export const KeyboardSelection: Story = {
  args: { options: [options[0], { ...options[1], disabled: true }, options[2]] },
  play: async ({ canvasElement }) => {
    const trigger = canvasElement.querySelector<HTMLButtonElement>('[role="combobox"]')!
    trigger.focus()
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    await new Promise(resolve => setTimeout(resolve, 0))
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    await new Promise(resolve => setTimeout(resolve, 0))
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    await new Promise(resolve => setTimeout(resolve, 0))
    if (!trigger.textContent?.includes('Option C') || trigger.getAttribute('aria-expanded') !== 'false') throw new Error('Keyboard selection failed')
  },
}
function ControlledExample() {
  const [value, setValue] = useState('a')
  return <div><Dropdown options={options} label="Controlled selection" value={value} onValueChange={setValue} /><p className="body-14-medium">Value: {value}</p><button onClick={() => setValue('')}>Clear selection</button></div>
}
export const Controlled: Story = { render: () => <ControlledExample /> }
