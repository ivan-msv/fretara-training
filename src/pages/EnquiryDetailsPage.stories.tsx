import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect } from 'react'
import { EnquiryDetailsPage } from './EnquiryDetailsPage'
import { records } from './enquiriesData'

function StickyEnquiryDetails() {
  useEffect(() => {
    const frame = requestAnimationFrame(() => window.scrollTo({ top: 520 }))
    return () => { cancelAnimationFrame(frame); window.scrollTo({ top: 0 }) }
  }, [])
  return <EnquiryDetailsPage record={records.find(record => record.id === 'jack')} />
}

const meta = { title: 'Fretara/Pages/Enquiry Details', component: EnquiryDetailsPage, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof EnquiryDetailsPage>
export default meta
type Story = StoryObj<typeof meta>
export const PartlyConverted: Story = { args: { record: records.find(record => record.id === 'max') } }
export const FigmaSingleOption: Story = { args: { record: records.find(record => record.id === 'jack') } }
export const SingleOption: Story = { args: { record: records.find(record => record.id === 'rose') } }
export const StickyHeader: Story = { render: () => <StickyEnquiryDetails /> }
