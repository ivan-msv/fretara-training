import type { SVGProps } from 'react'

/** Icon/ Fill/ clock.fill — Figma 4556:2187. */
export function ClockFillIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path d="M7.85898 12.808C7.54525 12.808 7.30995 12.5727 7.30995 12.2589C7.30995 11.9531 7.54525 11.7178 7.85898 11.7178H11.4119V6.9727C11.4119 6.66682 11.6472 6.43152 11.9531 6.43152C12.2589 6.43152 12.5021 6.66682 12.5021 6.9727V12.2589C12.5021 12.5727 12.2589 12.808 11.9531 12.808H7.85898ZM11.9609 19.9609C16.3766 19.9609 19.9609 16.3687 19.9609 11.9609C19.9609 7.54525 16.3766 3.96094 11.9609 3.96094C7.55309 3.96094 3.96094 7.54525 3.96094 11.9609C3.96094 16.3687 7.55309 19.9609 11.9609 19.9609Z" fill="currentColor"/>
    </svg>
  )
}
