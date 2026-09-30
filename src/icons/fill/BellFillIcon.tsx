import type { SVGProps } from 'react'

/** Icon/ Fill/ bell.fill — Figma 4556:2198. */
export function BellFillIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path d="M5.25572 18.1704H18.4365C19.2183 18.1704 19.6922 17.7713 19.6922 17.1642C19.6922 16.3326 18.844 15.5842 18.1289 14.8441C17.58 14.2702 17.4303 13.0894 17.3638 12.133C17.3056 8.9397 16.4573 6.74428 14.2453 5.94595C13.9293 4.85655 13.0727 4 11.842 4C10.6195 4 9.75466 4.85655 9.44697 5.94595C7.23492 6.74428 6.38669 8.9397 6.32848 12.133C6.26195 13.0894 6.11226 14.2702 5.56341 14.8441C4.83991 15.5842 4 16.3326 4 17.1642C4 17.7713 4.4657 18.1704 5.25572 18.1704ZM11.842 21.5051C13.2557 21.5051 14.2869 20.474 14.395 19.3097H9.29728C9.4054 20.474 10.4366 21.5051 11.842 21.5051Z" fill="currentColor"/>
    </svg>
  )
}
