import type { Meta, StoryObj } from '@storybook/react-vite'
import { DashboardIcon } from '../../icons/line'
import { TabItem } from './TabItem'

const meta = {
  title: 'Fretara/Tabs/Tab Item',
  component: TabItem,
  parameters: { layout: 'centered' },
  decorators: [Story => <div role="tablist" aria-label="Example tab"><Story /></div>],
  args: { children: 'Tab Label', count: '24', leadingIcon: <DashboardIcon />, selected: false, disabled: false },
  argTypes: {
    children: { control: 'text' },
    count: { control: 'text' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    leadingIcon: { control: 'select', options: ['none', 'dashboard'], mapping: { none: undefined, dashboard: <DashboardIcon /> } },
  },
} satisfies Meta<typeof TabItem>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const Selected: Story = { args: { selected: true } }
export const Disabled: Story = { args: { disabled: true } }
export const LabelOnly: Story = { args: { leadingIcon: undefined, count: undefined } }
export const ZeroCount: Story = { args: { count: 0 } }
export const Focused: Story = {
  play: ({ canvasElement }) => { canvasElement.querySelector<HTMLButtonElement>('[role="tab"]')?.focus() },
}
