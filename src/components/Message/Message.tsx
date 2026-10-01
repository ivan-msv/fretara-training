import type { HTMLAttributes, ReactNode } from 'react'
import { WarningErrorIcon, XmarkCloseIcon } from '../../icons/line'
import '../../styles/tokens.css'
import '../../styles/typography.css'
import './Message.css'

export type MessageState = 'error' | 'warning' | 'success' | 'info' | 'neutral'

export type MessageProps = {
  state?: MessageState
  heading: ReactNode
  children?: ReactNode
  icon?: ReactNode
  onDismiss?: () => void
  dismissLabel?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title'>

/** Message — Figma component set 4854:3003. */
export function Message({
  state = 'neutral',
  heading,
  children,
  icon,
  onDismiss,
  dismissLabel = 'Dismiss message',
  className,
  role,
  ...props
}: MessageProps) {
  const messageRole = role ?? (state === 'error' || state === 'warning' ? 'alert' : 'status')

  return (
    <div
      {...props}
      className={['fretara-message', `fretara-message--${state}`, className].filter(Boolean).join(' ')}
      role={messageRole}
    >
      <span className="fretara-message__icon" aria-hidden="true">
        {icon ?? <WarningErrorIcon />}
      </span>
      <span className="fretara-message__content">
        <span className="fretara-message__heading heading-14-bold">{heading}</span>
        {children != null && <span className="fretara-message__description body-12-medium">{children}</span>}
      </span>
      {onDismiss && (
        <button className="fretara-message__dismiss" type="button" onClick={onDismiss} aria-label={dismissLabel}>
          <XmarkCloseIcon />
        </button>
      )}
    </div>
  )
}
