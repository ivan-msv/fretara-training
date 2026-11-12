import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { Dropdown } from '../components/Dropdown'
import { Navbar } from '../components/Navbar'
import { PageHeader } from '../components/PageHeader'
import { Sidebar } from '../components/Sidebar'
import { StatusBadge } from '../components/StatusBadge'
import { DataTable, TableActions, TableDate, TableFooter, TableText, TableToolbar, type TableColumn, type TableSort } from '../components/Table'
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
import { records, type EnquiryRecord } from './enquiriesData'
import './EnquiriesPage.css'

type EnquiryCategory = 'review' | 'followup' | 'ready' | 'unsent'
type EnquiryRow = {
  record: EnquiryRecord
  category: EnquiryCategory
  lastEditDate: string
  lastEditTime: string
  lastEmailSort: number
  lastEditSort: number
  highlighted?: boolean
  grouped?: boolean
}
type QuotationStatus = 'draft' | 'ready' | 'sent' | 'accepted' | 'approved' | 'expired'
type QuotationAction = 'review' | 'unsent'
type QuotationRow = {
  id: string
  reference: string
  status: QuotationStatus
  client: string
  email: string
  lastEmailDate?: string
  lastEmailTime?: string
  lastEditDate: string
  lastEditTime: string
  lastEmailSort: number
  lastEditSort: number
  jobReference?: string
  actions: QuotationAction[]
  group?: boolean
  nested?: boolean
  quoteCount?: number
  href: string
}

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
const enquiryMeta: Record<string, Omit<EnquiryRow, 'record'>> = {
  'vincent-group': { category: 'followup', lastEditDate: '18th Sep, 2026', lastEditTime: '1:21 AM', lastEmailSort: Date.parse('2026-08-07T18:13:00'), lastEditSort: Date.parse('2026-09-18T01:21:00'), grouped: true },
  'vincent-quote': { category: 'ready', lastEditDate: '18th Sep, 2026', lastEditTime: '1:21 AM', lastEmailSort: Date.parse('2026-08-07T18:13:00'), lastEditSort: Date.parse('2026-09-18T01:21:00'), highlighted: true },
  joseph: { category: 'ready', lastEditDate: '18th Sep, 2026', lastEditTime: '1:21 AM', lastEmailSort: Date.parse('2026-08-07T18:49:00'), lastEditSort: Date.parse('2026-09-18T01:21:00'), highlighted: true },
  'vincent-review-one': { category: 'review', lastEditDate: '18th Sep, 2026', lastEditTime: '1:21 AM', lastEmailSort: Date.parse('2026-08-07T19:40:00'), lastEditSort: Date.parse('2026-09-18T01:21:00') },
  'vincent-review-two': { category: 'review', lastEditDate: '18th Sep, 2026', lastEditTime: '1:21 AM', lastEmailSort: Date.parse('2026-08-07T19:44:00'), lastEditSort: Date.parse('2026-09-18T01:21:00') },
  'vincent-new': { category: 'followup', lastEditDate: '18th Sep, 2026', lastEditTime: '1:21 AM', lastEmailSort: Date.parse('2026-08-10T10:59:00'), lastEditSort: Date.parse('2026-09-18T01:21:00') },
  'harry-draft': { category: 'unsent', lastEditDate: '18th Sep, 2026', lastEditTime: '1:21 AM', lastEmailSort: Date.parse('2026-08-11T15:50:00'), lastEditSort: Date.parse('2026-09-18T01:21:00'), highlighted: true },
  'harry-subject': { category: 'ready', lastEditDate: '18th Sep, 2026', lastEditTime: '1:21 AM', lastEmailSort: Date.parse('2026-08-11T15:58:00'), lastEditSort: Date.parse('2026-09-18T01:21:00'), highlighted: true },
  clara: { category: 'ready', lastEditDate: '18th Sep, 2026', lastEditTime: '2:05 AM', lastEmailSort: Date.parse('2026-08-12T09:15:00'), lastEditSort: Date.parse('2026-09-18T02:05:00') },
  leo: { category: 'followup', lastEditDate: '18th Sep, 2026', lastEditTime: '2:18 AM', lastEmailSort: Date.parse('2026-08-12T10:22:00'), lastEditSort: Date.parse('2026-09-18T02:18:00') },
  amelia: { category: 'review', lastEditDate: '18th Sep, 2026', lastEditTime: '2:31 AM', lastEmailSort: Date.parse('2026-08-12T11:04:00'), lastEditSort: Date.parse('2026-09-18T02:31:00') },
  noah: { category: 'unsent', lastEditDate: '18th Sep, 2026', lastEditTime: '2:46 AM', lastEmailSort: Date.parse('2026-08-12T13:47:00'), lastEditSort: Date.parse('2026-09-18T02:46:00'), highlighted: true },
}
const enquiryRows: EnquiryRow[] = Object.entries(enquiryMeta).map(([id, meta]) => ({ record: records.find(record => record.id === id)!, ...meta }))
const quotationRows: QuotationRow[] = [
  { id: 'quote-1463', reference: 'QUO1463', status: 'ready', client: 'DEV BAKERY 184 PTY LTD (plan 184 ...', email: 'admin@devbakery184.example.com', lastEmailDate: '10th Nov, 2026', lastEmailTime: '5:57 PM', lastEditDate: '10th Nov, 2026', lastEditTime: '5:57 PM', lastEmailSort: Date.parse('2026-11-10T17:57:00'), lastEditSort: Date.parse('2026-11-10T17:57:00'), actions: ['review'], href: '/quotations/single' },
  { id: 'quote-1461', reference: 'QUO1461', status: 'ready', client: 'whitefox2', email: 'harry.b@whitefox.cloud', lastEmailDate: '10th Nov, 2026', lastEmailTime: '5:45 PM', lastEditDate: '10th Nov, 2026', lastEditTime: '5:46 PM', lastEmailSort: Date.parse('2026-11-10T17:45:00'), lastEditSort: Date.parse('2026-11-10T17:46:00'), actions: [], href: '/quotations/single' },
  { id: 'group-1458', reference: 'Quote group', status: 'ready', client: 'whitefox2', email: 'harry.b@whitefox.cloud', lastEmailDate: '10th Nov, 2026', lastEmailTime: '5:08 PM', lastEditDate: '10th Nov, 2026', lastEditTime: '5:08 PM', lastEmailSort: Date.parse('2026-11-10T17:08:00'), lastEditSort: Date.parse('2026-11-10T17:08:00'), actions: ['review', 'unsent'], group: true, quoteCount: 2, href: '/quotations/multi' },
  { id: 'quote-1458', reference: 'QUO1458', status: 'ready', client: 'whitefox2', email: 'harry.b@whitefox.cloud', lastEditDate: '10th Nov, 2026', lastEditTime: '5:08 PM', lastEmailSort: Date.parse('2026-11-10T17:08:00'), lastEditSort: Date.parse('2026-11-10T17:08:00'), actions: [], nested: true, href: '/quotations/multi?option=0' },
  { id: 'quote-1459', reference: 'QUO1459', status: 'ready', client: 'whitefox2', email: 'harry.b@whitefox.cloud', lastEditDate: '10th Nov, 2026', lastEditTime: '5:08 PM', lastEmailSort: Date.parse('2026-11-10T17:08:00'), lastEditSort: Date.parse('2026-11-10T17:08:00'), actions: [], nested: true, href: '/quotations/multi?option=1' },
  { id: 'group-1449', reference: 'Quote group', status: 'ready', client: 'LINK COMMERCIAL PROJECTS PTY ...', email: 'accounts@linkcommercial.example.com', lastEmailDate: '10th Nov, 2026', lastEmailTime: '1:03 PM', lastEditDate: '10th Nov, 2026', lastEditTime: '1:03 PM', lastEmailSort: Date.parse('2026-11-10T13:03:00'), lastEditSort: Date.parse('2026-11-10T13:03:00'), actions: ['review'], group: true, quoteCount: 9, href: '/quotations/multi' },
  ...['1449', '1450', '1451', '1452', '1453', '1454'].map((reference, index): QuotationRow => ({ id: `quote-${reference}`, reference: `QUO${reference}`, status: 'ready', client: 'LINK COMMERCIAL PROJECTS PTY ...', email: 'accounts@linkcommercial.example.com', lastEditDate: '10th Nov, 2026', lastEditTime: index < 2 ? '12:58 PM' : index < 4 ? '12:59 PM' : index === 4 ? '1:00 PM' : '1:01 PM', lastEmailSort: Date.parse('2026-11-10T13:03:00'), lastEditSort: Date.parse('2026-11-10T13:03:00'), actions: [], nested: true, href: `/quotations/multi?option=${index}` })),
]
const enquiryFilters: { value: EnquiryCategory; label: string; count: number; tone: string }[] = [
  { value: 'review', label: 'Manual review required', count: 635, tone: 'review' },
  { value: 'followup', label: 'Follow-up', count: 49, tone: 'followup' },
  { value: 'ready', label: 'Ready to send', count: 527, tone: 'ready' },
  { value: 'unsent', label: 'Unsent draft emails', count: 478, tone: 'unsent' },
]
const quotationActionFilters: { value: EnquiryCategory; label: string; count: number; tone: string }[] = [
  { value: 'review', label: 'Manual review required', count: 283, tone: 'review' },
  { value: 'followup', label: 'Follow-up', count: 36, tone: 'followup' },
  { value: 'ready', label: 'Ready to send', count: 579, tone: 'ready' },
  { value: 'unsent', label: 'Unsent draft emails', count: 107, tone: 'unsent' },
]
const sortOptions = [
  { value: 'lastEmail:descending', label: 'Last email, newest first' },
  { value: 'lastEmail:ascending', label: 'Last email, oldest first' },
  { value: 'lastEdit:descending', label: 'Last edit, newest first' },
  { value: 'lastEdit:ascending', label: 'Last edit, oldest first' },
] as const
const quotationStatusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'ready', label: 'Ready to send' },
  { value: 'sent', label: 'Sent' },
  { value: 'accepted', label: 'Client Accepted' },
  { value: 'approved', label: 'Approved' },
  { value: 'expired', label: 'Expired' },
] as const
const quotationStatusLabels: Record<QuotationStatus, string> = { draft: 'Draft', ready: 'Ready to send', sent: 'Sent', accepted: 'Client Accepted', approved: 'Approved', expired: 'Expired' }

