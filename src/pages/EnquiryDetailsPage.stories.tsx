import type { Meta, StoryObj } from '@storybook/react-vite'
import { EnquiryDetailsPage } from './EnquiryDetailsPage'
import { records } from './enquiriesData'

const meta = { title: 'Fretara/Pages/Enquiry Details', component: EnquiryDetailsPage, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof EnquiryDetailsPage>
export default meta
type Story = StoryObj<typeof meta>
export const PartlyConverted: Story = { args: { record: records.find(record => record.id === 'max') } }
export const FigmaSingleOption: Story = { args: { record: records.find(record => record.id === 'jack') } }
export const SingleOption: Story = { args: { record: records.find(record => record.id === 'rose') } }
