import { useEffect, useRef, useState } from 'react'
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { CheckmarkCircleFillIcon } from '../../icons/fill'
import { InfoCircleIcon, LinkIcon, WarningErrorIcon, XmarkCloseIcon } from '../../icons/line'
import '../../styles/tokens.css'
import '../../styles/typography.css'
import './Toast.css'

export type ToastState = 'success' | 'error' | 'warning' | 'information'

export type ToastProps = {
  state?: ToastState
  title?: ReactNode
  children: ReactNode
  showAction?: boolean
  actionLabel?: ReactNode
  onAction?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  onDismiss?: () => void
  dismissLabel?: string
  icon?: ReactNode
} & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'title'>

const defaultIcons: Record<ToastState, ReactNode> = {
  success: <CheckmarkCircleFillIcon />,
  error: <WarningErrorIcon />,
  warning: <WarningErrorIcon />,
  information: <InfoCircleIcon />,
}

/** Toast — Figma component set 5610:15119. Place inside ToastViewport. */
export function Toast({
  state = 'success',
  title,
  children,
  showAction = false,
  actionLabel = 'Button',
  onAction,
  onDismiss,
  dismissLabel = 'Dismiss notification',
  icon,
  className,
  role,
  ...props
}: ToastProps) {
  const [visible, setVisible] = useState(true)
  const onDismissRef = useRef(onDismiss)

  useEffect(() => {
    onDismissRef.current = onDismiss
  }, [onDismiss])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setVisible(false)
      onDismissRef.current?.()
    }, 5000)

    return () => window.clearTimeout(timeout)
  }, [])

  if (!visible) return null

  const dismiss = () => {
    setVisible(false)
    onDismiss?.()
  }

  return (
    <div
      {...props}
      className={['fretara-toast', `fretara-toast--${state}`, className].filter(Boolean).join(' ')}
      role={role ?? (state === 'error' ? 'alert' : 'status')}
    >
      <span className="fretara-toast__icon" aria-hidden="true">{icon ?? defaultIcons[state]}</span>
      <span className="fretara-toast__body">
        <span className="fretara-toast__copy">
          {title != null && <span className="fretara-toast__title heading-14-bold">{title}</span>}
          <span className="fretara-toast__description body-12-medium">{children}</span>
        </span>
        {showAction && (
          <button className="fretara-toast__action heading-12-bold" type="button" onClick={onAction}>
            <span>{actionLabel}</span>
            <LinkIcon aria-hidden="true" />
          </button>
        )}
      </span>
      <button className="fretara-toast__dismiss" type="button" onClick={dismiss} aria-label={dismissLabel}>
        <XmarkCloseIcon aria-hidden="true" />
      </button>
    </div>
  )
}

export type ToastViewportProps = HTMLAttributes<HTMLDivElement>

/** Fixed bottom-right live region for one or more Toast components. */
export function ToastViewport({ className, ...props }: ToastViewportProps) {
  return (
    <div
      {...props}
      className={['fretara-toast-viewport', className].filter(Boolean).join(' ')}
      aria-live={props['aria-live'] ?? 'polite'}
      aria-relevant={props['aria-relevant'] ?? 'additions text'}
    />
  )
}
