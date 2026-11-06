import { useEffect, useMemo, useState } from 'react'
import { Button } from '../components/Button'
import { Navbar } from '../components/Navbar'
import { PageHeader } from '../components/PageHeader'
import { Sidebar } from '../components/Sidebar'
import { StatusBadge } from '../components/StatusBadge'
import { BulletedListIcon, CalendarBlankIcon, DocumentFileIcon, Dollar2Icon, LayersIcon, PlusIcon, UserPersonrIcon, UsersIcon } from '../icons'
import { EmailThreads } from './EmailThreads'
import { OptionCard } from './EnquiryDetailsPage'
import { quotationRecords, type QuotationOption, type QuotationRecord, type QuotationState } from './quotationData'
import './QuotationDetailsPage.css'

const navigation = [
  { id: 'quotations', label: 'Quotations', href: '/', icon: <BulletedListIcon /> },
  { id: 'margins', label: 'Margins', href: '#margins', icon: <Dollar2Icon /> },
  { id: 'customers', label: 'Customers', href: '#customers', icon: <UsersIcon /> },
]

function OptionTabs({ options, activeId, onChange, onAdd }: { options: QuotationOption[]; activeId: string; onChange: (id: string) => void; onAdd: () => void }) {
  return <div className="quotation-details__tabs" role="tablist" aria-label="Quotation options">
    <div className="quotation-details__tab-list">{options.map((option, index) => <button key={option.id} role="tab" type="button" aria-selected={option.id === activeId} disabled={option.deleted} onClick={() => onChange(option.id)}><span>Option {index + 1}{option.id === activeId && !option.deleted ? ' ···' : ''}</span><small>{option.deleted ? 'Deleted' : option.description}</small></button>)}</div>
    <Button type="button" variant="link" leadingIcon={<PlusIcon />} onClick={onAdd}>Add new option</Button>
  </div>
}

export function QuotationDetailsPage({ state = 'single' }: { state?: QuotationState }) {
  const source = quotationRecords[state]
  const requestedIndex = Number.parseInt(new URLSearchParams(window.location.search).get('option') ?? '', 10)
  const requestedOption = Number.isInteger(requestedIndex) && !source.options[requestedIndex]?.deleted ? source.options[requestedIndex] : undefined
  const [record, setRecord] = useState<QuotationRecord>(source)
  const [activeId, setActiveId] = useState(requestedOption?.id ?? source.initialOptionId)
  const [collapsed, setCollapsed] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [notice, setNotice] = useState('')
  const active = useMemo(() => record.options.find(option => option.id === activeId) ?? record.options[0], [record.options, activeId])
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 90); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [])
  const addOption = () => {
    const number = record.options.length + 1
    const option: QuotationOption = { id: `${record.id}-${number}`, label: `Option ${number}`, description: 'New freight option', quotationReference: `Q${String(29 + number).padStart(3, '0')}`, status: 'Open enquiry' }
    setRecord(current => ({ ...current, options: [...current.options, option] }))
    setActiveId(option.id)
    setNotice('New option added in this preview.')
  }
  const sharedOption = { id: active.id, label: active.label, enquiryReference: active.quotationReference, quotationReference: active.quotationReference, quotationStatus: 'Draft' as const }
  const statusBadge = <StatusBadge type="badge" status="neutral" label={active.status} showDot={false} showLeadingIcon={false} />
  const tabs = record.options.length > 1 && <OptionTabs options={record.options} activeId={active.id} onChange={setActiveId} onAdd={addOption} />
  return <div className="quotation-details">
    <Sidebar items={navigation} activeItemId="quotations" collapsed={collapsed} onCollapsedChange={setCollapsed} />
    <div className="quotation-details__main">
      <Navbar options={[{ value: 'quotes', label: 'Quote / Tender management' }]} defaultValue="quotes" />
      <div className="quotation-details__regular-header">
        <PageHeader title={`${record.options.length} Option${record.options.length === 1 ? '' : 's'}`} titleIcon={record.options.length === 1 ? <DocumentFileIcon /> : <LayersIcon />} description={<><UserPersonrIcon width={16} height={16} />{record.customer} · <CalendarBlankIcon width={16} height={16} />{record.date} | {record.time}</>} onBack={() => { window.location.href = '/' }} secondaryAction={{ label: 'Generate Quote', onClick: () => setNotice('Quotation regenerated in this preview.') }} primaryAction={{ label: 'Send Quote', onClick: () => setNotice('Quotation marked as sent in this preview.') }} onMore={() => setNotice('More actions opened in this preview.')} />
      </div>
      <main className="quotation-details__content">
        <EmailThreads record={{ id: 'jack', name: record.customer, email: 'jack@gmail.com', subject: 'Request for Pallet Shipping Quote – Melbourne', received: `${record.date} | ${record.time}`, date: record.date, time: record.time, jobReference: record.jobReference, enquiryStatus: 'review', options: [] }} />
        <section className="quotation-details__quote" data-open-enquiry={active.status === 'Open enquiry'}>
          {tabs}
          <div className="quotation-details__quote-heading"><div><strong className="heading-24-bold">{active.quotationReference}</strong>{statusBadge}</div>{active.status === 'Draft' && <Button type="button" variant="secondary" onClick={() => setNotice('PDF preview opened in this preview.')}>PDF Preview</Button>}</div>
          <div className="quotation-details__body"><OptionCard option={sharedOption} index={0} totalOptions={1} jobReference={record.jobReference} onConvert={() => {}} showQuoteStatus={active.status === 'Draft'} /></div>
        </section>
        {notice && <p className="quotation-details__notice body-14-medium" role="status">{notice}</p>}
      </main>
      <div className="quotation-details__sticky" data-visible={scrolled} data-open-enquiry={active.status === 'Open enquiry'}>
        {record.options.length > 1 && <OptionTabs options={record.options} activeId={active.id} onChange={setActiveId} onAdd={addOption} />}
        <div className="quotation-details__sticky-heading"><div><DocumentFileIcon /><strong className="heading-24-bold">{active.quotationReference}</strong>{statusBadge}</div>{active.status === 'Draft' && <Button type="button" variant="secondary" onClick={() => setNotice('PDF preview opened in this preview.')}>PDF Preview</Button>}</div>
      </div>
    </div>
  </div>
}
