import type { SVGProps } from 'react'

/** Icon/ Fill/ xmark.circle.fill — Figma 4556:2191. */
export function XmarkCircleFillAlternateIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <rect width="24" height="24" rx="12" fill="var(--gray-50)"/>
      <path d="M16.322 6.84047C16.5534 6.60905 16.9285 6.60905 17.1599 6.84047C17.3912 7.0719 17.3913 7.44698 17.1599 7.67836L12.8376 11.9996L17.1599 16.3219C17.3912 16.5533 17.3913 16.9284 17.1599 17.1598C16.9285 17.3912 16.5534 17.3911 16.322 17.1598L11.9997 12.8375L7.67845 17.1598C7.44707 17.3912 7.07199 17.3911 6.84056 17.1598C6.60914 16.9284 6.60914 16.5533 6.84056 16.3219L11.1618 11.9996L6.84056 7.67836C6.60914 7.44694 6.60914 7.07189 6.84056 6.84047C7.07198 6.60905 7.44703 6.60905 7.67845 6.84047L11.9997 11.1618L16.322 6.84047Z" fill="currentColor"/>
    </svg>
  )
}
