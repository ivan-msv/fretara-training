export type QuotationState = 'single' | 'multi' | 'partial'

export type QuotationOption = {
  id: string
  label: string
  description: string
  quotationReference: string
  status: 'Draft' | 'Open enquiry'
  deleted?: boolean
}

export type QuotationRecord = {
  id: QuotationState
  customer: string
  date: string
  time: string
  jobReference: string
  options: QuotationOption[]
  initialOptionId: string
}

export const quotationRecords: Record<QuotationState, QuotationRecord> = {
  single: {
    id: 'single', customer: 'Jack Thompson', date: '19th Oct, 2026', time: '10:25 AM', jobReference: 'WE937382733', initialOptionId: 'single-1',
    options: [{ id: 'single-1', label: 'Option 1', description: 'Three or Four words', quotationReference: 'Q027', status: 'Draft' }],
  },
  multi: {
    id: 'multi', customer: 'Jack Thompson', date: '19th Oct, 2026', time: '10:25 AM', jobReference: 'WE937382733', initialOptionId: 'multi-3',
    options: [
      { id: 'multi-1', label: 'Option 1', description: 'Three or Four words', quotationReference: 'Q027', status: 'Draft' },
      { id: 'multi-2', label: 'Option 2', description: 'Three or Four words', quotationReference: 'Q028', status: 'Draft', deleted: true },
      { id: 'multi-3', label: 'Option 3', description: 'Three or Four words', quotationReference: 'Q029', status: 'Draft' },
    ],
  },
  partial: {
    id: 'partial', customer: 'Jack Thompson', date: '19th Oct, 2026', time: '10:25 AM', jobReference: 'WE937382733', initialOptionId: 'partial-1',
    options: [
      { id: 'partial-1', label: 'Option 1', description: 'Three or Four words', quotationReference: 'Q027', status: 'Open enquiry' },
      { id: 'partial-2', label: 'Option 2', description: 'Three or Four words', quotationReference: 'Q028', status: 'Draft', deleted: true },
      { id: 'partial-3', label: 'Option 3', description: 'Three or Four words', quotationReference: 'Q029', status: 'Draft' },
    ],
  },
}
