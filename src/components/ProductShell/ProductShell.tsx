import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { BulletedListIcon, Dollar2Icon, UsersIcon } from '../../icons/line'
import type { DropdownOption } from '../Dropdown'
import { Navbar } from '../Navbar'
import { Sidebar, type SidebarNavigationItem } from '../Sidebar'
import './ProductShell.css'

const defaultNavigation: SidebarNavigationItem[] = [
  { id: 'quotations', label: 'Quotations', href: '/', icon: <BulletedListIcon /> },
  { id: 'margins', label: 'Margins', href: '#margins', icon: <Dollar2Icon /> },
  { id: 'customers', label: 'Customers', href: '/customers', icon: <UsersIcon /> },
]

const defaultWorkspaces: readonly DropdownOption[] = [
  { value: 'quotes', label: 'Quote / Tender management' },
]

export type ProductShellProps = {
  activeItemId?: string
  children: ReactNode
  mainClassName?: string
  navigationItems?: SidebarNavigationItem[]
  workspaceOptions?: readonly DropdownOption[]
} & HTMLAttributes<HTMLDivElement>

export function ProductShell({
  activeItemId,
  children,
  className,
  mainClassName,
  navigationItems = defaultNavigation,
  workspaceOptions = defaultWorkspaces,
  ...props
}: ProductShellProps) {
  const [collapsed, setCollapsed] = useState(false)

  return <div {...props} className={['fretara-product-shell', className].filter(Boolean).join(' ')}>
    <Sidebar items={navigationItems} activeItemId={activeItemId} collapsed={collapsed} onCollapsedChange={setCollapsed} />
    <div className={['fretara-product-shell__main', mainClassName].filter(Boolean).join(' ')}>
      <Navbar options={workspaceOptions} defaultValue={workspaceOptions[0]?.value} />
      {children}
    </div>
  </div>
}
