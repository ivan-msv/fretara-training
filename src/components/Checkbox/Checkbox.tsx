import { useId, type ComponentPropsWithRef } from 'react'
import '../../styles/tokens.css'
import '../../styles/typography.css'
import './Checkbox.css'

export type CheckboxProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'children'> & {
  labelText?: string
  descriptionText?: string
  errorText?: string
  showLabel?: boolean
  showDescription?: boolean
  showErrorMessage?: boolean
  showRequired?: boolean
  invalid?: boolean
}

export function Checkbox({
  labelText = 'Label',
  descriptionText = 'Helper text',
  errorText = 'Error message',
  showLabel = true,
  showDescription = false,
  showErrorMessage = false,
  showRequired = false,
  invalid = false,
  disabled = false,
  required = false,
  className,
  id,
  checked,
  defaultChecked,
  readOnly,
  'aria-describedby': describedBy,
  'aria-label': ariaLabel,
  'aria-invalid': ariaInvalid,
  ...props
}: CheckboxProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const descriptionIds = [
    describedBy,
    showDescription && `${inputId}-description`,
    showErrorMessage && `${inputId}-error`,
  ].filter(Boolean).join(' ') || undefined

  return (
    <label
      className={['fretara-checkbox', className].filter(Boolean).join(' ')}
      data-disabled={disabled || undefined}
      htmlFor={inputId}
    >
      <input
        {...props}
        id={inputId}
        className="fretara-checkbox__control"
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        readOnly={readOnly}
        disabled={disabled}
        required={required}
        aria-label={ariaLabel ?? (showLabel ? undefined : labelText)}
        aria-invalid={invalid ? true : ariaInvalid}
        aria-describedby={descriptionIds}
      />
      {(showLabel || showDescription || showErrorMessage) && (
        <span className="fretara-checkbox__content">
          {showLabel && (
            <span className="fretara-checkbox__label body-14-medium">
              <span>{labelText}</span>
              {(showRequired || required) && <span className="fretara-checkbox__required" aria-hidden="true">*</span>}
            </span>
          )}
          {showDescription && <span id={`${inputId}-description`} className="fretara-checkbox__description body-12-medium">{descriptionText}</span>}
          {showErrorMessage && <span id={`${inputId}-error`} className="fretara-checkbox__error body-12-medium">{errorText}</span>}
        </span>
      )}
    </label>
  )
}
