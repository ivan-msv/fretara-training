import { useEffect, useMemo, useState } from 'react'
import { Button } from '../components/Button'
import { Dropdown } from '../components/Dropdown'
import { Message } from '../components/Message'
import { PageHeader } from '../components/PageHeader'
import { ProductShell } from '../components/ProductShell'
import { StatusBadge } from '../components/StatusBadge'
import { DataTable, TableActions, TableEmptyState, TableFooter, TableToolbar, type TableColumn } from '../components/Table'
import { FilterIcon, LinkIcon, PaperIcon, PlusIcon } from '../icons/line'
import { customers, type Customer, type CustomerSegment } from './customersData'
import './CustomerManagementPage.css'

const segmentOptions = [
  { value: 'all', label: 'All segments' },
  { value: 'vip', label: 'VIP Client' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'standard', label: 'Standard' },
  { value: 'unassigned', label: 'Unassigned' },
] as const
const editableSegmentOptions = segmentOptions.slice(1)

export type CustomerTableState = 'ready' | 'loading' | 'empty' | 'error'

export function CustomerManagementPage({ initialTableState = 'ready' }: { initialTableState?: CustomerTableState }) {
  const [search, setSearch] = useState('')
  const [segment, setSegment] = useState('all')
  const [page, setPage] = useState(1)
  const [rows, setRows] = useState(customers)
  const [openAction, setOpenAction] = useState<string | null>(null)
  const pageSize = 8

  useEffect(() => {
    if (!openAction) return
    const close = (event: KeyboardEvent | PointerEvent) => {
      if (event instanceof KeyboardEvent && event.key !== 'Escape') return
      if (event instanceof PointerEvent && event.target instanceof Element && event.target.closest('.customer-management__row-actions')) return
      const previous = openAction
      setOpenAction(null)
      if (event instanceof KeyboardEvent) requestAnimationFrame(() => document.getElementById(`customer-action-${previous}`)?.focus())
    }
    document.addEventListener('keydown', close)
    document.addEventListener('pointerdown', close)
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', close) }
  }, [openAction])

  const filtered = useMemo(() => {
    if (initialTableState === 'empty') return []
    const query = search.trim().toLocaleLowerCase()
    return rows.filter(customer => (segment === 'all' || customer.segment === segment) && (!query || [customer.company, customer.contactName, customer.email].some(value => value.toLocaleLowerCase().includes(query))))
  }, [initialTableState, rows, search, segment])
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, pages)
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const updateSegment = (customerId: string, next: string) => setRows(current => current.map(customer => customer.id === customerId ? { ...customer, segment: next as CustomerSegment } : customer))
  const columns: TableColumn<Customer>[] = [
    { id: 'company', header: 'Company', width: '24%', cell: customer => <a className="customer-management__row-link" href={`/customers/${customer.id}`}>{customer.company}</a> },
    { id: 'contact', header: 'Contact name', width: '15%', cell: customer => <span className="customer-management__truncate" title={customer.contactName}>{customer.contactName}</span> },
    { id: 'email', header: 'Email', width: '20%', cell: customer => <span className="customer-management__truncate" title={customer.email}>{customer.email}</span> },
    { id: 'phone', header: 'Phone', width: '15%', cell: customer => customer.phone },
    { id: 'status', header: 'Status', width: '11%', cell: customer => <StatusBadge type="badge" status={customer.status === 'approved' ? 'success' : 'neutral'} label={customer.status === 'approved' ? 'Approved' : 'Registered'} showDot={false} showLeadingIcon={false} /> },
    { id: 'segment', header: 'Customer segment', width: 170, cell: customer => customer.segment === 'unassigned' ? <Dropdown className="customer-management__segment" aria-label={`Customer segment for ${customer.company}`} options={editableSegmentOptions} value="" placeholder="Unassigned" onValueChange={value => updateSegment(customer.id, value)} /> : <Dropdown className="customer-management__segment" aria-label={`Customer segment for ${customer.company}`} options={editableSegmentOptions} value={customer.segment} onValueChange={value => updateSegment(customer.id, value)} /> },
    { id: 'actions', header: '', width: 52, cell: customer => <div className="customer-management__row-actions"><TableActions id={`customer-action-${customer.id}`} label={`Actions for ${customer.company}`} aria-expanded={openAction === customer.id} aria-haspopup="menu" onClick={() => { const next = openAction === customer.id ? null : customer.id; setOpenAction(next); if (next) requestAnimationFrame(() => document.querySelector<HTMLElement>(`#customer-menu-${customer.id} [role="menuitem"]`)?.focus()) }} />{openAction === customer.id && <div className="customer-management__action-menu" id={`customer-menu-${customer.id}`} role="menu"><a href={`/customers/${customer.id}`} role="menuitem">Edit customer</a><button type="button" role="menuitem" onClick={() => { setRows(current => current.filter(item => item.id !== customer.id)); setOpenAction(null) }}>Remove from preview</button></div>}</div> },
  ]
  const emptyState = initialTableState === 'error'
    ? <Message className="customer-management__table-message" state="error" heading="Customers could not be loaded">Try again or refresh the page.</Message>
    : search || segment !== 'all'
      ? <TableEmptyState title="No matching customers" description="Try another company, contact, email, or segment." />
      : <TableEmptyState title="No customers yet" description="Create a customer manually to start your database." />

  return <ProductShell className="customer-management" mainClassName="customer-management__main" activeItemId="customers">
      <main className="customer-management__content">
        <PageHeader title="Customer Management" description="Manage your customer database" showBackButton={false} secondaryAction={{ label: 'System Default', onClick: () => {} }} primaryAction={{ label: 'New Customer', leadingIcon: <PlusIcon width={16} height={16} />, onClick: () => { window.location.href = '/customers/new' } }} />
        <section className="customer-management__methods" aria-labelledby="customer-methods-title">
          <h2 id="customer-methods-title" className="customer-management__sr-only">Create a customer</h2>
          <button type="button" className="customer-management__method" onClick={() => { window.location.href = '/customers/new' }}><span className="customer-management__method-icon" data-tone="primary"><PlusIcon /></span><strong className="heading-16-bold">Create Manually</strong><span className="body-14-medium">Add a single client with custom details</span></button>
          <button type="button" className="customer-management__method" disabled><span className="customer-management__method-icon" data-tone="success"><PaperIcon /></span><strong className="heading-16-bold">Import from CSV</strong><span className="body-14-medium">Upload a file to add multiple clients</span></button>
          <button type="button" className="customer-management__method" disabled><span className="customer-management__method-icon" data-tone="warning"><LinkIcon /></span><strong className="heading-16-bold">Import from CRM</strong><span className="body-14-medium">Connect and sync from CRM system</span></button>
        </section>
        <DataTable columns={columns} rows={initialTableState === 'error' ? [] : visible} getRowId={customer => customer.id} getRowHref={customer => `/customers/${customer.id}`} label="Customers" loading={initialTableState === 'loading'} loadingRows={8} emptyState={emptyState} toolbar={<TableToolbar title="Clients" search={{ value: search, onChange: event => { setSearch(event.target.value); setPage(1) }, placeholder: 'Search company, contact, or email...' }} filters={<Dropdown aria-label="Filter by customer segment" leadingIcon={<FilterIcon />} options={segmentOptions} value={segment} onValueChange={value => { setSegment(value); setPage(1) }} />} actions={search || segment !== 'all' ? <Button variant="link" type="button" onClick={() => { setSearch(''); setSegment('all'); setPage(1) }}>Clear filters</Button> : undefined} />} footer={<TableFooter page={currentPage} pageSize={pageSize} total={filtered.length} onPageChange={setPage} disabled={initialTableState !== 'ready'} summary={`Showing ${filtered.length ? (currentPage - 1) * pageSize + 1 : 0}–${Math.min(currentPage * pageSize, filtered.length)} of ${filtered.length} results`} />} />
      </main>
  </ProductShell>
}
