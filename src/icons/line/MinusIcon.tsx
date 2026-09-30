import type { SVGProps } from 'react'

/** Icon/ Line/ minus — Figma 4556:2274. */
export function MinusIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path d="M4.86914 12.7676H19.2441C19.7129 12.7676 20.1133 12.3672 20.1133 11.8887C20.1133 11.4102 19.7129 11.0195 19.2441 11.0195H4.86914C4.40039 11.0195 4 11.4102 4 11.8887C4 12.3672 4.40039 12.7676 4.86914 12.7676Z" fill="currentColor"/>
    </svg>
  )
}
