import type { SVGProps } from 'react'

/** Icon/ Fill/ Send message — Figma 4556:2228. */
export function SendMessageFillIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={props['aria-label'] || props['aria-labelledby'] ? undefined : true}
      role={props['aria-label'] || props['aria-labelledby'] ? 'img' : undefined}
      {...props}
    >
      {children}
      <path opacity="0.4" fillRule="evenodd" clipRule="evenodd" d="M17.091 21.3913L21.4582 6.58434L21.4588 6.5816L21.4594 6.57887C21.6798 5.82643 21.4817 5.04527 20.9278 4.4914C20.3734 3.93703 19.5906 3.73833 18.8362 3.95965L4.02719 8.32745C3.2126 8.56787 2.63702 9.23962 2.52388 10.0811C2.41216 10.9197 2.78622 11.7124 3.50817 12.1586L8.63452 15.3128C9.37325 15.7712 9.70714 16.0935 10.124 16.814L13.2606 21.911C13.3504 22.0573 13.4551 22.1889 13.5717 22.3055C14.0285 22.7623 14.6692 22.9829 15.3353 22.8939C16.1781 22.7821 16.8499 22.2065 17.091 21.3913Z" fill="currentColor"/>
      <path d="M15.8332 9.55469L10.8589 14.5289" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
