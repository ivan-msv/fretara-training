import { type ComponentPropsWithRef, type ReactNode } from 'react'
import { ArrowDownIcon, ArrowUpIcon, InfoCircleIcon } from '../../icons/line'
import { Checkbox } from '../Checkbox/Checkbox'
import { TableSkeleton } from './TableContent'
import '../../styles/tokens.css'
import '../../styles/typography.css'
import './Table.css'

export type TableDensity = 'compact' | 'default' | 'comfortable'
export type TableAlignment = 'left' | 'center' | 'right'
export type TableSort = { column: string; direction: 'ascending' | 'descending' }
const classes = (...values: (string | undefined)[]) => values.filter(Boolean).join(' ')

export function TableContainer({ className, ...props }: ComponentPropsWithRef<'div'>) {
  return <div {...props} className={classes('fretara-table-container', className)} />
}
export function Table({ density = 'default', className, ...props }: ComponentPropsWithRef<'table'> & { density?: TableDensity }) {
  return <table {...props} data-density={density} className={classes('fretara-table', className)} />
}
export function TableRow({ selected = false, disabled = false, className, ...props }: ComponentPropsWithRef<'tr'> & { selected?: boolean; disabled?: boolean }) {
  return <tr {...props} aria-selected={selected || undefined} aria-disabled={disabled || undefined} className={classes('fretara-table__row', className)} />
}
export function TableHeaderCell({ sort, onSort, children, className, ...props }: ComponentPropsWithRef<'th'> & { sort?: TableSort['direction']; onSort?: () => void }) {
  const content = <><span>{children}</span>{sort && (sort === 'ascending'
    ? <ArrowUpIcon width={12} height={12} />
    : <ArrowDownIcon width={12} height={12} />)}</>
  return (
    <th {...props} scope={props.scope ?? 'col'} aria-sort={sort ?? (onSort ? 'none' : undefined)} className={classes('fretara-table__header', className)}>
      {onSort
        ? <button type="button" className="fretara-table__sort" onClick={onSort}>{content}</button>
        : <span className="fretara-table__header-content">{content}</span>}
    </th>
  )
}
export function TableCell({ align = 'left', className, ...props }: Omit<ComponentPropsWithRef<'td'>, 'align'> & { align?: TableAlignment }) {
  return <td {...props} data-align={align} className={classes('fretara-table__cell', className)} />
}
export function TableEmptyState({ title = 'No results found', description = 'Try adjusting your search or filter criteria.' }: { title?: string; description?: ReactNode }) {
  return <div className="fretara-table__empty" role="status"><span className="fretara-table__empty-icon"><InfoCircleIcon /></span><strong>{title}</strong><span>{description}</span></div>
}
export type TableColumn<T> = {
  id: string
  header: ReactNode
  cell: (row: T, context: { disabled: boolean }) => ReactNode
  width?: number | string
  align?: TableAlignment
  sortable?: boolean
}
export type DataTableProps<T> = Omit<ComponentPropsWithRef<'table'>, 'children'> & {
  columns: readonly TableColumn<T>[]
  rows: readonly T[]
  getRowId: (row: T) => string
  /** Accessible name for the table and its horizontal scroll region. */
  label: string
  density?: TableDensity
  toolbar?: ReactNode
  footer?: ReactNode
  sort?: TableSort
  onSortChange?: (sort: TableSort) => void
  selection?: { selectedIds: ReadonlySet<string>; onChange: (ids: Set<string>) => void; getLabel: (row: T) => string }
  isRowDisabled?: (row: T) => boolean
  loading?: boolean
  loadingRows?: number
  emptyState?: ReactNode
}

/** Rendering only: callers own filtering, sorting and pagination, including remote data. */
export function DataTable<T>({ columns, rows, getRowId, label, density, toolbar, footer, sort, onSortChange, selection, isRowDisabled, loading = false, loadingRows = 5, emptyState, ...props }: DataTableProps<T>) {
  const selectableIds = selection ? rows.filter(row => !isRowDisabled?.(row)).map(getRowId) : []
  const selectedCount = selection ? selectableIds.reduce((count, id) => count + Number(selection.selectedIds.has(id)), 0) : 0
  const allSelected = selectableIds.length > 0 && selectedCount === selectableIds.length
  const mixed = selectedCount > 0 && !allSelected
  const columnCount = columns.length + Number(Boolean(selection))
  function toggle(id: string) {
    if (!selection) return
    const next = new Set(selection.selectedIds)
    if (next.has(id)) next.delete(id); else next.add(id)
    selection.onChange(next)
  }
  return <TableContainer>
    {toolbar}
    <div className="fretara-table__scroll" role="region" aria-label={`${label} table`} tabIndex={0}>
      <Table {...props} aria-label={label} aria-busy={loading} density={density}>
        <colgroup>{selection && <col style={{ width: 48 }} />}{columns.map(column => <col key={column.id} style={{ width: column.width }} />)}</colgroup>
        <thead><tr>{selection && <TableHeaderCell className="fretara-table__selection"><Checkbox showLabel={false} aria-label="Select all rows on this page" checked={allSelected} disabled={loading || !selectableIds.length} aria-checked={mixed ? 'mixed' : allSelected} ref={node => { if (node) node.indeterminate = mixed }} onChange={() => {
          const next = new Set(selection.selectedIds)
          selectableIds.forEach(id => { if (allSelected) next.delete(id); else next.add(id) })
          selection.onChange(next)
        }} /></TableHeaderCell>}{columns.map(column => <TableHeaderCell key={column.id} sort={sort?.column === column.id ? sort.direction : undefined} onSort={column.sortable && onSortChange && !loading ? () => onSortChange({ column: column.id, direction: sort?.column === column.id && sort.direction === 'ascending' ? 'descending' : 'ascending' }) : undefined}>{column.header}</TableHeaderCell>)}</tr></thead>
        <tbody>{loading ? Array.from({ length: Number.isFinite(loadingRows) ? Math.max(1, Math.floor(loadingRows)) : 5 }, (_, index) => <TableRow key={index} aria-hidden="true">{selection && <TableCell />}{columns.map(column => <TableCell key={column.id}><TableSkeleton /></TableCell>)}</TableRow>) : rows.length ? rows.map(row => {
          const id = getRowId(row)
          const disabled = isRowDisabled?.(row) ?? false
          return <TableRow key={id} selected={selection?.selectedIds.has(id)} disabled={disabled}>{selection && <TableCell className="fretara-table__selection"><Checkbox showLabel={false} aria-label={`Select ${selection.getLabel(row)}`} disabled={disabled} checked={selection.selectedIds.has(id)} onChange={() => toggle(id)} /></TableCell>}{columns.map(column => <TableCell key={column.id} align={column.align}>{column.cell(row, { disabled })}</TableCell>)}</TableRow>
        }) : <tr><td colSpan={Math.max(1, columnCount)} className="fretara-table__state">{emptyState ?? <TableEmptyState />}</td></tr>}</tbody>
      </Table>
    </div>
    <span className="fretara-table__sr-only" role="status">{loading ? 'Loading results' : ''}</span>
    {footer}
  </TableContainer>
}
