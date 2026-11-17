import type { Meta, StoryObj } from '@storybook/react-vite'
import { CustomerManagementPage } from './CustomerManagementPage'

const meta = { title: 'Pages/Customer Management', component: CustomerManagementPage, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof CustomerManagementPage>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Loading: Story = { args: { initialTableState: 'loading' } }
export const Empty: Story = { args: { initialTableState: 'empty' } }
export const Error: Story = { args: { initialTableState: 'error' } }
