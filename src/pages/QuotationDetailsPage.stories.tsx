import type { Meta, StoryObj } from '@storybook/react-vite'
import { QuotationDetailsPage } from './QuotationDetailsPage'

const meta = { title: 'Fretara/Pages/Quotation Details', component: QuotationDetailsPage, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof QuotationDetailsPage>
export default meta
type Story = StoryObj<typeof meta>
export const SingleQuotation: Story = { args: { state: 'single' } }
export const MultiOptionQuotation: Story = { args: { state: 'multi' } }
export const MultiOptionWithEnquiry: Story = { args: { state: 'partial' } }
