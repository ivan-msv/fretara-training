import { useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { Checkbox } from '../Checkbox/Checkbox'
import { Dropdown } from '../Dropdown/Dropdown'
import { StatusBadge } from '../StatusBadge/StatusBadge'
import { Tabs } from '../Tabs/Tabs'
import { ChevronRightIcon, FilterIcon, PaperIcon, PlusIcon } from '../../icons/line'
import { DataTable, Table, TableActions, TableCell, TableContainer, TableCurrency, TableDate, TableEmptyValue, TableFooter, TableHeaderCell, TableLink, TableNumber, TablePercentage, TableRating, TableRelativeDate, TableRow, TableSkeleton, TableText, TableToolbar, TableUser, type TableColumn, type TableDensity, type TableSort } from './index'
import './Table.stories.css'

type Invoice = { id: string; description: string; client: string; contact: string; status: string; amount: number; date: string; time: string }
const invoices: Invoice[] = [
  { id: 'INV-2024-0847', description: 'Logistics services Q3', client: 'Acme Corporation', contact: 'Sarah Chen', status: 'Paid', amount: 12450, date: '15 Aug 2026', time: '09:00' },
  { id: 'INV-2024-0846', description: 'Container shipping', client: 'Global Trade Ltd', contact: 'Mark Williams', status: 'Overdue', amount: 8320.5, date: '02 Jul 2026', time: '14:30' },
  { id: 'INV-2024-0845', description: 'Freight forwarding', client: 'Nordic Imports AB', contact: 'Erik Johansson', status: 'Pending', amount: 3780, date: '28 Jul 2026', time: '11:00' },
  { id: 'INV-2024-0844', description: 'Customs clearance', client: 'Maritime Solutions', contact: 'Lisa Park', status: 'Failed', amount: 1200, date: '20 Jun 2026', time: '16:45' },
  { id: 'INV-2024-0843', description: 'Warehouse storage', client: 'Pacific Shipping Co', contact: 'James Miller', status: 'Paid', amount: 5640, date: '10 Jul 2026', time: '08:15' },
  { id: 'INV-2024-0842', description: 'Rate consultation', client: 'EuroFreight GmbH', contact: 'Hans Mueller', status: 'Draft', amount: 950, date: '25 Jul 2026', time: '10:30' },
]
const statuses = ['Paid', 'Overdue', 'Pending', 'Failed', 'Draft']
const numberFormat = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const getRowId = (row: Invoice) => row.id

type ExampleProps = { density?: TableDensity; loading?: boolean; empty?: boolean; disabledRow?: boolean; paginated?: boolean; tabbed?: boolean }
function InvoiceExample({ density = 'default', loading = false, empty = false, disabledRow = false, paginated = false, tabbed = false }: ExampleProps) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState<TableSort>()
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [page, setPage] = useState(1)
  const [detail, setDetail] = useState<Invoice>()
  const [created, setCreated] = useState<Invoice[]>([])
  const columns: TableColumn<Invoice>[] = [
    { id: 'id', header: 'Invoice', sortable: true, cell: row => <TableText secondary={row.description}>{row.id}</TableText> },
    { id: 'client', header: 'Client', sortable: true, cell: row => <TableText secondary={row.contact}>{row.client}</TableText> },
    { id: 'status', header: 'Status', cell: row => <StatusBadge label={row.status} status={row.status === 'Paid' ? 'success' : row.status === 'Overdue' ? 'warning' : row.status === 'Failed' ? 'error' : 'default'} showLeadingIcon={false} /> },
    { id: 'amount', header: 'Amount', sortable: true, align: 'left', cell: row => <span className="table-story__amount"><TableNumber>€ {numberFormat.format(row.amount)}</TableNumber></span> },
    { id: 'date', header: 'Due Date', sortable: true, cell: row => <TableDate time={row.time}>{row.date}</TableDate> },
    { id: 'actions', header: <span className="fretara-table__sr-only">Actions</span>, width: 80, align: 'right', cell: (row, { disabled }) => <TableActions disabled={disabled} label={`View ${row.id}`} onClick={() => setDetail(row)} /> },
  ]
  const filtered = useMemo(() => {
    if (empty) return []
    const rows = [...invoices, ...created].filter(row => (!filter || row.status === filter) && `${row.id} ${row.client} ${row.contact} ${row.description}`.toLowerCase().includes(query.toLowerCase()))
    if (sort) rows.sort((a, b) => {
      const key = sort.column as 'id' | 'client' | 'amount' | 'date'
      const comparison = key === 'amount' ? a.amount - b.amount : key === 'date' ? Date.parse(a.date) - Date.parse(b.date) : a[key].localeCompare(b[key])
      return sort.direction === 'ascending' ? comparison : -comparison
    })
    return rows
  }, [query, filter, sort, empty, created])
  const pageSize = paginated ? 2 : Math.max(6, filtered.length)
  const currentPage = Math.min(page, Math.max(1, Math.ceil(filtered.length / pageSize)))
  const rows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  return <div className="table-story">
    <DataTable label="Invoices" columns={columns} rows={rows} getRowId={getRowId} density={density} loading={loading} sort={sort} onSortChange={setSort} isRowDisabled={row => disabledRow && row.id === invoices[2].id}
      selection={{ selectedIds, onChange: setSelectedIds, getLabel: row => row.id }}
      toolbar={<TableToolbar title="Invoices" navigation={tabbed ? <Tabs label="Invoice status" value={filter || 'all'} onValueChange={value => { setFilter(value === 'all' ? '' : value); setPage(1) }} items={[{ value: 'all', label: 'All Invoices', count: invoices.length, content: <span className="fretara-table__sr-only">All invoices are shown in the table below.</span> }, { value: 'Paid', label: 'Paid', count: 2, content: <span className="fretara-table__sr-only">Paid invoices are shown in the table below.</span> }, { value: 'Pending', label: 'Pending', count: 1, content: <span className="fretara-table__sr-only">Pending invoices are shown in the table below.</span> }]} /> : undefined}
        search={{ value: query, onChange: event => { setQuery(event.target.value); setPage(1) } }}
        filters={<Dropdown aria-label="Filter by status" placeholder="Filter" value={filter} onValueChange={value => { setFilter(value); setPage(1) }} leadingIcon={<FilterIcon />} options={[{ value: '', label: 'Filter' }, ...statuses.map(value => ({ value, label: value }))]} />}
        actions={<Button type="button" variant="secondary" leadingIcon={<PlusIcon />} trailingIcon={<ChevronRightIcon />} onClick={() => setCreated(previous => [...previous, { ...invoices[5], id: `INV-NEW-${previous.length + 1}`, description: 'New invoice', status: 'Draft' }])}>Button</Button>} />}
      footer={<TableFooter page={currentPage} pageSize={pageSize} total={filtered.length} onPageChange={setPage} disabled={loading} />} />
    {selectedIds.size > 0 && <p className="body-12-medium" role="status">{selectedIds.size} selected</p>}
    {detail && <dialog open className="table-story__detail" aria-label="Invoice details"><TableText secondary={detail.description}>{detail.id} · {detail.client}</TableText><Button type="button" variant="secondary" onClick={() => setDetail(undefined)}>Close</Button></dialog>}
  </div>
}
const meta = {
  title: 'Fretara/Table', component: InvoiceExample, parameters: { layout: 'padded' },
  args: { density: 'default', loading: false, empty: false, disabledRow: false, paginated: false, tabbed: false },
  argTypes: { density: { control: 'select', options: ['compact', 'default', 'comfortable'] } },
} satisfies Meta<typeof InvoiceExample>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {}
export const InvoiceTable: Story = {}
export const Compact: Story = { args: { density: 'compact' } }
export const Comfortable: Story = { args: { density: 'comfortable' } }
export const Loading: Story = { args: { loading: true } }
export const Empty: Story = { args: { empty: true } }
export const DisabledRow: Story = { args: { disabledRow: true } }
export const Pagination: Story = { args: { paginated: true } }
export const TabbedToolbar: Story = { args: { tabbed: true } }
export const Narrow: Story = { decorators: [Story => <div style={{ maxWidth: 360 }}><Story /></div>] }
export const CellContents: Story = { render: () => <div className="table-story"><TableContainer><Table aria-label="Cell content patterns"><thead><tr><TableHeaderCell>Pattern</TableHeaderCell><TableHeaderCell>Content</TableHeaderCell></tr></thead><tbody>{[
  ['Text', <TableText>Cell value</TableText>], ['Two line', <TableText secondary="Secondary text">Primary text</TableText>],
  ['Date', <TableDate dateTime="2026-07-28T14:30" time="14:30">28 Jul 2026</TableDate>], ['Relative date', <TableRelativeDate>2 hours ago</TableRelativeDate>],
  ['Number', <TableNumber>1,234.56</TableNumber>], ['Currency', <TableCurrency amount="1,234.56" />], ['Percentage', <TablePercentage value="85.2" />],
  ['Icon text', <TableText icon={<PaperIcon />}>Document</TableText>], ['User', <TableUser name="John Doe" detail="john@example.com" />],
  ['Link', <TableLink href="#cell-patterns">View details</TableLink>], ['Empty', <TableEmptyValue />], ['Skeleton', <TableSkeleton />], ['Rating', <TableRating value={4} />],
  ['Checkbox', <Checkbox showLabel={false} aria-label="Select example" />], ['Actions', <TableActions label="Example actions" disabled />],
].map(([name, content]) => <TableRow key={String(name)}><TableCell>{name}</TableCell><TableCell>{content}</TableCell></TableRow>)}</tbody></Table></TableContainer></div> }
export const SelectionAndSorting: Story = {
  args: { disabledRow: true, paginated: true },
  play: async ({ canvasElement }) => {
    const settle = () => new Promise(resolve => setTimeout(resolve, 0))
    const checkbox = () => canvasElement.querySelector<HTMLInputElement>('thead input')!
    canvasElement.querySelector<HTMLInputElement>('tbody input')!.click()
    await settle()
    if (!checkbox().indeterminate) throw new Error('Partial selection must be indeterminate')
    checkbox().click(); await settle()
    if (!checkbox().checked || checkbox().indeterminate) throw new Error('Select all must select enabled page rows')
    canvasElement.querySelector<HTMLButtonElement>('[aria-label="Next page"]')!.click(); await settle()
    const disabled = canvasElement.querySelector<HTMLInputElement>('tbody input:disabled')
    if (!disabled || disabled.checked) throw new Error('Disabled rows must remain unselected')
    canvasElement.querySelector<HTMLButtonElement>('.fretara-table__sort')!.click(); await settle()
    if (!canvasElement.querySelector('th[aria-sort="ascending"]')) throw new Error('Sort must update accessible state')
  },
}

export const Structure: Story = {
  render: () => <div className="table-story"><TableContainer><Table aria-label="Table structure and row states">
    <thead><tr><TableHeaderCell>Left</TableHeaderCell><TableHeaderCell sort="ascending">Center</TableHeaderCell><TableHeaderCell sort="descending">Right</TableHeaderCell></tr></thead>
    <tbody>
      <TableRow><TableCell>Default row</TableCell><TableCell align="center">Centered</TableCell><TableCell align="right"><TableNumber>1,234.56</TableNumber></TableCell></TableRow>
      <TableRow selected><TableCell>Selected row</TableCell><TableCell align="center"><Checkbox showLabel={false} aria-label="Selected row example" checked readOnly /></TableCell><TableCell align="right"><TablePercentage value="85.2" /></TableCell></TableRow>
      <TableRow disabled><TableCell>Disabled row</TableCell><TableCell align="center"><Checkbox showLabel={false} aria-label="Disabled row example" disabled /></TableCell><TableCell align="right"><TableActions label="Disabled action" disabled /></TableCell></TableRow>
    </tbody>
  </Table></TableContainer></div>,
}
