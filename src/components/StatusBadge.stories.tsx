import type { Meta, StoryObj } from '@storybook/react-vite'
import { createElement } from 'react'
import { StatusBadge } from './StatusBadge'
import * as lineIcons from '../icons/line'
import * as fillIcons from '../icons/fill'
import './StatusBadge.stories.css'

const statuses = ['default', 'success', 'warning', 'error', 'neutral', 'blue', 'disabled'] as const
const icons = { ...lineIcons, ...fillIcons }

const meta = {
  title: 'Fretara/Statuses and Badges',
  component: StatusBadge,
  parameters: { layout: 'padded' },
  argTypes: {
    type: { control: 'select', options: ['status', 'badge'] },
    status: { control: 'select', options: statuses },
    label: { control: 'text' },
    showDot: { control: 'boolean', description: 'Dot is available on Status only.' },
    showLeadingIcon: { control: 'boolean' },
    leadingIcon: {
      control: 'select',
      options: ['default', ...Object.keys(icons)],
      mapping: {
        default: undefined,
        ...Object.fromEntries(Object.entries(icons).map(([name, Icon]) => [name, createElement(Icon)])),
      },
      description: 'Defaults to the bell from Figma. Custom icons inherit the status color.',
    },
  },
  args: { type: 'status', status: 'default', label: 'Label', showDot: true, showLeadingIcon: true, leadingIcon: 'default' },
} satisfies Meta<typeof StatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const Badge: Story = { args: { type: 'badge' } }
export const DotOnly: Story = { args: { showLeadingIcon: false } }
export const IconOnly: Story = { args: { showDot: false } }
export const LabelOnly: Story = { args: { showDot: false, showLeadingIcon: false } }
export const CustomIcon: Story = { args: { status: 'success', label: 'Completed', leadingIcon: 'CheckmarkCircleFillIcon', showDot: false } }

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="status-badge-gallery" aria-label="Statuses and badges: all Figma variants">
      {statuses.map((status) => (
        <div className="status-badge-gallery__column" key={status} aria-label={status}>
          <StatusBadge status={status} />
          <StatusBadge status={status} type="badge" />
        </div>
      ))}
    </div>
  ),
}
