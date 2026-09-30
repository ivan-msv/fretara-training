import type { SVGProps } from 'react'

/** Icon/ Fill/ Phone Call Ringing — Figma 4556:2208. */
export function PhoneCallRingingFillIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M19.8021 14.9102C19.5611 14.6812 19.3011 14.4342 19.0271 14.1612C17.7471 12.8822 16.6421 13.3152 15.7551 13.6642C14.6931 14.0802 13.6901 14.4742 11.8591 12.6412C10.0291 10.8142 10.4211 9.81024 10.8371 8.74724C11.1841 7.85724 11.6161 6.75024 10.3381 5.47224C10.0571 5.19024 9.80307 4.92424 9.57107 4.67924C8.63307 3.69324 7.95507 2.98024 7.00107 2.96924H6.97707C6.15707 2.96924 5.29707 3.49324 4.01907 4.77124C4.00607 4.78424 3.94107 4.84924 3.93007 4.86324C3.64407 5.14224 2.88407 5.88624 2.87507 7.33724C2.86207 9.60324 4.68907 12.5852 8.30407 16.1982C11.9051 19.7992 14.8771 21.6242 17.1381 21.6242C17.1461 21.6242 17.1541 21.6232 17.1621 21.6232C18.6131 21.6152 19.3561 20.8542 19.6361 20.5682L19.7291 20.4782C21.0181 19.1902 21.5391 18.3262 21.5291 17.4982C21.5161 16.5392 20.7971 15.8552 19.8021 14.9102Z" fill="currentColor"/>
    </svg>
  )
}
