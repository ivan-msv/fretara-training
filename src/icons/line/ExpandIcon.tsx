import type { SVGProps } from 'react'

/** Icon/ Line/ Expand — Figma 4589:16422. */
export function ExpandIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path d="M21 6L21 7.5L8 7.5L8 6L21 6ZM4.05 7.3L8.775 12.025L4.075 16.725L3 15.65L6.625 12.025L2.975 8.375L4.05 7.3ZM21 11.3L21 12.8L11 12.8L11 11.3L21 11.3ZM21 16.5L21 18L8 18L8 16.5L21 16.5Z" fill="currentColor"/>
    </svg>
  )
}