export function EnquiriesPage({ initialTab = 'enquiries' }: { initialTab?: 'enquiries' | 'quotations' }) {
  const [collapsed, setCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState(initialTab)
  const [search, setSearch] = useState('')
  const [activeStatus, setActiveStatus] = useState<string | null>(null)
  const [quotationStatus, setQuotationStatus] = useState('all')
  const [deletedQuoteIds, setDeletedQuoteIds] = useState<Set<string>>(new Set())
  const [openAction, setOpenAction] = useState<string | null>(null)
  const [notice, setNotice] = useState('')
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<TableSort>({ column: 'lastEmail', direction: initialTab === 'quotations' ? 'descending' : 'ascending' })

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
  const visibleEnquiries = enquiryRows.filter(row => (!activeStatus || row.category === activeStatus) && (!query || [row.record.name, row.record.email, row.record.subject, row.record.options[0].enquiryReference].some(value => value.toLocaleLowerCase().includes(query)))).sort((a, b) => {
    const comparison = sort.column === 'lastEdit' ? a.lastEditSort - b.lastEditSort : a.lastEmailSort - b.lastEmailSort
    return sort.direction === 'ascending' ? comparison : -comparison
  })
  const visibleQuotations = quotationRows.filter(row => !deletedQuoteIds.has(row.id) && (quotationStatus === 'all' || row.status === quotationStatus) && (!activeStatus || activeStatus === 'ready' && row.status === 'ready' || activeStatus === 'review' && row.actions.includes('review') || activeStatus === 'unsent' && row.actions.includes('unsent') || activeStatus === 'followup' && row.actions.includes('review')) && matches([row.reference, row.client, row.email, row.jobReference ?? ''])).sort((a, b) => {
    const comparison = sort.column === 'lastEdit' ? a.lastEditSort - b.lastEditSort : a.lastEmailSort - b.lastEmailSort
    return sort.direction === 'ascending' ? comparison : -comparison
  })
  const toggleActions = (id: string) => {
    const next = openAction === id ? null : id
    setOpenAction(next)
    if (next) requestAnimationFrame(() => document.querySelector<HTMLElement>(`#action-menu-${id} [role="menuitem"]`)?.focus())
  }
  const quoteActions = (row: QuotationRow) => <div className="enquiries-page__row-actions"><TableActions id={`action-trigger-${row.id}`} label={`Actions for ${row.reference}`} aria-expanded={openAction === row.id} aria-haspopup="menu" aria-controls={`action-menu-${row.id}`} onClick={() => toggleActions(row.id)} />{openAction === row.id && <div className="enquiries-page__action-menu" id={`action-menu-${row.id}`} role="menu"><a role="menuitem" href={row.href}>Edit</a><button role="menuitem" type="button" onClick={() => { setDeletedQuoteIds(current => new Set(current).add(row.id)); setNotice(`${row.reference} deleted from this preview.`); setOpenAction(null) }}>Delete</button></div>}</div>
  const enquiryColumns: TableColumn<EnquiryRow>[] = [
    { id: 'client', header: 'Client', width: '23%', cell: row => <a className="enquiries-page__client-link" data-muted={row.grouped || undefined} href={`/enquiries/${row.record.id}`}><TableText className={row.highlighted ? 'enquiries-page__row-highlight' : undefined} icon={row.grouped ? <LayersIcon /> : <DocumentFileIcon />} secondary={row.record.email}>{row.record.name}</TableText></a> },
    { id: 'subject', header: 'Original email reference', width: '23%', cell: row => <TableText secondary={row.record.received}>{row.record.subject}</TableText> },
    { id: 'lastEmail', header: 'Last email', width: '13%', sortable: true, cell: row => <TableDate time={row.record.time}>{row.record.date}</TableDate> },
    { id: 'lastEdit', header: 'Last edit', width: '13%', sortable: true, cell: row => <TableDate time={row.lastEditTime}>{row.lastEditDate}</TableDate> },
    { id: 'reference', header: 'Enquiry/Quote no.', width: '17%', cell: row => <TableText secondary="From enquiry">{row.record.options[0].enquiryReference}</TableText> },
    { id: 'action', header: 'Action items', width: '12%', cell: row => <StatusBadge className="enquiries-page__action-badge" status={row.category === 'ready' ? 'ready' : row.category === 'unsent' ? 'blue' : 'warning'} label={row.category === 'review' ? 'Manual review' : row.category === 'followup' ? 'Follow-up' : row.category === 'ready' ? 'Ready to send' : 'Unsent draft emails'} showDot={false} showLeadingIcon={false} /> },
  ]
  const quotationColumns: TableColumn<QuotationRow>[] = [
    { id: 'number', header: 'Quotation no.', width: '14%', cell: row => <a className="enquiries-page__client-link" data-muted={row.group || undefined} href={row.href}><span className={row.nested ? 'enquiries-page__quote-option' : undefined}><TableText icon={row.group ? <LayersIcon /> : row.nested ? undefined : <DocumentFileIcon />} secondary="From enquiry">{row.reference}</TableText></span></a> },
    { id: 'status', header: 'Status', width: '11%', cell: row => row.group ? `${row.quoteCount} Quotes` : <StatusBadge className="enquiries-page__action-badge" status={row.status === 'ready' ? 'ready' : row.status === 'draft' ? 'neutral' : row.status === 'expired' ? 'disabled' : row.status === 'accepted' ? 'blue' : 'success'} label={quotationStatusLabels[row.status]} showDot={false} showLeadingIcon={false} /> },
    { id: 'client', header: 'Client', width: '20%', cell: row => <TableText secondary={row.email}>{row.client}</TableText> },
    { id: 'lastEmail', header: 'Last email', width: '11%', sortable: true, cell: row => row.lastEmailDate ? <TableDate time={row.lastEmailTime}>{row.lastEmailDate}</TableDate> : '—' },
    { id: 'lastEdit', header: 'Last edit', width: '11%', sortable: true, cell: row => <TableDate time={row.lastEditTime}>{row.lastEditDate}</TableDate> },
    { id: 'job', header: 'Job reference', width: '10%', cell: row => row.jobReference ?? '—' },
    { id: 'action', header: 'Action items', width: '18%', cell: row => <span className="enquiries-page__badges">{row.actions.map(action => <StatusBadge key={action} className="enquiries-page__action-badge" status={action === 'review' ? 'warning' : 'blue'} label={action === 'review' ? 'Manual review' : 'Unsent draft emails'} showDot={false} showLeadingIcon={false} />)}</span> },
    { id: 'menu', header: '', width: 52, cell: row => row.group ? null : quoteActions(row) },
  ]
  const changeTab = (value: string) => {
    if (value !== 'enquiries' && value !== 'quotations') return
    setActiveTab(value)
    setActiveStatus(null)
    setQuotationStatus('all')
    setSort({ column: 'lastEmail', direction: value === 'quotations' ? 'descending' : 'ascending' })
    setSearch('')
    setOpenAction(null)
    setPage(1)
  }
  const hasFilter = Boolean(activeStatus) || activeTab === 'quotations' && quotationStatus !== 'all'
  const toolbar = <TableToolbar navigation={<Tabs label="Quotation sections" value={activeTab} onValueChange={changeTab} items={[{ value: 'enquiries', label: 'Enquiries' }, { value: 'quotations', label: 'Quotations' }]} />} search={{ value: search, onChange: event => { setSearch(event.target.value); setPage(1) }, placeholder: activeTab === 'enquiries' ? 'Search by client or enquiry number...' : 'Search by client, quote number or job reference...' }} filters={activeTab === 'quotations' ? <Dropdown className="enquiries-page__status-select" aria-label="Filter quotations by status" leadingIcon={<FilterIcon />} options={quotationStatusOptions} value={quotationStatus} onValueChange={value => { setQuotationStatus(value); setPage(1) }} /> : undefined} actions={hasFilter ? <Button className="enquiries-page__clear-filter" type="button" variant="link" onClick={() => { setActiveStatus(null); setQuotationStatus('all'); setPage(1) }}>Clear filters</Button> : undefined} />
  const sortValue = `${sort.column}:${sort.direction}`

  return <div className="enquiries-page">
    <Sidebar items={navigation} activeItemId="quotations" collapsed={collapsed} onCollapsedChange={setCollapsed} />
    <div className="enquiries-page__main"><Navbar options={[{ value: 'quotes', label: 'Quote / Tender management' }]} defaultValue="quotes" />
      <main className="enquiries-page__content">
        <PageHeader title="Quotations" description="AI-powered quotation management with intelligent prioritization" primaryAction={{ label: 'New Quotation', leadingIcon: <PlusIcon width={16} height={16} />, onClick: () => setNotice('New quotation flow is not available yet.') }} />
        <section className="enquiries-page__insights" aria-label="AI Insights and Recommendations"><h2 className="heading-18-bold"><AiChatAssistantIcon width={20} height={20} />AI Insights &amp; Recommendations</h2><div className="enquiries-page__insight-grid">{insights.map(item => <article className="enquiries-page__insight" key={item.value} data-tone={item.tone}><strong className="heading-16-bold">{item.icon}{item.value}</strong><p className="body-14-medium">{item.text}</p></article>)}</div></section>
        <section aria-label={`${activeTab === 'enquiries' ? 'Enquiries' : 'Quotations'} table`}><div className="enquiries-page__table-shell" data-view={activeTab}>{toolbar}<div className="enquiries-page__status-filters">{(activeTab === 'enquiries' ? enquiryFilters : quotationActionFilters).map(filter => <Button className="enquiries-page__status-filter" key={filter.value} type="button" variant="secondary" shape="pill" aria-pressed={activeStatus === filter.value} onClick={() => { setActiveStatus(activeStatus === filter.value ? null : filter.value); setPage(1) }}><span className="enquiries-page__dot" data-tone={filter.tone} />{filter.label}<span className="enquiries-page__count">{filter.count}</span></Button>)}{activeStatus && <Button className="enquiries-page__inline-clear" type="button" variant="link" onClick={() => { setActiveStatus(null); setPage(1) }}>Clear</Button>}</div><div className="enquiries-page__sort-summary body-14-medium"><FilterIcon width={20} height={20} aria-hidden="true" /><span>Sorted by</span><Dropdown className="enquiries-page__sort-select" aria-label={`Sort ${activeTab}`} options={sortOptions} value={sortValue} onValueChange={value => { const [column, direction] = value.split(':') as [TableSort['column'], TableSort['direction']]; setSort({ column, direction }); setPage(1) }} /></div>{activeTab === 'enquiries' ? <DataTable className="enquiries-page__enquiry-table" label="Enquiries" columns={enquiryColumns} rows={page === 1 ? visibleEnquiries.slice(0, 12) : []} getRowId={row => row.record.id} getRowHref={row => `/enquiries/${row.record.id}`} sort={sort} onSortChange={next => { setSort(next); setPage(1) }} footer={<TableFooter page={page} pageSize={12} total={activeStatus ? enquiryFilters.find(filter => filter.value === activeStatus)?.count ?? visibleEnquiries.length : 1689} onPageChange={setPage} />} /> : <DataTable className="enquiries-page__quotation-table" label="Quotations" columns={quotationColumns} rows={page === 1 ? visibleQuotations.slice(0, 12) : []} getRowId={row => row.id} getRowHref={row => row.href} sort={sort} onSortChange={next => { setSort(next); setPage(1) }} footer={<TableFooter page={page} pageSize={12} total={hasFilter ? visibleQuotations.length : 248} onPageChange={setPage} />} />}</div></section>
        {notice && <p className="enquiries-page__notice" role="status">{notice}</p>}
      </main>
    </div>
  </div>
}
