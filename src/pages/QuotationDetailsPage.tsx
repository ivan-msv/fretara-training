import { useEffect, useMemo, useState } from 'react'
import { Button } from '../components/Button'
import { PageHeader } from '../components/PageHeader'
import { ProductShell } from '../components/ProductShell'
import { StatusBadge } from '../components/StatusBadge'
import { CalendarBlankIcon } from '../icons/line/CalendarBlankIcon'
import { DocumentFileIcon } from '../icons/line/DocumentFileIcon'
import { LayersIcon } from '../icons/line/LayersIcon'
import { PlusIcon } from '../icons/line/PlusIcon'
import { UserPersonrIcon } from '../icons/line/UserPersonrIcon'
import { EmailThreads } from './EmailThreads'
import { OptionCard } from './EnquiryDetailsPage'
import { quotationRecords, type QuotationOption, type QuotationRecord, type QuotationState } from './quotationData'
import './QuotationDetailsPage.css'


function OptionTabs({ options, activeId, onChange, onAdd, idPrefix }: { options: QuotationOption[]; activeId: string; onChange: (id: string) => void; onAdd: () => void; idPrefix: string }) {
  return <div className="quotation-details__tabs">
    <div className="quotation-details__tab-list" role="tablist" aria-label="Quotation options">{options.map((option, index) => <button key={option.id} id={`${idPrefix}-quotation-tab-${option.id}`} data-option-id={option.id} role="tab" type="button" aria-selected={option.id === activeId} aria-controls="quotation-panel" tabIndex={option.id === activeId ? 0 : -1} disabled={option.deleted} onClick={() => onChange(option.id)} onKeyDown={event => { if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return; event.preventDefault(); const enabled = Array.from(event.currentTarget.parentElement!.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)')); const current = enabled.indexOf(event.currentTarget); const next = event.key === 'Home' ? 0 : event.key === 'End' ? enabled.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length; enabled[next]?.focus(); const id = enabled[next]?.dataset.optionId; if (id) onChange(id) }}><span>Option {index + 1}{option.id === activeId && !option.deleted ? ' ···' : ''}</span><small>{option.deleted ? 'Deleted' : option.description}</small></button>)}</div>
    <Button type="button" variant="link" leadingIcon={<PlusIcon />} onClick={onAdd}>Add new option</Button>
  </div>
}

export function QuotationDetailsPage({ state = 'single' }: { state?: QuotationState }) {
  const source = quotationRecords[state]
  const requestedIndex = Number.parseInt(new URLSearchParams(window.location.search).get('option') ?? '', 10)
  const requestedOption = Number.isInteger(requestedIndex) && !source.options[requestedIndex]?.deleted ? source.options[requestedIndex] : undefined
  const [record, setRecord] = useState<QuotationRecord>(source)
  const [activeId, setActiveId] = useState(requestedOption?.id ?? source.initialOptionId)
  const [scrolled, setScrolled] = useState(false)
  const [notice, setNotice] = useState('')
  const [moreOpen, setMoreOpen] = useState(false)
  const active = useMemo(() => record.options.find(option => option.id === activeId) ?? record.options[0], [record.options, activeId])
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 90); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [])
  useEffect(() => {
    if (!moreOpen) return
    const close = (event: KeyboardEvent | PointerEvent) => { if (event instanceof KeyboardEvent && event.key !== 'Escape') return; setMoreOpen(false) }
    document.addEventListener('keydown', close)
    document.addEventListener('pointerdown', close)
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', close) }
  }, [moreOpen])
  const addOption = () => {
    const number = record.options.length + 1
    const option: QuotationOption = { id: `${record.id}-${number}`, label: `Option ${number}`, description: 'New freight option', quotationReference: `Q${String(29 + number).padStart(3, '0')}`, status: 'Open enquiry' }
    setRecord(current => ({ ...current, options: [...current.options, option] }))
    setActiveId(option.id)
    setNotice('New option added in this preview.')
  }
  const sharedOption = { id: active.id, label: active.label, enquiryReference: active.quotationReference, quotationReference: active.quotationReference, quotationStatus: 'Draft' as const }
  const statusBadge = <StatusBadge type="badge" status="neutral" label={active.status} showDot={false} showLeadingIcon={false} />
  const tabs = record.options.length > 1 && <OptionTabs idPrefix="regular" options={record.options} activeId={active.id} onChange={setActiveId} onAdd={addOption} />
  return <ProductShell className="quotation-details" mainClassName="quotation-details__main" activeItemId="quotations">
      <div className="quotation-details__regular-header">
        <PageHeader title={record.options.length === 1 ? active.quotationReference : `${record.options.length} Options`} titleIcon={record.options.length === 1 ? <DocumentFileIcon /> : <LayersIcon />} description={<><UserPersonrIcon width={16} height={16} />{record.customer} · <CalendarBlankIcon width={16} height={16} />{record.date} | {record.time}</>} status={record.options.length === 1 ? statusBadge : undefined} onBack={() => { window.location.href = '/' }} secondaryAction={{ label: 'Generate Quote', onClick: () => setNotice('Quotation regenerated in this preview.') }} primaryAction={{ label: 'Send Quote', onClick: () => setNotice('Quotation marked as sent in this preview.') }} onMore={() => setMoreOpen(open => !open)} moreButtonProps={{ 'aria-expanded': moreOpen, 'aria-haspopup': 'menu', 'aria-controls': 'quotation-more-menu' }} />
        {moreOpen && <div className="quotation-details__more-menu" id="quotation-more-menu" role="menu" onPointerDown={event => event.stopPropagation()}><button type="button" role="menuitem" onClick={() => { setNotice('Quotation duplicated in this preview.'); setMoreOpen(false) }}>Duplicate quotation</button><button type="button" role="menuitem" onClick={() => { void navigator.clipboard.writeText(active.quotationReference); setNotice('Quotation reference copied.'); setMoreOpen(false) }}>Copy reference</button></div>}
      </div>
      <main className="quotation-details__content">
        <EmailThreads record={{ id: 'jack', name: record.customer, email: 'jack@gmail.com', subject: 'Request for Pallet Shipping Quote – Melbourne', received: `${record.date} | ${record.time}`, date: record.date, time: record.time, jobReference: record.jobReference, enquiryStatus: 'review', options: [] }} initiallyOpen />
        <section className="quotation-details__quote" data-open-enquiry={active.status === 'Open enquiry'} id="quotation-panel" role="tabpanel" aria-labelledby={`regular-quotation-tab-${active.id}`}>
          {tabs}
          <div className="quotation-details__quote-heading"><div><strong className="heading-24-bold">{active.quotationReference}</strong>{statusBadge}</div>{active.status === 'Draft' && <Button type="button" variant="secondary" onClick={() => setNotice('PDF preview opened in this preview.')}>PDF Preview</Button>}</div>
          <div className="quotation-details__body"><OptionCard option={sharedOption} index={0} totalOptions={1} jobReference={record.jobReference} onConvert={() => {}} showQuoteStatus={active.status === 'Draft'} /></div>
        </section>
        {notice && <p className="quotation-details__notice body-14-medium" role="status">{notice}</p>}
      </main>
      <div className="quotation-details__sticky" data-visible={scrolled} data-open-enquiry={active.status === 'Open enquiry'}>
        {record.options.length > 1 && <OptionTabs idPrefix="sticky" options={record.options} activeId={active.id} onChange={setActiveId} onAdd={addOption} />}
        <div className="quotation-details__sticky-heading"><div><DocumentFileIcon /><strong className="heading-24-bold">{active.quotationReference}</strong>{statusBadge}</div>{active.status === 'Draft' && <Button type="button" variant="secondary" onClick={() => setNotice('PDF preview opened in this preview.')}>PDF Preview</Button>}</div>
      </div>
  </ProductShell>
}
