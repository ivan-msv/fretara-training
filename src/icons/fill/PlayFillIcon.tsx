import type { SVGProps } from 'react'

/** Icon/ Fill/ play.fill — Figma 4556:2183. */
export function PlayFillIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path d="M5.70898 18.9805C5.70898 19.9473 6.26562 20.4062 6.92969 20.4062C7.22266 20.4062 7.52539 20.3086 7.82812 20.1523L19.2051 13.502C20.0156 13.0332 20.2891 12.7109 20.2891 12.2031C20.2891 11.6856 20.0156 11.3731 19.2051 10.9043L7.82812 4.25391C7.52539 4.08789 7.22266 4 6.92969 4C6.26562 4 5.70898 4.45898 5.70898 5.42578V18.9805Z" fill="currentColor"/>
    </svg>
  )
}
