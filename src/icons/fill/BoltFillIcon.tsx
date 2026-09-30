import type { SVGProps } from 'react'

/** Icon/ Fill/ bolt.fill — Figma 4556:2180. */
export function BoltFillIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path d="M6.30005 12.998C6.30005 13.3123 6.54179 13.546 6.88022 13.546H11.433L9.0317 20.073C8.71744 20.9029 9.57964 21.3461 10.1195 20.6692L17.4443 11.5154C17.5812 11.3462 17.6538 11.185 17.6538 10.9997C17.6538 10.6935 17.412 10.4517 17.0735 10.4517H12.5208L14.9221 3.92477C15.2364 3.0948 14.3741 2.65162 13.8342 3.33654L6.50956 12.4823C6.37257 12.6596 6.30005 12.8208 6.30005 12.998Z" fill="currentColor"/>
    </svg>
  )
}
