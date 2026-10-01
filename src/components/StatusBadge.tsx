import type { HTMLAttributes, ReactNode } from 'react'
import '../styles/tokens.css'
import '../styles/typography.css'
import './StatusBadge.css'

export type StatusBadgeStatus = 'default' | 'success' | 'warning' | 'error' | 'neutral' | 'blue' | 'disabled'

export type StatusBadgeProps = {
  type?: 'status' | 'badge'
  status?: StatusBadgeStatus
  label?: string
  showDot?: boolean
  showLeadingIcon?: boolean
  leadingIcon?: ReactNode
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children'>

const assets = import.meta.glob<string>('./assets/status-badge/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
})

/** Status/Badge — Figma component set 4601:2616. Non-interactive by default. */
export function StatusBadge({
  type = 'status',
  status = 'default',
  label = 'Label',
  showDot = true,
  showLeadingIcon = true,
  leadingIcon,
  className,
  ...props
}: StatusBadgeProps) {
  return (
    <span
      {...props}
      className={[
        'fretara-status-badge',
        'heading-12-bold',
        `fretara-status-badge--${type}`,
        `fretara-status-badge--${status}`,
        className,
      ].filter(Boolean).join(' ')}
    >
      {type === 'status' && showDot && (
        <img src={assets[`./assets/status-badge/${status}-dot.svg`]} alt="" aria-hidden="true" />
      )}
      {showLeadingIcon && (
        <span className="fretara-status-badge__icon" aria-hidden="true">
          {leadingIcon ?? <img src={assets[`./assets/status-badge/${status}-icon.svg`]} alt="" />}
        </span>
      )}
      <span>{label}</span>
    </span>
  )
}
