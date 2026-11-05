import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect } from 'react'
import { QuotationDetailsPage } from './QuotationDetailsPage'
import type { QuotationState } from './quotationData'

function StickyQuotationDetails({ state }: { state: QuotationState }) {
  useEffect(() => {
    const frame = requestAnimationFrame(() => window.scrollTo({ top: 520 }))
    return () => { cancelAnimationFrame(frame); window.scrollTo({ top: 0 }) }
  }, [])
  return <QuotationDetailsPage state={state} />
}

const meta = { title: 'Fretara/Pages/Quotation Details', component: QuotationDetailsPage, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof QuotationDetailsPage>
export default meta
type Story = StoryObj<typeof meta>
export const SingleQuotation: Story = { args: { state: 'single' } }
export const MultiOptionQuotation: Story = { args: { state: 'multi' } }
export const MultiOptionWithEnquiry: Story = { args: { state: 'partial' } }
export const SingleQuotationStickyHeader: Story = { args: { state: 'single' }, render: args => <StickyQuotationDetails state={args.state ?? 'single'} /> }
export const MultiOptionStickyHeader: Story = { args: { state: 'multi' }, render: args => <StickyQuotationDetails state={args.state ?? 'multi'} /> }
export const MultiOptionWithEnquiryStickyHeader: Story = { args: { state: 'partial' }, render: args => <StickyQuotationDetails state={args.state ?? 'partial'} /> }
