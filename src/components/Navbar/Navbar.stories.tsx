import type { Meta, StoryObj } from '@storybook/react-vite'
import { Navbar } from './Navbar'

const options = [
  { value: 'quotes', label: 'Quote / Tender management' },
  { value: 'margins', label: 'Margin management' },
  { value: 'customers', label: 'Customer management' },
]

const meta = {
  title: 'Fretara/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    controls: {
      include: ['options', 'value', 'defaultValue', 'selectorLabel', 'logoutLabel', 'logoutDisabled'],
    },
  },
  args: {
    options,
    defaultValue: 'quotes',
    selectorLabel: 'Choose workspace',
    logoutLabel: 'Logout',
    logoutDisabled: false,
  },
  argTypes: {
    options: { control: 'object' },
    value: {
      control: 'select',
      options: [undefined, ...options.map(option => option.value)],
    },
    defaultValue: {
      control: 'select',
      options: options.map(option => option.value),
    },
    selectorLabel: { control: 'text' },
    logoutLabel: { control: 'text' },
    logoutDisabled: { control: 'boolean' },
    onValueChange: { control: false },
    onLogout: { control: false },
  },
} satisfies Meta<typeof Navbar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const DesignReference: Story = {
  render: args => <div style={{ width: 1180, maxWidth: '100%' }}><Navbar {...args} /></div>,
}

export const OpenWorkspaceMenu: Story = {
  play: ({ canvasElement }) => {
    canvasElement.querySelector<HTMLButtonElement>('[role="combobox"]')?.click()
  },
}

export const LogoutFocused: Story = {
  play: ({ canvasElement }) => {
    canvasElement.querySelector<HTMLButtonElement>('.fretara-navbar__logout')?.focus()
  },
}

export const LogoutDisabled: Story = {
  args: { logoutDisabled: true },
}

export const Narrow: Story = {
  render: args => <div style={{ width: 375 }}><Navbar {...args} /></div>,
}
