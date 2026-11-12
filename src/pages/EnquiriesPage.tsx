import { useEffect, useState } from 'react'
import { Dropdown } from '../components/Dropdown'
import { Navbar } from '../components/Navbar'
import { PageHeader } from '../components/PageHeader'
import { Sidebar } from '../components/Sidebar'
import { StatusBadge } from '../components/StatusBadge'
import { DataTable, TableActions, TableFooter, TableText, TableToolbar } from '../components/Table'
import { Tabs } from '../components/Tabs'
import { BoltFillIcon } from '../icons/fill/BoltFillIcon'
import { FlagFillIcon } from '../icons/fill/FlagFillIcon'
import { AiChatAssistantIcon } from '../icons/line/AiChatAssistantIcon'
import { BulletedListIcon } from '../icons/line/BulletedListIcon'
import { ClockDashIcon } from '../icons/line/ClockDashIcon'
import { DocumentFileIcon } from '../icons/line/DocumentFileIcon'
import { Dollar2Icon } from '../icons/line/Dollar2Icon'
import { FilterIcon } from '../icons/line/FilterIcon'
import { LayersIcon } from '../icons/line/LayersIcon'
import { PlusIcon } from '../icons/line/PlusIcon'
import { StarIcon } from '../icons/line/StarIcon'
import { UsersIcon } from '../icons/line/UsersIcon'
import { records, type EnquiryRecord, type Option } from './enquiriesData'
import './EnquiriesPage.css'

type EnquiryRow = { record: EnquiryRecord; options: Option[]; converted: boolean }
type QuotationRow = { record: EnquiryRecord; option?: Option; options: Option[]; group: boolean }

const navigation = [
  { id: 'quotations', label: 'Quotations', href: '#quotations', icon: <BulletedListIcon /> },
  { id: 'margins', label: 'Margins', href: '#margins', icon: <Dollar2Icon /> },
  { id: 'customers', label: 'Customers', href: '#customers', icon: <UsersIcon /> },
]
const insights = [
  { icon: <FlagFillIcon />, value: '9 High Value', text: 'High-value quotes ready for you', tone: 'warning' },
  { icon: <ClockDashIcon />, value: '15 Need Follow-Up', text: 'Quotes ready for follow-up', tone: 'blue' },
  { icon: <StarIcon />, value: '4 Chance of Win-Back', text: 'Potential deal to explore', tone: 'blue' },
  { icon: <BoltFillIcon />, value: '5 Most Likely Won', text: 'Quotes ready to finalize', tone: 'success' },
]
const enquiryIds = new Set(['rose', 'lena', 'max', 'sophie'])
const quotationIds = new Set(['marcus', 'isabella', 'liam', 'ava'])
const enquiryRows: EnquiryRow[] = records.filter(record => enquiryIds.has(record.id)).map(record => ({ record, options: record.options.filter(option => !option.quotationReference), converted: record.options.some(option => option.quotationReference) })).filter(row => row.options.length > 0)
const quotationRows: QuotationRow[] = records.filter(record => quotationIds.has(record.id)).flatMap(record => {
  const options = record.options.filter(option => option.quotationReference)
  return options.length > 1 ? [{ record, options, group: true }, ...options.map(option => ({ record, option, options, group: false }))] : [{ record, option: options[0], options, group: false }]
})

