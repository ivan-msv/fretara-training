import type { HTMLAttributes } from 'react'
import { CollapseIcon, ExpandIcon } from '../../icons/line'
import '../../styles/tokens.css'
import '../../styles/typography.css'
import fretaraMark from './assets/fretara-mark.svg'
import { SidebarItem, type SidebarNavigationItem } from './SidebarItem'
import './Sidebar.css'

export type SidebarProps = {
  items: SidebarNavigationItem[]
  activeItemId?: string
  collapsed?: boolean
  label?: string
  onCollapsedChange?: (collapsed: boolean) => void
} & Omit<HTMLAttributes<HTMLElement>, 'aria-label'>

export function Sidebar({
  items,
  activeItemId,
  collapsed = false,
  label = 'Primary navigation',
  onCollapsedChange,
  className,
  ...props
}: SidebarProps) {
  return (
    <aside
      {...props}
      className={['fretara-sidebar', className].filter(Boolean).join(' ')}
      data-collapsed={collapsed || undefined}
    >
      <header className="fretara-sidebar__header">
        {collapsed ? (
          <button
            className="fretara-sidebar__expand"
            type="button"
            aria-label="Expand sidebar"
            aria-expanded="false"
            onClick={() => onCollapsedChange?.(false)}
          >
            <img className="fretara-sidebar__mark" src={fretaraMark} alt="" />
            <ExpandIcon className="fretara-sidebar__expand-icon" aria-hidden="true" />
          </button>
        ) : (
          <div className="fretara-sidebar__brand-row">
            <a className="fretara-sidebar__brand" href="/" aria-label="Fretara home">
              <img className="fretara-sidebar__mark" src={fretaraMark} alt="" />
              <span className="fretara-sidebar__wordmark">Fretara</span>
            </a>
            <button
              className="fretara-sidebar__collapse"
              type="button"
              aria-label="Collapse sidebar"
              aria-expanded="true"
              onClick={() => onCollapsedChange?.(true)}
            >
              <CollapseIcon aria-hidden="true" />
            </button>
          </div>
        )}
      </header>

      <nav className="fretara-sidebar__navigation" aria-label={label}>
        <ul className="fretara-sidebar__list">
          {items.map(item => (
            <SidebarItem
              key={item.id}
              item={item}
              activeItemId={activeItemId}
              collapsed={collapsed}
            />
          ))}
        </ul>
      </nav>
    </aside>
  )
}
