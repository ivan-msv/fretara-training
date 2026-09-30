import type { SVGProps } from 'react'

/** Icon/ Line/ chevron.left — Figma 4556:2263. */
export function ChevronLeftIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M15.7288 5.32372C15.2971 4.89209 14.5974 4.89209 14.1657 5.32372L8.27098 11.2185C7.83933 11.6502 7.83933 12.3499 8.27098 12.7815L14.1657 18.6763C14.5974 19.1079 15.2971 19.1079 15.7288 18.6763C16.1604 18.2446 16.1604 17.5449 15.7288 17.1133L10.6156 12L15.7288 6.8868C16.1604 6.45518 16.1604 5.75535 15.7288 5.32372Z" fill="currentColor"/>
    </svg>
  )
}
