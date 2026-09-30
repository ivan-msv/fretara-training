import type { SVGProps } from 'react'

/** Icon/ Line/ chevron.right — Figma 4556:2265. */
export function ChevronRightIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M8.27123 5.32372C8.70286 4.89209 9.40263 4.89209 9.83427 5.32372L15.729 11.2185C16.1607 11.6502 16.1607 12.3499 15.729 12.7815L9.83427 18.6763C9.40263 19.1079 8.70286 19.1079 8.27123 18.6763C7.8396 18.2446 7.8396 17.5449 8.27123 17.1133L13.3844 12L8.27123 6.8868C7.8396 6.45518 7.8396 5.75535 8.27123 5.32372Z" fill="currentColor"/>
    </svg>
  )
}
