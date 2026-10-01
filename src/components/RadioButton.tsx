import { useId, type ComponentPropsWithRef } from 'react'
import '../styles/tokens.css'
import '../styles/typography.css'
import './RadioButton.css'

export type RadioButtonProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'children'> & {
  labelText?: string
  descriptionText?: string
  errorText?: string
  showLabel?: boolean
  showDescription?: boolean
  showErrorMessage?: boolean
  showRequired?: boolean
  invalid?: boolean
}

export function RadioButton({
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
}: RadioButtonProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const descriptionIds = [
    describedBy,
    showDescription && `${inputId}-description`,
    showErrorMessage && `${inputId}-error`,
  ].filter(Boolean).join(' ') || undefined

  return (
    <label
      className={['fretara-radio-button', className].filter(Boolean).join(' ')}
      data-disabled={disabled || undefined}
      htmlFor={inputId}
    >
      <input
        {...props}
        id={inputId}
        className="fretara-radio-button__control"
        type="radio"
        checked={checked}
        defaultChecked={defaultChecked}
        readOnly={readOnly}
        disabled={disabled}
        required={required}
        aria-label={ariaLabel ?? labelText}
        aria-invalid={invalid ? true : ariaInvalid}
        aria-describedby={descriptionIds}
      />
      {(showLabel || showDescription || showErrorMessage) && (
        <span className="fretara-radio-button__content">
          {showLabel && (
            <span className="fretara-radio-button__label body-14-medium">
              <span>{labelText}</span>
              {(showRequired || required) && <span className="fretara-radio-button__required" aria-hidden="true">*</span>}
            </span>
          )}
          {showDescription && <span id={`${inputId}-description`} className="fretara-radio-button__description body-12-medium">{descriptionText}</span>}
          {showErrorMessage && <span id={`${inputId}-error`} className="fretara-radio-button__error body-12-medium">{errorText}</span>}
        </span>
      )}
    </label>
  )
}
