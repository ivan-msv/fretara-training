import type { SVGProps } from 'react'

/** Icon/Line/Attach, matching the email composer in Figma. */
export function AttachIcon(props: SVGProps<SVGSVGElement>) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden={props['aria-label'] ? undefined : true} {...props}><path d="M8.5 12.5 14 7a3 3 0 0 1 4.24 4.24l-7.77 7.78a5 5 0 0 1-7.07-7.07l8.13-8.13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="m7.1 14.9 7.78-7.78" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
}
