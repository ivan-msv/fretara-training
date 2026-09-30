import type { SVGProps } from 'react'

/** Icon/ Line/ plus — Figma 4556:2272. */
export function PlusIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
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
      <path d="M4 12.0566C4 12.5352 4.40039 12.9258 4.86914 12.9258H11.1875V19.2441C11.1875 19.7129 11.5781 20.1133 12.0566 20.1133C12.5352 20.1133 12.9355 19.7129 12.9355 19.2441V12.9258H19.2441C19.7129 12.9258 20.1133 12.5352 20.1133 12.0566C20.1133 11.5781 19.7129 11.1777 19.2441 11.1777H12.9355V4.86914C12.9355 4.40039 12.5352 4 12.0566 4C11.5781 4 11.1875 4.40039 11.1875 4.86914V11.1777H4.86914C4.40039 11.1777 4 11.5781 4 12.0566Z" fill="currentColor"/>
    </svg>
  )
}
