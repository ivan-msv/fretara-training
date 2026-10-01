import type { ComponentPropsWithRef, ReactNode } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '../../icons/line'
import './Table.css'

export type TableFooterProps = ComponentPropsWithRef<'div'> & {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  summary?: ReactNode
  disabled?: boolean
}
export function TableFooter({ page, pageSize, total, onPageChange, summary, disabled, className, ...props }: TableFooterProps) {
  const size = Number.isFinite(pageSize) ? Math.max(1, Math.floor(pageSize)) : 1
  const count = Number.isFinite(total) ? Math.max(0, Math.floor(total)) : 0
  const pages = Math.max(1, Math.ceil(count / size))
  const current = Math.min(pages, Math.max(1, Number.isFinite(page) ? Math.floor(page) : 1))
  const start = Math.max(1, Math.min(current - 1, pages - 2))
  return <div {...props} className={['fretara-table-footer', className].filter(Boolean).join(' ')}>
    <span role="status">{summary ?? `Showing ${count ? (current - 1) * size + 1 : 0}–${Math.min(current * size, count)} of ${count} results`}</span>
    <nav aria-label="Table pagination"><button type="button" aria-label="Previous page" disabled={disabled || current === 1} onClick={() => onPageChange(current - 1)}><ChevronLeftIcon width={16} height={16} /></button>
      {Array.from({ length: Math.min(3, pages) }, (_, index) => start + index).map(number => <button key={number} type="button" aria-label={`Page ${number}`} aria-current={number === current ? 'page' : undefined} disabled={disabled} onClick={() => { if (number !== current) onPageChange(number) }}>{number}</button>)}
      <button type="button" aria-label="Next page" disabled={disabled || current === pages} onClick={() => onPageChange(current + 1)}><ChevronRightIcon width={16} height={16} /></button></nav>
  </div>
}
