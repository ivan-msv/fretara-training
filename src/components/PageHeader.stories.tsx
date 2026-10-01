import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatusBadge } from './StatusBadge'
import { PageHeader } from './PageHeader'

const meta = {
  title: 'Fretara/Page Header',
  component: PageHeader,
  parameters: { layout: 'padded' },
  args: {
    title: 'Page Title',
    description: 'A brief description of this page and its purpose.',
    badge: <StatusBadge type="badge" />,
    status: <StatusBadge />,
    onBack: () => {},
    secondaryAction: { label: 'Secondary', onClick: () => {} },
    primaryAction: { label: 'Primary Action', onClick: () => {} },
    showBackButton: true,
    showBadge: true,
    showStatus: true,
    showDescription: true,
    showPrimaryButton: true,
    showSecondaryButton: true,
    showIconActions: true,
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    showBackButton: { control: 'boolean' },
    showBadge: { control: 'boolean' },
    showStatus: { control: 'boolean' },
    showDescription: { control: 'boolean' },
    showPrimaryButton: { control: 'boolean' },
    showSecondaryButton: { control: 'boolean' },
    showIconActions: { control: 'boolean' },
  },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const Minimal: Story = {
  args: {
    showBackButton: false,
    showBadge: false,
    showStatus: false,
    showDescription: false,
    showPrimaryButton: false,
    showSecondaryButton: false,
    showIconActions: false,
  },
}
export const WithActions: Story = {
  args: { showBadge: false, showStatus: false },
}