import type { SVGProps } from 'react'

/** Icon/ Fill/ checkmark.circle.fill — Figma 4556:2204. */
export function CheckmarkCircleFillIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path d="M20.9609 11.9609C20.9609 16.9197 16.9286 20.9609 11.9609 20.9609C7.00211 20.9609 2.96094 16.9197 2.96094 11.9609C2.96094 6.99328 7.00211 2.96094 11.9609 2.96094C16.9286 2.96094 20.9609 6.99328 20.9609 11.9609ZM14.705 8.45799L10.9374 14.5109L9.14622 12.1992C8.92563 11.908 8.73152 11.8286 8.47564 11.8286C8.07858 11.8286 7.76976 12.1551 7.76976 12.5521C7.76976 12.755 7.84917 12.9492 7.98152 13.1256L10.1962 15.8433C10.4256 16.1521 10.6727 16.2756 10.9727 16.2756C11.2727 16.2756 11.5286 16.1345 11.7139 15.8433L15.8609 9.31387C15.9668 9.12858 16.0815 8.92563 16.0815 8.73152C16.0815 8.31681 15.7198 8.05211 15.3315 8.05211C15.1021 8.05211 14.8727 8.19329 14.705 8.45799Z" fill="currentColor"/>
    </svg>
  )
}
