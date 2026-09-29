import type { ButtonHTMLAttributes, ReactNode } from 'react'
import '../styles/tokens.css'
import '../styles/typography.css'
import './Button.css'

export type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
  shape?: 'rounded' | 'pill'
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  variant = 'primary',
  shape = 'rounded',
  leadingIcon,
  trailingIcon,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={[
        'fretara-button',
        'button-14-bold',
        `fretara-button--${variant}`,
        `fretara-button--${variant === 'link' ? 'rounded' : shape}`,
        className,
      ].filter(Boolean).join(' ')}
    >
      {leadingIcon != null && leadingIcon !== false && (
        <span className="fretara-button__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      <span className="fretara-button__label">{children}</span>
      {trailingIcon != null && trailingIcon !== false && (
        <span className="fretara-button__icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </button>
  )
}
