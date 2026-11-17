import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProductShell } from './ProductShell'

const meta = {
  title: 'Components/Product Shell',
  component: ProductShell,
  parameters: { layout: 'fullscreen' },
  args: { activeItemId: 'quotations' },
  argTypes: { children: { control: false }, navigationItems: { control: false }, workspaceOptions: { control: false } },
} satisfies Meta<typeof ProductShell>

export default meta
type Story = StoryObj<typeof meta>

export const Quotations: Story = {
  args: { children: <main style={{ padding: 24 }}>Quotation content</main> },
}

export const Customers: Story = {
  args: { activeItemId: 'customers', children: <main style={{ padding: 24 }}>Customer content</main> },
}
