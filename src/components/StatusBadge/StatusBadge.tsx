import type { HTMLAttributes, ReactNode } from 'react'
import '../../styles/tokens.css'
import '../../styles/typography.css'
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

function StatusBadgeBellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.50381 12.1136H12.291C12.8122 12.1136 13.1282 11.8475 13.1282 11.4428C13.1282 10.8884 12.5627 10.3894 12.0859 9.89605C11.72 9.51347 11.6202 8.72624 11.5759 8.08869C11.5371 5.9598 10.9716 4.49619 9.49684 3.96396C9.28622 3.2377 8.71517 2.66667 7.89465 2.66667C7.07969 2.66667 6.50311 3.2377 6.29798 3.96396C4.82328 4.49619 4.25779 5.9598 4.21899 8.08869C4.17463 8.72624 4.07484 9.51347 3.70894 9.89605C3.22661 10.3894 2.66667 10.8884 2.66667 11.4428C2.66667 11.8475 2.97713 12.1136 3.50381 12.1136ZM7.89465 14.3368C8.83711 14.3368 9.5246 13.6493 9.59664 12.8732H6.19819C6.27026 13.6493 6.95772 14.3368 7.89465 14.3368Z"
        fill="currentColor"
      />
    </svg>
  )
}

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
        <span className="fretara-status-badge__dot" aria-hidden="true" />
      )}
      {showLeadingIcon && (
        <span className="fretara-status-badge__icon" aria-hidden="true">
          {leadingIcon ?? <StatusBadgeBellIcon />}
        </span>
      )}
      <span>{label}</span>
    </span>
  )
}
