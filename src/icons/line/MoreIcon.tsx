import type { SVGProps } from 'react'

/** Icon/ Line/ more — Figma 4556:2278. */
export function MoreIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path d="M4.85547 10C5.88086 10 6.70117 10.8301 6.70117 11.8555C6.70117 12.8809 5.88086 13.7012 4.85547 13.7012C3.83008 13.7012 3 12.8809 3 11.8555C3 10.8301 3.83008 10 4.85547 10ZM12.1113 10C13.1367 10 13.957 10.8301 13.957 11.8555C13.957 12.8809 13.1367 13.7012 12.1113 13.7012C11.0859 13.7012 10.2559 12.8809 10.2559 11.8555C10.2559 10.8301 11.0859 10 12.1113 10ZM19.3672 10C20.3926 10 21.2227 10.8301 21.2227 11.8555C21.2227 12.8809 20.3926 13.7012 19.3672 13.7012C18.3418 13.7012 17.5117 12.8808 17.5117 11.8555C17.5117 10.8301 18.3418 10 19.3672 10Z" fill="currentColor"/>
    </svg>
  )
}
