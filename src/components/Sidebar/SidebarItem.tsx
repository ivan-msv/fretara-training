import type { MouseEventHandler, ReactNode } from 'react'
import { ChevronRightIcon } from '../../icons/line'

export type SidebarNavigationItem = {
  id: string
  label: string
  href: string
  icon?: ReactNode
  children?: SidebarNavigationItem[]
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export type SidebarItemProps = {
  item: SidebarNavigationItem
  activeItemId?: string
  collapsed?: boolean
  level?: 1 | 2
}

export function SidebarItem({
  item,
  activeItemId,
  collapsed = false,
  level = 1,
}: SidebarItemProps) {
  const active = item.id === activeItemId
  const hasChildren = Boolean(item.children?.length)

  return (
    <li className="fretara-sidebar-item">
      <a
        className="fretara-sidebar-item__link body-14-medium"
        href={item.href}
        onClick={item.onClick}
        aria-current={active ? 'page' : undefined}
        aria-label={collapsed ? item.label : undefined}
        title={collapsed ? item.label : undefined}
        data-level={level}
      >
        {level === 1 && item.icon != null && item.icon !== false && (
          <span className="fretara-sidebar-item__icon" aria-hidden="true">
            {item.icon}
          </span>
        )}
        {!collapsed && (
          <>
            <span className="fretara-sidebar-item__label">{item.label}</span>
            {level === 1 && hasChildren && (
              <ChevronRightIcon className="fretara-sidebar-item__chevron" aria-hidden="true" />
            )}
          </>
        )}
      </a>

      {!collapsed && hasChildren && (
        <ul className="fretara-sidebar-item__children">
          {item.children?.map(child => (
            <SidebarItem
              key={child.id}
              item={child}
              activeItemId={activeItemId}
              level={2}
            />
          ))}
        </ul>
      )}
    </li>
  )
}