export function EnquiriesPage({ initialTab = 'enquiries' }: { initialTab?: 'enquiries' | 'quotations' }) {
  const [collapsed, setCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState(initialTab)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [activeStatus, setActiveStatus] = useState<string | null>(null)
  const [openAction, setOpenAction] = useState<string | null>(null)
  const [notice, setNotice] = useState('')
  const [page, setPage] = useState(1)
  useEffect(() => {
    if (!openAction) return
    const close = (event: KeyboardEvent | PointerEvent) => {
      if (event instanceof KeyboardEvent && event.key !== 'Escape') return
      if (event instanceof PointerEvent && event.target instanceof Element && event.target.closest('.enquiries-page__row-actions')) return
      const previous = openAction
      setOpenAction(null)
      if (event instanceof KeyboardEvent) requestAnimationFrame(() => document.getElementById(`action-trigger-${previous}`)?.focus())
    }
    document.addEventListener('keydown', close)
    document.addEventListener('pointerdown', close)
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', close) }
  }, [openAction])
  const query = search.trim().toLocaleLowerCase()
  const matches = (values: string[]) => !query || values.some(value => value.toLocaleLowerCase().includes(query))
  const visibleEnquiries = enquiryRows.filter(row => (status === 'all' || row.record.enquiryStatus === status) && (!activeStatus || row.record.enquiryStatus === activeStatus) && matches([row.record.name, row.record.email, row.record.subject, ...row.options.flatMap(option => [option.label, option.enquiryReference])]))
  const visibleQuotations = quotationRows.filter(row => matches([row.record.name, row.record.email, row.record.jobReference, ...row.options.flatMap(option => [option.label, option.quotationReference ?? ''])]))
  const quotePath = (record: EnquiryRecord, option?: Option) => {
    const quoted = record.options.filter(item => item.quotationReference)
    const state = record.options.some(item => !item.quotationReference) ? 'partial' : quoted.length > 1 ? 'multi' : 'single'
    if (!option || state === 'single') return `/quotations/${state}`
    return `/quotations/${state}?option=${Math.max(0, quoted.findIndex(item => item.id === option.id))}`
  }
  const toggleActions = (id: string) => {
    const next = openAction === id ? null : id
    setOpenAction(next)
    if (next) requestAnimationFrame(() => document.querySelector<HTMLElement>(`#action-menu-${id} [role="menuitem"]`)?.focus())
  }
  const actions = (id: string, reference: string, name: string, record: EnquiryRecord, option?: Option) => <div className="enquiries-page__row-actions"><TableActions id={`action-trigger-${id}`} label={`Actions for ${name}`} aria-expanded={openAction === id} aria-haspopup="menu" aria-controls={`action-menu-${id}`} onClick={() => toggleActions(id)} />{openAction === id && <div className="enquiries-page__action-menu" id={`action-menu-${id}`} role="menu"><a role="menuitem" href={activeTab === 'quotations' ? quotePath(record, option) : `/enquiries/${record.id}`}>View {activeTab === 'quotations' ? 'quotation' : 'enquiry'}</a><button role="menuitem" type="button" onClick={() => { void navigator.clipboard.writeText(reference); setNotice(`Copied ${reference}`); setOpenAction(null) }}>Copy reference</button></div>}</div>
  const enquiryColumns = [
    { id: 'client', header: 'Client', width: '28%', cell: (row: EnquiryRow) => <a className="enquiries-page__client-link" href={`/enquiries/${row.record.id}`}><TableText icon={row.options.length > 1 ? <LayersIcon /> : <DocumentFileIcon />} secondary={row.record.email}>{row.record.name}</TableText></a> },
    { id: 'subject', header: 'Original email reference', width: '31%', cell: (row: EnquiryRow) => <TableText secondary={row.record.received}>{row.record.subject}</TableText> },
    { id: 'date', header: 'Last interaction', width: '17%', cell: (row: EnquiryRow) => <TableText secondary={row.record.time}>{row.record.date}</TableText> },
    { id: 'reference', header: 'Enquiry/Quote no.', width: '20%', cell: (row: EnquiryRow) => <span className="enquiries-page__reference">{row.options.map(option => option.enquiryReference).join(', ')}{row.converted && <small className="enquiries-page__converted">Partly quoted</small>}</span> },
    { id: 'actions', header: '•••', width: 52, cell: (row: EnquiryRow) => actions(`enquiry-${row.record.id}`, row.options[0].enquiryReference, row.record.name, row.record) },
  ]
  const quotationColumns = [
    { id: 'number', header: 'Quotation no.', width: '19%', cell: (row: QuotationRow) => <a className="enquiries-page__client-link" href={quotePath(row.record, row.option)}><span className={row.group ? 'enquiries-page__quote-group' : row.options.length > 1 ? 'enquiries-page__quote-option' : undefined}><TableText icon={row.group ? <LayersIcon /> : row.options.length === 1 ? <DocumentFileIcon /> : undefined} secondary={row.group ? 'From enquiry' : row.options.length === 1 ? row.record.id === 'isabella' ? 'Created manually' : 'From enquiry' : undefined}>{row.group ? 'Quote group' : row.option?.quotationReference}</TableText></span></a> },
    { id: 'status', header: 'Status', width: '22%', cell: (row: QuotationRow) => row.group ? `${row.options.length} Quotes` : <span className="enquiries-page__badges"><StatusBadge type="badge" status={row.option?.quotationStatus === 'Draft' ? 'neutral' : row.option?.quotationStatus === 'Client Accepted' ? 'blue' : 'success'} label={row.option?.quotationStatus} showDot={false} showLeadingIcon={false} />{row.option?.quotationStatusSecondary && <StatusBadge type="badge" status="blue" label={row.option.quotationStatusSecondary} showDot={false} showLeadingIcon={false} />}</span> },
    { id: 'client', header: 'Client', width: '21%', cell: (row: QuotationRow) => <TableText secondary={row.record.email}>{row.record.name}</TableText> },
    { id: 'date', header: 'Last update', width: '18%', cell: (row: QuotationRow) => <TableText secondary={row.record.time}>{row.record.date}</TableText> },
    { id: 'job', header: 'Job reference', width: '16%', cell: (row: QuotationRow) => row.group ? '—' : row.record.jobReference },
    { id: 'actions', header: '', width: 52, cell: (row: QuotationRow) => row.group ? null : actions(`quote-${row.option?.id}`, row.option?.quotationReference ?? '', row.record.name, row.record, row.option) },
  ]
  const changeTab = (value: string) => { if (value !== 'enquiries' && value !== 'quotations') return; setActiveTab(value); setActiveStatus(null); setStatus('all'); setSearch(''); setOpenAction(null); setPage(1) }
  const toolbar = <TableToolbar navigation={<Tabs label="Quotation sections" value={activeTab} onValueChange={changeTab} items={[{ value: 'enquiries', label: 'Enquiries' }, { value: 'quotations', label: 'Quotations' }]} />} search={{ value: search, onChange: event => setSearch(event.target.value), placeholder: 'Search...' }} filters={activeTab === 'enquiries' ? <Dropdown aria-label="Filter by status" options={[{ value: 'all', label: 'All Status' }, { value: 'review', label: 'Manual review needed' }, { value: 'ready', label: 'Ready to send' }]} value={status} onValueChange={setStatus} leadingIcon={<FilterIcon width={20} height={20} />} /> : undefined} />
  const filters = activeTab === 'enquiries' ? [{ value: 'review', label: 'Manual review needed', tone: 'warning' }, { value: 'ready', label: 'Ready to send', tone: 'success' }] : [{ value: 'draft', label: 'Review draft', tone: 'blue' }, { value: 'followup', label: 'Review follow-up', tone: 'blue' }]
  const countFor = (value: string) => value === 'review' || value === 'draft' ? 8 : 4
  const displayedQuotations = activeStatus ? visibleQuotations.filter(row => !row.group && (activeStatus === 'draft' ? row.option?.quotationStatus === 'Draft' : row.option?.quotationStatus !== 'Draft')) : visibleQuotations
  const displayedCount = activeTab === 'enquiries' ? visibleEnquiries.length : displayedQuotations.length
  return <div className="enquiries-page">
    <Sidebar items={navigation} activeItemId="quotations" collapsed={collapsed} onCollapsedChange={setCollapsed} />
    <div className="enquiries-page__main"><Navbar options={[{ value: 'quotes', label: 'Quote / Tender management' }]} defaultValue="quotes" />
      <main className="enquiries-page__content">
        <PageHeader title="Quotations" description="AI-powered quotation management with intelligent prioritization" primaryAction={{ label: 'New Quotation', leadingIcon: <PlusIcon width={16} height={16} />, onClick: () => setNotice('New quotation flow is not available yet.') }} />
        <section className="enquiries-page__insights" aria-label="AI Insights and Recommendations"><h2 className="heading-18-bold"><AiChatAssistantIcon width={20} height={20} />AI Insights &amp; Recommendations</h2><div className="enquiries-page__insight-grid">{insights.map(item => <article className="enquiries-page__insight" key={item.value} data-tone={item.tone}><strong className="heading-16-bold">{item.icon}{item.value}</strong><p className="body-14-medium">{item.text}</p></article>)}</div></section>
        <section aria-label={`${activeTab === 'enquiries' ? 'Enquiries' : 'Quotations'} table`}><div className="enquiries-page__table-shell">{toolbar}<div className="enquiries-page__status-filters">{filters.map(filter => <button key={filter.value} type="button" aria-pressed={activeStatus === filter.value} onClick={() => setActiveStatus(activeStatus === filter.value ? null : filter.value)}><span className="enquiries-page__dot" data-tone={filter.tone} />{filter.label} <span className="enquiries-page__count">{countFor(filter.value)}</span></button>)}</div>{activeTab === 'enquiries' ? <DataTable label="Enquiries" columns={enquiryColumns} rows={visibleEnquiries} getRowId={row => row.record.id} getRowHref={row => `/enquiries/${row.record.id}`} density="compact" /> : <DataTable label="Quotations" columns={quotationColumns} rows={displayedQuotations} getRowId={row => row.group ? `group-${row.record.id}` : row.option!.id} getRowHref={row => quotePath(row.record, row.option)} density="compact" />}{activeTab === 'enquiries' ? <div className="enquiries-page__footer body-12-medium">Showing {displayedCount ? 1 : 0} to {displayedCount} of {displayedCount} results</div> : <TableFooter page={page} pageSize={10} total={248} onPageChange={setPage} />}</div></section>
        {notice && <p className="enquiries-page__notice" role="status">{notice}</p>}
      </main>
    </div>
  </div>
}
