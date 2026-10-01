import { useEffect, useId, useLayoutEffect, useRef, useState, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDownIcon, CheckmarkIcon } from '../../icons/line'
import '../../styles/tokens.css'
import '../../styles/typography.css'
import './Dropdown.css'

export type DropdownOption = { value: string; label: string; disabled?: boolean }
type Selection =
  | { multiple: true; value?: string[]; defaultValue?: string[]; onValueChange?: (value: string[]) => void; indicator?: never }
  | { multiple?: false; value?: string; defaultValue?: string; onValueChange?: (value: string) => void; indicator?: 'none' | 'radio' }
export type DropdownProps = Selection & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'defaultValue' | 'onChange' | 'children' | 'type' | 'aria-expanded' | 'aria-controls' | 'aria-activedescendant' | 'role'> & {
  options: readonly DropdownOption[]
  label?: string
  placeholder?: string
  leadingIcon?: ReactNode
}

/** Select-only combobox. Focus stays on the trigger while navigating its listbox. */
export function Dropdown(props: DropdownProps) {
  const { options, label, placeholder = 'Select an option', leadingIcon, multiple, indicator = 'none', value, defaultValue, onValueChange, disabled, id, className, style, onClick, onKeyDown, onBlur, 'aria-label': ariaLabel, 'aria-labelledby': labelledBy, ...buttonProps } = props
  const generatedId = useId()
  const inputId = id ?? generatedId
  const listId = `${inputId}-listbox`
  const [internalValue, setInternalValue] = useState<string | string[]>(defaultValue ?? (multiple ? [] : ''))
  const selection = value ?? internalValue
  const selected = (option: DropdownOption) => Array.isArray(selection) ? selection.includes(option.value) : selection === option.value
  const selectedOptions = options.filter(selected)
  const [open, setOpen] = useState(false)
  const expanded = open && !disabled
  const [active, setActive] = useState(-1)
  const [position, setPosition] = useState<CSSProperties>({})
  const trigger = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const search = useRef({ text: '', time: 0 })
  const enabled = options.map((option, index) => option.disabled ? -1 : index).filter(index => index >= 0)
  const activeOption = options[active] && !options[active].disabled ? active : -1

  function show(last = false) {
    const current = options.findIndex(option => selected(option) && !option.disabled)
    setActive(current >= 0 ? current : (last ? enabled.at(-1) : enabled[0]) ?? -1)
    setOpen(true)
  }
  function choose(index: number) {
    const option = options[index]
    if (!option || option.disabled || disabled) return
    if (props.multiple) {
      const previous = Array.isArray(selection) ? selection : []
      const next = previous.includes(option.value) ? previous.filter(v => v !== option.value) : [...previous, option.value]
      if (value === undefined) setInternalValue(next)
      if (onValueChange) props.onValueChange?.(next)
    } else {
      if (value === undefined) setInternalValue(option.value)
      if (onValueChange) props.onValueChange?.(option.value)
      setOpen(false)
    }
  }

  useLayoutEffect(() => {
    if (!expanded) return
    function place() {
      const rect = trigger.current?.getBoundingClientRect()
      if (!rect) return
      const below = window.innerHeight - rect.bottom - 12
      const above = rect.top - 12
      const height = menu.current?.scrollHeight ?? 0
      const upwards = below < height && above > below
      setPosition({ left: Math.max(8, Math.min(rect.left, window.innerWidth - rect.width - 8)), width: Math.min(rect.width, window.innerWidth - 16), maxHeight: Math.max(0, upwards ? above : below), top: upwards ? undefined : rect.bottom + 4, bottom: upwards ? window.innerHeight - rect.top + 4 : undefined })
    }
    place()
    const observer = new ResizeObserver(place)
    if (trigger.current) observer.observe(trigger.current)
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => { observer.disconnect(); window.removeEventListener('resize', place); window.removeEventListener('scroll', place, true) }
  }, [expanded, options, multiple, indicator])

  useEffect(() => {
    if (!expanded) return
    function outside(event: PointerEvent) {
      if (event.target instanceof Node && !trigger.current?.contains(event.target) && !menu.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', outside)
    return () => document.removeEventListener('pointerdown', outside)
  }, [expanded])
  useEffect(() => {
    if (disabled) return
    // A disabled control must not reopen when enabled again.
    return () => { setOpen(false) }
  }, [disabled])
  useEffect(() => {
    if (expanded && activeOption >= 0) document.getElementById(`${listId}-${activeOption}`)?.scrollIntoView({ block: 'nearest' })
  }, [activeOption, expanded, listId])

  const pattern = multiple ? 'checkbox' : indicator
  return (
    <div className={['fretara-dropdown', className].filter(Boolean).join(' ')} style={style} data-disabled={disabled || undefined} data-labelled={Boolean(label)} data-filled={selectedOptions.length > 0}>
      {label && <label id={`${inputId}-label`} htmlFor={inputId} className="heading-14-bold">{label}</label>}
      <button
        {...buttonProps} ref={trigger} id={inputId} type="button" disabled={disabled}
        className="fretara-dropdown__trigger body-14-medium" role="combobox"
        aria-label={ariaLabel ?? (!label && !labelledBy ? placeholder : undefined)}
        aria-labelledby={labelledBy ?? (label ? `${inputId}-label` : undefined)}
        aria-haspopup="listbox" aria-expanded={expanded} aria-controls={expanded ? listId : undefined}
        aria-activedescendant={expanded && activeOption >= 0 ? `${listId}-${activeOption}` : undefined}
        onClick={event => { onClick?.(event); if (!event.defaultPrevented) { if (expanded) setOpen(false); else show() } }}
        onBlur={event => { onBlur?.(event); setOpen(false) }}
        onKeyDown={event => {
          onKeyDown?.(event)
          if (event.defaultPrevented) return
          const key = event.key
          if (key === 'Tab') { setOpen(false); return }
          if (key === 'Escape') { if (expanded) { event.preventDefault(); event.stopPropagation(); setOpen(false) } return }
          if (['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' '].includes(key)) {
            event.preventDefault()
            if (!expanded) {
              show(key === 'ArrowUp' || key === 'End')
              if (key === 'Home' || key === 'End') setActive((key === 'Home' ? enabled[0] : enabled.at(-1)) ?? -1)
              return
            }
            if (key === 'Enter' || key === ' ') { choose(activeOption); return }
            const index = enabled.indexOf(activeOption)
            setActive(key === 'Home' ? enabled[0] ?? -1 : key === 'End' ? enabled.at(-1) ?? -1 : enabled[(index + (key === 'ArrowDown' ? 1 : -1) + enabled.length) % enabled.length] ?? -1)
          } else if (key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
            event.preventDefault()
            const now = Date.now()
            search.current = { text: now - search.current.time > 700 ? key : search.current.text + key, time: now }
            const query = search.current.text.toLocaleLowerCase()
            const prefix = [...query].every(char => char === query[0]) ? query[0] : query
            const start = enabled.indexOf(activeOption)
            const ordered = [...enabled.slice(start + 1), ...enabled.slice(0, start + 1)]
            const match = ordered.find(index => options[index].label.toLocaleLowerCase().startsWith(prefix))
            if (match !== undefined) { setActive(match); setOpen(true) }
          }
        }}
      >
        {leadingIcon && <span className="fretara-dropdown__leading" aria-hidden="true">{leadingIcon}</span>}
        <span className="fretara-dropdown__value">{selectedOptions.length ? selectedOptions.map(option => option.label).join(', ') : placeholder}</span>
        <ChevronDownIcon width={20} height={20} className="fretara-dropdown__chevron" />
      </button>
      {expanded && createPortal(
        <div ref={menu} id={listId} role="listbox" aria-label={ariaLabel ?? label ?? placeholder} aria-labelledby={labelledBy} aria-multiselectable={multiple || undefined}
          className="fretara-dropdown__menu body-14-medium" data-pattern={pattern} style={position}
          onPointerDown={event => event.preventDefault()}>
          {options.map((option, index) => (
            <div key={option.value} id={`${listId}-${index}`} role="option" aria-selected={selected(option)} aria-disabled={option.disabled || undefined}
              className="fretara-dropdown__option" data-active={activeOption === index || undefined}
              onPointerMove={() => { if (!option.disabled) setActive(index) }} onClick={() => choose(index)}>
              {pattern !== 'none' && <span className="fretara-dropdown__indicator" aria-hidden="true">{selected(option) && (pattern === 'checkbox' ? <CheckmarkIcon width={12} height={12} /> : <span />)}</span>}
              <span>{option.label}</span>
            </div>
          ))}
          {!options.length && <div className="fretara-dropdown__empty">No options available</div>}
        </div>, document.body,
      )}
    </div>
  )
}
