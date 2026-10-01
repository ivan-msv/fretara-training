import type { HTMLAttributes, ReactNode } from 'react'
import { ArrowLeftIcon } from '../icons/line/ArrowLeftIcon'
import { MoreIcon } from '../icons/line/MoreIcon'
import { Button } from './Button'
import '../styles/tokens.css'
import '../styles/typography.css'
import './PageHeader.css'

export type PageHeaderProps = {
  title: string
  description?: string
  badge?: ReactNode
  status?: ReactNode
  onBack?: () => void
  primaryAction?: { label: string; onClick: () => void }
  secondaryAction?: { label: string; onClick: () => void }
  onMore?: () => void
  showBackButton?: boolean
  showBadge?: boolean
  showStatus?: boolean
  showDescription?: boolean
  showPrimaryButton?: boolean
  showSecondaryButton?: boolean
  showIconActions?: boolean
} & Omit<HTMLAttributes<HTMLElement>, 'title'>

export function PageHeader({
  title,
  description,
  badge,
  status,
  onBack,
  primaryAction,
  secondaryAction,
  onMore,
  showBackButton = true,
  showBadge = true,
  showStatus = true,
  showDescription = true,
  showPrimaryButton = true,
  showSecondaryButton = true,
  showIconActions = true,
  className,
  ...props
}: PageHeaderProps) {
  const hasSecondaryButton = showSecondaryButton && secondaryAction != null
  const hasPrimaryButton = showPrimaryButton && primaryAction != null
  const hasIconActions = showIconActions && onMore != null
  const hasTextActions = hasSecondaryButton || hasPrimaryButton

  return (
    <header {...props} className={['fretara-page-header', className].filter(Boolean).join(' ')}>
      {showBackButton && onBack && (
        <button className="fretara-page-header__back heading-14-bold" type="button" onClick={onBack}>
          <ArrowLeftIcon aria-hidden="true" />
          Back
        </button>
      )}
      <div className="fretara-page-header__content">
        <div className="fretara-page-header__summary">
          <div className="fretara-page-header__title-row">
            <h1 className="fretara-page-header__title heading-24-bold">{title}</h1>
            {showBadge && badge}
            {showStatus && status}
          </div>
          {showDescription && description && <p className="fretara-page-header__description body-14-medium">{description}</p>}
        </div>
        {(hasTextActions || hasIconActions) && (
          <div className="fretara-page-header__actions">
            {hasTextActions && (
              <div className="fretara-page-header__buttons">
                {hasSecondaryButton && <Button type="button" variant="secondary" onClick={secondaryAction.onClick}>{secondaryAction.label}</Button>}
                {hasPrimaryButton && <Button type="button" onClick={primaryAction.onClick}>{primaryAction.label}</Button>}
              </div>
            )}
            {hasIconActions && (
              <button className="fretara-page-header__more" type="button" aria-label="More actions" onClick={onMore}>
                <MoreIcon aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  )
}