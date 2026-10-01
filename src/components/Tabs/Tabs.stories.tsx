import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DashboardIcon } from '../../icons/line'
import { Tabs, type TabsItem } from './Tabs'

const items: TabsItem[] = [
  { value: 'all', label: 'All Orders', count: 128, leadingIcon: <DashboardIcon /> },
  { value: 'processing', label: 'Processing', count: 24, leadingIcon: <DashboardIcon /> },
  { value: 'completed', label: 'Completed', count: 89, leadingIcon: <DashboardIcon /> },
  { value: 'cancelled', label: 'Cancelled', count: 15, leadingIcon: <DashboardIcon /> },
]
const meta = {
  title: 'Fretara/Tabs/Tab List',
  id: 'fretara-tabs',
  component: Tabs,
  parameters: { layout: 'padded' },
  args: { items, label: 'Order status' },
  argTypes: {
    items: { control: false },
    label: { control: 'text' },
    defaultValue: { control: 'select', options: items.map(item => item.value) },
    value: { control: false },
    onValueChange: { control: false },
  },
} satisfies Meta<typeof Tabs>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { render: args => <Tabs key={args.defaultValue} {...args} /> }
export const LabelOnly: Story = { args: { items: items.map(({ value, label }) => ({ value, label })) } }
export const WithPanels: Story = {
  args: { items: items.map(item => ({ ...item, content: <p className="body-14-medium">{item.label}: {item.count} orders.</p> })) },
}
export const DisabledTab: Story = { args: { items: items.map(item => ({ ...item, disabled: item.value === 'processing' })) } }
export const AllDisabled: Story = { args: { items: items.map(item => ({ ...item, disabled: true })) } }
export const Narrow: Story = { decorators: [Story => <div style={{ maxWidth: 320 }}><Story /></div>] }
export const Empty: Story = { args: { items: [] } }
export const RightToLeft: Story = { args: { dir: 'rtl' } }

function ControlledExample() {
  const [value, setValue] = useState('processing')
  return <Tabs items={items} label="Order status" value={value} onValueChange={setValue} />
}
export const Controlled: Story = { render: () => <ControlledExample /> }

export const KeyboardNavigation: Story = {
  ...DisabledTab,
  play: async ({ canvasElement }) => {
    const tabs = Array.from(canvasElement.querySelectorAll<HTMLButtonElement>('[role="tab"]'))
    const press = async (key: string) => {
      canvasElement.ownerDocument.activeElement?.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))
      await new Promise(resolve => setTimeout(resolve, 0))
    }
    const expectSelected = (index: number) => {
      if (tabs[index].getAttribute('aria-selected') !== 'true' || tabs[index].tabIndex !== 0 || canvasElement.ownerDocument.activeElement !== tabs[index]) {
        throw new Error(`Expected tab ${index} to be selected and focused`)
      }
      const panel = canvasElement.ownerDocument.getElementById(tabs[index].getAttribute('aria-controls')!)
      if (!panel || panel.hidden) throw new Error('Selected panel must be visible')
    }
    tabs[0].focus()
    await press('ArrowRight')
    expectSelected(2)
    await press('End')
    expectSelected(3)
    await press('ArrowRight')
    expectSelected(0)
    await press('ArrowLeft')
    expectSelected(3)
    await press('Home')
    expectSelected(0)
    tabs[2].click()
    await new Promise(resolve => setTimeout(resolve, 0))
    if (tabs[2].getAttribute('aria-selected') !== 'true') throw new Error('Click must select the tab')
  },
}
