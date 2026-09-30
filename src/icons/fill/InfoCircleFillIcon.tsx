import type { SVGProps } from 'react'

/** Icon/ Fill/ info circle — Figma 4633:9238. */
export function InfoCircleFillIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M12.7555 15.693C12.7555 16.107 12.4195 16.443 12.0055 16.443C11.5915 16.443 11.2555 16.107 11.2555 15.693V11.394C11.2555 10.98 11.5915 10.644 12.0055 10.644C12.4195 10.644 12.7555 10.98 12.7555 11.394V15.693ZM11.2495 8.29097C11.2495 7.87697 11.5855 7.54097 11.9995 7.54097C12.4135 7.54097 12.7495 7.87697 12.7495 8.29097C12.7495 8.70497 12.4135 9.07297 11.9995 9.07297C11.5855 9.07297 11.2495 8.76797 11.2495 8.35397V8.29097ZM11.9995 2.49997C6.76151 2.49997 2.49951 6.76097 2.49951 12C2.49951 17.238 6.76151 21.5 11.9995 21.5C17.2375 21.5 21.4995 17.238 21.4995 12C21.4995 6.76097 17.2375 2.49997 11.9995 2.49997Z" fill="currentColor"/>
    </svg>
  )
}
