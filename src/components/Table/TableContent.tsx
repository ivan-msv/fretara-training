import type { ComponentPropsWithRef, ReactNode } from 'react'
import { MoreIcon, StarIcon, UserPersonrIcon } from '../../icons/line'
import { StarFillIcon } from '../../icons/fill'
import '../../styles/tokens.css'
import './Table.css'

export function TableText({ children, secondary, icon, className, ...props }: ComponentPropsWithRef<'span'> & { secondary?: ReactNode; icon?: ReactNode }) {
  return <span {...props} className={['fretara-table-content', className].filter(Boolean).join(' ')}>{icon && <span className="fretara-table-content__icon" aria-hidden="true">{icon}</span>}<span className="fretara-table-content__lines"><span>{children}</span>{secondary != null && <span className="fretara-table-content__secondary">{secondary}</span>}</span></span>
}
export function TableDate({ children, time, ...props }: ComponentPropsWithRef<'time'> & { time?: string }) {
  return <time {...props}><TableText secondary={time}>{children}</TableText></time>
}
export function TableRelativeDate(props: ComponentPropsWithRef<'time'>) {
  return <time {...props} className={['fretara-table-content__relative', props.className].filter(Boolean).join(' ')} />
}
export function TableNumber(props: ComponentPropsWithRef<'span'>) {
  return <span {...props} className={['fretara-table-content__number', props.className].filter(Boolean).join(' ')} />
}
/** Pass an already-localized amount; formatting belongs to the application's locale. */
export function TableCurrency({ amount, symbol = '$' }: { amount: string; symbol?: string }) {
  return <span className="fretara-table-content__currency"><span>{symbol}</span><TableNumber>{amount}</TableNumber></span>
}
export function TablePercentage({ value }: { value: string | number }) {
  return <span className="fretara-table-content__percentage"><TableNumber>{value}</TableNumber><span>%</span></span>
}
export function TableUser({ name, detail, avatar }: { name: string; detail?: string; avatar?: string }) {
  return <span className="fretara-table-content__user"><span className="fretara-table-content__avatar">{avatar ? <img src={avatar} alt="" /> : <UserPersonrIcon width={16} height={16} />}</span><TableText secondary={detail}>{name}</TableText></span>
}
export function TableLink(props: ComponentPropsWithRef<'a'>) {
  return <a {...props} className={['fretara-table-content__link', props.className].filter(Boolean).join(' ')} />
}
export function TableEmptyValue({ label = 'No value' }: { label?: string }) {
  return <span className="fretara-table-content__empty" aria-label={label}>—</span>
}
export function TableSkeleton() {
  return <span className="fretara-table-content__skeleton" aria-hidden="true" />
}
export function TableRating({ value }: { value: number }) {
  const rating = Number.isFinite(value) ? Math.max(0, Math.min(5, value)) : 0
  return <span className="fretara-table-content__rating" role="img" aria-label={`${rating.toFixed(1)} out of 5 stars`}><span aria-hidden="true">{Array.from({ length: 5 }, (_, index) => index < Math.round(rating) ? <StarFillIcon key={index} width={10} height={10} /> : <StarIcon key={index} width={10} height={10} />)}</span><span aria-hidden="true">{rating.toFixed(1)}</span></span>
}
export function TableActions({ label, className, ...props }: Omit<ComponentPropsWithRef<'button'>, 'children' | 'aria-label'> & { label: string }) {
  return <button {...props} type={props.type ?? 'button'} aria-label={label} className={['fretara-table-content__actions', className].filter(Boolean).join(' ')}><MoreIcon width={20} height={20} /></button>
}
