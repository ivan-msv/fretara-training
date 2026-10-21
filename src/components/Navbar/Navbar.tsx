import type { HTMLAttributes, MouseEventHandler } from 'react'
import { TextAiIcon } from '../../icons/line'
import { Dropdown, type DropdownOption } from '../Dropdown/Dropdown'
import '../../styles/tokens.css'
import '../../styles/typography.css'
import logoutIcon from './assets/logout.svg'
import './Navbar.css'

export type NavbarProps = {
  options: readonly DropdownOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  selectorLabel?: string
  logoutLabel?: string
  logoutDisabled?: boolean
  onLogout?: MouseEventHandler<HTMLButtonElement>
} & Omit<HTMLAttributes<HTMLElement>, 'onChange'>

export function Navbar({
  options,
  value,
  defaultValue,
  onValueChange,
  selectorLabel = 'Choose workspace',
  logoutLabel = 'Logout',
  logoutDisabled = false,
  onLogout,
  className,
  ...props
}: NavbarProps) {
  return (
    <header {...props} className={['fretara-navbar', className].filter(Boolean).join(' ')}>
      <Dropdown
        className="fretara-navbar__workspace"
        options={options}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        placeholder={selectorLabel}
        aria-label={selectorLabel}
        leadingIcon={<TextAiIcon width={20} height={20} />}
      />

      <button
        className="fretara-navbar__logout body-12-medium"
        type="button"
        disabled={logoutDisabled}
        onClick={onLogout}
      >
        <img src={logoutIcon} alt="" aria-hidden="true" />
        <span>{logoutLabel}</span>
      </button>
    </header>
  )
}
