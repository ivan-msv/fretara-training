import type { SVGProps } from 'react'

/** Icon/ Fill/ Clipboard check — Figma 4556:2231. */
export function ClipboardCheckFillIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path opacity="0.4" fillRule="evenodd" clipRule="evenodd" d="M16.8929 4.38282C16.7729 4.34737 16.6553 4.43697 16.6374 4.56081C16.4646 5.75695 15.4286 6.68126 14.1901 6.68126H9.81007C8.57168 6.68126 7.52694 5.75709 7.35293 4.56109C7.3349 4.43717 7.21714 4.34755 7.09711 4.38323C5.34578 4.90375 4.07007 6.53566 4.07007 8.46126V17.3613C4.07007 19.7013 5.97007 21.6113 8.32007 21.6113H15.6801C18.0301 21.6113 19.9301 19.7013 19.9301 17.3613V8.46126C19.9301 6.53515 18.6537 4.90289 16.8929 4.38282Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.81003 5.48062H14.1901C14.8701 5.48062 15.4301 4.94063 15.4501 4.26064C15.4601 4.24064 15.4601 4.22063 15.4601 4.20063V3.66062C15.4601 2.96062 14.8901 2.39062 14.1901 2.39062H9.81003C9.11003 2.39062 8.53003 2.96062 8.53003 3.66062V4.20063C8.53003 4.22063 8.53003 4.23063 8.54003 4.25063C8.56003 4.94062 9.13003 5.48062 9.81003 5.48062Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M15.49 12.4494L11.52 16.4194C11.38 16.5594 11.19 16.6394 10.99 16.6394C10.79 16.6394 10.6 16.5594 10.46 16.4194L8.50998 14.4794C8.21998 14.1894 8.21998 13.7094 8.50998 13.4194C8.80998 13.1294 9.27998 13.1294 9.56998 13.4194L10.99 14.8294L14.43 11.3894C14.72 11.0994 15.2 11.0994 15.49 11.3894C15.78 11.6794 15.78 12.1594 15.49 12.4494Z" fill="currentColor"/>
    </svg>
  )
}
