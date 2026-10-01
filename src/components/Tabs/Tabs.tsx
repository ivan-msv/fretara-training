import { useId, useState, type ComponentPropsWithRef, type ReactNode } from 'react'
import { TabItem } from './TabItem'

export type TabsItem = {
  value: string
  label: string
  leadingIcon?: ReactNode
  count?: string | number
  disabled?: boolean
  content?: ReactNode
}

export type TabsProps = Omit<ComponentPropsWithRef<'div'>, 'children' | 'defaultValue' | 'onChange'> & {
  items: TabsItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Accessible name for the tab list. */
  label: string
}

/** Horizontal tabs with automatic activation and persistent, linked panels. Values must be unique. */
export function Tabs({ items, value, defaultValue, onValueChange, label, className, id, ...props }: TabsProps) {
  const generatedId = useId()
  const baseId = id ?? generatedId
  const [internalValue, setInternalValue] = useState(defaultValue)
  const enabledItems = items.filter(item => !item.disabled)
  const requestedValue = value ?? internalValue
  const selectedValue = enabledItems.find(item => item.value === requestedValue)?.value ?? enabledItems[0]?.value
  const select = (next: string) => {
    if (value === undefined) setInternalValue(next)
    if (next !== selectedValue) onValueChange?.(next)
  }

  return (
    <div {...props} id={baseId} className={['fretara-tabs', className].filter(Boolean).join(' ')}>
      <div className="fretara-tabs__list" role="tablist" aria-label={label} aria-orientation="horizontal">
        {items.map((item, index) => (
          <TabItem
            key={item.value}
            id={`${baseId}-tab-${index}`}
            aria-controls={`${baseId}-panel-${index}`}
            selected={item.value === selectedValue}
            tabIndex={item.value === selectedValue ? 0 : -1}
            disabled={item.disabled}
            leadingIcon={item.leadingIcon}
            count={item.count}
            onClick={() => select(item.value)}
            onKeyDown={event => {
              if (event.altKey || event.ctrlKey || event.metaKey) return
              const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End']
              if (!keys.includes(event.key)) return
              event.preventDefault()
              const buttons = Array.from(event.currentTarget.parentElement!.querySelectorAll<HTMLButtonElement>('[role="tab"]:enabled'))
              const current = buttons.indexOf(event.currentTarget)
              const rtl = getComputedStyle(event.currentTarget).direction === 'rtl'
              const step = (event.key === 'ArrowRight' ? 1 : -1) * (rtl ? -1 : 1)
              const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (current + step + buttons.length) % buttons.length
              buttons[next]?.focus()
              buttons[next]?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
              if (enabledItems[next]) select(enabledItems[next].value)
            }}
          >
            {item.label}
          </TabItem>
        ))}
      </div>
      {items.map((item, index) => (
        <div
          key={item.value}
          id={`${baseId}-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={item.value !== selectedValue}
          tabIndex={0}
        >
          {item.content}
        </div>
      ))}
    </div>
  )
}
