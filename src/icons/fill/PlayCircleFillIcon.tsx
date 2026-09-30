import type { SVGProps } from 'react'

/** Icon/ Fill/ play.circle.fill — Figma 4556:2193. */
export function PlayCircleFillIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="var(--gray-50)"/>
      <path d="M17.5713 12L9.21415 17.6292L9.21415 6.37083L17.5713 12Z" fill="currentColor"/>
    </svg>
  )
}
