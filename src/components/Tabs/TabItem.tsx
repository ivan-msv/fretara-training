import type { ComponentPropsWithRef, ReactNode } from 'react'
import '../../styles/tokens.css'
import '../../styles/typography.css'
import './Tabs.css'

export type TabItemProps = Omit<ComponentPropsWithRef<'button'>, 'role' | 'aria-selected'> & {
  selected?: boolean
  leadingIcon?: ReactNode
  count?: string | number
}

export function TabItem({ selected = false, leadingIcon, count, children, className, ...props }: TabItemProps) {
  return (
    <button
      type="button"
      {...props}
      role="tab"
      aria-selected={selected}
      className={['fretara-tab', 'body-14-medium', className].filter(Boolean).join(' ')}
    >
      <span className="fretara-tab__content">
        {leadingIcon != null && leadingIcon !== false && <span className="fretara-tab__icon" aria-hidden="true">{leadingIcon}</span>}
        <span className="fretara-tab__label">{children}</span>
        {count != null && <span className="fretara-tab__count">{count}</span>}
      </span>
    </button>
  )
}
