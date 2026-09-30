import type { SVGProps } from 'react'

/** Icon/ Line/ chevron.down — Figma 4556:2267. */
export function ChevronDownIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={props['aria-label'] || props['aria-labelledby'] ? undefined : true}
      role={props['aria-label'] || props['aria-labelledby'] ? 'img' : undefined}
      {...props}
    >
      {children}
      <path fillRule="evenodd" clipRule="evenodd" d="M18.6763 9.27111C19.1079 9.70274 19.1079 10.4025 18.6763 10.8341L12.7815 16.7289C12.3498 17.1605 11.6501 17.1605 11.2185 16.7289L5.32373 10.8341C4.89209 10.4025 4.89209 9.70274 5.32373 9.27111C5.75538 8.83948 6.45508 8.83948 6.88673 9.27111L12 14.3843L17.1132 9.27111C17.5448 8.83948 18.2446 8.83948 18.6763 9.27111Z" fill="currentColor"/>
    </svg>
  )
}
