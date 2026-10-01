import type { ComponentPropsWithRef, ReactNode } from 'react'
import { SearchIcon } from '../../icons/line'
import { Input, type InputProps } from '../Input/Input'
import './Table.css'

export type TableToolbarProps = Omit<ComponentPropsWithRef<'div'>, 'title'> & {
  title?: ReactNode
  /** A tab list or other navigation in place of the title. */
  navigation?: ReactNode
  search?: Omit<InputProps, 'leadingIcon' | 'type' | 'label'>
  filters?: ReactNode
  actions?: ReactNode
  compact?: boolean
}
export function TableToolbar({ title, navigation, search, filters, actions, compact = false, className, ...props }: TableToolbarProps) {
  return <div {...props} className={['fretara-table-toolbar', className].filter(Boolean).join(' ')} data-compact={compact || undefined} data-navigation={Boolean(navigation) || undefined}>
    {navigation ?? <h2 className="heading-16-bold">{title}</h2>}
    <div className="fretara-table-toolbar__options">{search && <div className="fretara-table-toolbar__search"><Input {...search} aria-label={search['aria-label'] ?? 'Search table'} placeholder={search.placeholder ?? 'Search...'} type="search" leadingIcon={<SearchIcon width={16} height={16} />} /></div>}{filters}{actions}</div>
  </div>
}
