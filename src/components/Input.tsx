import { useId, type ComponentPropsWithRef, type ReactNode } from 'react'
import { InfoCircleFillIcon } from '../icons/fill/InfoCircleFillIcon'
import '../styles/tokens.css'
import '../styles/typography.css'
import './Input.css'

export type InputProps = Omit<ComponentPropsWithRef<'input'>, 'children'> & {
  label?: string
  status?: 'error' | 'warning' | 'success' | 'not-enquiry'
  /** Decorative icon; pass a Fretara icon component. */
  leadingIcon?: ReactNode
  unit?: string
}

export function Input({
  label,
  status,
  leadingIcon,
  unit,
  id,
  className,
  'aria-describedby': describedBy,
  'aria-invalid': ariaInvalid,
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const descriptionIds = [
    describedBy,
    unit && `${inputId}-unit`,
    status === 'not-enquiry' && label && `${inputId}-status`,
  ].filter(Boolean).join(' ') || undefined

  return (
    <div className="fretara-input" data-status={status}>
      {label && (
        <label className="fretara-input__label heading-14-bold" htmlFor={inputId}>
          {label}
          {props.required && <span className="fretara-input__required" aria-hidden="true">*</span>}
          {status === 'not-enquiry' && (
            <InfoCircleFillIcon
              id={`${inputId}-status`}
              className="fretara-input__info"
              width={16}
              height={16}
              aria-label="Not Enquiry"
            />
          )}
        </label>
      )}
      <div className="fretara-input__field">
        {leadingIcon != null && leadingIcon !== false && (
          <span className="fretara-input__icon" aria-hidden="true">{leadingIcon}</span>
        )}
        <input
          {...props}
          id={inputId}
          className={['fretara-input__control', 'body-14-medium', className].filter(Boolean).join(' ')}
          aria-invalid={status === 'error' ? true : ariaInvalid}
          aria-describedby={descriptionIds}
        />
        {unit && <span id={`${inputId}-unit`} className="fretara-input__unit body-14-medium">{unit}</span>}
      </div>
    </div>
  )
}
