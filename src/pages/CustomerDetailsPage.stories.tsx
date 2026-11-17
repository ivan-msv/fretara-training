import type { Meta, StoryObj } from '@storybook/react-vite'
import { CustomerDetailsPage } from './CustomerDetailsPage'

const meta = { title: 'Pages/Customer Details', component: CustomerDetailsPage, args: { customerId: 'ads-australia' }, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof CustomerDetailsPage>
export default meta
type Story = StoryObj<typeof meta>

export const BuyRate: Story = {}
export const CreateCustomer: Story = { args: { customerId: 'new' } }
