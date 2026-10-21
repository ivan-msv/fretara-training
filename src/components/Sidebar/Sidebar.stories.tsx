import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { BulletedListIcon, Dollar2Icon, UsersIcon } from '../../icons/line'
import { Sidebar, type SidebarProps } from './Sidebar'
import type { SidebarNavigationItem } from './SidebarItem'

const items: SidebarNavigationItem[] = [
  {
    id: 'quotations',
    label: 'Quotations',
    href: '#quotations',
    icon: <BulletedListIcon />,
  },
  {
    id: 'margins',
    label: 'Margins',
    href: '#margins',
    icon: <Dollar2Icon />,
  },
  {
    id: 'customers',
    label: 'Customers',
    href: '#customers',
    icon: <UsersIcon />,
  },
]

const nestedItems: SidebarNavigationItem[] = [
  {
    ...items[0],
    children: [
      { id: 'drafts', label: 'Draft quotations', href: '#drafts' },
      { id: 'sent', label: 'Sent quotations', href: '#sent' },
    ],
  },
  ...items.slice(1),
]

function InteractiveSidebar(props: SidebarProps) {
  const [collapsed, setCollapsed] = useState(props.collapsed)
  return <Sidebar {...props} collapsed={collapsed} onCollapsedChange={setCollapsed} />
}

const meta = {
  title: 'Fretara/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  decorators: [Story => <div style={{ height: 1040 }}><Story /></div>],
  args: {
    items,
    activeItemId: 'quotations',
    collapsed: false,
    label: 'Primary navigation',
  },
  argTypes: {
    items: { control: false },
    activeItemId: {
      control: 'select',
      options: ['quotations', 'margins', 'customers'],
    },
    collapsed: { control: 'boolean' },
    label: { control: 'text' },
    onCollapsedChange: { control: false },
  },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const Expanded: Story = { args: { activeItemId: undefined } }
export const ActiveItem: Story = { args: { activeItemId: 'quotations' } }
export const Collapsed: Story = { args: { collapsed: true, activeItemId: 'quotations' } }
export const CollapsedLogoFocus: Story = {
  args: { collapsed: true },
  play: ({ canvasElement }) => {
    canvasElement.querySelector<HTMLButtonElement>('[aria-label="Expand sidebar"]')?.focus()
  },
}
export const ActiveNestedItem: Story = {
  args: { items: nestedItems, activeItemId: 'sent' },
  argTypes: { activeItemId: { control: false } },
}
export const Interactive: Story = {
  render: args => <InteractiveSidebar {...args} />,
}
