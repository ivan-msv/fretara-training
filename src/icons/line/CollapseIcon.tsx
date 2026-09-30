import type { SVGProps } from 'react'

/** Icon/ Line/ Collapse — Figma 4589:16423. */
export function CollapseIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path d="M3 18V16.5H16V18H3ZM19.95 16.7L15.225 11.975L19.925 7.275L21 8.35L17.375 11.975L21.025 15.625L19.95 16.7ZM3 12.7V11.2H13V12.7H3ZM3 7.5V6H16V7.5H3Z" fill="currentColor"/>
    </svg>
  )
}
